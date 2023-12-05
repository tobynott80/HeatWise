'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export default function DwellingBarGraph() {
  const ref = useRef();
  const [ladTracs, setLadTracs] = useState(null);
  const [dwellingData, setDwellingData] = useState(null);
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
    d3.json('/api/data/energyCost/filter?type=dwelling').then((data) => {
      console.log(data);
      setDwellingData(data);
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

  d3.select(ref.current).selectAll('*').remove();

  d3.select(ref.current)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

  const g = d3.select(ref.current);

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
    if (!dwellingData) return;
    g.selectAll('path')
      .join('path')
      .attr('fill', '#69b3a2')
      .on('mouseover', function (event, d) {
      })
      .on('click', function (event, d) {})
      .append('title');
  }, [g, dwellingData, largestTotal, smallestTotal]);

  return (
    <>
      <section className='flex flex-row mt-2 rounded-md bg-white dark:bg-gray-800 shrink h-full'>
        <svg
          className='m-2 rounded-md'
          ref={ref}
        />
      </section>
    </>
  );
}
