import React from "react";
import { Field, ErrorMessage } from "formik";

export class TermsConditions extends React.Component {
  render() {
    return (
      <div className="row">
        <label htmlFor={this.props.value}>
          <Field
            className="form-radio"
            name={this.props.value}
            defaultChecked={this.props.checked ? true : false}
            type="checkbox"
          />
          &nbsp;
          <a style={{ color: "#ddd", textDecoration: "underline" }} href="/terms" target="_blank">
            {" "}
            Read Terms and conditions
          </a>
        </label>
        <ErrorMessage name={this.props.value}>
          {msg => (
            <span className="error" style={{ marginRight: "52%", marginTop: "2%" }}>
              {msg}
            </span>
          )}
        </ErrorMessage>
      </div>
    );
  }
}