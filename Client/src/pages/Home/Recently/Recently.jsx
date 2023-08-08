import "./Recently.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListSongs from "../../../components/ListComponent/ListSongs";
import { getAllSongsAPI } from "../../../redux/song/songsAPI";
import { songService } from "../../../services/song.service";

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
    const [songs, setSongs] = useState([]);
    const dispatch = useDispatch();

    getAllSongsAPI(dispatch);

    useEffect(() => {
        async function getSongs() {
            const res = await songService.getSongs();
            setSongs(res.data.songs);
        }
        getSongs();
    }, []);
    return (
        <div className="recently">
            <div className="title">
                <h1>Recently</h1>
                <Link to="/music/history" className="watchMoreButton">
                    <span className="watchMoreButton">More...</span>
                </Link>
            </div>
            <div className="listSong">
                <ListSongs songs={songs} isInlineSong={true} />
            </div>
        </div>
    );
}
export default Recently;
