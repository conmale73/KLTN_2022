import React from "react";
import "./rightSidebar.scss";
import SmallSong from "../Song/SongSmall";
import { useState } from "react";
import clsx from "clsx";
import NowPlaying from "./NowPlaying";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OnlineFriendList from "./OnlineFriendList";

function RightSidebar() {
    const [tab, setTab] = useState(0);
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const activeTabStyle = "bg-neutral-500 text-white rounded-full";

    return (
        <div className={`rightSidebar ${sidebarVisible ? "" : "hide"}`}>
            <div className="tabs flex border-b">
                <div
                    onClick={() => setTab(0)}
                    className={clsx(
                        "flex items-center justify-center my-2 p-2 cursor-pointer w-1/2 rounded-xl",
                        0 === tab && activeTabStyle
                    )}
                >
                    <p className="text-2xl font-medium">Contacts</p>
                </div>
                <div
                    onClick={() => setTab(1)}
                    className={clsx(
                        "flex items-center justify-center my-2 p-2 cursor-pointer w-1/2 rounded-xl",
                        1 === tab && activeTabStyle
                    )}
                >
                    <p className="text-2xl font-medium">Now Playing</p>
                </div>
            </div>
            <div className="rightSidebarContent">
                {tab === 0 ? <OnlineFriendList /> : <NowPlaying />}
            </div>
            {/* <button
                className="toggleButtonRight"
                onClick={toggleSidebar}
                title={sidebarVisible ? "Hide Sidebar" : "Show Sidebar"}
            >
                {sidebarVisible ? <FaChevronRight /> : <FaChevronLeft />}
            </button> */}
        </div>
    );
}

export default RightSidebar;
