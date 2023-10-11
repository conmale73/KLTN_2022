import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Notification } from "../Icons";
import { TbLogout } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const handleLogOut = () => {
        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <div className={styles.header}>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/music/home">
                            <p title="Back to Homepage">Home</p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/music/trending">
                            <p title="Most listened songs">Trending</p>
                        </Link>
                    </li>
                </ul>
                <div className={styles.search}>
                    <SearchBox />
                </div>
                <div className={styles.buttons}>
                    {user != null ? (
                        <>
                            <div
                                className={styles.button}
                                title="Notifications"
                            >
                                <MdNotificationsNone size="24px" />
                            </div>
                            <div className={styles.button} title="Log Out">
                                <TbLogout size="24px" onClick={handleLogOut} />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/authentication/login">
                                <div className={styles.signInButton}>
                                    Sign In
                                </div>
                            </Link>
                            <Link to="/authentication/signup">
                                <div className={styles.signUpButton}>
                                    Sign Up
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
export default Header;
