import clsx from "clsx";
import styles from "./footer.module.scss";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import AudioPlayer from "../AudioPlayer";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

const soundList = [
    {
        id: 0,
        name: "Daylight",
        artist: "David Kushner",
        cover: "/photos/David_Kushner-_Daylight.png",
        src: "http://localhost:3001/music/David Kushner Daylight.mp3",
    },
    {
        id: 1,
        name: "Take Me To Church",
        artist: "Hozier",
        cover: "/photos/TakeMeToChurch_Hozier.jpg",
        src: "http://localhost:3001/music/Take Me To Church Hozier.mp3",
    },
    {
        id: 2,

        name: "Aloha",
        artist: "Cool",
        cover: "/photos/Aloha_Cool.jpg",
        src: "http://localhost:3001/music/aloha.mp3",
    },
];
function Footer() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState("off");
    const [isRandom, setIsRandom] = useState(false);

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
    const playNextSong = () => {
        const nextSongIndex = (currentSongIndex + 1) % soundList.length;
        setCurrentSongIndex(nextSongIndex);
        console.log("currentSongIndex: " + currentSongIndex);
        console.log("now playing: " + soundList[currentSongIndex].name);
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
                            src={soundList[currentSongIndex].cover}
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>
                            {soundList[currentSongIndex].name}
                        </div>
                        <div className={styles.artist}>
                            {soundList[currentSongIndex].artist}
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
