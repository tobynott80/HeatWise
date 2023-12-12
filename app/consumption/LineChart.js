'use client';
import * as d3 from 'd3';
import { useRef } from 'react';

export default function Consumption() {
  const svgRef = useRef();
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  const sftemp = [
    {
      date: '2010-10-01',
      close: 93.24
    },
    {
      date: '2010-10-02',
      close: 98.84
    }
  ];
  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(
    d3.extent(sftemp, (d) => d.date),
    [marginLeft, width - marginRight]
  );

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear(
    [0, d3.max(sftemp, (d) => d.close)],
    [height - marginBottom, marginTop]
  );

  // Declare the line generator.
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  // Create the SVG container.
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  // Add the x-axis.
  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginLeft - marginRight)
        .attr('stroke-opacity', 0.1)
    )
    .call((g) =>
      g
        .append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('↑ Daily close ($)')
    );

  // Append a path for the line.
  svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line(sftemp));

  return (
    <div className='h-screen bg-gray-200 dark:bg-gray-700'>
      <h1 className='text-center text-2xl'>Heat Consumption Profile</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}
