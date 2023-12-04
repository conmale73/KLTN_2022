import "./Menu.scss";
import { BiLibrary, BiHistory } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { BsCalendarEventFill, BsBox } from "react-icons/bs";
import { MdOutlineGroups2, MdOutlinePlaylistPlay } from "react-icons/md";
import { PiPlaylistFill } from "react-icons/pi";
import { CgFeed } from "react-icons/cg";
import {
    AiFillHome,
    AiFillHeart,
    AiOutlineLineChart,
    AiFillStar,
} from "react-icons/ai";
const Menu = () => {
    const user = useSelector((state) => state.user.data);
    const mode = useSelector((state) => state.mode.mode);
    return (
        <>
            {user ? (
                <>
                    {mode === "music" ? (
                        <>
                            {/* Basic routes */}
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/home">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                    <Link to="/music/library">
                                        <div className="button">
                                            <div className="icon">
                                                <BiLibrary
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Library</div>
                                        </div>
                                    </Link>
                                    <Link to="/music/history">
                                        <div className="button">
                                            <div className="icon">
                                                <BiHistory
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">History</div>
                                        </div>
                                    </Link>
                                    <Link to="/music/library#likes">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHeart
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Liked Songs
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            {/* Playlists*/}
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/library/playlists">
                                        <div className="button">
                                            <div className="icon">
                                                <MdOutlinePlaylistPlay
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Playlists
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/music/library/playlists/Vietnamese">
                                        <div className="button">
                                            <div className="icon">
                                                <PiPlaylistFill
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Vietnamesesssssssssssssssssssssssssss
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/music/library/playlists/US-UK">
                                        <div className="button">
                                            <div className="icon">
                                                <PiPlaylistFill
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">US-UK</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/leaderboard">
                                        <div className="button">
                                            <div className="icon">
                                                <AiOutlineLineChart
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Leaderboard
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/music/new">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillStar
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                New Songs
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div> */}
                        </>
                    ) : (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/social/">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                    <Link to="/social/feed">
                                        <div className="button">
                                            <div className="icon">
                                                <CgFeed
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Feed</div>
                                        </div>
                                    </Link>
                                    <Link to="/social/friend">
                                        <div className="button">
                                            <div className="icon">
                                                <FaUserFriends
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Friends</div>
                                        </div>
                                    </Link>
                                    <Link to="/playground">
                                        <div className="button">
                                            <div className="icon">
                                                <BsBox
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">
                                                Playground
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to="/social/events">
                                        <div className="button">
                                            <div className="icon">
                                                <BsCalendarEventFill
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Events</div>
                                        </div>
                                    </Link>
                                    <Link to="/social/groups">
                                        <div className="button">
                                            <div className="icon">
                                                <MdOutlineGroups2
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Groups</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    {mode === "music" ? (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/authentication/login">
                                        <div className="button">
                                            <div className="icon">
                                                <CiLogin
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Sign In</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/music/home">
                                        <div className="button">
                                            <div className="icon">
                                                <AiFillHome
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Home</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            {/* <div className="menu">
                        <div className="menu_wrapper">
                            <Link to="/music/leaderboard">
                                <div className="button">
                                    <div className="icon">
                                        <AiOutlineLineChart
                                            className="icon"
                                            size="25px"
                                        />
                                    </div>
                                    <div className="text">Leaderboard</div>
                                </div>
                            </Link>

                            <Link to="/music/new">
                                <div className="button">
                                    <div className="icon">
                                        <AiFillStar
                                            className="icon"
                                            size="25px"
                                        />
                                    </div>
                                    <div className="text">New Songs</div>
                                </div>
                            </Link>
                        </div>
                    </div> */}
                        </>
                    ) : (
                        <>
                            <div className="menu">
                                <div className="menu_wrapper">
                                    <Link to="/authentication/login">
                                        <div className="button">
                                            <div className="icon">
                                                <CiLogin
                                                    className="icon"
                                                    size="25px"
                                                />
                                            </div>
                                            <div className="text">Sign In</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};
export default Menu;
