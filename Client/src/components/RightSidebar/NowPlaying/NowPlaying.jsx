import React from "react";
import styles from "./nowPlaying.module.scss";
import { Link } from "react-router-dom";
import SmallSong from "../../Song/Song(Small)/Song(Small)";

const Songs = [
    {
        id: 1,
        songName: "Take Me To Your Heart",
        artist: "Michael Learns To Rock",
        image: "/photos/TakeMeToChurch_Hozier.jpg",
    },
    {
        id: 2,
        songName: "Bohemian Rhapsody",
        artist: "Queen",
        image: "/photos/TakeMeToChurch_Hozier.jpg",
    },
];
const NowPlaying = () => {
    return (
        <div className="nowPlaying">
            {Songs.map((song) => (
                <SmallSong
                    songName={song.songName}
                    artist={song.artist}
                    image={song.image}
                />
            ))}
        </div>
    )
}
export default NowPlaying;