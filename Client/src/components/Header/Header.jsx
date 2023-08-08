import styles from "./Header.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Notification } from "../Icons";
import { TbLogout } from "react-icons/tb";
import { MdNotificationsNone } from "react-icons/md";
import SearchBox from "./SearchBox";

function Header() {
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
                    <div className={styles.button} title="Notifications">
                        <MdNotificationsNone size="24px" />
                    </div>
                    <div className={styles.button} title="Log Out">
                        <TbLogout size="24px" />
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Header;
