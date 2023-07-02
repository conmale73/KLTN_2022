import "./Recently.scss";
import MediumSong from "../../../components/Song/Song(Medium)";
import { Link } from "react-router-dom";
import { useState } from "react";
import ListSong from "../../../components/ListSong";
const Songs = [
    {
        id: 1,
        songName: "Có Chàng Trai Viết Lên Cây",
        artist: "Phan Mạnh Quỳnh",
        artistSlug: "phan-manh-quynh",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "co-chang-trai-viet-len-cay",
        category: "song",
        region: "vietnamese",
    },
    {
        id: 2,
        songName: "Take Me To Church",
        artist: "Hozier",
        artistSlug: "hozier",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-church",
        category: "song",
        region: "us-uk",
    },
    {
        id: 3,
        songName: "Take Me To Your Heart",
        artist: "Michael Learns To Rock",
        artistSlug: "michael-learns-to-rock",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-your-heart",
        category: "song",
        region: "us-uk",
    },
    {
        id: 4,
        songName: "Có Chàng Trai Viết Lên Cây",
        artist: "Phan Mạnh Quỳnh",
        artistSlug: "phan-manh-quynh",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "co-chang-trai-viet-len-cay",
        category: "song",
        region: "vietnamese",
    },
    {
        id: 5,
        songName: "Take Me To Church",
        artist: "Hozier",
        artistSlug: "hozier",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-church",
        category: "song",
        region: "us-uk",
    },
    {
        id: 6,
        songName: "Take Me To Your Heart",
        artist: "Michael Learns To Rock",
        artistSlug: "michael-learns-to-rock",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-your-heart",
        category: "song",
        region: "us-uk",
    },
    {
        id: 7,
        songName: "Take Me To Church",
        artist: "Hozier",
        artistSlug: "hozier",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-church",
        category: "song",
        region: "us-uk",
    },
    {
        id: 8,
        songName: "Take Me To Your Heart adasdsa ádasd",
        artist: "Michael Learns To Rock a dsa ád ádasdasd  áda sd ",
        artistSlug: "michael-learns-to-rock",
        image: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/0/0/4/0004b1a0a0a0a0a0a0a0a0a0a0a0a0a0.jpg",
        slug: "take-me-to-your-heart",
        category: "song",
        region: "us-uk",
    },
];
function Recently() {
    const songs = Songs;
    return (
        <div className="recently">
            <div className="title">
                <h1>Recently</h1>
                <span className="watchMoreButton">More...</span>
            </div>
            <div className="listSong">
                <ListSong songs={songs} isInlineSong={true} />
            </div>
        </div>
    );
}
export default Recently;
