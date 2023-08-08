import "./ListComponent.scss";
import MediumSong from "../Song/Song(Medium)";
import Playlist from "../Playlist";
import SingerComponent from "../Singer";
import { useState } from "react";
const ListComponent = (props) => {
    const isInlineSong = props.isInlineSong;
    const [songs, setSongs] = useState(props);

    const isInlinePlaylist = props.isInlinePlaylist;
    const playlists = props.playlists;

    const isInlineSinger = props.isInlineSinger;
    const singers = props.singers;
    return (
        <>
            <div className="listComponent">
                {isInlineSong ? (
                    <div className="inlineList">
                        {songs.map((song) => (
                            <MediumSong {...song} />
                        ))}
                    </div>
                ) : isInlinePlaylist ? (
                    <div className="inlineListPlaylist">
                        {playlists.map((playlist) => (
                            <Playlist {...playlist} />
                        ))}
                    </div>
                ) : isInlineSinger ? (
                    <div className="inlineListSinger">
                        {singers.map((singer) => (
                            <SingerComponent {...singer} />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
export default ListComponent;
