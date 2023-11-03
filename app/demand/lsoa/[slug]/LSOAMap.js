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
  const dataRef = useRef();
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(1200);

  const toggleDataState = () => {
    setDataState((prevState) => (prevState === 'before' ? 'after' : 'before'));
  };

  useEffect(() => {
    // Set initial values based on the viewport
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Draw the map and set the projection
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
    // set the mouseover and click events for each lsoa
    g.selectAll('path')
      .data(lsoaTracs.features)
      .enter()
      .append('path')
      .attr('class', 'tract')
      .attr('d', path)
      .attr('fill', 'silver')
      .on('mouseover', function (event, d) {
        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = 'LSOA code: ' + d.properties.lsoa11nm;
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
  }, [g, height, lsoaTracs, width]);

  // Draw the heat demand data
  useEffect(() => {
    if (!heatDemand) return;
    const color = d3.scaleQuantize(
      [100000, largestBeforeDemand],
      ['#fef3c7', '#fdba74', '#f59e0b', '#b45309', '#7c2d12']
    );
    console.log(heatDemand);
    g.selectAll('path')
      .join('path')
      .attr('fill', (d) => {
        const foundItem = heatDemand.find(
          (item) => item.lsoa11cd === d.properties.lsoa11cd
        );
        d.properties.beforeDemand = Math.round(
          foundItem.HeatDemands.beforeDemand
        );
        d.properties.afterDemand = Math.round(
          foundItem.HeatDemands.afterDemand
        );
        d.properties.difference = Math.round(
          foundItem.HeatDemands.beforeDemand - foundItem.HeatDemands.afterDemand
        );
        if (foundItem) {
          return color(
            dataState === 'before'
              ? foundItem.HeatDemands.beforeDemand
              : foundItem.HeatDemands.afterDemand
          );
        }
        return 'grey';
      })
      .on('mouseover', function (event, d) {
        if (dataRef.current) {
          const dataFound =
            'Demand Before: ' +
            d.properties.beforeDemand.toLocaleString() +
            ' Demand After: ' +
            d.properties.afterDemand.toLocaleString() +
            ' Difference: ' +
            d.properties.difference.toLocaleString();
          dataRef.current.innerHTML = dataFound;
        }
      });
  }, [dataState, g, heatDemand, largestBeforeDemand]);

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row flex-nowrap my-2'>
          <h3
            className='m-2'
            ref={tooltipRef}
          >
            Select An Area
          </h3>
          <h3
            className='m-2'
            ref={dataRef}
          ></h3>
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
            <div className='h-3 w-full bg-amber-100' />
            <div className='h-3 w-full bg-amber-300' />
            <div className='h-3 w-full bg-amber-500' />
            <div className='h-3 w-full bg-amber-700' />
            <div className='h-3 w-full bg-amber-900' />
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300'>
            <span>0</span>
            <span>{Math.round(largestBeforeDemand).toLocaleString()}</span>
          </div>
        </section>
        <svg
          className='m-2 border-2 rounded-lg border-gray-200 dark:border-gray-700'
          ref={ref}
        />
      </div>
    </div>
  );
}
