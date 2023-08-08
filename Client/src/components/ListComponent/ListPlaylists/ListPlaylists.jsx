import { useState } from "react";
import "./ListPlaylists.scss";
import Playlist from "../../Playlist";

const ListPlaylists = (props) => {
    const isInlinePlaylist = props.isInlinePlaylist;
    const playlists = props.playlists;

    return (
        <>
            {isInlinePlaylist ? (
                <div className="inlineListPlaylist">
                    {playlists.map((playlist) => (
                        <Playlist {...playlist} />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default ListPlaylists;
