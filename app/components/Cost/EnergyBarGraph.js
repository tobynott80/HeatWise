'use client';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';

export default function EnergyBarGraph({ graph }) {
  const ref = useRef();
  const [type, setType] = useState(graph);
  const [dwellingTotal, setDwellingTotal] = useState([]);
  const [dwellingData, setDwellingData] = useState(null);
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth / 2);
    setHeight(window.innerHeight / 3);

    const handleResize = () => {
      setWidth(window.innerWidth / 2);
      setHeight(window.innerHeight / 3);
    };

    function loadData() {
      d3.json(`/api/data/energyCost/filter?type=${type}`).then((data) => {
        setDwellingTotal(data.total);
        setDwellingData(data.aggregate);
      });
    }

    loadData();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [type]);

  useEffect(() => {
    if (dwellingTotal.length < 1) return;
    const plot = Plot.plot({
      x: { label: 'Cost in Millions', axis: 'bottom' },
      y: { label: 'Dwelling Type' },
      marks: [
        Plot.barX(dwellingTotal, {
          x: 'value',
          y: 'name',
          fill: '#b45309'
        }),
        Plot.text(dwellingTotal, {
          x: 'value',
          y: 'name',
          text: (d) => '£' + Math.round(d.value).toLocaleString('en-GB'),
          textAnchor: 'start',
          dx: 3,
          filter: (d) => d.value <= 0.007,
          fill: 'white'
        }),
        Plot.text(dwellingTotal, {
          x: 'value',
          y: 'name',
          text: (d) => '£' + Math.round(d.value).toLocaleString('en-GB'),
          textAnchor: 'end',
          dx: -3,
          filter: (d) => d.value > 0.007,
          fill: 'white'
        }),
        Plot.ruleX([0]),
        Plot.ruleY([-1])
      ],
      height,
      width: width / 2,
      marginLeft: 100
    });
    ref.current.append(plot);

    return () => plot.remove();
  }, [dwellingTotal, width, height]);

  return (
    <section className='rounded-md bg-white dark:bg-gray-800 shrink h-full text-center p-2'>
      <span className='text-sm font-semibold'>
        Breakdown of energy efficiency improvement costs by {type} type (£)
      </span>
      <svg
        className='m-2 rounded-md w-full h-3/4'
        ref={ref}
      />
    </section>
  );
}
