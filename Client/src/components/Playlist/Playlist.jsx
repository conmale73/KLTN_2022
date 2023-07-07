import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Playlist.module.scss";
function Playlist(props) {
    return (
        <Link to={`/${props.category}/${props.region}/${props.slug}`}>
            <div className={styles.playlist}>
                <div className={styles.playlistImage}>
                    <img src={props.image} />
                </div>
                <div className={styles.info}>
                    <div className={styles.playlistName}>
                        {props.playlistName}
                    </div>
                    <div className={styles.creator}>{props.creator}</div>
                </div>
            </div>
        </Link>
    );
}
export default Playlist;
