'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export default function LSOAMap({ lsoa }) {
  const ref = useRef();
  const tooltipRef = useRef();
  const [lsoaTracs, setLsoaTracs] = useState(null);
  const [heatDemand, setHeatDemand] = useState(null);
  const [dataState, setDataState] = useState('before');
  const [largestBeforeDemand, setLargestBeforeDemand] = useState(10000000);

  const toggleDataState = () => {
    setDataState((prevState) => (prevState === 'before' ? 'after' : 'before'));
  };

  const width = 928;
  const height = 1200;
  // Get geojson data for the map
  useEffect(() => {
    const url = `/api/geojson/lsoa?lad=${lsoa}`;
    d3.json(url).then((data) => {
      setLsoaTracs(data);
    });
  }, [lsoa]);

  // Get heat demand data
  useEffect(() => {
    const url = `/api/data/heatDemand/lsoa?lad=${lsoa}`;
    d3.json(url).then((data) => {
      const dataArray = Object.entries(data).map(([key, value]) => {
        return {
          lsoa11cd: key,
          ...value
        };
      });
      setHeatDemand(dataArray);
      // find the largest value in the heat demand data for correct legend
      const largestValue = Math.max(
        ...dataArray.map((item) => item.HeatDemands.beforeDemand)
      );
      setLargestBeforeDemand(largestValue);
    });
  }, [lsoa]);

  const svg = d3.select(ref.current);
  svg.selectAll('*').remove();

  svg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')
    .call(
      d3
        .zoom()
        .scaleExtent([0.5, 10])
        .translateExtent([
          [-width, -height],
          [2 * width, 2 * height]
        ])
        .on('zoom', zoomed)
    );

  const g = svg.append('g');

  function zoomed(event) {
    const { transform } = event;
    g.attr('transform', transform);
  }

  // Draw the map
  useEffect(() => {
    if (!lsoaTracs) return;
    const path = d3.geoPath().projection(
      d3.geoTransverseMercator().fitExtent(
        [
          [20, 20],
          [width - 20, height - 20]
        ],
        lsoaTracs
      )
    );

    g.selectAll('path')
      .data(lsoaTracs.features)
      .enter()
      .append('path')
      .attr('class', 'tract')
      .attr('d', path)
      .attr('fill', 'silver')
      .on('mouseover', function (event, d) {
        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = d.properties.lsoa11nm;
        }
      })
      .on('click', function (event, d) {
        const url = `/demand/lsoa/${d.id}`;
        window.location.href = url;
      })
      .append('title')
      .text(function (d) {
        return d.properties.lsoa11nm;
      });
  }, [g, lsoaTracs]);

  // Draw the heat demand data
  useEffect(() => {
    if (!heatDemand) return;
    const color = d3.scaleQuantize(
      [100000, largestBeforeDemand],
      d3.schemeOranges[9]
    );
    console.log(heatDemand);
    g.selectAll('path')
      .join('path')
      .attr('fill', (d) => {
        const foundItem = heatDemand.find(
          (item) => item.lsoa11cd === d.properties.lsoa11cd
        );

        if (foundItem) {
          return color(
            dataState === 'before'
              ? foundItem.HeatDemands.beforeDemand
              : foundItem.HeatDemands.afterDemand
          );
        }
        return 'grey';
      });
  }, [dataState, g, heatDemand, largestBeforeDemand]);

  return (
    <div>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-row flex-nowrap my-2'>
          <h3
            className='m-2'
            ref={tooltipRef}
          >
            Select An Area
          </h3>
          <button
            className={`mx-2 p-1 border-2 rounded-md ${
              dataState === 'before'
                ? 'border-gray-600 dark:border-gray-200'
                : 'border-gray-700 dark:border-gray-300'
            }`}
            onClick={toggleDataState}
          >
            {dataState === 'before'
              ? 'Before Energy Efficiency Measures'
              : 'After Energy Efficiency Measures'}
          </button>
        </div>
        <section className='w-full py-4 px-6 bg-gray-600 dark:bg-gray-800 rounded-md shadow-lg'>
          <div className='grid grid-cols-5 gap-1'>
            <div className='h-3 w-full bg-blue-100' />
            <div className='h-3 w-full bg-blue-300' />
            <div className='h-3 w-full bg-blue-500' />
            <div className='h-3 w-full bg-blue-700' />
            <div className='h-3 w-full bg-blue-900' />
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300'>
            <span>Low</span>
            <span>High</span>
          </div>
        </section>
      </div>
      <svg ref={ref} />
    </div>
  );
}
