import React from 'react';
import identifyTriangle from './identifyTriangle'

export default function TriangleType({sideA, sideB, sideC}) {
    return (
        <div className="triangle-type">
             <div className="success">{ identifyTriangle({sideA, sideB, sideC}) }</div>
        </div>
    );
}