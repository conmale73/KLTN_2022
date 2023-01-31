import React, { useState } from "react";
import "./AudioPlayer.scss";

const AudioPlayer = ({ src }) => {
    const [isPlaying, setPlaying] = useState(false);

    return (
        <div className="audio-player">
            <audio
                src={src}
                controls={true}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
            />
            <div className="audio-player__controls">
                {isPlaying ? (
                    <button onClick={() => setPlaying(false)}>Pause</button>
                ) : (
                    <button onClick={() => setPlaying(true)}>Play</button>
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;
