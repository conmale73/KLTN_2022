import React from "react";
import "./rightSidebar.scss";
import SmallSong from "../Song/Song(Small)";
import { useState } from "react";
import clsx from "clsx";
import NowPlaying from "./NowPlaying";
import Playlist from "./Playlist";

function RightSidebar() {
    const [tab, setTab] = useState(0);

    const activeTabStyle = "bg-gray-600 text-white rounded-full";

    return (
        <div className="rightSidebar">
            <div className="tabs flex border-b">
                <div
                    onClick={() => setTab(0)}
                    className={clsx(
                        "flex items-center my-2 p-2 cursor-pointer w-1/2",
                        0 === tab && activeTabStyle
                    )}
                >
                    <p className="text-2xl font-medium">Now Playing</p>
                </div>
                <div
                    onClick={() => setTab(1)}
                    className={clsx(
                        "flex items-center my-2 p-2 cursor-pointer w-1/2",
                        1 === tab && activeTabStyle
                    )}
                >
                    <p className="text-2xl font-medium">Playlist</p>
                </div>
            </div>
            <div>{tab === 0 ? <NowPlaying /> : <Playlist />}</div>
        </div>
    );
}

export default RightSidebar;
