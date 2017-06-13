/**
 * Triangle identifier - checks type of triangle
 * @param triangle {object} - object of triangle sides values
 * @returns {string} - message for triangle type
 */
export default function identifyTriangle({sideA, sideB, sideC}) {
    if (!sideA || !sideB || !sideC) {
        return '';
    }

    if (sideA === sideB && sideB === sideC && sideC === sideA) {
        return 'This is equilateral triangle';
    }

    if (sideA !== sideB && sideB !== sideC && sideC !== sideA) {
        return 'This is scalene triangle';
    }

    return 'This is isosceles triangle';
}