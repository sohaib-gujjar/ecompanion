import React from 'react';
import { ErrorMessage } from 'formik';
import { Col, Row } from 'react-bootstrap';

export class DropDownInput extends React.Component {
    handleChange = e => {
        this.props.onChange(this.props.value, e.target.value);
    };
    render() {
        return (
            <Row style={{ margin: "3% 0"}}>
                <Col sm={3}>
                    <label htmlFor={this.props.value}>{this.props.title}</label>
                </Col>
                <Col sm={9}>
                    <select
                        id={'formik-dropdown-' + this.props.value}
                        name={this.props.value}
                        //value={this.props.value}
                        onChange={this.handleChange}
                    >
                        <option value="" disabled>{this.props.placeholder}</option>
                        {this.props.options.map((option, i) => {
                            return (
                                <option
                                    key={i}
                                    value={option.id}
                                    label={option.label}>{option.label}
                                </option>
                            );
                        })}
                    </select>
                    <ErrorMessage name={this.props.value} component="span" className="error" />
                </Col>
            </Row>
        );
    }
}