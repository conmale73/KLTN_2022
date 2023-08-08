import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Song(Small).module.scss";
import clsx from "clsx";
import { BsPlayFill } from "react-icons/bs";
import { useSongContext } from "../../../context/SongContext";
import * as ContextMenu from "@radix-ui/react-context-menu";
import {
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";
import "./SongContextMenu.css";

import { addSong, removeSong } from "../../../redux/listSong/listSongSlice";
import { useDispatch, useSelector } from "react-redux";

const SmallSong = (props) => {
    const list = useSelector((state) => state.listSongs.list);
    const {
        isPlaying,
        setIsPlaying,
        currentSongIndex,
        setCurrentSongIndex,
        currentSong,
        setCurrentSong,
    } = useSongContext();

    const dispatch = useDispatch();
    let currentSongRedux = useSelector((state) => state.listSongs.currentSong);
    useEffect(() => {
        setCurrentSong(currentSongRedux);
    }, [currentSongRedux]);
    const handleClickPlay = () => {
        const song = list.find((song) => song._id === props._id);
        setCurrentSong(song);
        setCurrentSongIndex(list.indexOf(song));
        if (!isPlaying) {
            setIsPlaying(true); // Start playing the song
        }
    };

    const playingSongStyle = "#2c239c";

    const handleRemoveFromPlaylist = (e) => {
        try {
            dispatch(removeSong(props._id));
            console.log("Remove " + props.songName + " from playlist");
        } catch (err) {
            console.log(err);
        }
    };
    const [bookmarksChecked, setBookmarksChecked] = useState(true);
    const [urlsChecked, setUrlsChecked] = useState(false);
    const [person, setPerson] = useState("pedro");

    return (
        <>
            <ContextMenu.Root>
                <ContextMenu.Trigger>
                    <div
                        className={clsx(`${styles.smallSong}`)}
                        title={props.songName + " - " + props.artistID}
                        style={{
                            backgroundColor:
                                props._id === currentSong?._id
                                    ? playingSongStyle
                                    : null,
                        }}
                    >
                        <div className={styles.songImageContainer}>
                            <img
                                className={styles.songImage}
                                src={props.songImage}
                            />
                            <div className={styles.playButtonContainer}>
                                <BsPlayFill
                                    size="30px"
                                    className={styles.playButton}
                                    title={"Play " + props.songName}
                                    onClick={handleClickPlay}
                                />
                            </div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.songName}>
                                {props.songName}
                            </div>
                            <div className={styles.artist}>
                                {props.artistID}
                            </div>
                        </div>
                    </div>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                    <ContextMenu.Content
                        className="ContextMenuContent"
                        sideOffset={5}
                        align="end"
                    >
                        <ContextMenu.Item
                            className="ContextMenuItem"
                            onClick={(e) => handleRemoveFromPlaylist(e)}
                        >
                            Remove From Playlist
                        </ContextMenu.Item>
                        <ContextMenu.Item className="ContextMenuItem" disabled>
                            Foward
                        </ContextMenu.Item>
                        <ContextMenu.Item className="ContextMenuItem">
                            Reload
                        </ContextMenu.Item>
                        <ContextMenu.Sub>
                            <ContextMenu.SubTrigger className="ContextMenuSubTrigger">
                                More Tools
                                <div className="RightSlot">
                                    <ChevronRightIcon />
                                </div>
                            </ContextMenu.SubTrigger>
                            <ContextMenu.Portal>
                                <ContextMenu.SubContent
                                    className="ContextMenuSubContent"
                                    sideOffset={2}
                                    alignOffset={-5}
                                >
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Save Page As…{" "}
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Create Shortcut…
                                    </ContextMenu.Item>
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Name Window…
                                    </ContextMenu.Item>
                                    <ContextMenu.Separator className="ContextMenuSeparator" />
                                    <ContextMenu.Item className="ContextMenuItem">
                                        Developer Tools
                                    </ContextMenu.Item>
                                </ContextMenu.SubContent>
                            </ContextMenu.Portal>
                        </ContextMenu.Sub>

                        <ContextMenu.Separator className="ContextMenuSeparator" />

                        <ContextMenu.CheckboxItem
                            className="ContextMenuCheckboxItem"
                            checked={bookmarksChecked}
                            onCheckedChange={setBookmarksChecked}
                        >
                            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                <CheckIcon />
                            </ContextMenu.ItemIndicator>
                            Show Bookmarks <div className="RightSlot">⌘+B</div>
                        </ContextMenu.CheckboxItem>
                        <ContextMenu.CheckboxItem
                            className="ContextMenuCheckboxItem"
                            checked={urlsChecked}
                            onCheckedChange={setUrlsChecked}
                        >
                            <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                <CheckIcon />
                            </ContextMenu.ItemIndicator>
                            Show Full URLs
                        </ContextMenu.CheckboxItem>

                        <ContextMenu.Separator className="ContextMenuSeparator" />

                        <ContextMenu.Label className="ContextMenuLabel">
                            People
                        </ContextMenu.Label>
                        <ContextMenu.RadioGroup
                            value={person}
                            onValueChange={setPerson}
                        >
                            <ContextMenu.RadioItem
                                className="ContextMenuRadioItem"
                                value="pedro"
                            >
                                <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                    <DotFilledIcon />
                                </ContextMenu.ItemIndicator>
                                Pedro Duarte
                            </ContextMenu.RadioItem>
                            <ContextMenu.RadioItem
                                className="ContextMenuRadioItem"
                                value="colm"
                            >
                                <ContextMenu.ItemIndicator className="ContextMenuItemIndicator">
                                    <DotFilledIcon />
                                </ContextMenu.ItemIndicator>
                                Colm Tuite
                            </ContextMenu.RadioItem>
                        </ContextMenu.RadioGroup>
                    </ContextMenu.Content>
                </ContextMenu.Portal>
            </ContextMenu.Root>
        </>
    );
};

export default SmallSong;
