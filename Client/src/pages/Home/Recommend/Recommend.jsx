import "./Recommend.scss";
import MediumSong from "../../../components/Song/Song(Medium)";
import { Link } from "react-router-dom";
import { useState } from "react";
import ListSong from "../../../components/ListSong";
const Playlists = [
    {
        id: 1,
        playlistName: "2000s Ballads",
        artist: ["Backstreet Boys", "Westlife", "NSYNC", "Boyzone"],
        artistSlug: ["backstreet-boys", "westlife", "nsync", "boyzone"],
        image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/4/0/b/740bb787c25fbd5f27e094165d22b5d3.jpg",
        slug: "2000s-ballads",
        category: "playlist",
        region: "us-uk",

    },
    {
        id: 2,
        playlistName: "Back to 2000s",
        artist: ["Backstreet Boys", "Westlife", "Rihanna", "Britney Spears"],
        artistSlug: ["backstreet-boys", "westlife", "rihanna", "britney-spears"],
        image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/d/a/b/bdabce2847d443fddcbe5fb516c5e268.jpg",
        slug: "back-to-2000s",
        category: "playlist",
        region: "us-uk",

    },
    {
        id: 3,
        playlistName: "90s Pop Hits",
        artist: ["Britney Spears", "TLC", "Backstreet Boys", "Aqua"],
        artistSlug: ["britney-spears", "tlc", "backstreet-boys", "aqua"],
        image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/1/9/d/8/19d82a3b3d99527eff064504c4225e30.jpg",
        slug: "90s-pop-hits",
        category: "playlist",
        region: "us-uk",

    },
    {
        id: 4,
        playlistName: "2010s Collab",
        artist: ["Shawn Mendes", "Camila Cabello", "P!nk", "Nate Ruess"],
        artistSlug: ["shawn-mendes", "camila-cabello", "pink", "nate-ruess"],
        image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/7/3/5/57353f400b3ca666846b118d0572867c.jpg",
        slug: "2010s-collab",
        category: "playlist",
        region: "us-uk",
    },
    
];
function Recommend() {
    const playlists = Playlists;
    return (
        <div className="recommend">
            <div className="title">
                <h1>Maybe You Like</h1>
                <span className="watchMoreButton">More...</span>
            </div>
            <div className="listSong">
                <ListSong playlists={playlists} isInlinePlaylist={true} />
            </div>
        </div>
    );
}
export default Recommend;
