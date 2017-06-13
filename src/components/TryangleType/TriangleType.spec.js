import React from 'react';
import {shallow} from 'enzyme';
import TriangleType from './TriangleType';

describe('TriangleType component tests', () => {
    let component = null;

    beforeAll(() => {
        const triangleValues = {
            sideA: '2',
            sideB: '2',
            sideC: '2'
        };

        component = shallow(
            <TriangleType {...triangleValues}/>
        );
    });

    test('should contain an empty string in case of false values', () => {
        component.setProps({ sideA: '', sideB: null, sideC: undefined});

        expect(component.text()).toEqual('');
    });

    test('should contain message for equilateral triangle', () => {
        const message = 'This is equilateral triangle';
        component.setProps({sideA: '2', sideB: '2', sideC: '2'});

        expect(component.text()).toEqual(message);
    })

    test('should contain message for isosceles triangle', () => {
        const message = 'This is isosceles triangle';
        component.setProps({sideA: '1', sideB: '2', sideC: '2'});

        expect(component.text()).toEqual(message);
    })

    test('should contain message for scalene triangle', () => {
        const message = 'This is scalene triangle';
        component.setProps({sideA: '6', sideB: '7', sideC: '1'});

        expect(component.text()).toEqual(message);
    })
});