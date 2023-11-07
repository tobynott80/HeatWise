'use client';
import ArrowLeft from '@/app/components/icons/ArrowLeft';
import ArrowShuffle from '@/app/components/icons/ArrowShuffle';
import Reset from '@/app/components/icons/Reset';
import ZoomIn from '@/app/components/icons/ZoomIn';
import ZoomOut from '@/app/components/icons/ZoomOut';
import * as d3 from 'd3';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function LSOAMap({ lsoa }) {
  const ref = useRef();
  const tooltipRef = useRef();
  const [lsoaTracs, setLsoaTracs] = useState(null);
  const [heatDemand, setHeatDemand] = useState(null);
  const [dataState, setDataState] = useState('before');
  const [largestBeforeDemand, setLargestBeforeDemand] = useState(10000000);
  const [smallestAfterDemand, setSmallestAfterDemand] = useState(0);
  const demandAfterRef = useRef();
  const demandBeforeRef = useRef();
  const demandDiffRef = useRef();
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
      // and then the lowest
      const smallestValue = Math.min(
        ...dataArray.map((item) => item.HeatDemands.afterDemand)
      );
      setSmallestAfterDemand(smallestValue);
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
  // Functions for zoom buttons
  const zoom = d3.zoom().scaleExtent([1, 40]).on('zoom', zoomed);
  function zoomIn() {
    svg.transition().call(zoom.scaleBy, 2);
  }
  function zoomOut() {
    svg.transition().call(zoom.scaleBy, 0.5);
  }
  function reset() {
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
  }

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
    // Map the LSOA plots and append title
    g.selectAll('path')
      .data(lsoaTracs.features)
      .enter()
      .append('path')
      .attr('class', 'tract')
      .attr('d', path)
      .attr('fill', 'silver')
      .append('title')
      .text(function (d) {
        return d.properties.lsoa11nm;
      });
  }, [g, height, lsoaTracs, width]);

  // Draw the heat demand data
  useEffect(() => {
    if (!heatDemand) return;
    const color = d3.scaleQuantize(
      [smallestAfterDemand, largestBeforeDemand],
      ['#fef3c7', '#fdba74', '#f59e0b', '#b45309', '#7c2d12']
    );
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
        if (demandBeforeRef.current) {
          demandBeforeRef.current.innerHTML =
            d.properties.beforeDemand.toLocaleString() + ' kW⋅h';

          demandAfterRef.current.innerHTML =
            d.properties.afterDemand.toLocaleString() + ' kW⋅h';

          demandDiffRef.current.innerHTML =
            d.properties.difference.toLocaleString() + ' kW⋅h';

          if (tooltipRef.current) {
            tooltipRef.current.innerHTML = 'LSOA: ' + d.properties.lsoa11nm;
          }
        }
      });
  }, [dataState, g, heatDemand, largestBeforeDemand, smallestAfterDemand]);

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row mb-4 w-full flex-nowrap '>
          <div className='rounded-md shadow-lg mr-1'>
            <button
              className={`mx-2 group flex flex-row p-1 border-2 rounded-md border-gray-600 dark:border-white`}
              onClick={toggleDataState}
              title='Toggle Before/After View'
            >
              <div className='m-2 transition animate-spin-once delay-500'>
                <ArrowShuffle />
              </div>
            </button>
            <Link href='/demand'>
              <button
                className={`mx-2 mt-2 group flex flex-row p-1 border-2 rounded-md border-gray-600 dark:border-white`}
                title='Back to National Map'
              >
                <div className='m-2'>
                  <ArrowLeft />
                </div>
              </button>
            </Link>
          </div>
          <div className='bg-white flex-grow flex flex-row dark:bg-gray-800 rounded-md shadow-lg p-4'>
            <h3 className='m-2 text-center'>
              {dataState === 'before'
                ? 'Before Energy Efficiency Measures'
                : 'After Energy Efficiency Measures'}
            </h3>
            <h3
              className='m-2 text-center'
              ref={tooltipRef}
            >
              Select An Area
            </h3>
            <h3 className='m-2 text-center'>
              Demand Before:
              <span ref={demandBeforeRef}></span>
            </h3>
            <h3 className='m-2 text-center'>
              Demand After:
              <span ref={demandAfterRef}></span>
            </h3>
            <h3 className='m-2 text-center'>
              Difference:
              <span ref={demandDiffRef}></span>
            </h3>
          </div>
        </div>
        <section className='w-full py-4 px-6 bg-white dark:bg-gray-800 rounded-md shadow-lg'>
          <div className='grid grid-cols-5 gap-1'>
            <div className='h-3 w-full bg-amber-100' />
            <div className='h-3 w-full bg-amber-300' />
            <div className='h-3 w-full bg-amber-500' />
            <div className='h-3 w-full bg-amber-700' />
            <div className='h-3 w-full bg-amber-900' />
          </div>
          <div className='flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300'>
            <span>
              {Math.round(smallestAfterDemand).toLocaleString()} kW⋅h{' '}
            </span>
            <span>
              {(
                (Math.round(largestBeforeDemand) +
                  Math.round(smallestAfterDemand)) /
                2
              ).toLocaleString()}{' '}
              kW⋅h{' '}
            </span>

            <span>
              {Math.round(largestBeforeDemand).toLocaleString()} kW⋅h{' '}
            </span>
          </div>
        </section>
        <div className='flex flex-row my-4 rounded-md bg-white dark:bg-gray-800 shrink'>
          <svg
            className='m-2 rounded-md'
            ref={ref}
          />
          <div className='flex flex-col mt-2 mr-2 h-min rounded-md bg-gray-200 dark:bg-gray-600'>
            <button
              onClick={zoomIn}
              className='m-2'
            >
              <ZoomIn />
            </button>
            <button
              onClick={zoomOut}
              className='m-2'
            >
              <ZoomOut />
            </button>
            <button
              onClick={reset}
              className='m-2'
            >
              <Reset />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}