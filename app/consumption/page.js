'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import InfoPopup from '../components/InfoPopup';

export default function Consumption() {
  const svgRef = useRef();
  // Specify the chart’s dimensions.
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(500);
  const [gd, setGD] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await d3.json('api/data/heatConsumption');
      const dataArray = Object.entries(data).map(([key, value]) => {
        return {
          HeatDate: new Date(key),
          ...value
        };
      });
      setGD(dataArray);
    };
    fetchData();
  }, [height, width]);

  useEffect(() => {
    if (gd.length < 1) return;
    // // Create the positional scales.
    const x = d3
      .scaleUtc()
      .domain(d3.extent(gd, (d) => new Date(d.HeatDate)))
      .range([40, width - 30]);
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(gd, (d) => d.After_Efficiency),
        d3.max(gd, (d) => d.Before_Efficiency)
      ])
      .nice(10)
      .range([height - 30, 20]);
    // Create the area generator.
    const area = d3
      .area()
      .curve(d3.curveStep)
      .x((d) => x(new Date(d.HeatDate)))
      .y0((d) => y(d.Before_Efficiency))
      .y1((d) => y(d.After_Efficiency));
    // // // Create the SVG container.
    const svg = d3.select(svgRef.current);
    //const axisGenerator = d3.axisBottom(x);
    //svg.append('g').call(axisGenerator);
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');
    // Add the area path.
    svg.append('path').datum(gd).attr('fill', '#FF4C00').attr('d', area);
    // Add the horizontal axis.
    svg
      .append('g')
      .attr('transform', `translate(0,${height - 30})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )
      .call((g) => g.select('.domain').remove());
    // Add the vertical axis, a grid and an axis label.
    svg
      .append('g')
      .attr('transform', `translate(${40},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick line')
          .clone()
          .attr('x2', width - 10)
          .attr('stroke-opacity', 0.1)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', -40)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('Efficiency')
      );
  }, [height, width, gd]);

  return (
    <div className='h-screen bg-gray-200 dark:bg-gray-700'>
      <h1 className='text-center text-2xl'>
        Heat Consumption Profile <InfoPopup type={'heat-consumption-profile'} />
      </h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}
