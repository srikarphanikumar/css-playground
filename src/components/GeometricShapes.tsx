import React from 'react';
import Card from './Card';
import { shapes, shapeComponents } from '../constants/shapes';

const GeometricShapes: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Geometric Shapes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shapes.map((shape) => (
                    <Card
                        key={shape.id}
                        id={shape.id}
                        title={shape.name}
                        html={shape.html}
                        className={shape.className}
                    >
                        {shapeComponents[shape.id as keyof typeof shapeComponents]}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GeometricShapes;