import styles from "./SongsHistory.module.scss";
import LongSong from "../../../components/Song/Song(Long)";
const soundList = [
    {
        id: 0,
        name: "Daylight",
        artist: "David Kushner",
        duration: "3:33",
        album: "洗脑节奏 Viral Hits",
        cover: "/photos/David_Kushner-_Daylight.png",
        src: "http://localhost:3001/music/David Kushner Daylight.mp3",
        liked: true,
    },
    {
        id: 1,
        name: "Take Me To Church",
        artist: "Hozier",
        duration: "3:58",
        album: "Take Me To Church E.P.",
        cover: "/photos/TakeMeToChurch_Hozier.jpg",
        src: "http://localhost:3001/music/Take Me To Church Hozier.mp3",
        liked: true,
    },
    {
        id: 2,
        name: "Aloha",
        artist: "Cool",
        duration: "4:27",
        album: "First Whisper",
        cover: "/photos/Aloha_Cool.jpg",
        src: "http://localhost:3001/music/aloha.mp3",
        liked: false,
    },
    {
        id: 3,
        name: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artist: "Đặng Tử Kỳ",
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        cover: "/photos/DaoHoaNac_DangTuKy.jpg",
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
    {
        id: 4,
        name: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artist: "Đặng Tử Kỳ",
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        cover: "/photos/DaoHoaNac_DangTuKy.jpg",
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
    {
        id: 5,
        name: "[Slowed 0.8] Đào Hoa Nặc OST Thượng Cổ Tình Ca",
        artist: "Đặng Tử Kỳ",
        duration: "4:16",
        album: "OST Thượng Cổ Tình Ca",
        cover: "/photos/DaoHoaNac_DangTuKy.jpg",
        src: "http://localhost:3001/music/Slowed 08 Đào Hoa Nặc Thượng cổ tình ca ost.mp3",
        liked: true,
    },
];
const SongsHistory = (props) => {
    return (
        <div className={styles.songsHistory}>
            {soundList.map((song) => {
                return (
                    <LongSong
                        id={song.id}
                        name={song.name}
                        artist={song.artist}
                        cover={song.cover}
                        album={song.album}
                        duration={song.duration}
                        liked={song.liked}
                    />
                );
            })}
        </div>
    );
};
export default SongsHistory;
