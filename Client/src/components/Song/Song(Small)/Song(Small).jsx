import React from "react";
import styles from "./Song(Small).module.scss";
const SmallSong = (props) => {
    return (
        <div className={styles.smallSong} title={props.songName + " - " + props.artist}>
            <div className={styles.songImage}>
                <img src={props.image} />
            </div>
            <div className={styles.info}>
                <div className={styles.songName}>{props.songName}</div>
                <div className={styles.artist}>{props.artist}</div>
            </div>
        </div>
    );
};
export default SmallSong;
