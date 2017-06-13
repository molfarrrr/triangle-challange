import identifyTriangle from './identifyTriangle'

describe('identifyTriangle method tests', () => {
    test('should identify isosceles triangle', () => {
        const message = 'This is isosceles triangle';
        const triangle = {sideA: '1', sideB: '2', sideC: '2'};

        expect(identifyTriangle(triangle)).toEqual(message);
    });

    test('should identify equilateral triangle', () => {
        const message = 'This is equilateral triangle';
        const triangle = {sideA: '2', sideB: '2', sideC: '2'};

        expect(identifyTriangle(triangle)).toEqual(message);
    });

    test('should identify scalene triangle', () => {
        const message = 'This is scalene triangle';
        const triangle = {sideA: '6', sideB: '7', sideC: '1'};

        expect(identifyTriangle(triangle)).toEqual(message);
    });
});