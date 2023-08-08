import React, { useState } from "react";
import "./leftSidebar.scss";
import { Link } from "react-router-dom";
import $ from "jquery";
import Menu from "./Menu";
import AnimatedText from "../AnimatedText";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function LeftSidebar() {
    const user = "Lonely Boy";
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    return (
        <div className={`leftSidebar ${sidebarVisible ? "" : "hide"}`}>
            <Link to="/music/">
                <div className="logo">
                    <img src="/photos/lalaland-removebg.png"></img>
                </div>
            </Link>

            <div className="info">
                <div className="avatar">
                    <img src="/photos/avatar.jpg"></img>
                </div>
                <div className="name">
                    <AnimatedText text={"Welcome, " + user} />
                </div>
                <div className="membership">Premium Membership</div>
            </div>
            <Menu />
            <button
                className="toggleButton"
                onClick={toggleSidebar}
                title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
        </div>
    );
}

export default LeftSidebar;
