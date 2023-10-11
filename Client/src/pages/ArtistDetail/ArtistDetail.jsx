import styles from "./ArtistDetail.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { browseService } from "../../services";
import Loading from "../../components/Loading";
import LongSong from "../../components/Song/SongLong";
import { Link } from "react-router-dom";
import ListPlaylists from "../../components/ListComponent/ListPlaylists";
import ListSongs from "../../components/ListComponent/ListSongs";
import Artist from "../../components/Artist";
const ArtistDetail = (props) => {
    const { id } = useParams();
    const [artist, setArtist] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [more, setMore] = useState(false);
    async function getArtist() {
        try {
            const res = await browseService.getArtist(id);
            setArtist(res.data);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true);
        getArtist();
        console.log(artist);
    }, [id]);
    const handleClickShowMore = (e) => {
        e.preventDefault();
        setMore(!more);
    };
    return (
        <div className={styles.artistDetail}>
            {loading ? (
                <Loading isFullScreen={true} />
            ) : error ? (
                <div>{error.toString()}</div>
            ) : (
                <>
                    <div className={styles.bigThumbnail}>
                        <div
                            className={styles.overlay}
                            style={
                                more ? { height: "100%" } : { height: "80%" }
                            }
                        ></div>
                        <img
                            src={artist?.thumbnails[2].url}
                            alt={artist?.name}
                        />
                        <div className={styles.description}>
                            <div className={styles.artistName}>
                                {artist?.name}
                            </div>
                            <div className={more ? styles.more : styles.less}>
                                {artist?.description}
                            </div>
                            <div
                                className={styles.readMore}
                                onClick={(e) => handleClickShowMore(e)}
                            >
                                {more ? "Show less" : "Show more"}
                            </div>
                        </div>
                    </div>
                    <div className={styles.listSongs}>
                        <div className={styles.title}>Songs</div>
                        <>
                            {artist?.songs?.results?.map((song, index) => {
                                return (
                                    <LongSong
                                        key={index}
                                        videoId={song?.videoId}
                                        title={song?.title}
                                        artists={song?.artists}
                                        thumbnails={song?.thumbnails}
                                        album={song?.album}
                                        duration={song?.duration}
                                        category={song?.category}
                                        liked={song?.liked}
                                        buttons={false}
                                    />
                                );
                            })}
                        </>
                        {artist?.songs?.browseId && (
                            <div className={styles.showAllButton}>
                                <Link
                                    to={`/music/playlists/${artist?.songs.browseId}`}
                                >
                                    Show all
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.listAlbums}>
                        <div className={styles.title}>Albums</div>
                        <>
                            <ListPlaylists
                                isSlidePlaylist={true}
                                playlists={artist.albums.results}
                                uniqueId={`playlist-swiper-0`}
                            />
                        </>
                        {artist?.albums?.browseId && (
                            <div className={styles.showAllButton}>
                                <Link to={``}>Show all</Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.listSingles}>
                        <div className={styles.title}>Singles</div>
                        <>
                            <ListSongs
                                isSlideSong={true}
                                songs={artist?.singles.results}
                                uniqueId={`song-swiper-0`}
                            />
                        </>
                        {artist?.singles?.browseId && (
                            <div className={styles.showAllButton}>
                                <Link to={``}>Show all</Link>
                            </div>
                        )}
                    </div>
                    <div className={styles.relatedArtists}>
                        <div className={styles.title}>Fans might also like</div>
                        <div className={styles.relatedArtist}>
                            {artist?.related.results.map((artist, index) => {
                                return (
                                    <Artist
                                        key={index}
                                        id={artist?.browseId}
                                        name={artist?.title}
                                        thumbnails={artist?.thumbnails}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default ArtistDetail;
