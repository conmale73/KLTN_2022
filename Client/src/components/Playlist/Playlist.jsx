import React from "react";
import { Link } from "react-router-dom";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./Playlist.module.scss";
import { parseStringToSlug } from "../../utils/parseStringToSlug";

const Playlist = (props) => {
    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("play: ", props.id);
    };
    console.log("props: ", props);
    return (
        <Link
            to={`/music/${parseStringToSlug(props.category.toString())}/${
                props.browseId
            }`}
            key={props.browseId}
        >
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
                    <div
                        className={styles.playButton}
                        key={props.browseId}
                        onClick={(e) => handleClickPlay(e)}
                    >
                        <BsPlayCircleFill size="40px" />
                    </div>
                </div>

                <div className={styles.info}>
                    <Link
                        to={`/music/${props.category}/${props.browseId}`}
                        key={props.browseId}
                    >
                        <div className={styles.playlistName}>{props.title}</div>
                    </Link>
                    <Link
                        to={`/user/${parseStringToSlug(
                            props.author.toString()
                        )}`}
                    >
                        <div className={styles.creator}>{props.author}</div>
                    </Link>
                </div>
            </div>
        </Link>
    );
};

export default Playlist;
