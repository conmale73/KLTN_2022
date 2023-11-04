import styles from "./SongDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { songService } from "../../services";
import { Suspense, lazy, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
const LongSong = lazy(() => import("../../components/Song/SongLong"));
import SongRelated from "./SongRelated";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../redux/listSong/listSongSlice";
import { useSongContext } from "../../context/SongContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import io from "socket.io-client";

const SongDetail = (props) => {
    let { id } = useParams();

    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();

    useEffect(() => {
        // Connect to the Socket.IO server (use your server URL)
        const socket = io("http://localhost:3000"); // Replace with your server URL

        // Handle events or emit data to the server as needed
        socket.on("customEvent", (data) => {
            console.log("Received data from the server:", data);
        });

        // Clean up when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["songDetail", id],
        queryFn: () =>
            songService.getYoutubeSongMetadata(id).then((res) => res.data),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;

    const songToAdd = {
        videoId: data?.videoId,
        title: data?.title,
        album: data?.album,
        thumbnails: data?.thumbnails,
        url: "https://www.youtube.com/watch?v=" + data?.videoId,
        artists: data?.artists,
        duration: data?.duration,
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

    return (
        <div className={styles.songDetail}>
            <div className={styles.selectedSong}>
                <div className={styles.songImage}>
                    <img
                        src={
                            data?.thumbnails[4]?.url ||
                            data?.thumbnails[3]?.url ||
                            data?.thumbnails[2]?.url ||
                            data?.thumbnails[1]?.url
                        }
                        alt={data?.title}
                    />

                    <BsPlayCircle
                        size="40px"
                        className={styles.imagePlayButton}
                        onClick={(e) => handleClickPlay(e)}
                    />
                </div>
                <div className={styles.songInfo}>
                    <div className={styles.songName}>{data?.title}</div>
                    <div className={styles.artistList}>
                        {data?.artists?.map((artist, index) => (
                            <Link to={`/music/users/${artist.id}`}>
                                <p
                                    key={index}
                                    className={styles.artist}
                                    title={artist.name}
                                >
                                    {artist.name}
                                    {index < data?.artists.length - 1 ? (
                                        <span> </span>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </Link>
                        ))}
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
                    <div className={styles.toolButtons}>
                        {/* <div
                                    className={styles.likeButton}
                                    onClick={(e) => handleClickLike(e)}
                                >
                                    {liked ? (
                            <AiFillHeart size="25px" />
                        ) : (
                            <AiOutlineHeart size="25px" />
                        )}
                                </div> */}
                        <div className={styles.optionsButton}>
                            <SlOptions
                                size="25px"
                                className={styles.optionsButton}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.listSong}>
                <div className={styles.selectedSongList}>
                    <Suspense fallback={<Loading />}>
                        <LongSong
                            videoId={data?.videoId}
                            title={data?.title}
                            artists={data?.artists}
                            thumbnails={data?.thumbnails}
                            album={data?.album}
                        />
                    </Suspense>
                </div>
                <p className={styles.para}>YOU MAY LIKE</p>
                <div className={styles.listSongBody}>
                    <SongRelated id={data?.videoId} />
                </div>
            </div>
        </div>
    );
};
export default SongDetail;
