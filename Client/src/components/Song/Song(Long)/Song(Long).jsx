import styles from "./Song(Long).module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import { BsPlayFill } from "react-icons/bs";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../../redux/listSong/listSongSlice";
import { useSongContext } from "../../../context/SongContext";
import { useDispatch, useSelector } from "react-redux";
const LongSong = (props) => {
    const [liked, setLiked] = useState(props.liked);

    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();

    const {
        _id,
        songName,
        album,
        songImage,
        artists,
        category,
        duration,
        like,
    } = props;

    const songToAdd = {
        _id,
        songName,
        album,
        songImage,
        url: "https://www.youtube.com/watch?v=" + _id,
        artists,
        category,
        duration,
        like,
    };

    const handleClickPlay = (e) => {
        e.preventDefault();
        if (dispatch(addSong(songToAdd)) && songsList.length === 0) {
            console.log("add: ", songToAdd);
            dispatch(changeCurrentSong(songToAdd));
            setCurrentSongIndex(0);
            setCurrentSong(songToAdd);
        }
    };

    const handleClickLike = (e) => {
        e.preventDefault();
        setLiked(!liked);
    };

    return (
        <div className={styles.longSong}>
            <div className={styles.imageContainer} title={props.songName}>
                <img src={props.songImage} alt={props.songName} />
                <div className={styles.playButtonContainer}>
                    <BsPlayFill
                        size="30px"
                        className={styles.playButton}
                        onClick={(e) => handleClickPlay(e)}
                    />
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.name}>{props.songName}</div>
                <div className={styles.artist}>{props.artists}</div>
            </div>
            <div className={styles.durationContainer}>
                <p className={styles.duration}>{props.duration}</p>
            </div>
            <div className={styles.albumContainer}>
                <p className={styles.album}>{props.album}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <div
                    className={styles.likeButton}
                    onClick={(e) => handleClickLike(e)}
                >
                    {liked ? (
                        <AiFillHeart size="25px" />
                    ) : (
                        <AiOutlineHeart size="25px" />
                    )}
                </div>
                <div className={styles.optionsButton}>
                    <SlOptions size="25px" />
                </div>
                <div className={styles.deleteButton}>
                    <RxCross2 size="25px" />
                </div>
            </div>
        </div>
    );
};
export default LongSong;
