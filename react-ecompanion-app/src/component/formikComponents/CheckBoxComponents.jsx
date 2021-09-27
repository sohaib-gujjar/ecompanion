import React from "react";
import { Field } from "formik";
import _ from "lodash";

export class CheckBoxGroup extends React.Component {
  onChange = e => {
    let selected = _.find(this.props.options, { id: e.currentTarget.value });
    this.props.onChange(this.props.value, selected);
  };
  render() {
    return (
      <div className="checkbox-group">
        {this.props.title && <p className="title" htmlFor={this.props.value}>
          {this.props.title}
        </p>}
        {this.props.options.map((option, key) => {
          return (
            <label className="carton" key={key}>
              <Field
                id={"formik-radio-" + option.id}
                name={`${this.props.value}[${key}]`}
                value={option.id}
                defaultChecked={
                  this.props.selected ? (this.props.selected.id === option.id ? true : false) : false
                }
                onChange={this.onChange}
                type="checkbox"
              />
              <span className="checkmark" />
              <span className="radio-title">
                {option.label}
                <br />
              </span>
              <span className="radio-description">{option.description}</span>
            </label>
          );
        })}
      </div>
      /*<div className="row">
        <div className="col-25">
          <label htmlFor={this.props.value}>{this.props.title}</label>
        </div>
        <div className="col-75">
          <div className="checkbox-group">
            {this.props.options.map((option, key) => {
              return (
                <label key={key}>
                  <input
                    className="form-checkbox"
                    name={`${option.value}[${key}]`}
                    value={option.id}
                    ref={option.value}
                    defaultChecked={this.props.selected ? (this.props.selected === option.name ? true : false) : false}
                    onChange={this.handleChange}
                    type="checkbox"
                  />{" "}
                  {option.label}
                </label>
              );
            })}
          </div>
        </div>
      </div>*/
    );
  }
}
export class RadioGroup extends React.Component {
  componentDidMount() {
    if (!this.props.selected) this.props.onChange(this.props.value, this.props.options[0]);
  }
  onChange = e => {
    let selected = _.find(this.props.options, function(o) { return o.id == e.currentTarget.value; });
    this.props.onChange(this.props.value, selected);
  };
  render() {
    return (
      <div className="checkbox-group">
        {this.props.title && <p className="title" htmlFor={this.props.value}>
          {this.props.title}
        </p>}
        {this.props.options.map((option, key) => {
          return (
            <label className="carton" key={key}>
              <Field
                //id={"formik-radio-" + option.id}
                name={this.props.value}
                value={option.id}
                defaultChecked={
                  this.props.selected ? (this.props.selected.id === option.id ? true : false) : key === 0 ? true : false
                }
                onChange={this.onChange}
                type="radio"
              />
              <span className="checkmark radio" />
              <span className="radio-title">
                {option.label}
                <br />
              </span>
              <span className="radio-description">{option.description}</span>
            </label>
          );
        })}
      </div>
    );
  }
}