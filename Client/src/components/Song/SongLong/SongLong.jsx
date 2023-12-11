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
import { Link } from "react-router-dom";

const LongSong = (props) => {
    const [liked, setLiked] = useState(props?.liked);
    const buttons = props?.buttons;

    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();

    const { videoId, title, album, thumbnails, artists, category, duration } =
        props;

    const songToAdd = {
        videoId,
        title,
        album,
        thumbnails,
        url: "https://www.youtube.com/watch?v=" + videoId,
        artists,
        category,
        duration,
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
        <>
            {props != undefined || null ? (
                <>
                    {!props.youtube ? (
                        <div className={styles.longSong} key={props.index}>
                            <div
                                className={styles.imageContainer}
                                title={props?.title}
                            >
                                <img
                                    src={
                                        props?.thumbnails[2]?.url ||
                                        props?.thumbnails[1]?.url ||
                                        props?.thumbnails[0]?.url
                                    }
                                    alt={props?.title}
                                />
                                <div className={styles.playButtonContainer}>
                                    <BsPlayFill
                                        size="30px"
                                        className={styles.playButton}
                                        onClick={(e) => handleClickPlay(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.infoContainer}>
                                <Link
                                    to={`/music/songs/${props?.videoId}`}
                                    className="w-fit h-fit"
                                >
                                    <div className={styles.name}>
                                        {props?.title}
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.artistList}>
                                {props?.artists?.map((artist, index) => (
                                    <Link
                                        to={`/music/artists/${artist.id}`}
                                        key={index}
                                    >
                                        {artist.id !== null ? (
                                            <p
                                                key={index}
                                                className={styles.artist}
                                                title={artist.name}
                                            >
                                                {artist.name}
                                                {index <
                                                props?.artists.length - 1 ? (
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
                            <div className={styles.albumContainer}>
                                <Link to={`/music/albums/${props?.album?.id}`}>
                                    <p className={styles.album}>
                                        {props?.album?.name}
                                    </p>
                                </Link>
                            </div>
                            {buttons && (
                                <div className={styles.buttonsContainer}>
                                    {/* <div
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
                    )}

                    <div className={styles.durationContainer}>
                        <p className={styles.duration}>{props?.duration}</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default LongSong;
