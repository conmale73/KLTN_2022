const songModel = require('../models/songModel');

exports.getSongs = (req, res) => {
  // Implement logic to fetch songs from the data source (e.g., database)
  const songs = songModel.getAllSongs();
  res.json(songs);
};

exports.getSongById = (req, res) => {
  // Implement logic to fetch a song by ID from the data source
  const { id } = req.params;
  const song = songModel.getSongById(id);
  
  if (!song) {
    return res.status(404).json({ error: 'Song not found' });
  }
  
  res.json(song);
};

exports.addSong = (req, res) => {
  // Implement logic to add a new song to the data source
  const { title, artist } = req.body;
  const newSong = songModel.addSong({ title, artist });
  
  res.status(201).json(newSong);
};

exports.deleteSong = (req, res) => {
  // Implement logic to delete a song from the data source
  const { id } = req.params;
  songModel.deleteSong(id);
  
  res.json({ message: `Song ${id} deleted` });
};
