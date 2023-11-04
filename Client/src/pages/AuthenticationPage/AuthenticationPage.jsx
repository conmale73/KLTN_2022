import "./AuthenticationPage.scss";
import LoginForm from "./AuthenticationForms/LoginForm";
import RegisterForm from "./AuthenticationForms/RegisterForm";
import { useParams } from "react-router-dom";
import Profile from "../Profile";
const AuthenticationPage = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { type } = useParams();
    if (user) {
        return <Profile />;
    } else {
        return (
            <div className="authenticationPage">
                {type == "login" && (
                    <div className="formContainer">
                        <LoginForm />
                    </div>
                )}
                {type == "signup" && (
                    <div className="formContainer">
                        <RegisterForm />
                    </div>
                )}
            </div>
        );
    }
};
export default AuthenticationPage;
