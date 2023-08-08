import { useState } from "react";
import "./ListSongs.scss";
import MediumSong from "../../Song/Song(Medium)";

const ListSongs = (props) => {
    const isInlineSong = props.isInlineSong;
    const songs = props.songs;

    return (
        <>
            {isInlineSong ? (
                <div className="inlineList">
                    {songs.map((song) => (
                        <MediumSong {...song} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default ListSongs;
