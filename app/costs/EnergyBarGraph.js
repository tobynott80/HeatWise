'use client';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';

export default function EnergyBarGraph({ graph, filters }) {
  const ref = useRef();
  const plot = useRef();
  const [type, setType] = useState(graph);
  const [current, setCurrent] = useState([]);
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
    if (current.length < 1) return;
    plot.current?.remove();
    plot.current = Plot.plot({
      x: { label: 'Cost in Millions', axis: 'bottom' },
      y: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Type`  },
      marks: [
        Plot.barX(current, {
          x: 'value',
          y: 'name',
          fill: '#b45309'
        }),
        Plot.text(current, {
          x: 'value',
          y: 'name',
          text: (d) => '£' + Math.round(d.value).toLocaleString('en-GB'),
          textAnchor: 'start',
          dx: 3,
          filter: (d) => d.value <= 0.007,
          fill: 'white'
        }),
        Plot.text(current, {
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
    ref.current.append(plot.current);

    return () => plot.current.remove();
  }, [current, width, height]);

  useEffect(() => {
    if (filters.length < 1) {
      // Show total data
      setCurrent(dwellingTotal);
    } else {
      let data = dwellingData
        .filter((v) => filters.includes(v.lad19cd))
        .map(({ lad19cd, lad19nm, ...v }) => v);

      if (data.length < 1) return setCurrent(dwellingTotal);

      let sum = Object.keys(data[0]).map((v) => {
        return { name: v, value: 0 };
      });
      data.forEach((v) => {
        Object.keys(v).forEach((k) => {
          sum.find((j) => j.name == k).value += v[k];
        });
      });
      setCurrent(sum);
    }
  }, [filters, dwellingTotal, dwellingData]);

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
