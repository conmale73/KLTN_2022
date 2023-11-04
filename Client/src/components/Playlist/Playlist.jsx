import React from "react";
import { Link } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./Playlist.module.scss";

const Playlist = (props) => {
    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("play: ", props?.playlistId);
    };
    return (
        <div className={styles.playlist}>
            <div className={styles.playlistImage}>
                <img
                    src={
                        props.thumbnails[0]?.url ||
                        props.thumbnails[1]?.url ||
                        props.thumbnails[2]?.url ||
                        props.thumbnails[3]?.url ||
                        props.thumbnails[4]?.url
                    }
                    alt=""
                />
            </div>

            <div className={styles.playButtonContainer}>
                <BsPlayCircle
                    size="40px"
                    className={styles.playButton}
                    key={props.playlistId}
                    onClick={(e) => handleClickPlay(e)}
                />
            </div>

            <div className={styles.info}>
                <Link
                    to={`/music/playlists/${props.playlistId}`}
                    key={props.playlistId}
                >
                    <div className={styles.playlistName} title={props.title}>
                        {props.title}
                    </div>
                </Link>

                <div className={styles.creator}>{props.description}</div>
            </div>
        </div>
    );
};

export default Playlist;
