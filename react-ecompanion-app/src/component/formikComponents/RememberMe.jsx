
import React from 'react';
import { Field } from 'formik';

export class RememberMe extends React.Component {
    render() {
        return (
            <div className="row">
                <label htmlFor={this.props.value}><Field className="form-radio"
                    name={this.props.value} defaultChecked={this.props.checked ? true : false}
                    type="checkbox" />&nbsp;&nbsp;&nbsp;Remember Me</label>
            </div>
        );
    }
}