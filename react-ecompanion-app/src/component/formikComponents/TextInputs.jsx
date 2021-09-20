import React from "react";
import { Field, ErrorMessage } from "formik";

export function TextInputResponsive(props) {

  return (
    <div className="input-component-responsive">
      <Field
        className="formik-input"
        name={props.value}
        type={props.type ? props.type : "text"}
        autoComplete="on"
        placeholder=" "
      />
      <span className="highlight" />
      <span className="bar" />
      <label className="input-component-label" htmlFor={props.value}>
        {props.title}
      </label>
      {props.placeholder && <span className="placeholder">{props.placeholder}</span>}
      <ErrorMessage name={props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
    </div>
  );

}

export function TextInput(props) {

  return (
    <div className="input-component">
      <Field
        name={props.value}
        type={props.type ? props.type : "text"}
        autoComplete="off"
        placeholder={props.title}
      />
      {props.placeholder && <span className="placeholder">{props.placeholder}</span>}
      <ErrorMessage name={props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
    </div>
  );

}


export function TextAreaInput(props) {

  return (
    <div className="input-component">
      <textarea
        name={props.value}
        style={{ resize: "none" }}
        spellCheck="false"
        rows={4}
        autoComplete="off"
        value={props.initvalue}
        placeholder={props.title}
        onChange={e => {
          props.onChange(props.value, e.target.value);
        }}
      />
      {props.placeholder && <span className="placeholder">{props.placeholder}</span>}
      <ErrorMessage name={props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
    </div>
  );

}