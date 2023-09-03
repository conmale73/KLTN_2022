import styles from "./SongDetail.module.scss";
import { BsPlayCircle, BsFillPlayFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import { getSongDetail } from "../../redux/song/songsSlice";
import { songService } from "../../services";
import { useState, useEffect, Suspense, lazy } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
const LongSong = lazy(() => import("../../components/Song/SongLong"));
import SongRelated from "./SongRelated";

const SongDetail = (props) => {
    let { id } = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            const res = await songService.getYoutubeSongMetadata(id);
            setData(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();

        if (data != undefined || null) {
            setLoading(true);
        }
    }, [id]);

    return (
        <div className={styles.songDetail}>
            {loading ? (
                <Loading isFullScreen={true} />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
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
                            />
                        </div>
                        <div className={styles.songInfo}>
                            <div className={styles.songName}>{data?.title}</div>
                            <div className={styles.artistList}>
                                {data?.artists?.map((artist, index) => (
                                    <Link to={`/music/artists/${artist.id}`}>
                                        <p
                                            key={index}
                                            className={styles.artist}
                                            title={artist.name}
                                        >
                                            {artist.name}
                                            {index <
                                            data?.artists.length - 1 ? (
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
                            <div className={styles.playButton}>
                                <BsFillPlayFill
                                    size="30px"
                                    className={styles.buttonIcon}
                                />

                                <p className={styles.buttonText}>Play</p>
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
                                    <SlOptions size="25px" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.listSong}>
                        <div className={styles.listSongHeader}>
                            <p className={styles.infoCollumn}>Name</p>
                            <p className={styles.durationCollumn}></p>
                            <p className={styles.albumCollumn}>Album</p>
                            <p className={styles.buttonsCollumn}></p>
                        </div>
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
                </>
            )}
        </div>
    );
};
export default SongDetail;
