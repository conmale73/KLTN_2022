import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./playlist.module.scss";
import SmallSong from "../../Song/Song(Small)/Song(Small)";

const Playlist = () => {
    const songs = useSelector((state) => state.listSongs.list);

    return (
        <div className="playlist mt-6">
            {songs.map((song) => (
                <SmallSong
                    songName={song.songName}
                    artistID={song.artistID}
                    songImage={song.songImage}
                />
            ))}
        </div>
    );
};
export default Playlist;
