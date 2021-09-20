import Header from "../component/Header";
import Signin from "../forms/SignIn";
import '../styles/forms.scss';

export default function SignIN() {
    return (
        <Header active>
            <div className="signin-page">
                <Signin />
            </div>
        </Header>
    );
}