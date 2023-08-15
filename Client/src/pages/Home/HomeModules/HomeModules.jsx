import styles from "./HomeModules.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeModules = (props) => {
    const [contents, setContents] = useState(props.data);

    return (
        <>
            {contents.map((content) => (
                <div className={styles.homeModules}>
                    <div className={styles.homeModules__title}>
                        {content.title}
                    </div>
                    <div className={styles.contents}>
                        {content == contents[0] && ( // Quick Picks
                            <div className={styles.quickPicks}>
                                <div className={styles.quickPicksItemsWrapper}>
                                    <div className={styles.quickPicksItems}>
                                        {content.contents.map((item) => (
                                            <div
                                                className={
                                                    styles.quickPicksItem
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.imageContainer
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            item.thumbnails[0]
                                                                .url ||
                                                            item.thumbnails[1]
                                                                .url
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.infoContainer
                                                    }
                                                >
                                                    <Link
                                                        to={`/music/songs/?id=${item.videoId}`}
                                                    >
                                                        <div
                                                            className={
                                                                styles.title
                                                            }
                                                            title={item.title}
                                                        >
                                                            {item.title}
                                                        </div>
                                                    </Link>

                                                    <div
                                                        className={
                                                            styles.artistList
                                                        }
                                                    >
                                                        {item.artists.map(
                                                            (artist, index) => (
                                                                <Link
                                                                    to={`/music/artists/?id=${artist.id}`}
                                                                >
                                                                    <p
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={
                                                                            styles.artist
                                                                        }
                                                                        title={
                                                                            artist.name
                                                                        }
                                                                    >
                                                                        {
                                                                            artist.name
                                                                        }
                                                                        {index <
                                                                        item
                                                                            .artists
                                                                            .length -
                                                                            1 ? (
                                                                            <span>
                                                                                {" "}
                                                                                &{" "}
                                                                            </span>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </p>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {content == contents[1] && ( // Trending Community Playlists
                            <div className={styles.trendingCommPlaylist}></div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};
export default HomeModules;
