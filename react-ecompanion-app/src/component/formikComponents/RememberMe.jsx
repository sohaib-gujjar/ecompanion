
import React from 'react';
import { Field } from 'formik';

export function RememberMe({ value, checked }) {
    return (
        <div className="row">
            <label htmlFor={value}><Field className="form-radio"
                name={value} defaultChecked={checked ? true : false}
                type="checkbox" />&nbsp;&nbsp;&nbsp;Remember Me</label>
        </div>
    );

}