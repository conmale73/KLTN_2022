import { useState, useEffect, useRef } from "react";
import styles from "./AudioPlayer.module.scss";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import ReactPlayer from "react-player";
import Duration from "./Duration";

const AudioPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRepeat, setIsRepeat] = useState("off");
    const [isRandom, setIsRandom] = useState(false);
    const [loop, setLoop] = useState(false);

    const playerRef = useRef(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(
        props.currentSongIndex
    );

    const playNextSong = () => {
        if (isRandom) {
            const nextSongIndex = Math.floor(
                Math.random() * props.soundList.length
            );
            setCurrentSongIndex(nextSongIndex);
            setIsPlaying(true);
        } else if (isRepeat === "off") {
            const nextSongIndex = currentSongIndex + 1;
            setCurrentSongIndex(nextSongIndex);
            setIsPlaying(true);
        }
        {
            const nextSongIndex =
                (currentSongIndex + 1) % props.soundList.length;
            setCurrentSongIndex(nextSongIndex);
            setIsPlaying(true);
        }
    };

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
    };

    const handleDuration = (duration) => {
        setDuration(duration);
    };

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
        } else {
            setIsPlaying(false);
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
    const handleClickNext = () => {
        playNextSong();
    };
    const handleClickPrev = () => {
        if (currentTime > 5) {
            playerRef.current.seekTo(0);
            setCurrentTime(0);
        } else if (currentTime < 5) {
            const previousSongIndex =
                (currentSongIndex - 1 + props.soundList.length) %
                props.soundList.length;
            setCurrentSongIndex(previousSongIndex);
            playerRef.current.url = props.soundList[previousSongIndex].src;
        }
    };
    const handleOnEnded = () => {
        if (isRepeat === "once") {
            setIsPlaying(true);
            playerRef.current.seekTo(0);
        } else if (isRepeat === "all") {
            setIsPlaying(true);
            playNextSong();
        } else if (isRepeat === "off") {
            setIsPlaying(false);
        }
    };
    return (
        <div className={styles.audioPlayer}>
            <ReactPlayer
                ref={playerRef}
                url={props.soundList[currentSongIndex].src}
                volume={props.volume}
                onEnded={handleOnEnded}
                onProgress={handleProgress}
                onDuration={handleDuration}
                width="0px"
                height="0px"
                loop={loop}
                playing={isPlaying}
            />
            <div className={styles.controllerButtons}>
                <div onClick={(e) => handleClickRandom(e)}>
                    {isRandom ? (
                        <FaRandom size="24px" color="#1db954" />
                    ) : (
                        <FaRandom size="24px" />
                    )}
                </div>

                <div onClick={(e) => handleClickPrev(e)}>
                    <BiSkipPrevious size="30px" />
                </div>
                <div onClick={(e) => handleClickPlay(e)}>
                    {isPlaying ? (
                        <BsFillPauseFill size="50px" />
                    ) : (
                        <BsFillPlayFill size="50px" />
                    )}
                </div>

                <div
                    onClick={(e) => {
                        handleClickNext(e);
                    }}
                >
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
                    <Duration seconds={currentTime} />
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    default="0"
                    value={currentTime}
                    className={styles.timeline}
                    step="0.1"
                    onClick={(e) => {
                        playerRef.current.seekTo(currentTime, "seconds");
                    }}
                    onMouseDown={(e) => {
                        setIsPlaying(false);
                    }}
                    onChange={(e) => {
                        setCurrentTime(e.target.value);
                        playerRef.current.seekTo(currentTime, "seconds");
                    }}
                    onMouseUp={(e) => {
                        setIsPlaying(true);
                    }}
                />

                <div className={styles.timerRight}>
                    <Duration seconds={duration} />
                </div>
            </div>
        </div>
    );
};
export default AudioPlayer;
