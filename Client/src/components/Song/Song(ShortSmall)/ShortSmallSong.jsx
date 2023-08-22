import styles from "./ShortSmallSong.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const ShortSmallSong = (props) => {
    const [item, setItem] = useState(props.item);

    const handleClickPlay = (e) => {
        e.preventDefault();
        console.log("Add to Now Playing: ", item.title);
    };
    return (
        <div className={styles.shortSmallSong}>
            <div className={styles.imageContainer}>
                <img
                    src={item.thumbnails[0].url || item.thumbnails[1].url}
                    alt=""
                />
                <div
                    className={styles.playButton}
                    key={props.videoId}
                    onClick={(e) => handleClickPlay(e)}
                >
                    <FaPlay size="20px" title="Add to Now Playing" />
                </div>
            </div>
            <div className={styles.infoContainer}>
                <Link to={`/music/songs/?id=${item.videoId}`}>
                    <div className={styles.title} title={item.title}>
                        {item.title}
                    </div>
                </Link>

                <div className={styles.artistList}>
                    {item.artists.map((artist, index) => (
                        <Link to={`/music/artists/?id=${artist.id}`}>
                            <p
                                key={index}
                                className={styles.artist}
                                title={artist.name}
                            >
                                {artist.name}
                                {index < item.artists.length - 1 ? (
                                    <span> & </span>
                                ) : (
                                    ""
                                )}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ShortSmallSong;
