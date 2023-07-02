// Simulated data source (replace with your actual data source, e.g., database)
const songs = [
    { id: 1, title: "Song 1", artist: "Artist 1" },
    { id: 2, title: "Song 2", artist: "Artist 2" },
    { id: 3, title: "Song 3", artist: "Artist 3" },
];

exports.getAllSongs = () => {
    return songs;
};

exports.getSongById = (id) => {
    return songs.find((song) => song.id === parseInt(id));
};

exports.addSong = (song) => {
    const newSong = { id: songs.length + 1, ...song };
    songs.push(newSong);
    return newSong;
};

exports.deleteSong = (id) => {
    const index = songs.findIndex((song) => song.id === parseInt(id));
    if (index !== -1) {
        songs.splice(index, 1);
    }
};
