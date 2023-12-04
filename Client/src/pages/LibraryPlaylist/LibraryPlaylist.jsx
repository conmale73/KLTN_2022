import React from "react";
import styles from "./LibraryPlaylist.module.scss";
import Divider from "../../components/Divider/Divider";
import PlaylistsLibrary from "./Playlists";

const LibraryPlaylist = (props) => {
    document.title = props.title;

    return (
        <div className={styles.libraryPlaylist}>
            <h1
                style={{
                    fontWeight: "700",
                    fontSize: "25px",
                }}
            >
                Playlists
            </h1>
            <Divider />
            <PlaylistsLibrary />
        </div>
    );
};
export default LibraryPlaylist;
