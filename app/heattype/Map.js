'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { LightingEffect } from '@deck.gl/core';
import Map from 'react-map-gl';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactLoading from 'react-loading';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import {
  lightColorRange,
  darkColorRange,
  ambientLight,
  pointLight1,
  MAP_STYLE,
  pointLight2,
  material,
  INITIAL_VIEW_STATE
} from './mapconfig';
import InfoPopup from '@/app/components/InfoPopup';
import Export from '@/app/components/icons/Export';
import ImageExport from '@/app/components/icons/ImageExport';
import html2canvas from 'html2canvas';

function convertDataToCSV(data) {
  if (!data || data.length === 0) {
    return '';
  }

  // Flatten nested objects
  const flattenedData = data.map((item) => {
    const flattenedItem = {};
    Object.entries(item).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // For each property of the nested object, create a new property in the flattened object
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          flattenedItem[`${key}_${nestedKey}`] = nestedValue;
        });
      } else {
        flattenedItem[key] = value;
      }
    });
    return flattenedItem;
  });

  // Extract column headers
  const headers = Object.keys(flattenedData[0]).join(',');

  // Extract rows
  const rows = flattenedData
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

function exportData(data) {
  const csvData = convertDataToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  download(url, 'Breakdown_Heat_Consumption.csv');
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
    download_image(imageUrl, 'Breakdown_Heat_Consumption.png');
  });
}

function download_image(href, fileName) {
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2
});

const LightMapStyle =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DarkMapStyle = MAP_STYLE;

