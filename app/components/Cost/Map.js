'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

import ZoomIn from '../icons/ZoomIn';
import ZoomOut from '../icons/ZoomOut';
import Reset from '../icons/Reset';

export default function Map() {
  const mapRef = useRef();
  const [ladTracs, setLadTracs] = useState(null);
  const [energyCost, setEnergyCost] = useState(null);
  const [largestTotal, setLargestTotal] = useState(10000000);
  const [smallestTotal, setSmallestTotal] = useState(0);
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(1200);
  const demandAfterRef = useRef();
  const demandBeforeRef = useRef();
  const demandDiffRef = useRef();

  useEffect(() => {
    setWidth(window.innerWidth / 2);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth / 2);
      setHeight(window.innerHeight);
    };

    loadData();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadData = () => {
    d3.json('/api/data/energyCost').then((data) => {
      setEnergyCost(data);
      const mapped = data.reduce((res, item) => {
        if (item.HeatingCost != null) {
          res.push(parseFloat(item.HeatingCost.total));
        }
        return res;
      }, []);
      const largestValue = Math.max(...mapped);
      setLargestTotal(largestValue);
      const smallestValue = Math.min(...mapped);
      setSmallestTotal(smallestValue);
    });

    d3.json('/api/geojson/lad19').then((data) => {
      setLadTracs(data);
    });
  };

  const zoomed = (event) => {
    const { transform } = event;
    g.attr('transform', transform);
  };

  d3.select(mapRef.current).selectAll('*').remove();

  d3.select(mapRef.current)
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

  const g = d3.select(mapRef.current).append('g');

  // Functions for zoom buttons
  const zoom = d3.zoom().scaleExtent([1, 40]).on('zoom', zoomed);

  const zoomIn = () => {
    d3.select(mapRef.current).transition().call(zoom.scaleBy, 2);
  };

  const zoomOut = () => {
    d3.select(mapRef.current).transition().call(zoom.scaleBy, 0.5);
  };

  const reset = () => {
    d3.select(mapRef.current)
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(d3.select(mapRef.current).node())
          .invert([width / 2, height / 2])
      );
  };

  // Draw the map
  useEffect(() => {
    if (!ladTracs) return;

    const path = d3.geoPath().projection(
      d3.geoTransverseMercator().fitExtent(
        [
          [20, 20],
          [width - 20, height - 20]
        ],
        ladTracs
      )
    );

    g.selectAll('path')
      .data(ladTracs.features)
      .enter()
      .append('path')
      .attr('class', 'tract')
      .attr('d', path)
      .attr('fill', 'silver')
      .text(function (d) {
        return d.properties.LAD13NM;
      });
  }, [g, height, ladTracs, width]);

  useEffect(() => {
    if (!energyCost) return;
    const color = d3.scaleQuantize(
      [smallestTotal, largestTotal],
      ['#fef3c7', '#fdba74', '#f59e0b', '#b45309', '#7c2d12']
    );
    g.selectAll('path')
      .join('path')
      .attr('fill', (d) => {
        const foundItem = energyCost.find(
          (item) => item.lad19cd === d.properties.LAD13CD
        );
        if (foundItem) {
          d.properties.total = Math.round(foundItem.HeatingCost?.total);
          return color(foundItem.HeatingCost?.total);
        }

        // If no match was found, return grey
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
        }
      })
      .on('click', function (event, d) {})
      .append('title');
  }, [g, energyCost, largestTotal, smallestTotal]);

  return (
    <>
      <section className='py-4 px-6 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg'>
        <div className='grid grid-cols-5 gap-1 mb-2'>
          <div className='h-3 w-full bg-amber-100' />
          <div className='h-3 w-full bg-amber-300' />
          <div className='h-3 w-full bg-amber-500' />
          <div className='h-3 w-full bg-amber-700' />
          <div className='h-3 w-full bg-amber-900' />
        </div>

        <div className='flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-300'>
          <span>{Math.round(smallestTotal).toLocaleString()} kW⋅h </span>
          <span>
            {(
              (Math.round(largestTotal) + Math.round(smallestTotal)) /
              2
            ).toLocaleString()}{' '}
            kW⋅h{' '}
          </span>

          <span>{Math.round(largestTotal).toLocaleString()} kW⋅h </span>
        </div>
      </section>

      <section className='flex flex-row mt-2 rounded-md bg-white dark:bg-gray-800 shrink h-full'>
        <svg
          className='m-2 rounded-md'
          ref={mapRef}
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
      </section>
    </>
  );
}
