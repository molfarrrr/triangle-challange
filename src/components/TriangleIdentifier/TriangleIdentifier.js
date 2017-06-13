import React from 'react';
import TriangleSide from '../TriangleSide/TriangleSide';
import './TriangleIdentifier.scss';
import TriangleType from '../TryangleType/TriangleType';

/**
 * Identifies type of the triangle
 */
export class TriangleIdentifier extends React.Component {
    constructor() {
        super();

        this.state = {
            valid: null,

            triangle: [
                {
                    valid: null,
                    value: '',
                    validationMessage: ''
                },
                {
                    valid: null,
                    value: '',
                    validationMessage: ''
                },
                {
                    valid: null,
                    value: '',
                    validationMessage: ''
                }
            ]
        };

        this.updateSide = this.updateSide.bind(this);
        this.validateSide = this.validateSide.bind(this);
    }

    /**
     * Update & validate value of triangle side
     * @param sideIndex {number} - index of triangle side
     * @param value {string} - current value of triangle side
     */
    updateSide(sideIndex, value) {
        // Create deep copy of component state
        let stateCopy = Object.assign({}, this.state);
        stateCopy.triangle = stateCopy.triangle.slice();
        stateCopy.triangle[sideIndex] = Object.assign({}, stateCopy.triangle[sideIndex]);

        let side = stateCopy.triangle[sideIndex];
        side.value = value;

        // Validate triangle side
        side.valid = this.validateSide(value);
        side.validationMessage = side.valid ? '' : 'Value of triangle side should be of positive numbers';
        // Validate triangle
        stateCopy.valid = this.validateTriangle(stateCopy.triangle);

        this.setState(stateCopy);
    }

    /**
     * Triangle side validator
     * @param value {string} - triangle side value
     * @returns {boolean} - triangle side validity
     */
    validateSide(value) {
        return typeof value === 'string' && /^0*[1-9]\d*(\.\d+)?$/.test(value.trim());
    }

    /**
     * Triangle validator
     * @param triangle - {array} - array of triangle sides state
     * @returns {null} if any of sides are in invalid state or {boolean}
     */
    validateTriangle(triangle) {
        if (!Array.isArray(triangle)) {
            return null;
        }

        const sideA = triangle[0];
        const sideB = triangle[1];
        const sideC = triangle[2];

        if (!sideA.valid || !sideB.valid || !sideC.valid) {
            return null;
        }

        // Check for triangle existence rules
        const firstRule = +sideA.value + +sideB.value > sideC.value;
        const secondRule = +sideB.value + +sideC.value > sideA.value;
        const thirdRule = +sideC.value + +sideA.value > sideB.value;

        return firstRule && secondRule && thirdRule;
    }

    render() {
        const triangle = this.state.triangle;
        const valid = this.state.valid;
        const triangleValues = {
            sideA: triangle[0].value,
            sideB: triangle[1].value,
            sideC: triangle[2].value,
        };

        let message = <div></div>;

        if (valid !== null) {
            message = valid ?
                <TriangleType {...triangleValues}/> :
                <div className="error"> This is not a triangle </div>
        }

        return (
            <div>
                {triangle.map((sideProps, i) =>
                    <TriangleSide {...sideProps}
                                  updateValue={this.updateSide}
                                  key={i}
                                  id={i}/>)}

                { message }
            </div>
        );
    }
}
