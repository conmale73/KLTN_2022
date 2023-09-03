import "./Table.scss";
import { useState, useEffect } from "react";
import LongSong from "../../../components/Song/SongLong";

const Table = (props) => {
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    const getCellClassName = (index) => {
        switch (index) {
            case 0:
                return "yellow";
            case 1:
                return "silver";
            case 2:
                return "brown";
            default:
                return "";
        }
    };
    const [songs, setSongs] = useState(props.songs);
    return (
        <div className="table">
            {numbers.map((number, index) => (
                <div className="row" key={number}>
                    <div className={`cell ${getCellClassName(index)}`}>
                        {number}
                    </div>
                    <div className="cell">
                        {songs[index] && (
                            <LongSong
                                videoId={songs[index].videoId}
                                title={songs[index].title}
                                artists={songs[index].artists}
                                thumbnails={songs[index].thumbnails}
                                album={songs[index].album}
                                duration={songs[index].duration}
                                liked={songs[index].liked}
                                buttons={false}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Table;
