import styles from "./PlaylistsSearchResult.module.scss";
import ListPlaylists from "../../../components/ListComponent/ListPlaylists";
import { searchService } from "../../../services";
import { useState, useEffect } from "react";

const PlaylistsSearchResult = (props) => {
    const { query } = props;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await searchService.search(
                    query,
                    "playlists",
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
        <div className={styles.playlistsSearchResult}>
            <ListPlaylists playlists={searchResults} isInlinePlaylist={true} />
        </div>
    );
};
export default PlaylistsSearchResult;
