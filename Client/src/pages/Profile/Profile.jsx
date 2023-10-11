import styles from "./Profile.module.scss";
import AuthenticationPage from "../AuthenticationPage";
const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return <>profile</>;
    } else return <AuthenticationPage />;
};
export default Profile;
