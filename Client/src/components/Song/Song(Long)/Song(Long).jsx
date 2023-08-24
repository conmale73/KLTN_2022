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
    const [liked, setLiked] = useState(props.liked);
    const isInHistory = props.isInHistory;

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
        <div className={styles.longSong}>
            <div className={styles.imageContainer} title={props.title}>
                <img src={props.thumbnails[0]?.url} alt={props.title} />
                <div className={styles.playButtonContainer}>
                    <BsPlayFill
                        size="30px"
                        className={styles.playButton}
                        onClick={(e) => handleClickPlay(e)}
                    />
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.name}>{props.title}</div>
                <div className={styles.artistList}>
                    {props.artists.map((artist, index) => (
                        <Link to={`/music/artists/?id=${artist.id}`}>
                            {artist.id !== null ? (
                                <p
                                    key={index}
                                    className={styles.artist}
                                    title={artist.name}
                                >
                                    {artist.name}
                                    {index < props.artists.length - 1 ? (
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
            <div className={styles.durationContainer}>
                <p className={styles.duration}>{props.duration}</p>
            </div>
            <div className={styles.albumContainer}>
                <p className={styles.album}>{props.album}</p>
            </div>

            {isInHistory && (
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
            )}
        </div>
    );
};
export default LongSong;
