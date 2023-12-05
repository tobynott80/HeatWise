'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import ZoomIn from '../components/icons/ZoomIn';
import ZoomOut from '../components/icons/ZoomOut';
import Reset from '../components/icons/Reset';
import Export from '../components/icons/Export';
import ImageExport from '../components/icons/ImageExport';
import ArrowShuffle from '../components/icons/ArrowShuffle';
import html2canvas from 'html2canvas';

export default function LADMap() {
  const ref = useRef();
  const tooltipRef = useRef();
  const [ladTracs, setLadTracs] = useState(null);
  const [heatDemand, setHeatDemand] = useState(null);
  const [dataState, setDataState] = useState('before');
  const [largestBeforeDemand, setLargestBeforeDemand] = useState(10000000);
  const [smallestAfterDemand, setSmallestAfterDemand] = useState(0);
  const [width, setWidth] = useState(928);
  const [height, setHeight] = useState(1200);
  const dataRef = useRef();
  const demandAfterRef = useRef();
  const demandBeforeRef = useRef();
  const demandDiffRef = useRef();

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
  // Function for export button
  function convertDataToCSV(data) {
    if (!data || data.length === 0) {
      return '';
    }
    // Extract column headers
    const headers = Object.keys(data[0]).join(',');
    // Extract rows
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) =>
            typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
          )
          .join(',')
      )
      .join('\n');
    // Combine headers and rows
    return `${headers}\n${rows}`;
  }

  function exportData() {
    const csvData = convertDataToCSV(heatDemand);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    download(url, 'heatDemand.csv');
  }

  function download(href, fileName) {
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportDataImage() {
    // Capture the current page
    html2canvas(document.body).then((canvas) => {
      // Sidebar width
      const sidebarWidth = 0;

      // Create a new canvas to draw the cropped image
      const croppedCanvas = document.createElement('canvas');
      const ctx = croppedCanvas.getContext('2d');

      // Set dimensions for the new canvas
      croppedCanvas.width = canvas.width - sidebarWidth;
      croppedCanvas.height = canvas.height;

      // Draw the cropped area onto the new canvas
      ctx.drawImage(
        canvas,
        sidebarWidth,
        0, // Start cropping from the end of the sidebar
        canvas.width - sidebarWidth,
        canvas.height, // Crop width and height
        0,
        0, // Place the cropped image at the top left corner of the new canvas
        canvas.width - sidebarWidth,
        canvas.height
      );

      // Convert the new canvas to a data URL (base64 encoded image)
      const imageUrl = croppedCanvas.toDataURL('image/png');

      // Trigger the download
      download(imageUrl, 'heatDemand.png');
    });
  }

  function download(href, fileName) {
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const g = svg.append('g');

  /**
   * Handles the zoom event for the LADMap.
   * @param {Object} event - The zoom event object.
   */
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
      // find the largest value in the heat demand data for correct legend
      const largestValue = Math.max(
        ...dataArray.map((item) => item.total_before)
      );
      setLargestBeforeDemand(largestValue);
      // and then the lowest
      const smallestValue = Math.min(
        ...dataArray.map((item) => item.total_after)
      );
      setSmallestAfterDemand(smallestValue);
    });
  }, []);

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
          (item) => item.lad17cd === d.properties.LAD13CD
        );
        d.properties.beforeDemand = Math.round(foundItem.total_before);
        d.properties.afterDemand = Math.round(foundItem.total_after);
        d.properties.difference = Math.round(
          foundItem.total_before - foundItem.total_after
        );
        if (foundItem) {
          return color(
            dataState === 'before'
              ? foundItem.total_before
              : foundItem.total_after
          );
        }

        // If no match was found for lad heat demand, return grey
        return 'grey';
      })
      .on('mouseover', function (event, d) {
        if (tooltipRef.current) {
          tooltipRef.current.innerHTML = d.properties.LAD13NM;
        }
        if (demandBeforeRef.current) {
          demandBeforeRef.current.innerHTML =
            d.properties.beforeDemand.toLocaleString() + ' kW⋅h';

          demandAfterRef.current.innerHTML =
            d.properties.afterDemand.toLocaleString() + ' kW⋅h';

          demandDiffRef.current.innerHTML =
            d.properties.difference.toLocaleString() + ' kW⋅h';
        }
      })
      .on('click', function (event, d) {
        const url = `/demand/lsoa/${d.id}`;
        window.location.href = url;
      })
      .append('title');
  }, [dataState, g, heatDemand, largestBeforeDemand, smallestAfterDemand]);

  return (
    <div className='px-2 pt-3'>
      <div className='flex flex-col h-full justify-center items-center'>
        <div className='grid grid-cols-2 mb-4 w-full flex-nowrap items-center'>
          <div className='border-2 border-black dark:border-white rounded-md max-w-fit place-self-center'>
            <button
              onClick={toggleDataState}
              title='Toggle Before/After View'
            >
              <div className='flex flex-row items-center'>
                <div className='mx-1'>
                  <ArrowShuffle />
                </div>
                <h3 className='mx-1 text-center'>
                  {dataState === 'before'
                    ? 'Before Energy Efficiency Measures'
                    : 'After Energy Efficiency Measures'}
                </h3>
              </div>
            </button>
          </div>
          <div className=''>
            <h3
              className='text-center text-lg text-ellipsis'
              ref={tooltipRef}
            ></h3>
          </div>
        </div>
        <div className='grid grid-cols-2 w-full mr-1'>
          <section className='py-4 px-6 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg'>
            <div className='grid grid-cols-5 gap-1 mb-2'>
              <div className='h-3 w-full bg-amber-100' />
              <div className='h-3 w-full bg-amber-300' />
              <div className='h-3 w-full bg-amber-500' />
              <div className='h-3 w-full bg-amber-700' />
              <div className='h-3 w-full bg-amber-900' />
            </div>

            <div className='flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-300'>
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
          <div className='py-4 px-6 bg-white ml-1 dark:bg-gray-800 rounded-md shadow-lg flex flex-row justify-center text-center'>
            <div className='bg-gray-200 dark:bg-gray-600 rounded-md mx-2 p-1 shadow-md'>
              <h3 className='text-center text-lg'>Demand Before:</h3>
              <span
                className='text-sm'
                ref={demandBeforeRef}
              ></span>
            </div>
            <div className='bg-gray-200 dark:bg-gray-600 rounded-md mx-2 p-1 shadow-md'>
              <h3 className='text-center text-lg'>Demand After:</h3>
              <span
                className='text-sm'
                ref={demandAfterRef}
              ></span>
            </div>
            <div className='bg-gray-200 dark:bg-gray-600 rounded-md mx-2 p-1 shadow-md'>
              <h3 className='text-center text-lg'>Difference:</h3>
              <span
                className='text-sm'
                ref={demandDiffRef}
              ></span>
            </div>
          </div>
        </div>

        <section className='flex flex-row mt-4 rounded-md bg-white dark:bg-gray-800 shrink'>
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
            <button
              onClick={exportData}
              className='m-2'
            >
              <Export />
            </button>
            <button
              onClick={exportDataImage}
              className='m-2'
            >
              <ImageExport />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
