import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Playlist.module.scss';
function Playlist(props) {
    const [artists, setArtists] = useState([props.artist]);

    return (
        <Link to={`/${props.category}/${props.region}/${props.slug}`}>
            <div className={styles.playlist}>
                <div className={styles.playlistImage}>
                    <img src={props.image} />
                </div>
                <div className={styles.info}>
                    <div className={styles.playlistName}>{props.playlistName}</div>
                    {/* {artists.map((artist) =>
                        artist.map((a) => (
                            <Link to={`/artist/${a}`}>
                                <div className={styles.artist}>{`${a},`}</div>
                            </Link>
                        ))
                    )} */}
                </div>
            </div>
        </Link>
    );
}
export default Playlist;
