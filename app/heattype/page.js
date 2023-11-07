'use client';
import React from 'react';
import { DeckGL } from 'deck.gl';
import { GeoJsonLayer } from 'deck.gl';

function App({data, viewState}) {
    /**
     * Data format:
     * Valid GeoJSON object
     */
    const layer = new GeoJsonLayer({
        id: 'geojson-layer',
        data,
        pickable: true,
        stroked: false,
        filled: true,
        extruded: true,
        pointType: 'circle',
        lineWidthScale: 20,
        lineWidthMinPixels: 2,
        getFillColor: [160, 160, 180, 200],
        getLineColor: d => colorToRGBArray(d.properties.color),
        getPointRadius: 100,
        getLineWidth: 1,
        getElevation: 30
    });

    return <DeckGL viewState={viewState}
                   layers={[layer]}
                   getTooltip={({object}) => object && (object.properties.name || object.properties.station)} />;
}

const initialViewState = {
    latitude: 51.505,
    longitude: -0.09,
    zoom: 6,
};

function MyMapComponent() {
    return (
        <DeckGL initialViewState={initialViewState} controller={true}>
            <GeoJsonLayer
                id="geojson-layer"
                data={yourGeoJSONData}//THIS IS THE MAP OF THE UK
                extruded={true}
                getElevation={(f) => f.properties.height} // Height based on your data
                getFillColor={(f) => getColorForHeatingSupply(f.properties.heatingSupply)} // Color coding based on heating supply
                pickable={true}
            />
        </DeckGL>

    );
}


