import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Col, Row } from 'react-bootstrap';


export function DateInput({ value, initValue, title, onChange }) {
  return (
    <Row style={{ marginBottom: "3%", marginTop: "6%" }}>
      <Col sm={4}>
        <label>{title}  </label>
      </Col>
      <Col sm={8}>
        <Field
          id={"formik-date-" + value}
          name={value}
          type="date"
          value={initValue}
          onChange={e => {
            onChange(value, e.target.value);
          }}
        />
        <ErrorMessage name={value}>{msg => <span className="error" style={{ position: 'unset' }}>{msg}</span>}</ErrorMessage>
      </Col>
    </Row>
  );
}