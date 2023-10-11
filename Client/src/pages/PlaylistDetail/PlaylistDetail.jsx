import styles from "./PlaylistDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { playlistService } from "../../services";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import LongSong from "../../components/Song/SongLong";

import {
    addSong,
    removeSong,
    changeCurrentSong,
    clearListSong,
} from "../../redux/listSong/listSongSlice";
import { useSongContext } from "../../context/SongContext";

const PlaylistDetail = (props) => {
    let { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    async function fetchData() {
        try {
            const res = await playlistService.getYoutubePlaylist(id);
            setData(res.data);
            console.log("playlist data: ", data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        if (data) {
            setLoading(true);
        }
    }, [id]);

    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
    } = useSongContext();

    const handleClickPlay = (e) => {
        let index = 0;
        dispatch(clearListSong());
        while (index < data?.tracks?.length) {
            const songToAdd = {
                videoId: data?.tracks[index]?.videoId,
                title: data?.tracks[index]?.title,
                album: data?.tracks[index]?.album,
                thumbnails: data?.tracks[index]?.thumbnails,
                url:
                    "https://www.youtube.com/watch?v=" +
                    data?.tracks[index]?.videoId,
                artists: data?.tracks[index]?.artists,
                category: data?.tracks[index]?.category,
                duration: data?.tracks[index]?.duration,
            };
            dispatch(addSong(songToAdd));
            index++;
        }
        dispatch(changeCurrentSong(data?.tracks[0]));
        setCurrentSongIndex(0);
        setCurrentSong(data?.tracks[0]);
        setIsPlaying(true);
    };
    return (
        <div className={styles.playlistDetail}>
            {loading ? (
                <Loading isFullScreen={true} />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className={styles.playlistInfo}>
                        <div className={styles.imageContainer}>
                            <img
                                src={
                                    data?.thumbnails[3]?.url ||
                                    data?.thumbnails[2]?.url ||
                                    data?.thumbnails[1]?.url ||
                                    data?.thumbnails[0]?.url
                                }
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.title}>{data?.title}</p>
                            <div className={styles.metadata}>
                                <div className={styles.row}>
                                    <span className={styles.text}>
                                        Playlist
                                    </span>
                                    <span className={styles.dot}>•</span>
                                    {data?.author?.id != null ? (
                                        <Link
                                            to={`/music/users/${data?.author?.id}`}
                                        >
                                            <span
                                                className={`${styles.text} ${styles.underline}`}
                                            >
                                                {data?.author?.name}
                                            </span>
                                        </Link>
                                    ) : (
                                        <span className={styles.text}>
                                            {data?.author?.name}
                                        </span>
                                    )}

                                    <span className={styles.dot}>•</span>
                                    <span className={styles.text}>
                                        {data?.year}
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    {data?.views != null && (
                                        <>
                                            <span className={styles.text}>
                                                {`${data?.views}k views`}
                                            </span>
                                            <span className={styles.dot}>
                                                •
                                            </span>
                                        </>
                                    )}

                                    <span className={styles.text}>
                                        {`${data?.trackCount} songs`}
                                    </span>
                                    <span className={styles.dot}>•</span>
                                    <span className={styles.text}>
                                        {data?.duration}
                                    </span>
                                </div>
                                <div className={styles.description}>
                                    {data?.description}
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <div
                                className={styles.playButton}
                                onClick={(e) => handleClickPlay(e)}
                            >
                                <BsFillPlayFill
                                    size="30px"
                                    className={styles.playIcon}
                                />
                                <p className={styles.playText}>Play</p>
                            </div>
                            <div className={styles.saveButton}>
                                <MdOutlineLibraryAdd
                                    size="30px"
                                    className={styles.saveIcon}
                                />
                                <p className={styles.saveText}>
                                    Save to Library
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.listSong}>
                        <div className={styles.listSongBody}>
                            {data?.tracks?.map((item, index) => (
                                <LongSong
                                    key={index}
                                    videoId={item?.videoId}
                                    title={item?.title}
                                    album={item?.album}
                                    artists={item?.artists}
                                    duration={item?.duration}
                                    thumbnails={item?.thumbnails}
                                    buttons={false}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default PlaylistDetail;
