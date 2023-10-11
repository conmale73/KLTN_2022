import styles from "./SongsSearchResult.module.scss";
import LongSong from "../../../components/Song/SongLong";
import { searchService } from "../../../services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";

const SongsSearchResult = (props) => {
    const query = useSelector((state) => state.search.input);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchData() {
        try {
            const response = await searchService.search(
                query,
                "songs",
                "VN",
                "en"
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
        setLoading(true);
    }, [query]);

    return (
        <>
            {loading ? (
                <Loading isFullScreen={true} />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={styles.songsSearchResult}>
                    {searchResults.map((song, index) => {
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
                </div>
            )}
        </>
    );
};
export default SongsSearchResult;
