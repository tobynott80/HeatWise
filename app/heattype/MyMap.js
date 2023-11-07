import React from 'react';
import { DeckGL } from 'deck.gl';
import { GeoJsonLayer } from 'deck.gl';

function MyMap({ initialViewState, data, onHover }) {
    return (
        <DeckGL initialViewState={initialViewState} controller={true}>
            <GeoJsonLayer
                id="geojson-layer"
                data={data}
                extruded={true}
                getElevation={(f) => f.properties.height} // Height based on your data
                getFillColor={(f) => getColorForHeatingSupply(f.properties.heatingSupply)} // Color coding based on heating supply
                pickable={true}
                onHover={onHover} // You can define this function for interactivity
            />
        </DeckGL>
    );
}

export default MyMap;
