import React, { useState } from "react";
import "./leftSidebar.scss";
import { Link } from "react-router-dom";
import $ from "jquery";
import Menu from "./Menu";
import AnimatedText from "../AnimatedText";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
function LeftSidebar() {
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className={`leftSidebar ${sidebarVisible ? "" : "hide"}`}>
            {mode === "music" ? (
                <Link to="/music">
                    <div className="logo">
                        <img src="/photos/MySPACE-Logo.png"></img>
                    </div>
                </Link>
            ) : (
                <Link to="/social">
                    <div className="logo">
                        <img src="/photos/MySPACE-Logo.png"></img>
                    </div>
                </Link>
            )}

            {user ? (
                <div className="info">
                    <div className="avatar">
                        <Link to={`/profile/?id=${user._id}`}>
                            <img src={user.avatar}></img>
                        </Link>
                    </div>
                    <div className="name">
                        <AnimatedText text={"Welcome, " + user.username} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="info">
                        <div className="avatar">
                            <img src="/photos/avatar.jpg"></img>
                        </div>
                        <div className="name">
                            <AnimatedText text={"Welcome"} />
                        </div>
                    </div>
                </>
            )}

            <Menu />
            {/* <button
                className="toggleButton"
                onClick={toggleSidebar}
                title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
            </button> */}
        </div>
    );
}

export default LeftSidebar;
