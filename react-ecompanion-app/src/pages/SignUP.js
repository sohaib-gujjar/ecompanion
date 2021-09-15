import Header from "../component/Header";
import SignUp from "../forms/SignUp";
import '../styles/forms.scss';

export default function SignUP() {
    return (
        <>
        <Header active>
            <div className="signup-page">
                <SignUp />
            </div>
        </Header>
        </>
    );
}