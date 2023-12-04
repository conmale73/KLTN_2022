import styles from "./PlaylistsSearchResult.module.scss";
import ListPlaylists from "../../../components/ListComponent/ListPlaylists";
import { searchService } from "../../../services";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const PlaylistsSearchResult = (props) => {
    const { query } = props;

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["searchPlaylists", query],
        queryFn: () =>
            searchService
                .search(query, "playlists", "VN", "en")
                .then((res) => res.data),
    });
    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;
    return (
        <div className={styles.playlistsSearchResult}>
            <ListPlaylists playlists={data} isSlidePlaylist={true} />
        </div>
    );
};
export default PlaylistsSearchResult;