const LocationAggregatorMap = ({
  upperPercentile = 100,
  coverage = 1,
  data
}) => {
  const [radius, setRadius] = useState(400);
  const [extruded, setExtruded] = useState(true);
  const [hoveredHexagon, setHoveredHexagon] = useState(null);
  const [hover, setHover] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedHouseType, setSelectedHouseType] = useState('flats'); // default value
  const [selectedEnergyType, setSelectedEnergyType] = useState('gas'); // default value
  const [colorRange, setColorRange] = useState(darkColorRange);
  const [searchValue, setSearchValue] = useState('');
  const geocodingClient = mbxGeocoding({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  });
  // console.log("DATA: ",data);

  const [layers, setLayers] = useState([]);
  const [viewport, setViewport] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 12
  });

  useEffect(() => {
    const houseTypes = ['detached', 'flats', 'semiDetached', 'terraced'];
    const energyTypes = ['biomass', 'gas', 'oil', 'resistance'];

    let minElevation = Infinity;
    let maxElevation = -Infinity;

    for (const houseType of houseTypes) {
      for (const energyType of energyTypes) {
        const elevations = data.map((d) =>
          parseFloat(d[houseType][energyType])
        );
        const localMinElevation = Math.min(...elevations);
        const localMaxElevation = Math.max(...elevations);

        if (localMinElevation < minElevation) {
          minElevation = localMinElevation;
        }

        if (localMaxElevation > maxElevation) {
          maxElevation = localMaxElevation;
        }
      }
    }
    const newLayers = [
      new HexagonLayer({
        id: 'hexagon-layer',
        data,
        colorRange,
        coverage,
        upperPercentile,
        lowerPercentile: 10,
        pickable: true,
        extruded,
        radius,
        elevationScale: 60,
        material,
        elevationDomain: [minElevation, maxElevation],
        getPosition: (d) => [
          parseFloat(d.yCoordinate),
          parseFloat(d.xCoordinate)
        ],
        getElevationValue: (objects) => {
          const elevations = objects.map((d) =>
            parseFloat(d[selectedHouseType][selectedEnergyType])
          );
          const totalElevation = elevations.reduce((a, b) => a + b, 0);
          return totalElevation > 0 ? totalElevation : null; //This prevents hexagon from being displayed when there are zero
        },
        getColorValue: (objects) => {
          const elevations = objects.map((d) =>
            parseFloat(d[selectedHouseType][selectedEnergyType])
          );
          const totalElevation = elevations.reduce((a, b) => a + b, 0);
          // const averageElevation = totalElevation / objects.length;
          // const scalingFactor = 1; // Adjust this value to change the aggressiveness of the color change
          // return averageElevation * scalingFactor;
          return totalElevation;
        },
        transitions: {
          getElevationValue: 750, // Transition duration in milliseconds
          getColorValue: 750 // Transition duration in milliseconds
        },

        updateTriggers: {
          getElevationValue: [selectedHouseType, selectedEnergyType],
          getColorValue: [selectedHouseType, selectedEnergyType]
        }
      })
    ];
    setLayers(newLayers);
  }, [
    selectedHouseType,
    selectedEnergyType,
    data,
    colorRange,
    coverage,
    upperPercentile,
    extruded,
    radius
  ]);

  //---------------LOADING SPINNER-----------------//
  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);
  // Set isLoading to false when data is loaded
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);
  // Show loading spinner if data is being loaded
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white'
        }}
      >
        <ReactLoading
          type={'spin'}
          color={'#000'}
          height={'20%'}
          width={'20%'}
        />
      </div>
    );
  }

  //---------------DARK MODE-----------------//
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    // Update mapStyle and colorRange based on dark mode
    updateMapStyleAndColorRange(!darkMode);
  };
  const toggleHover = () => {
    setHover((prevHover) => !prevHover);
  };
  const updateMapStyleAndColorRange = (isDarkMode) => {
    // Update mapStyle based on dark mode
    const mapStyle = isDarkMode
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
    // Update colorRange based on dark mode
    const updatedColorRange = isDarkMode ? darkColorRange : lightColorRange;

    // Set the updated values in state
    setColorRange(updatedColorRange);
  };
  const handleToggleExtruded = () => {
    setExtruded(!extruded);
  };

  const getTooltip = ({ object }) => {
    if (!object) {
      return null;
    }

    const lat = object.position[1];
    const lng = object.position[0];
    const elevation = object.elevationValue;

    // Get the geoLabel of the first point in the hexagon
    const locationName =
      object.points[0]?.source?.geoLabel || 'Location not found';

    return `
            Location: ${locationName}
            Latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
            Longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
            Number of selected heating type: ${elevation}
        `;
  };

  return (
    <div>
      <DeckGL
        layers={layers}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        onViewStateChange={(viewState) => setViewport(viewState)}
        controller={true}
        getTooltip={getTooltip}
      >
        <Map
          className=''
          controller={true}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={darkMode ? DarkMapStyle : LightMapStyle}
          preserveDrawingBuffer={true}
        />

        {/* FLOATING CONTROLLER */}
        <div className='absolute bg-slate-900 text-white min-h-[200px] h-auto w-[200px] top-10 left-5 rounded-lg p-4 text-sm z-50'>
          <div className='flex flex-col'>
            <h2 className='font-bold text-xl uppercase mb-1'>
              Editor
              <div className='font-bold text-xl uppercase mb-1'>
                <InfoPopup type={'heat-type'} />{' '}
                <button
                  onClick={() =>
                    exportData(data, 'Breakdown_Heat_Consumption.csv')
                  }
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
            </h2>
            <h2 className='font-bold text-md mb-4'>LSOAs</h2>

            <label
              htmlFor='radius'
              className='flex items-center justify-between mb-2'
            >
              Radius -{' '}
              <span className='bg-indigo-500 font-bold text-white px-2 py-1 rounded-lg'>
                {radius}
              </span>{' '}
              meters
            </label>

            <p className='mb-2'>
              <span className='font-bold'>{data.length}</span> Locations
            </p>

            <button
              onClick={handleToggleExtruded}
              className='bg-blue-500 text-white px-2 py-1 rounded-lg mt-2'
            >
              Toggle Extruded
            </button>

            <button
              onClick={toggleDarkMode}
              className='bg-blue-500 text-white px-2 py-1 rounded-lg mt-2'
            >
              Toggle Dark Mode
            </button>

            <button
              onClick={toggleHover}
              className='bg-blue-500 text-white px-2 py-1 rounded-lg mt-2'
            >
              Toggle Place Names
            </button>

            <h3 className='font-bold text-md mt-4 mb-2'>Filters</h3>

            <label className='mb-1'>House Type</label>
            <select
              value={selectedHouseType}
              onChange={(e) => {
                setSelectedHouseType(e.target.value);
                console.log(`Selected house type: ${e.target.value}`);
              }}
              className='bg-blue-500 text-white px-2 py-1 rounded-lg'
            >
              <option value='detached'>Detached</option>
              <option value='terraced'>Terraced</option>
              <option value='flats'>Flats</option>
              <option value='semiDetached'>Semi Detached</option>
            </select>

            <label className='mt-2 mb-1'>Energy Type</label>
            <select
              value={selectedEnergyType}
              onChange={(e) => {
                setSelectedEnergyType(e.target.value);
                console.log(`Selected energy type: ${e.target.value}`);
              }}
              className='bg-blue-500 text-white px-2 py-1 rounded-lg'
            >
              <option value='biomass'>Biomass</option>
              <option value='gas'>Gas</option>
              <option value='oil'>Oil</option>
              <option value='resistance'>Resistance</option>
            </select>
          </div>
        </div>

        {/* Render the tooltip */}
        {hoveredHexagon && (
          <div
            className='absolute bg-white p-2 outline-none'
            style={{
              top: hoveredHexagon.y,
              left: hoveredHexagon.x,
              zIndex: 1
            }}
          >
            {hoveredHexagon.content}
          </div>
        )}
      </DeckGL>
    </div>
  );
};

export default LocationAggregatorMap;
