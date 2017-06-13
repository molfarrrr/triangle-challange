import React from 'react';
import {shallow} from 'enzyme';
import TriengleSide from './TriangleSide';

describe('TriangleSide component tests', () => {
    let component = null;
    let updateValue = null

    beforeEach(() => {
        let props = {
            valid: null,
            value: '',
            validationMessage: ''
        };

        updateValue = jest.fn();

        component = shallow(
            <TriengleSide {...props} updateValue={updateValue} id="1"/>
        );
    });

    test('Update TriangleSide value on blur', () => {
        component.find('input').simulate('blur', {target: {value: '123'}});
        expect(updateValue.mock.calls.length).toEqual(1);
        expect(updateValue.mock.calls[0][0]).toEqual('1');
        expect(updateValue.mock.calls[0][1]).toEqual('123');
    });

    test('Update TriangleSide value on keyup', () => {
        jest.useFakeTimers();
        component.find('input').simulate('keyup', {target: {value: '321'}});
        expect(setTimeout.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(1000);

        jest.runAllTimers();
        expect(updateValue.mock.calls.length).toEqual(1);
        expect(updateValue.mock.calls[0][1]).toEqual('321');

        jest.clearAllTimers();
    });


    test('Not allow TriangleSide update with the same value on blur', () => {
        component.setProps({
            value: '123',
        });

        component.find('input').simulate('blur', {target: {value: '123'}});
        expect(updateValue.mock.calls.length).toEqual(0);
    });

    test('Not allow TriangleSide update with the same value on key up', () => {
        component.setProps({
            value: '321',
        });

        jest.useFakeTimers();
        component.find('input').simulate('keyup', {target: {value: '321'}});

        jest.runAllTimers();
        expect(updateValue.mock.calls.length).toEqual(0);

        jest.clearAllTimers();
    });

    test('CSS class "invalid should be added if component is invalid"', () => {
        component.setProps({
            valid: false,
        });

        expect(component.find('.triangle-side.invalid').length).toEqual(1)
    });

    test('CSS class "invalid should not be added if component is valid"', () => {
        component.setProps({
            valid: true,
        });

        expect(component.find('.triangle-side.invalid').length).toEqual(0)
    });

    test('Error message not displayed if no message provided', () => {
        component.setProps({
            valid: false,
        });

        expect(component.find('.error').length).toEqual(0);
    });

    test('Error message not displayed if component is valid', () => {
        const validationMessage = 'Value of triangle side should be of natural numbers';

        component.setProps({
            valid: true,
            validationMessage
        });

        expect(component.find('.error').length).toEqual(0);
    });

    test('Error message displayed if message provided', () => {
        const validationMessage = 'Value of triangle side should be of natural numbers';

        component.setProps({
            valid: false,
            validationMessage
        });

        const error = component.find('.error');

        expect(error.length).toEqual(1);
        expect(error.text()).toEqual(validationMessage);
    });
});