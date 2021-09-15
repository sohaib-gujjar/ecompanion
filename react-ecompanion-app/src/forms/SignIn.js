import { Formik, Form } from "formik";
import { TextInputResponsive } from "../component/formikComponents";
import { RememberMe } from "../component/formikComponents";
import UserContext from '../UserContext';
import Cookies from "js-cookie";
import { useContext } from "react";

export default function Signin() {
    const { context, setContext } = useContext(UserContext);

    function onSubmit(credentials, setSubmitting) {
        setSubmitting(true);
        fetch("http://localhost:3001/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          })
            .then(async response => {
                console.log(response.data)
                const token = response.headers['x-auth-token'];
                console.log(token)
                if(token) {
                    Cookies.set('token', token);
                    return null
                }
                else return response.json()
            })
            .then(res => {
                console.log(res)
                if(res)
                {
                    setContext({ user: res.user})
                    window.location.href = "/dashboard"
                }
                else alert(JSON.stringify(res))
            })
            .catch(err => {
                console.log(err.message)
            })
            .finally(() => {
                setSubmitting(false);
            })
    }
    return (
        <div className="signup-form">
                <h1>Login!</h1>
                <Formik
                    initialValues={{ email: '', remember: false, password: '' }}
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