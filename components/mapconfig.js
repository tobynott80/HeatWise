import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';

export const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
});

export const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000]
});

export const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 8000]
});

export const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51]
};

export const INITIAL_VIEW_STATE = {
    longitude: -1.415727,
    latitude: 52.232395,
    zoom: 6.6,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40.5,
    bearing: -27
};

export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json';

export const darkColorRange = [ //This is dark blue to red, really nice
    [39, 72, 199],
    [49, 112, 206],
    [63, 156, 216],
    [94, 199, 238],
    [143, 205, 236],
    [239, 138, 98],
    [211, 63, 106],
];

//This colour scheme goes from white to black
export const lightColorRange = [
    [255, 228, 181], // Light Orange
    [255, 192, 203], // Pink
    [255, 165, 0],   // Orange
    [255, 69, 0],    // Red-Orange
    [255, 0, 0],     // Red
    [178, 34, 34],   // Firebrick
    [128, 0, 0],     // Maroon    // Maroon
    [64, 0, 0],
];

