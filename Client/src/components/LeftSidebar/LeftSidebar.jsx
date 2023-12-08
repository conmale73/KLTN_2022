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
import HackedTextEffect from "../HackedTextEffect";
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
                            <img
                                loading="lazy"
                                className={`w-full h-full object-contain rounded-full`}
                                src={`data:${user.avatar.files[0].fileInfo.type};base64,${user.avatar.files[0].dataURL}`}
                            />
                        </Link>
                    </div>
                    <div className="name">
                        <HackedTextEffect text={"Welcome, " + user.username} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="info">
                        <div className="avatar">
                            <img src="/photos/avatar.jpg"></img>
                        </div>
                        <div className="name">
                            <HackedTextEffect text={"Welcome"} />
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
