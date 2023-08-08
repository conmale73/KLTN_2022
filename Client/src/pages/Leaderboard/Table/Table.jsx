import "./Table.scss";
import { useState, useEffect } from "react";
import LongSong from "../../../components/Song/Song(Long)/Song(Long)";

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
    console.log(songs);
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
                                id={songs[index].id}
                                name={songs[index].name}
                                artist={songs[index].artist}
                                cover={songs[index].cover}
                                album={songs[index].album}
                                duration={songs[index].duration}
                                liked={songs[index].liked}
                                // Add more song information props if needed
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Table;
