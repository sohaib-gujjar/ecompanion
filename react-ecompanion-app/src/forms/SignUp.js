import React, { Component } from "react";
import { Formik, Form } from "formik";
import { DateInput, DropDownInput, ImageUploader, RadioGroup, TermsConditions, TextAreaInput, TextInput } from "../component/formikComponents";

export default class SignUp extends Component {

    onSubmit = (values, { setSubmitting }) => {
        setSubmitting(true)

        alert(JSON.stringify(values))

        fetch("http://localhost:3001/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }

                return res.json().then(({ message }) => {
                    throw Error(message);
                });
            })
            .then(res => {
                console.log(res)
                setSubmitting(false)
                if (res) {
                    let formData =new FormData();
                    formData.append("file", values.icon)
                    fetch("http://localhost:3001/auth/register/upload/" + res.id, {
                        method: 'POST',
                        body: formData
                    })
                    .then(response=> response.json())
                    .then(res=> {
                        console.log(res)
                        window.location.href = "/signin"
                    })
                    .catch(err => console.log(err))
                }
            })
            .catch(err => {
                setSubmitting(false)
                console.log(err)
                alert(err)
            })
    }
    render() {
        return (
            <div className="signup-form">
                <h1>Become a member!</h1>
                <Formik
                    initialValues={{
                        firstName: '', 
                        lastName: '', 
                        email: '',
                        description: '', 
                        password: '', 
                        icon: null,
                        gender: null, 
                        tags: [],
                        terms: false, 
                        workspace: null,
                        dob: "2000-01-01"
                    }}
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
                        if (!values.terms) {
                            errors.terms = 'you need to accept terms & condition';
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
                            <DateInput value="dob" initValue={formProps.values.dob} title="Date of birth" onChange={formProps.setFieldValue}/>
                            <DropDownInput title="Workspace" value="workspace" onChange={formProps.setFieldValue} placeholder="Select..."
                                options={[{id: 1, label: "active"}, {id: 2, label: "passive"}]}/>
                            <RadioGroup 
                                title="Gender" value="gender" onChange={formProps.setFieldValue} 
                                options={[{id: 1, label: "male"}, {id: 2, label: "female"}]}
                            />
                            
                            {/*<CustomInputTagsDropdown
                                title="Tags"
                                value="tags"
                                items={[{tag: 'tag1'}, {tag: 'tag2'}, {tag: 'tag3'}, {tag: 'tag4'}, {tag: 'tag5'}]}
                                placeholder="select tags"
                                onChange={formProps.setFieldValue}
                                selected={formProps.values.tags}
                            />*/}
                            <ImageUploader
                                title="Choose your picture"
                                value="icon"
                                data={formProps.values.icon}
                                placeholder="recommended resolution 256 x 256 pixel."
                                height="256px"
                                //width="256px"
                                onChange={formProps.setFieldValue}
                            />
                            <TermsConditions value="terms" checked={formProps.values.terms}/>
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