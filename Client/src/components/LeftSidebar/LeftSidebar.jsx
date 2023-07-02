import React from "react";
import "./leftSidebar.scss";
import { Link } from "react-router-dom";
import $ from "jquery";
import { motion } from "framer-motion";
import { Library, History, Playlist, Playlist2, Heart, Chart, Star } from "../Icons";
import { BsBook } from "react-icons/bs";
function LeftSidebar() {
    return (
        <motion.div className="leftSidebar">
            <Link to="/">
                <div className="logo">
                    <img src="/photos/MySPACE-Logo.png"></img>
                </div>
            </Link>

            <div className="info">
                <div className="avatar">
                    <img src="/photos/TakeMeToChurch_Hozier.jpg"></img>
                </div>
                <div className="name">LOLOLOLOL</div>
                <div className="membership">Premium Membership</div>
            </div>
            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/library">
                        <div className="button">
                            <div className="icon">
                                <Library />
                            </div>
                            <div className="text">Library</div>
                        </div>
                    </Link>
                    <Link to="/history">
                        <div className="button">
                            <div className="icon">
                                <History />
                            </div>
                            <div className="text">History</div>
                        </div>
                    </Link>
                    <Link to="/library">
                        <div className="button">
                            <div className="icon">
                                <Heart />
                            </div>
                            <div className="text">Like Songs</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/playlists">
                        <div className="button">
                            <div className="icon">
                                <Playlist />
                            </div>
                            <div className="text">Playlists</div>
                        </div>
                    </Link>
                    
                    <Link to="/playlists/Vietnamese">
                        <div className="button">
                            <div className="icon"><Playlist2/></div>
                            <div className="text">Vietnamese</div>
                        </div>
                    </Link>
                    <Link to="/playlists/US-UK">
                        <div className="button">
                            <div className="icon"><Playlist2/></div>
                            <div className="text">US-UK</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/leaderboard">
                        <div className="button">
                            <div className="icon">
                                <Chart />
                            </div>
                            <div className="text">Top 100</div>
                        </div>
                    </Link>
                    
                    <Link to="/new">
                        <div className="button">
                            <div className="icon"><Star/></div>
                            <div className="text">New Songs</div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="toReadingButton">
                <div className="icon"><BsBook size="20px"/></div>
                <div className="text">To Reading</div>
            </div>
            <audio id="audio" src="" ></audio>
        </motion.div>
    );
}

export default LeftSidebar;
