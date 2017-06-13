import React from 'react';
import {shallow, mount} from 'enzyme';
import { TriangleIdentifier } from './TriangleIdentifier';

describe('TriangleIdentifier tests', () => {
    describe('validateSide method tests', () => {
        let instance = null;

        beforeEach(() => {
            instance = shallow(
                <TriangleIdentifier />
            ).instance();
        });

        test('should pass on natural number', () => {
            expect(instance.validateSide('1')).toBe(true);
            expect(instance.validateSide('12')).toBe(true);
            expect(instance.validateSide('123')).toBe(true);
            expect(instance.validateSide('1234')).toBe(true);
        });

        test('should pass on natural number with zeros before it ', () => {
            expect(instance.validateSide('01')).toBe(true);
            expect(instance.validateSide('001')).toBe(true);
            expect(instance.validateSide('0001')).toBe(true);
            expect(instance.validateSide('00001')).toBe(true);

        });

        test('should pass on natural number with spaces before it ', () => {
            expect(instance.validateSide(' 1')).toBe(true);
            expect(instance.validateSide('  1')).toBe(true);
            expect(instance.validateSide('   1')).toBe(true);
            expect(instance.validateSide('    1')).toBe(true);

        });

        test('should pass on natural number with spaces after it ', () => {
            expect(instance.validateSide('1 ')).toBe(true);
            expect(instance.validateSide('1  ')).toBe(true);
            expect(instance.validateSide('1   ')).toBe(true);
            expect(instance.validateSide('1     ')).toBe(true);
        });

        test('should pass on natural number with floating point', () => {
            expect(instance.validateSide('1.2')).toBe(true);
            expect(instance.validateSide('1.23')).toBe(true);
            expect(instance.validateSide('1.234')).toBe(true);
        });

        test('should pass on natural number with floating point with zeros before it', () => {
            expect(instance.validateSide('01.2')).toBe(true);
            expect(instance.validateSide('001.23')).toBe(true);
            expect(instance.validateSide('0001.234')).toBe(true);
        });

        test('should pass on natural number with floating point with spaces before it ', () => {
            expect(instance.validateSide(' 1.2')).toBe(true);
            expect(instance.validateSide('  1.23')).toBe(true);
            expect(instance.validateSide('   1.234')).toBe(true);
            expect(instance.validateSide('    1.2345')).toBe(true);

        });

        test('should pass on natural number with floating point with spaces after it ', () => {
            expect(instance.validateSide('1.2 ')).toBe(true);
            expect(instance.validateSide('1.23  ')).toBe(true);
            expect(instance.validateSide('1.234   ')).toBe(true);
            expect(instance.validateSide('1.2345     ')).toBe(true);
        });

        test('should pass on natural number with with floating point spaces before and after it ', () => {
            expect(instance.validateSide(' 1.2 ')).toBe(true);
            expect(instance.validateSide('  1.23  ')).toBe(true);
            expect(instance.validateSide('   1.234   ')).toBe(true);
            expect(instance.validateSide('    1.2345    ')).toBe(true);

        });

        test('should pass on natural number spaces before and after it ', () => {
            expect(instance.validateSide(' 12 ')).toBe(true);
            expect(instance.validateSide('  123  ')).toBe(true);
            expect(instance.validateSide('   1234   ')).toBe(true);
            expect(instance.validateSide('    12345    ')).toBe(true);

        });

        test('should not pass on natural number with +/- sign before it', () => {
            expect(instance.validateSide('+1')).toBe(false);
            expect(instance.validateSide('-12')).toBe(false);
        });

        test('should not pass on string containing non numeric symbols', () => {
            expect(instance.validateSide('1d2')).toBe(false);
            expect(instance.validateSide('0x2')).toBe(false);
            expect(instance.validateSide('0b7')).toBe(false);
        });

        test('should not pass on empty string', () => {
            expect(instance.validateSide('')).toBe(false);
        });

        test('should not pass on empty string with spaces', () => {
            expect(instance.validateSide('              ')).toBe(false);
        });

        test('should not pass on not string with spaces', () => {
            expect(instance.validateSide(1)).toBe(false);
            expect(instance.validateSide({})).toBe(false);
            expect(instance.validateSide(() => {})).toBe(false);
        });
    });

    describe('validateTriangle method tests', () => {
        let instance = null;

        beforeEach(() => {
            instance = shallow(
                <TriangleIdentifier />
            ).instance();
        });

        test('should return null if parameter is not an array', () => {
            expect(instance.validateTriangle()).toEqual(null);
            expect(instance.validateTriangle({})).toEqual(null);
            expect(instance.validateTriangle('a')).toEqual(null);
            expect(instance.validateTriangle(1)).toEqual(null);
            expect(instance.validateTriangle(null)).toEqual(null);
            expect(instance.validateTriangle(() => {})).toEqual(null);
        });

        test('should return null if any of triangle side is invalid', () => {
            let triangle = [ { valid: null }, { valid: null }, { valid: null } ];

            expect(instance.validateTriangle(triangle)).toEqual(null);

            triangle = [ { valid: true }, { valid: null }, { valid: null } ];

            expect(instance.validateTriangle(triangle)).toEqual(null);

            triangle = [ { valid: true }, { valid: true }, { valid: null } ];

            expect(instance.validateTriangle(triangle)).toEqual(null);
        });

        test('should return not null if every of triangle side is valid', () => {
            let triangle = [ { valid: true }, { valid: true }, { valid: true } ];

            expect(instance.validateTriangle(triangle)).not.toEqual(null);
        });

        test('should return not null if every of triangle side is valid', () => {
            let triangle = [ { valid: true }, { valid: true }, { valid: true } ];

            expect(instance.validateTriangle(triangle)).not.toEqual(null);
        });

        test('should return true if triangle is equilateral', () => {
            let triangle = [ { valid: true, value: '1' }, { valid: true, value: '1' }, { valid: true, value: '1' } ];

            expect(instance.validateTriangle(triangle)).toBe(true);
        });

        test('should return true if triangle is scalene', () => {
            let triangle = [ { valid: true, value: '6' }, { valid: true, value: '7' }, { valid: true, value: '11' } ];

            expect(instance.validateTriangle(triangle)).toBe(true);
        });

        test('should return true if triangle is isosceles', () => {
            let triangle = [ { valid: true, value: '2' }, { valid: true, value: '2' }, { valid: true, value: '1' } ];

            expect(instance.validateTriangle(triangle)).toBe(true);
        });

        test('should return false if triangle is not exists', () => {
            let triangle = [ { valid: true, value: '1' }, { valid: true, value: '2' }, { valid: true, value: '99' } ];

            expect(instance.validateTriangle(triangle)).toBe(false);
        });
    });

    describe('component render tests', () => {
        let component = null;

        beforeEach(() => {
            component = mount(
                <TriangleIdentifier />
            );
        });

        test('should render 3 TriangleSide components', () => {
            expect(component.find('.triangle-side').length).toEqual(3);
        });

        test('should be no triangle type if validity of triangle is null', () => {
            component.setState({valid: null})
            expect(component.find('.triangle-type').length).toEqual(0);
        });

        test('should contain triangle type if triangle is valid', () => {
            component.setState({valid: true});

            const type = component.find('.triangle-type .success');
            expect(type.length).toEqual(1);
        });

        test('should contain error message if triangle is not valid', () => {
            component.setState({valid: false});
            const type = component.find('.error');
            expect(type.length).toEqual(1);
        });
    });

    describe('updateSide method tests', () => {
        let instance = null;
        let component = null;

        beforeEach(() => {
            component = shallow(
                <TriangleIdentifier />
            );

            instance = component.instance();
        });

        test('should set side valid', () => {
            instance.validateSide = jest.fn(() => true);
            instance.updateSide(1, '1');

            expect(instance.state.triangle[1].valid).toBe(true);
        });

        test('should set triangle valid', () => {
            instance.validateTriangle = jest.fn(() => true);
            instance.updateSide(1, '1');

            expect(instance.state.valid).toBe(true);
        });

        test('should set triangle valid', () => {
            instance.validateTriangle = jest.fn(() => false);
            instance.updateSide(1, '1');

            expect(instance.state.valid).toBe(false);
        });

        test('should set triangle valid to false', () => {
            instance.validateTriangle = jest.fn(() => false);
            instance.updateSide(1, '1');

            expect(instance.state.valid).toBe(false);
        });

        test('should set triangle valid to null', () => {
            instance.validateTriangle = jest.fn(() => null);
            instance.updateSide(1, '1');

            expect(instance.state.valid).toEqual(null);
        });
    });
});