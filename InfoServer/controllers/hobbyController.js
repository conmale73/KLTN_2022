const { ObjectId } = require("mongodb");
const Hobby = require("../models/hobbyModel");


//get all hobby
exports.getAllHobbybyUserId = async (req, res) => {
    const { user_id } = req.params;
    //console.log(user_id)
    //console.log(typeof(user_id))
    try {
        const hobbies = await Hobby.find({ user_id });
        console.log(hobbies)
        res.status(200).json(hobbies);
    } catch (error) {
        console.error('Error fetching hobbies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// post hobby
exports.addNewHobby = async (req, res) => {
    let newHobby = req.body;
    let dataPost = {
        user_id: new ObjectId(newHobby.user_id),
        content: newHobby.content
    }
    try {
        await Hobby.create(dataPost);
        res.status(200).json({result: true});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editHobby = async (req, res) => {
    try {
        const result = await Hobby.updateOne({ _id: req.body._id }, { $set: { content: req.body.content } });   
        res.status(200).json({result: result.acknowledged});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteHobby = async (req, res) => {
    try {
        await Hobby.findByIdAndDelete(req.params.id);
        res.status(200).json({result: true});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};







// // @desc    Add a new post
// // @route   POST /api/posts
// // @access  Public
// exports.post = async (req, res, next) => {
//     try {
//         const { user_id, content, privacy } = req.body;

//         // Create an array to hold the files with binary data
//         const filesWithBinary = [];

//         for (const file of content.files) {
//             // Convert the base64 data to a binary Buffer
//             const base64Data = file.dataURL.split(",")[1];
//             const buffer = Buffer.from(base64Data, "base64");

//             // Create an object with the binary data and other file info
//             const fileWithBinary = {
//                 dataURL: buffer,
//                 fileInfo: file.fileInfo,
//             };

//             filesWithBinary.push(fileWithBinary);
//         }

//         // Update the content with the files containing binary data
//         content.files = filesWithBinary;

//         const newPost = new Post({ user_id, content, privacy });

//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         next(error);
//     }
// };

// // @desc    Get all posts of a user
// // @route   POST /api/posts/:user_id
// exports.getPostsByUserID = async (req, res, next) => {
//     try {
//         const { user_id } = req.params;

//         const page = parseInt(req.query.page) || 1; // Current page
//         const limit = parseInt(req.query.limit) || 10; // Number of posts per page

//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;

//         const totalPosts = await Post.find({ user_id }).countDocuments();
//         const totalPages = Math.ceil(totalPosts / limit);

//         const posts = await Post.find({ user_id })
//             .skip(startIndex)
//             .limit(limit);

//         res.status(200).json({
//             success: true,
//             data: posts,
//             page,
//             totalPages,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// // @desc    Get public posts of a user
// // @route   POST /api/posts/:user_id
