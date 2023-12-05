'use client';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import { useEffect, useRef, useState } from 'react';

export default function DwellingBarGraph() {
  const ref = useRef();
  const [ladTracs, setLadTracs] = useState(null);
  const [dwellingTotal, setDwellingTotal] = useState([]);
  const [dwellingData, setDwellingData] = useState(null);
  const [largestTotal, setLargestTotal] = useState(10000000);
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth / 2);
    setHeight(window.innerHeight / 3);

    const handleResize = () => {
      setWidth(window.innerWidth / 2);
      setHeight(window.innerHeight / 3);
    };

    loadData();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadData = () => {
    d3.json('/api/data/energyCost/filter?type=dwelling').then((data) => {
      console.log(data);
      setDwellingTotal(data.total);
      setDwellingData(data.aggregate);
      const flattened = data.aggregate
        .map((v) =>
          Object.values(
            Object.fromEntries(
              Object.entries(v).filter(
                // Filter out lad information for only values
                ([key, val]) => key != 'lad19cd' && key != 'lad19nm'
              )
            )
          )
        )
        .flat(1);
      const largestValue = Math.max(...flattened);
      setLargestTotal(largestValue);
    });
  };

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
          text: (d) => Math.round(d.value),
          textAnchor: 'start',
          dx: 3,
          filter: (d) => d.value <= 0.007,
          fill: 'white'
        }),
        Plot.text(dwellingTotal, {
          x: 'value',
          y: 'name',
          text: (d) => Math.round(d.value),
          textAnchor: 'end',
          dx: -3,
          filter: (d) => d.value > 0.007,
          fill: 'white'
        }),
        Plot.ruleX([0]),
        Plot.ruleY([-1])
      ],
      height,
      width: width / 2
    });
    ref.current.append(plot);

    return () => plot.remove();
  }, [dwellingTotal, width, height]);

  // useEffect(() => {
  //   if (!dwellingTotal) return;
  //   d3.select(ref.current).selectAll('*').remove();
  //   const svg = d3
  //     .select(ref.current)
  //     .append('svg')
  //     .attr('width', width/3)
  //     .attr('height', height/2)
  //     .append('g')
  //     .attr('transform', 'translate(90, 90)');

  //   // X axis
  //   const x = d3.scaleLinear().domain([0, largestTotal]).range([0, width]);
  //   svg
  //     .append('g')
  //     .attr('transform', 'transform(0, 1000)')
  //     .call(d3.axisBottom(x))
  //     .selectAll('text')
  //     .attr('transform', 'translate(-10,0)rotate(-45)')
  //     .style('text-anchor', 'end');

  //   // Y axis
  //   var y = d3
  //     .scaleBand()
  //     .range([0, height])
  //     .domain(Object.keys(dwellingTotal));
  //   svg.append('g').call(d3.axisLeft(y));

  //   //Bars
  //   svg
  //     .selectAll('myRect')
  //     .data(dwellingTotal)
  //     .enter()
  //     .append('rect')
  //     .attr('x', x(0))
  //     .attr('y', function (d) {
  //       console.log(d);
  //       return y(Object.keys(d));
  //     })
  //     .attr('width', function (d) {
  //       return x(Object.values(d));
  //     })
  //     .attr('height', y.bandwidth())
  //     .attr('fill', '#69b3a2');
  // }, [dwellingTotal, height, width, largestTotal]);

  return (
    <>
      <section className='flex flex-row mt-2 rounded-md bg-white dark:bg-gray-800 shrink h-full'>
        <svg
          className='m-2 rounded-md w-full'
          ref={ref}
        />
      </section>
    </>
  );
}
