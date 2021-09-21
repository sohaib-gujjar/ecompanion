import { Formik, Form } from "formik";
import { TextInputResponsive } from "../component/formikComponents";
import { RememberMe } from "../component/formikComponents";
import {UserContext} from '../context/UserContext';
import Cookies from "js-cookie";
import { useContext } from "react";

export default function Signin() {
    const context = useContext(UserContext);

    function onSubmit(values, setSubmitting) {
        setSubmitting(true);
        fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then(async response => {
                if (response.status === 200) {
                    console.log(response.data)
                    const token = response.headers['x-auth-token'];
                    console.log(token)
                    if(token) {
                        document.cookie = token + '=' + token + ';' + 60000 + ';';
                        Cookies.set('token', token);
                        return response.json()
                    }
                    else return response.json()
                }

                return response.json().then(err => { throw Error(err) });
            })
            .then(res => {
                console.log(res)
                if(res.user)
                {
                    context.setUserContext({ user: res.user})
                    //window.location.href = "/dashboard"
                }
                else alert(JSON.stringify(res))
            })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
            .finally(() => {
                setSubmitting(false);
            })
    }
    return (
        <div className="signup-form">
                <h1>Login!</h1>
                <Formik
                    initialValues={{ email: 'test@test.com', remember: false, password: '12345678' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values, setSubmitting)
                    }}
                >
                    {(formProps) => (
                        <Form>
                            <TextInputResponsive
                                title="Email*"
                                value="email"
                                placeholder=""
                                onChange={formProps.setFieldValue}
                            />
                            <TextInputResponsive
                                title="Password*"
                                value="password"
                                type="password"
                                placeholder=""
                                onChange={formProps.setFieldValue}
                            />
                            <RememberMe value="remember" ></RememberMe>
                            <div className="formbuttondiv">
                                <button type="submit" className="formbutton"
                                    disabled={formProps.isSubmitting}
                                    style={{ float: "right", opacity: !formProps.isValid ? "0.5" : "1" }}>
                                    Sign In
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <hr />
                <div className="already-signin">
                    <p>Do not have an account? <a href="/signup">Sign Up</a>.</p>
                </div>
            </div>
    );
}