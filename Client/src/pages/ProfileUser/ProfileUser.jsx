import styles from "./ProfileUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CoverPhotoAvatar from "../../components/ProfileUser/CoverPhotoAvatar";
import Hobby from "../../components/ProfileUser/Hobby";
import PostsProfile from "../../components/ProfileUser/PostsProfile";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
const ProfileUser = () => {
    const user = useSelector((state) => state.user.data);

    const { userIdLink } = useParams();
    console.log("idlink")
    console.log(userIdLink)
    const navigator = useNavigate();
    const [loadP, setLoadP] = useState(false);
    const changeLoadP = () => {
        setLoadP(!loadP);
    };
    useEffect(() => {
    }, [loadP])

    if (user != null) {
        return <>
            {/* content: cover image + avatar */}
            <div className={styles.myProfile}>
                <header className={styles.ProfileHeader}>
                    <h1>My Facebook Profile</h1>
                </header>
                <CoverPhotoAvatar changeLoadP={changeLoadP} userIdLink={userIdLink}/>
                {/* content: Sở thích + posts */}
                <div className={styles.TspostContainer} >
                    <Hobby userIdLink={userIdLink}/>
                    <PostsProfile userIdLink={userIdLink}/>
                </div>
            </div>


        </>;
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
export default ProfileUser;
