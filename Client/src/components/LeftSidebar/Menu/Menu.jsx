import "./Menu.scss";
import {
    Library,
    History,
    Playlist,
    Playlist2,
    Heart,
    Chart,
    Star,
} from "../../Icons";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/music/library">
                        <div className="button">
                            <div className="icon">
                                <Library />
                            </div>
                            <div className="text">Library</div>
                        </div>
                    </Link>
                    <Link to="/music/history">
                        <div className="button">
                            <div className="icon">
                                <History />
                            </div>
                            <div className="text">History</div>
                        </div>
                    </Link>
                    <Link to="/music/library">
                        <div className="button">
                            <div className="icon">
                                <Heart />
                            </div>
                            <div className="text">Liked Songs</div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/music/library/playlists">
                        <div className="button">
                            <div className="icon">
                                <Playlist />
                            </div>
                            <div className="text">Playlists</div>
                        </div>
                    </Link>

                    <Link to="/music/library/playlists/Vietnamese">
                        <div className="button">
                            <div className="icon">
                                <Playlist2 />
                            </div>
                            <div className="text">
                                Vietnamesesssssssssssssssssssssssssss
                            </div>
                        </div>
                    </Link>
                    <Link to="/music/library/playlists/US-UK">
                        <div className="button">
                            <div className="icon">
                                <Playlist2 />
                            </div>
                            <div className="text">US-UK</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="menu">
                <div className="menu_wrapper">
                    <Link to="/music/leaderboard">
                        <div className="button">
                            <div className="icon">
                                <Chart />
                            </div>
                            <div className="text">Top 100</div>
                        </div>
                    </Link>

                    <Link to="/music/new">
                        <div className="button">
                            <div className="icon">
                                <Star />
                            </div>
                            <div className="text">New Songs</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Menu;
