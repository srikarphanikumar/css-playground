// src/constants/shapes.ts

import React from 'react';

export const shapes = [
    {
        id: 'circle',
        name: 'Circle',
        html: `<div class="circle"></div>`,
        className: 'circle'
    },
    {
        id: 'square',
        name: 'Square',
        html: `<div class="square"></div>`,
        className: 'square'
    },
    {
        id: 'triangle',
        name: 'Triangle',
        html: `<div class="triangle"></div>`,
        className: 'triangle'
    },
    // Add more shapes here...
];

export const shapeComponents = {
    circle: <div className="w-24 h-24 rounded-full bg-blue-500" />,
    square: <div className="w-24 h-24 bg-red-500" />,
    triangle: (
        <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[100px] border-l-transparent border-r-transparent border-b-green-500" />
    ),
    // Add more shape components here...
};