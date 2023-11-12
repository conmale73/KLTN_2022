import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Notification } from "../Icons";
import { TbLogout } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import * as HoverCard from "@radix-ui/react-hover-card";
import { setMode } from "../../redux/mode/modeSlice";
function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);
    const navigator = useNavigate();
    const handleLogOut = () => {
        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigator("/authentication/login");
    };
    const handleProfile = () => {
        navigator("/profile/?id=" + user._id);
    };
    return (
        <div className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navList}>
                    <div
                        className={`${styles.navItem} ${
                            mode === "music" ? styles.selected : ""
                        }`}
                        onClick={() => {
                            dispatch(setMode("music"));
                        }}
                    >
                        <p title="Back to Homepage">Music</p>
                    </div>
                    <div
                        className={`${styles.navItem} ${
                            mode === "social" ? styles.selected : ""
                        }`}
                        onClick={() => {
                            dispatch(setMode("social"));
                        }}
                    >
                        <p title="Most listened songs">Explore</p>
                    </div>
                </div>
                <div className={styles.search}>
                    <SearchBox />
                </div>
                <div className={styles.buttons}>
                    {user != null ? (
                        <>
                            <div className={styles.button}>
                                <MdNotifications
                                    className={styles.button}
                                    size="24px"
                                    title="Notifications"
                                />
                            </div>

                            <div className={styles.button}>
                                <BiSolidMessageRoundedDetail
                                    className={styles.button}
                                    size="24px"
                                    title="Messages"
                                />
                            </div>

                            <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                    <div className={styles.button}>
                                        <BsFillPersonFill
                                            size="24px"
                                            className={styles.button}
                                            title="Profile"
                                            onClick={handleProfile}
                                        />
                                    </div>
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                    <HoverCard.Content
                                        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade
                                         data-[side=left]:animate-slideRightAndFade 
                                        data-[side=top]:animate-slideDownAndFade w-[200px] rounded-md bg-neutral-400/25 p-5
                                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                                        data-[state=open]:transition-all"
                                        sideOffset={5}
                                    >
                                        <div className={styles.profileMenu}>
                                            <div
                                                className={styles.profileButton}
                                                onClick={handleProfile}
                                            >
                                                <BsFillPersonFill size="24px" />

                                                <p className={styles.text}>
                                                    Profile
                                                </p>
                                            </div>
                                            <div
                                                className={styles.profileButton}
                                                onClick={handleLogOut}
                                            >
                                                <TbLogout
                                                    color="#EE5151"
                                                    size="24px"
                                                />
                                                <p
                                                    className={styles.text}
                                                    style={{ color: "#f07676" }}
                                                >
                                                    Log Out
                                                </p>
                                            </div>
                                        </div>
                                        <HoverCard.Arrow className="fill-blue-400/25" />
                                    </HoverCard.Content>
                                </HoverCard.Portal>
                            </HoverCard.Root>
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
