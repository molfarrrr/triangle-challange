import React from 'react';
import './TriangleSide.scss';

/**
 * Component represents triangle side
 * @param value {string} - triangle side value to display
 * @param valid {boolean} - triangle side validation state
 * @param updateValue {function} - update triangle side value event
 * @param id {number} - triangle side id
 * @param validationMessage {string} - error message or empty string
 */
export default function TriengleSide({value, valid, updateValue, id, validationMessage}) {
    let timer = null;

    let update = (newValue) => {
        if (newValue === value) {
            return;
        }

        updateValue(id, newValue);
    };

    /**
     * keyup event handler. Updates triangle side value when user stops typing
     * @param e - event
     */
    let onKeyUp = e => {
        if(timer) {
            clearTimeout(timer);
        }

        const val = e.target.value;

        // Debounce component update. Let user finish typing.
        timer = setTimeout(() => {
            update(val);
            timer = null;
        }, 1000);
    };

    /**
     * Triangle side input blur event handler. Call for state update immediately.
     * @param e - event
     */
    let onBlur = e => {
        if(timer) {
            clearTimeout(timer);
        }

        update(e.target.value);
    };

    let className = 'valid';
    let validation = '';

    // Show validation message if component is not valid
    if (valid === false) {
        className = 'invalid';
        if (validationMessage) {
            validation = (
                <div className="error">
                    {validationMessage}
                </div>
            );
        }
    }

    return (
        <div className={`${className} triangle-side`}>
            <input type="text"
                   defaultValue={value}
                   onKeyUp={onKeyUp}
                   onBlur={onBlur}/>
            {validation}
        </div>
    );
}