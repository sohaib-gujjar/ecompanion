import React from 'react';
import { ErrorMessage } from 'formik';
import { Col, Row } from 'react-bootstrap';

export function DropDownInput(props) {
    
    function handleChange (e) {
        props.onChange(props.value, e.target.value);
    };
    return (
        <Row style={{ marginBottom: "3%", marginTop: "3%" }}>
            <Col sm={4}>
                <label htmlFor={props.value}>{props.title}</label>
            </Col>
            <Col sm={8}>
                <select
                    id={'formik-dropdown-' + props.value}
                    name={props.value}
                    //value={props.value}
                    onChange={handleChange}
                    className="custom-select"
                >
                    <option value="" disabled>{props.placeholder}</option>
                    {props.options.map((option, i) => {
                        return (
                            <option
                                key={i}
                                value={option.id}
                                label={option.label}>{option.label}
                            </option>
                        );
                    })}
                </select>
                <ErrorMessage name={props.value} component="span" className="error" />
            </Col>
        </Row>
    );

}