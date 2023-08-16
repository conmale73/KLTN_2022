import styles from "./SongsSearchResult.module.scss";
import LongSong from "../../../components/Song/Song(Long)";
import { searchService } from "../../../services";
import { useEffect, useState } from "react";

const SongsSearchResult = (props) => {
    const { query } = props;
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
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
            }
        }
        fetchData();
    }, [query]);
    useEffect(() => {
        console.log("searchResults: ", searchResults);
    }, [searchResults]);
    return (
        <div className={styles.songsSearchResult}>
            {searchResults.map((song) => {
                return (
                    <LongSong
                        _id={song?.videoId}
                        songName={song?.title}
                        artists={song?.artists[0]?.name}
                        songImage={song?.thumbnails[1]?.url}
                        album={song?.album?.name}
                        duration={song?.duration}
                        category={song?.category}
                        liked={song?.liked}
                    />
                );
            })}
        </div>
    );
};
export default SongsSearchResult;