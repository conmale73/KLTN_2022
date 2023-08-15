import React from "react";
import styles from "./nowPlaying.module.scss";
import { Link } from "react-router-dom";
import SmallSong from "../../Song/Song(Small)/Song(Small)";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { songService } from "../../../services/song.service";
import { useSongContext } from "../../../context/SongContext";

const NowPlaying = () => {
    const songs = useSelector((state) => state.listSongs.list);
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();

    return (
        <div className="nowPlaying mt-6">
            {songs.map((song, index) => (
                <SmallSong
                    key={index}
                    _id={song._id}
                    songName={song.songName}
                    artists={song.artists}
                    songImage={song.songImage}
                    playing={songs[currentSongIndex]?._id}
                />
            ))}
        </div>
    );
};
export default NowPlaying;
