import styles from "./Profile.module.scss";
import AuthenticationPage from "../AuthenticationPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = () => {
    const user = useSelector((state) => state.user.data);

    const navigator = useNavigate();
    if (user != null) {
        return <>profile</>;
    } else {
        return (
            <>
                <p>You are not signed in. Please sign in to continue</p>
                <button
                    className={styles.signInButton}
                    onClick={() => navigator("/authentication/login")}
                >
                    Sign In
                </button>
            </>
        );
    }
};
export default Profile;
