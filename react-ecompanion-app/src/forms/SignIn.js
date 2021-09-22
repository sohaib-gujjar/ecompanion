import { Formik, Form } from "formik";
import { TextInputResponsive } from "../component/formikComponents";
import { RememberMe } from "../component/formikComponents";
import { UserContext } from '../context/UserContext';
import Cookies from "js-cookie";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

export default function Signin() {

    let history = useHistory();
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
                    return response.json()
                }

                return response.json().then(err => { throw Error(err) });
            })
            .then(res => {
                context.setUserContext({ user: res })
                history.push("/dashboard")
            })
            .catch(err => {
                console.log(err)
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