import React, { Component } from "react";
import { Formik, Form } from "formik";
import { TermsConditions, TextAreaInput, TextInput } from "../component/formikComponents";
import { ImageUploader } from "../component/formikComponents/ImageUploader";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (values, { setSubmitting }) => {
        setSubmitting(true)

        fetch("http://localhost:3001/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then( response => response.json())
        .then( res => {
            console.log(res)
            setSubmitting(false)
            if (res) {
                window.location.href = "/signin"
            }
        })
        .catch(err => {
            setSubmitting(false)
            console.log(err)
        })
    }
    render() {
        return (
            <div className="signup-form">
                <h1>Become a member!</h1>
                <Formik
                    initialValues={{ 
                        firstName: '', lastName: '', email: '', 
                        description: '', password: '', icon: null, 
                        terms: false, type: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.firstName) {
                            errors.firstName = 'Required';
                        }
                        if (!values.lastName) {
                            errors.lastName = 'Required';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 8) {
                            errors.password = 'Password contain atleast 8 characters';
                        }
                        return errors;
                    }}
                    onSubmit={this.onSubmit}
                >
                    {(formProps) => (
                        <Form>
                            <TextInput
                                title="First Name*"
                                value="firstName"
                                placeholder="max. 60 characters"
                                onChange={formProps.setFieldValue}
                            />
                            <TextInput
                                title="Last Name*"
                                value="lastName"
                                placeholder="max. 60 characters"
                                onChange={formProps.setFieldValue}
                            />
                            <TextInput
                                title="Email*"
                                value="email"
                                placeholder=""
                                onChange={formProps.setFieldValue}
                            />
                            <TextAreaInput
                                title="Description*"
                                value="description"
                                placeholder="max. 180 characters"
                                initvalue={formProps.values.description}
                                onChange={formProps.setFieldValue}
                            />
                            <TextInput
                                title="Password*"
                                value="password"
                                type="password"
                                placeholder=""
                                onChange={formProps.setFieldValue}
                            />
                            {/*<DropDownInput title="Type" value="type" onChange={formProps.setFieldValue} 
                                options={[{id: 1, label: "active"}, {id: 2, label: "passive"}]}/>*/}
                            <ImageUploader
                                title="Choose your picture"
                                value="icon"
                                data={formProps.values.icon}
                                placeholder="we recommend a resolution of 256 x 256 pixel."
                                height="256px"
                                width="256px"
                                onChange={formProps.setFieldValue}
                            />
                            <TermsConditions value="terms" />
                            <div className="formbuttondiv">
                                <button type="submit" className="formbutton"
                                    disabled={formProps.isSubmitting}
                                    style={{ float: "right", opacity: !formProps.isValid ? "0.5" : "1" }}>
                                    SignUp
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <hr />
                <div className="already-signin">
                    <p>Already have an account? <a href="/signin">Sign in</a>.</p>
                </div>
            </div>
        )
    }
}