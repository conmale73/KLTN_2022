import clsx from "clsx";
import styles from "./footer.module.scss";
import { useState, useEffect } from "react";
import AudioPlayer from "../AudioPlayer";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useSongContext } from "../../context/SongContext";
import { Link } from "react-router-dom";

function Footer() {
    const { currentSongIndex, setCurrentSongIndex } = useSongContext();

    const soundList =
        useSelector((state) => state.listSongs.list) ||
        localStorage.getItem("listSongs") ||
        [];
    let currentSongRedux = useSelector((state) => state.listSongs.currentSong);
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
                                currentSongRedux?.thumbnails[0]?.url ||
                                currentSongRedux?.thumbnails[1]?.url ||
                                "null"
                            }
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <Link to={`/music/songs/${currentSongRedux?.videoId}`}>
                            <div
                                className={styles.name}
                                title={currentSongRedux?.title}
                            >
                                {currentSongRedux?.title}
                            </div>
                        </Link>

                        <div className={styles.artistList}>
                            {currentSongRedux?.artists.map((artist, index) => (
                                <Link to={`/music/artists/${artist.id}`}>
                                    {artist.id !== null ? (
                                        <p
                                            key={index}
                                            className={styles.artist}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                            {index <
                                            currentSongRedux.artists.length -
                                                1 ? (
                                                <span> </span>
                                            ) : (
                                                ""
                                            )}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </Link>
                            ))}
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
