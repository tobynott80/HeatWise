'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

export default function LADMap() {
  const ref = useRef();
  const tooltipRef = useRef();
  const [ladTracs, setLadTracs] = useState(null);
  const [heatDemand, setHeatDemand] = useState(null);
  const [dataState, setDataState] = useState('before');

  const toggleDataState = () => {
    setDataState((prevState) => (prevState === 'before' ? 'after' : 'before'));
  };

  const width = 928;
  const height = 1200;
  const color = d3.scaleQuantize([100000, 2080080794], d3.schemeOranges[9]);

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
  // Get geojson data for the map
  useEffect(() => {
    d3.json('/api/geojson/lad').then((data) => {
      setLadTracs(data);
    });
  }, []);

  // Get heat demand data
  useEffect(() => {
    d3.json('/api/data/heatDemand').then((data) => {
      const dataArray = Object.entries(data).map(([key, value]) => {
        return {
          lad17cd: key,
          ...value
        };
      });
      setHeatDemand(dataArray);
    });
  }, []);

  // Draw the map
  useEffect(() => {
    if (!ladTracs) return;
    // console.log(heatDemand);
    // return;
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
      // .attr("stroke", "#FFFFFF")
      // .attr("stroke-width", 1)
      .attr('fill', 'silver')
      .on('mouseover', function (event, d) {
        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = d.properties.LAD13NM;
        }
      })
      .on('click', function (event, d) {
        const url = `/lsoa/${d.id}`;
        window.location.href = url;
      })
      .append('title')
      .text(function (d) {
        return d.properties.LAD13NM;
      });
  }, [g, ladTracs]);

  // Draw the heat demand data
  useEffect(() => {
    if (!heatDemand) return;
    g.selectAll('path')
      .join('path')
      .attr('fill', (d) => {
        const foundItem = heatDemand.find(
          (item) => item.lad17cd === d.properties.LAD13CD
        );

        if (foundItem) {
          return color(foundItem.total_before);
        }

        // If no match was found for lad heat demand, return grey
        return 'grey';
      });
  }, [color, g, heatDemand]);

  return (
    <div>
      <div className='flex flex-col justify-center'>
        <h3
          className='m-2'
          ref={tooltipRef}
        >
          Select An Area
        </h3>
        <div className='flex flex-row flex-nowrap '>
          <button
            className={`mx-2 p-1 border-2 rounded-md ${
              dataState === 'before'
                ? 'border-rose-300'
                : 'border-gray-700 dark:border-gray-300'
            }`}
            onClick={toggleDataState}
          >
            {dataState === 'before'
              ? 'Before Energy Efficiency Measures'
              : 'After Energy Efficiency Measures'}
          </button>
        </div>
      </div>
      <svg ref={ref} />
    </div>
  );
}
