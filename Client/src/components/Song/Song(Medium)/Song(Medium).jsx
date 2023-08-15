import "./Song(Medium).scss";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addSong,
    removeSong,
    changeCurrentSong,
} from "../../../redux/listSong/listSongSlice";
import { useSongContext } from "../../../context/SongContext";
function MediumSong(props) {
    const dispatch = useDispatch();
    const songsList = useSelector((state) => state.listSongs.list);
    const {
        currentSong,
        setCurrentSong,
        currentSongIndex,
        setCurrentSongIndex,
    } = useSongContext();
    const {
        _id,
        songName,
        songImage,
        songSlug,
        artistID,
        lyrics,
        category,
        region,
        likes,
    } = props;

    const songToAdd = {
        _id,
        songName,
        songImage,
        songSlug,
        artistID,
        lyrics,
        category,
        region,
        likes,
    };

    const addToList = (song) => {
        if (dispatch(addSong(song)) && songsList.length === 0) {
            console.log("add: ", song);
            dispatch(changeCurrentSong(song));
            setCurrentSongIndex(0);
            setCurrentSong(song);
        }
    };
    const handleClickPlay = (e) => {
        e.preventDefault();
        addToList(songToAdd);
    };
    return (
        <>
            <Link
                to={`/music/${props.category}/${props.region}/${props._id}/${props.songSlug}`}
            >
                <div className="mediumSong">
                    <div className="songImageContainer">
                        <img src={props.songImage} className="songImage" />
                        <div
                            className="playButton"
                            key={props.id}
                            onClick={(e) => handleClickPlay(e)}
                        >
                            <FaPlay size="20px" title="Add to Now Playing" />
                        </div>
                    </div>
                    <div className="info">
                        <div className="songName" title={props.songName}>
                            {props.songName}
                        </div>
                        <Link to={`/music/artist/${props.artistSlug}`}>
                            <div className="artist">{props.artists}</div>
                        </Link>
                    </div>
                </div>
            </Link>
        </>
    );
}
export default MediumSong;
