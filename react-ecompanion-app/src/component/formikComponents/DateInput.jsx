import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

/**
 * @author Sohaib Akbar
*/

export class DateInput extends React.Component {
  render() {
    return (
      <div>
        <Field
          id={"formik-date-" + this.props.value}
          name={this.props.value}
          type="date"
          placeholder={this.props.placeholder ? this.props.placeholder : "..."}
          onChange={e => {
            this.props.onChange(this.props.value, e.target.value);
          }}
        />
        <ErrorMessage name={this.props.value}>{msg => <span className="error" style={{position: 'unset'}}>{msg}</span>}</ErrorMessage>
      </div>
    );
  }
}
DateInput.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};