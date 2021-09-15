import React from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

export class TextInputResponsive extends React.Component {
  render() {
    return (
      <div className="input-component-responsive">
        <Field
          className="formik-input"
          name={this.props.value}
          type={this.props.type ? this.props.type : "text"}
          autoComplete="on"
          placeholder=" "
        />
        <span className="highlight" />
        <span className="bar" />
        <label className="input-component-label" htmlFor={this.props.value}>
          {this.props.title}
        </label>
        {this.props.placeholder && <span className="placeholder">{this.props.placeholder}</span>}
        <ErrorMessage name={this.props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
    );
  }
}
TextInputResponsive.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};
export class TextInput extends React.Component {
  render() {
    return (
      <div className="input-component">
        <Field
          name={this.props.value}
          type={this.props.type ? this.props.type : "text"}
          autoComplete="off"
          placeholder={this.props.title}
        />
        {this.props.placeholder && <span className="placeholder">{this.props.placeholder}</span>}
        <ErrorMessage name={this.props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
    );
  }
}
TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

export class TextAreaInput extends React.Component {
  render() {
    return (
      <div className="input-component">
        <textarea
          name={this.props.value}
          style={{ resize: "none" }}
          spellCheck="false"
          rows={4}
          autoComplete="off"
          value={this.props.initvalue}
          placeholder={this.props.title}
          onChange={e => {
            this.props.onChange(this.props.value, e.target.value);
          }}
        />
        {this.props.placeholder && <span className="placeholder">{this.props.placeholder}</span>}
        <ErrorMessage name={this.props.value}>{msg => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
    );
  }
}
TextAreaInput.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  initvalue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
