const { ObjectId } = require("mongodb");
const Notification = require("../models/notificationModel");


exports.getNotificationsByUserID = async (req, res) => {
    console.log("ok hay");
    const { receivedUser_id } = req.params;

    try {
        console.log("ok hay")
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of posts per page
        // Lấy toàn bộ dữ liệu
        const notifications = await Notification.find({ receivedUser_id });

        // Đảo ngược mảng
        const reversedNotifications = notifications.reverse();
        //const reversedComments = comments;
        const startIndex = (page - 1) * limit;
        const slicedComments = reversedNotifications.slice(startIndex, startIndex + limit);
        const totalPosts = reversedNotifications.length;
        const totalPages = Math.ceil(totalPosts / limit);
        res.status(200).json({
            success: true,
            data: slicedComments,
            page,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching components:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addNotification = async (senderUserId, receivedUser_id, content) => {
    try {
        let dataPost = {
            senderUser_id: new ObjectId(senderUserId),
            receivedUser_id: new ObjectId(receivedUser_id),
            content: content,
        }
        await Notification.create(dataPost);
        console.log("Save Notification success");
        return true;
    } catch (error) {
        console.error('Error adding notification:', error);
        return false;       
    }
};
// exports.createMessage = async (req, res, next) => {
//     try {
//         const { chat_id, sender_id, sender_name, content } = req.body;

//         const newMessage = new Message({
//             chat_id,
//             sender_id,
//             sender_name,
//             content,
//         });

//         const savedMessage = await newMessage.save();
//         res.status(201).json(savedMessage);
//     } catch (error) {
//         next(error);
//     }
// };

// // @desc    Get all messages by chat id
// // @route   GET /api/messages/chat/:chat_id
// // @access  Public
// exports.getMessagesByChatID = async (req, res, next) => {
//     try {
//         const { chat_id } = req.params;

//         const page = parseInt(req.query.page) || 1; // Current page
//         const limit = parseInt(req.query.limit) || 10; // Number of posts per page

//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;

//         const totalPosts = await Message.countDocuments({ chat_id });
//         const totalPages = Math.ceil(totalPosts / limit);

//         const messages = await Message.find({ chat_id })
//             .sort({ timeStamp: -1 })
//             .skip(startIndex)
//             .limit(limit);

//         res.status(200).json({
//             success: true,
//             data: messages,
//             page,
//             totalPages,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// // @desc    Get last message by chat id
// // @route   GET /api/messages/last/:chat_id
// // @access  Public

// exports.getLastMessageByChatID = async (req, res, next) => {
//     try {
//         const { chat_id } = req.params;

//         const lastMessage = await Message.findOne({ chat_id }).sort({
//             timeStamp: -1,
//         });

//         res.status(200).json({
//             success: true,
//             data: lastMessage,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
