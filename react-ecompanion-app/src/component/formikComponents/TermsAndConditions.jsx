import React from "react";
import { Field, ErrorMessage } from "formik";

export function TermsConditions({ value, checked }) {
  return (
    <div className="row">
      <label htmlFor={value}>
        <Field
          name={value}
          defaultChecked={checked ? true : false}
          type="checkbox"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a style={{ color: "#444", textDecoration: "underline" }} href="/terms" target="_blank">
          {"   "}
          Read Terms and conditions
        </a>
      </label>
      <ErrorMessage name={value}>
        {msg => (
          <span className="error" style={{ marginTop: "1%", color: "red"}}>
            {msg}
          </span>
        )}
      </ErrorMessage>
    </div>
  );
}