import "./Song(Medium).scss";
import { Link } from "react-router-dom";
function MediumSong(props) {
    return (
        <Link to={`/${props.category}/${props.region}/${props.slug}`}>
            <div className="mediumSong">
                <div className="songImage">
                    <img src={props.image} />
                </div>
                <div className="info">
                    <div className="songName">{props.songName}</div>
                    <Link to={`/artist/${props.artistSlug}`}>
                        <div className="artist">{props.artist}</div>
                    </Link>
                </div>
            </div>
        </Link>
    );
}
export default MediumSong;
