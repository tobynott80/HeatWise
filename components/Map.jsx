"use client";
import React, { useState } from "react";

import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { lightingEffect, material, INITIAL_VIEW_STATE, colorRange } from '@/components/mapconfig';
import {COORDINATE_SYSTEM} from "@deck.gl/core";

export default function LocationAggregatorMap({data, upperPercentile = 100, coverage = 1,}) {
    const [radius, setRadius] = useState(1000);

    const handleRadiusChange = (e) => {
        console.log(e.target.value);
        setRadius(e.target.value);
    };
    // creating tooltip
    function getTooltip({ object }) {
        if (!object) {
            return null;
        }
        const lat = object.position[1];
        const lng = object.position[0];
        const count = object.points.length;

        return `\
        latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ""}
        longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ""}
        ${count} locations here`;
    }

    const layers = [
        new HexagonLayer({
            id: 'heatmap',
            colorRange,
            coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
            coverage: coverage,
            data: data,
            elevationRange: [0, 3000],
            elevationScale: data && data.length ? 50 : 0,
            extruded: true,
            getPosition: (d) => d,
            pickable: true,
            radius,
            upperPercentile,
            material,

            transitions: {
                elevationScale: 3000,
            },
        }),
    ];

    return (
        <div className="">
            <DeckGL
                layers={layers}
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                getTooltip={getTooltip}
            >
                <Map
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/petherem/cl2hdvc6r003114n2jgmmdr24"
                ></Map>

                {/* FLOATING CONTROLLER */}

                <div className="absolute bg-slate-900 text-white min-h-[200px] h-auto w-[250px] top-10 left-5 rounded-lg p-4 text-sm">
                    <div className="flex flex-col">
                        <h2 className="font-bold text-xl uppercase mb-1">Map controller</h2>
                        <h2 className="font-bold text-md uppercase mb-4">Locations</h2>
                        <input
                            name="radius"
                            className="w-fit py-2"
                            type="range"
                            value={radius}
                            min={500}
                            step={50}
                            max={10000}
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
                    </div>
                </div>
            </DeckGL>
        </div>
    );
};