import clsx from "clsx";
import styles from "./footer.module.scss";
import { useState, useEffect } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import useSound from "use-sound";
import ReactPlayer from "react-player";
const soundList = [
    {
        id: 0,
        name: "Daylight",
        artist: "David Kushner",
        cover: "/photos/Daylight_DavidKushner.jpg",
        src: "http://localhost:3000/music/David Kushner Daylight.mp3",
    },
    {
        id: 1,
        name: "Take Me To Church",
        artist: "Hozier",
        cover: "/photos/TakeMeToChurch_Hozier.jpg",
        src: "http://localhost:3000/music/Take Me To Church Hozier.mp3",
    },
    {
        id: 2,

        name: "Aloha",
        artist: "Cool",
        cover: "/photos/Aloha_Cool.jpg",
        src: "http://localhost:3000/music/aloha.mp3",
    },
];
function Footer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState("off");
    const [isRandom, setIsRandom] = useState(false);

    const [volumeSlider, setVolumeSlider] = useState(
        localStorage.getItem("volume")
    );
    const [mute, setMute] = useState(false);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const [play, { stop, pause, duration, sound }] = useSound(
        soundList[currentSongIndex].src,
        {
            volume: volumeSlider,
            interrupt: false,
            onend: () => {
                setIsPlaying(false);
                playNextSong();
            },
        }
    );
    const playNextSong = () => {
        const nextSongIndex = (currentSongIndex + 1) % soundList.length;
        setCurrentSongIndex(nextSongIndex);
        setIsPlaying(true);
        stop();
        play();
    };

    const [seconds, setSeconds] = useState();
    const [currTime, setCurrTime] = useState({
        min: "0",
        sec: "0",
    });
    const [time, setTime] = useState({
        min: "0",
        sec: "0",
    });

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain,
            });
        }
        console.log("isPlaying: ", isPlaying);
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const handleClickRandom = (e) => {
        if (isRandom === false) {
            setIsRandom(true);
        } else {
            setIsRandom(false);
        }
    };
    const handleClickPlay = (e) => {
        if (!isPlaying) {
            setIsPlaying(true);
            play();
        } else {
            setIsPlaying(false);
            pause();
        }
    };
    const handleClickNext = (e) => {
        if (isRandom) {
            setIsPlaying(false);
            const randomIndex = Math.floor(Math.random() * soundList.length);
            setCurrentSongIndex(randomIndex);
        } else {
            pause();
            playNextSong();
        }
    };
    const handleClickRepeat = (e) => {
        if (isRepeat === "off") {
            setIsRepeat("once");
        } else if (isRepeat === "once") {
            setIsRepeat("all");
        } else {
            setIsRepeat("off");
        }
    };
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
                            src="/photos/TakeMeToChurch_Hozier.jpg"
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.name}>Take me to church</div>
                        <div className={styles.artist}>Hozier</div>
                    </div>
                </div>
            </div>

            <div className={styles.middle}>
                <div className={styles.controllerButtons}>
                    <div onClick={(e) => handleClickRandom(e)}>
                        {isRandom ? (
                            <FaRandom size="24px" color="#1db954" />
                        ) : (
                            <FaRandom size="24px" />
                        )}
                    </div>

                    <BiSkipPrevious size="30px" />
                    <div onClick={(e) => handleClickPlay(e)}>
                        {isPlaying ? (
                            <BsFillPauseFill size="50px" />
                        ) : (
                            <BsFillPlayFill size="50px" />
                        )}
                    </div>

                    <div onClick={(e) => handleClickNext(e)}>
                        <BiSkipNext size="30px" />
                    </div>
                    <div onClick={(e) => handleClickRepeat(e)}>
                        {isRepeat === "off" ? (
                            <TbRepeatOff size="24px" />
                        ) : isRepeat === "once" ? (
                            <TbRepeatOnce size="24px" color="#1db954" />
                        ) : (
                            <TbRepeat size="24px" color="#1db954" />
                        )}
                    </div>
                </div>
                <div className={styles.progressBarContainer}>
                    <div className={styles.timerLeft}>
                        {currTime.min}:{currTime.sec}
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        value={seconds}
                        className={styles.timeline}
                        step="0.1"
                        onChange={(e) => {
                            setIsPlaying(false);
                            pause();
                            sound.seek([e.target.value]);
                        }}
                        onMouseUp={(e) => {
                            play();
                            setIsPlaying(true);
                        }}
                    />

                    <div className={styles.timerRight}>
                        {time.min}:{time.sec}
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <ReactPlayer
                    url={soundList[currentSongIndex].src}
                    controls={true}
                    width="200px"
                    height="30px"
                    playing
                />
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
