import clsx from "clsx";
import styles from "./footer.module.scss";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import AudioPlayer from "../AudioPlayer";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useSongContext } from "../../context/SongContext";

function Footer() {
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();

    const soundList =
        useSelector((state) => state.listSongs.list) ||
        localStorage.getItem("listSongs") ||
        [];

    const [volumeSlider, setVolumeSlider] = useState(
        localStorage.getItem("volume")
    );

    const [mute, setMute] = useState(false);
    const handleClickVolume = (e) => {
        if (!mute) {
            setMute(true);
            setVolumeSlider(0);
        } else {
            setMute(false);
            setVolumeSlider(localStorage.getItem("volume"));
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <div className={styles.leftContainer}>
                    <div
                        className={clsx("items-center", styles.imageContainer)}
                    >
                        <img
                            className="object-cover"
                            src={
                                soundList[currentSongIndex]?.songImage || "null"
                            }
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <div
                            className={styles.name}
                            title={soundList[currentSongIndex]?.songName}
                        >
                            {soundList[currentSongIndex]?.songName}
                        </div>
                        <div
                            className={styles.artist}
                            title={soundList[currentSongIndex]?.artistID}
                        >
                            {soundList[currentSongIndex]?.artistID}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.middle}>
                <AudioPlayer
                    soundList={soundList}
                    currentSongIndex={currentSongIndex}
                    volume={volumeSlider}
                />
            </div>

            <div className={styles.right}>
                <div className={styles.volumeContainer}>
                    <div
                        className={styles.volumeIcon}
                        onClick={(e) => handleClickVolume(e)}
                    >
                        {mute ? (
                            <GiSpeakerOff size="24px" />
                        ) : (
                            <GiSpeaker size="24px" />
                        )}
                    </div>
                    <input
                        className={styles.volumeBar}
                        type="range"
                        min="0"
                        value={volumeSlider}
                        max="1"
                        step="0.01"
                        onChange={(e) => {
                            setVolumeSlider(e.target.value);
                            localStorage.setItem("volume", e.target.value);
                        }}
                    />
                </div>
            </div>
        </footer>
    );
}
export default Footer;
