import "./ListSong.scss";
import MediumSong from "../Song/Song(Medium)";
import Playlist from "../Playlist";
function ListSong(props) {
    const isInlineSong = props.isInlineSong;
    const songs = props.songs;

    const isInlinePlaylist = props.isInlinePlaylist;
    const playlists = props.playlists;
    return (
        <>
            <div className="listSong">
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
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}
export default ListSong;
