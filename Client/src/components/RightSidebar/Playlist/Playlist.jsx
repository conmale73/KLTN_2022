import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./playlist.module.scss";
import SmallSong from "../../Song/Song(Small)/Song(Small)";
const Songs = [
    {
        id: 1,
        songName: "Take Me To Your Heart",
        artist: "Michael Learns To Rock",
        image: "/photos/troll face.jpg",
    },
    {
        id: 2,
        songName: "Bohemian Rhapsody",
        artist: "Queen",
        image: "/photos/troll face.jpg",
    },
];

const Playlist = () => {
    return (
        <div className="playlist">
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
export default Playlist;