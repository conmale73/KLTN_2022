import styles from "./Song(Long).module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";
const LongSong = (props) => {
    const [liked, setLiked] = useState(props.liked);
    const handleClickLike = (e) => {
        e.preventDefault();
        setLiked(!liked);
    };
    return (
        <div className={styles.longSong}>
            <div className={styles.imageContainer} title={props.name}>
                <img src={props.cover} alt={props.name} />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.artist}>{props.artist}</div>
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
