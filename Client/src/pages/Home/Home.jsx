import React from 'react';
import AudioPlayer from '~/components/AudioPlayer/AudioPlayer';
const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        </div>
    );
}
export default Home;