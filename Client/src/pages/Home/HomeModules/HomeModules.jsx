import styles from "./HomeModules.module.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShortSmallSong from "../../../components/Song/SongShortSmall";
import ListPlaylists from "../../../components/ListComponent/ListPlaylists";
import ListSongs from "../../../components/ListComponent/ListSongs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const HomeModules = (props) => {
    const [contents, setContents] = useState(props.data);

    return (
        <>
            {contents.map((content, index) => (
                <div className={styles.homeModules}>
                    <div className={styles.homeModules__title}>
                        {content.title}
                    </div>
                    <div className={styles.contents}>
                        {index == 0 ? ( // Quick Picks
                            <div className={styles.quickPicks}>
                                <div className={styles.quickPicksItemsWrapper}>
                                    <div className={styles.quickPicksItems}>
                                        {content.contents.map((item) => (
                                            <ShortSmallSong item={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                        uniqueId={`playlist-swiper-${index}`} // Pass a unique ID for each Swiper
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                        uniqueId={`song-swiper-${index}`} // Pass a unique ID for each Swiper
                                    />
                                )}
                            </div>
                        )}

                        {/* {content == contents[2] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[3] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[4] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[5] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[6] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[7] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[8] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[9] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )}
                        {content == contents[10] && (
                            <div className={styles.content}>
                                {content.contents[0].playlistId ? (
                                    <ListPlaylists
                                        isSlidePlaylist={true}
                                        playlists={content.contents}
                                    />
                                ) : (
                                    <ListSongs
                                        isSlideSong={true}
                                        songs={content.contents}
                                    />
                                )}
                            </div>
                        )} */}
                    </div>
                </div>
            ))}
        </>
    );
};
export default HomeModules;
