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

// export const darkColorRange = [
//     [39, 72, 199], // Dark blue
//     [49, 112, 206], // Medium dark blue
//     [59, 152, 213], // Medium blue
//     [69, 192, 220], // Medium light blue
//     [79, 232, 227], // Light blue
//     [89, 255, 234], // Lightest blue
//     [99, 200, 255], // Light blue-purple
//     [109, 145, 255], // Medium light blue-purple
//     [119, 90, 255], // Medium blue-purple
//     [129, 35, 255], // Medium dark blue-purple
//     [139, 0, 255], // Dark blue-purple
//     [149, 0, 200], // Dark purple
//     [159, 0, 145], // Medium dark purple
//     [169, 0, 90], // Medium purple
//     [179, 0, 35], // Medium light purple
//     [189, 0, 0], // Light purple
//     [199, 35, 0], // Red-purple
//     [209, 90, 0], // Medium red-purple
//     [219, 145, 0], // Medium light red-purple
//     [229, 200, 0], // Light red-purple
//     [239, 255, 0], // Red
// ];

//This colour scheme goes from white to black
export const darkColorRange = [
    [255, 228, 181], // Light Orange
    [255, 192, 203], // Pink
    [255, 165, 0],   // Orange
    [255, 69, 0],    // Red-Orange
    [255, 0, 0],     // Red
    [178, 34, 34],   // Firebrick
    [128, 0, 0],     // Maroon    // Maroon
    [64, 0, 0],
];

