import React from "react";
import { Link } from "react-router-dom";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./Playlist.module.scss";

const Playlist = (props) => {
    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("play: ", props.id);
    };

    return (
        <Link
            to={`/music/${props.category}/${props.region}/${props.slug}`}
            key={props.id}
        >
            <div className={styles.playlist}>
                <div className={styles.playlistImage}>
                    <img src={props.image} alt="" />
                </div>

                <div className={styles.playButtonContainer}>
                    <div
                        className={styles.playButton}
                        key={props.id}
                        onClick={(e) => handleClickPlay(e)}
                    >
                        <BsPlayCircleFill size="40px" />
                    </div>
                </div>

                <div className={styles.info}>
                    <Link
                        to={`/music/${props.category}/${props.region}/${props.slug}`}
                        key={props.id}
                    >
                        <div className={styles.playlistName}>
                            {props.playlistName}
                        </div>
                    </Link>
                    <Link to={`/user/${props.creatorID}`}>
                        <div className={styles.creator}>{props.creator}</div>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default Playlist;
