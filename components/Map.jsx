"use client";
import React, { useState } from "react";

import Map from "react-map-gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import { lightingEffect, material, INITIAL_VIEW_STATE, colorRange } from '@/components/mapconfig';
import {COORDINATE_SYSTEM} from "@deck.gl/core";

const LocationAggregatorMap = ({
                                   upperPercentile = 100,
                                   coverage = 1,
                                   data,
                               }) => {


    const layers = [
        new HexagonLayer({
            id: "hexagon-layer",
            data,
            pickable: true,
            extruded: true,
            radius: 40,
            elevationScale: 4,
            getPosition: (d) => [parseFloat(d[0]),parseFloat(d[1])],
            // upperPercentile,
            // material,
        }),
    ];

    return (
        <div>
            <DeckGL
                layers={layers}
                effects={[lightingEffect]}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
            >
                <Map
                    className=""
                    controller={true}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                ></Map>
            </DeckGL>
        </div>
    );
};

export default LocationAggregatorMap;