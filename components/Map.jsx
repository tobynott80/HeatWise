"use client";
import React, { useState } from "react";

import {LightingEffect} from '@deck.gl/core';
import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import {lightColorRange,darkColorRange,ambientLight,pointLight1,MAP_STYLE,pointLight2, material, INITIAL_VIEW_STATE} from '@/components/mapconfig';

const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});

const LightMapStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const DarkMapStyle = MAP_STYLE;
const LocationAggregatorMap = ({upperPercentile = 100, coverage = 1, data,}) => {
    const [radius, setRadius] = useState(420);
    const [extruded, setExtruded] = useState(false);
    const [hoveredHexagon, setHoveredHexagon] = useState(null);
    const [hover, setHover] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [colorRange, setColorRange] = useState(darkColorRange);


    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
        // Update mapStyle and colorRange based on dark mode
        updateMapStyleAndColorRange(!darkMode);
    };

    const toggleHover = () => {
        setHover((prevHover) => !prevHover);
    }
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

    const handleRadiusChange = (e) => {
        console.log(e.target.value);
        setRadius(e.target.value);
    };

    const getTooltip = async ({ object }) => {
        if (!object) {
            return null;
        }

        const lat = object.position[1];
        const lng = object.position[0];
        const count = object.points.length;

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZ2FtcHRvbiIsImEiOiJjbG9vZDhjOXkwMGZ6MnJsdGp2dHdkdThqIn0.kDtJQS1LFUfmqSE2GgYRbg&types=address`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch place name');
            }

            const data = await response.json();
            const locationName = data.features[0]?.place_name || 'Location not found';

            return `
      ${locationName}: 
      ${count} total`;
        } catch (error) {
            console.error('Error fetching place name:', error);
            return `
      Latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
      Longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
      Location: Error fetching place name
      ${count} locations here`;
        }
    };

    const handleHover = async ({ x, y, object }) => {
            if (object && hover === true) {
                const tooltipContent = await getTooltip({ object });
                setHoveredHexagon({
                    x,
                    y,
                    content: tooltipContent,
                });
            } else {
                setHoveredHexagon(null);
            }
    };

    //This const controls the hexagon characteristics.
    const layers = [
        new HexagonLayer({
            id: "hexagon-layer",
            data,
            colorRange,
            coverage,
            upperPercentile,
            pickable: true,
            extruded,
            radius,
            elevationScale: 30,
            material,
            getPosition: (d) => [parseFloat(d[0]),parseFloat(d[1])],
        }),
    ];

    return (
        <div>
            <DeckGL
                layers={layers}
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                getTooltip={handleHover}
            >
                <Map
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle={darkMode ? DarkMapStyle : LightMapStyle}
                ></Map>

                {/* FLOATING CONTROLLER */}
                <div className="absolute bg-slate-900 text-white min-h-[200px] h-auto w-[200px] top-10 left-5 rounded-lg p-4 text-sm" style={{ zIndex: 9999}}>
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl uppercase mb-1">Editor</h2>
                        <h2 className="font-bold text-md mb-4">LSOAs</h2>
                        <input
                            name="radius"
                            className="w-fit py-2"
                            type="range"
                            value={radius}
                            min={25}
                            step={5}
                            max={2000}
                            onChange={handleRadiusChange}
                        />
                        <label htmlFor="radius">
                            Radius -{" "}
                            <span className="bg-indigo-500 font-bold text-white px-2 py-1 rounded-lg">
                {radius}
              </span>{" "}
                            meters
                        </label>
                        <p>
                            {" "}
                            <span className="font-bold">{data.length}</span> Locations
                        </p>
                        <button
                            onClick={handleToggleExtruded}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg mt-2"
                        >
                            Toggle Extruded
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg mt-2"
                        >
                            Toggle Dark Mode
                        </button>
                        <button
                            onClick={toggleHover}
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg mt-2"
                        >
                            Toggle Place Names
                        </button>

                    </div>

                </div>

                {/* Render the tooltip */}
                {hoveredHexagon && (
                    <div
                        style={{
                            position: 'absolute',
                            top: hoveredHexagon.y,
                            left: hoveredHexagon.x,
                            zIndex: 1,
                            background: 'white',
                            padding: 10,
                            outline: "none",
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