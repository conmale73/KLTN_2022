const Song = require('../models/songModel');

// @desc    Get all songs
// @route   GET /api/songs
// @access  Public
exports.getSongs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page
    const limit = parseInt(req.query.limit) || 10; // Number of songs per page

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalSongs = await Song.countDocuments();
    const totalPages = Math.ceil(totalSongs / limit);

    const songs = await Song.find().skip(startIndex).limit(limit);

    res.json({
      songs,
      page,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a song by ID
// @route   GET /api/songs/:id
// @access  Public
exports.getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      throw new ErrorResponse('Song not found', 404);
    }

    res.json(song);
  } catch (error) {
    next(error);
  }
};


// @desc    Add a new song
// @route   POST /api/songs
// @access  Public
exports.addSong = async (req, res, next) => {
  try {
    const { title, artist, album } = req.body;

    const newSong = new Song({
      title,
      artist,
      album,
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    next(error);
  }
};

// New function to increment the number of likes for a song
exports.likeSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } }, // Increment the likes by 1
      { new: true }
    );

    if (!song) {
      throw new ErrorResponse('Song not found', 404);
    }

    res.json(song);
  } catch (error) {
    next(error);
  }
};
exports.unlikeSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 } },
      { new: true }
    );

    if (!song) {
      throw new ErrorResponse('Song not found', 404);
    }

    res.json(song);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a song
// @route   DELETE /api/songs/:id
// @access  Public
exports.deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      throw new ErrorResponse('Song not found', 404);
    }

    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// const songModel = require('../models/songModel');

// exports.getSongs = (req, res) => {
//   // Implement logic to fetch songs from the data source (e.g., database)
//   const songs = songModel.getAllSongs();
//   res.json(songs);
// };

// exports.getSongById = (req, res) => {
//   // Implement logic to fetch a song by ID from the data source
//   const { id } = req.params;
//   const song = songModel.getSongById(id);
  
//   if (!song) {
//     return res.status(404).json({ error: 'Song not found' });
//   }
  
//   res.json(song);
// };

// exports.addSong = (req, res) => {
//   // Implement logic to add a new song to the data source
//   // Perform validation on the input data
//   const { title, artist } = req.body;
//   if (!title || !artist) {
//     return res.status(400).json({ error: 'Title and artist are required' });
//   }
//   // Create a new song object with the provided data
//   const newSong = {
//     id: songModel.generateUniqueId(),
//     title,
//     artist,
//   };
//   // Add the new song to the data storage
//   songModel.addSong(newSong);

//   // Send a success response with the new song object
//   res.status(201).json(newSong);
// };

// exports.deleteSong = (req, res) => {
//   // Implement logic to delete a song from the data source
//   const { id } = req.params;
//   songModel.deleteSong(id);
  
//   res.json({ message: `Song ${id} deleted` });
// };
