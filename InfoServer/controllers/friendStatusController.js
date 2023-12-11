const { ObjectId } = require("mongodb");
const FriendStatus = require("../models/friendStatusModel");

//ws
exports.addfriendStatus = async (receivedUser_id, senderUserId) => {
    try {
        // Kiểm tra xem user_id đã tồn tại trong collection chưa
        const existingUser = await FriendStatus.findOne({ user_id: receivedUser_id });

        if (!existingUser) {
            // Nếu user_id chưa tồn tại, tạo mới một document với user_id và email
            let dataPost = {
                user_id: new ObjectId(receivedUser_id),
                awaitingList: [{ user_awaiting_id: new ObjectId(senderUserId) }],
            }
            await FriendStatus.create(dataPost);
            console.log("Save waiting list success");
        } else {
            // Nếu user_id đã tồn tại, kiểm tra xem email đã tồn tại trong awaitingList chưa
            const issenderUserIdExist = existingUser.awaitingList.some(
                (awaitingItem) => awaitingItem.user_awaiting_id === senderUserId
            );
            if (!issenderUserIdExist) {
                // Nếu email chưa tồn tại, thêm email vào awaitingList
                existingUser.awaitingList.push({ user_awaiting_id: new ObjectId(senderUserId) });
                await existingUser.save();
            } else {
                // Nếu email đã tồn tại, không thực hiện thêm
                console.log("Email already exists in awaitingList.");
            }
        }
        console.log("User and email added to awaitingList successfully.");
        return true;
    } catch (error) {
        console.error("Error adding user and email to awaitingList:", error);
        return false;
    }
};

//ws
exports.acceptfriendStatus = async (receivedUser_id, senderUserId) => {
    try {
        // Kiểm tra xem user_id đã tồn tại trong collection chưa
        const existingUser = await FriendStatus.findOne({ user_id: senderUserId });
        if (existingUser) {
            const indexToRemove = existingUser.awaitingList.findIndex(
                (awaitingItem) => awaitingItem.user_awaiting_id.equals(receivedUser_id)
            );
            if (indexToRemove !== -1) {
                // Nếu phần tử tồn tại trong awaitingList, xóa nó
                existingUser.awaitingList.splice(indexToRemove, 1);
                await existingUser.save();
                console.log("User removed from awaitingList successfully.");
                // Kiểm tra xem receivedUser_id đã tồn tại trong acceptList chưa
                const isSenderUserIdExist = existingUser.acceptList.some(
                    (acceptItem) => acceptItem.user_accept_id.equals(receivedUser_id)
                );
                if (!isSenderUserIdExist) {// neu chua co 
                    // Nếu email chưa tồn tại, thêm vào acceptList
                    existingUser.acceptList.push({ user_accept_id: new ObjectId(receivedUser_id) });
                    await existingUser.save();
                }
                return true;
            } else {
                console.log("User not found in awaitingList.");
            }

        }
        return false;
    } catch (error) {
        console.error("Error adding user and email to awaitingList:", error);
        return false;
    }
};

//api
exports.checkfriendStatus = async (req, res) => {

    const { user_id } = req.params;
    console.log("ok hay vo day nhe")
    console.log(user_id);
    try {
        // Kiểm tra xem user_id đã tồn tại trong collection chưa
        const existingUser = await FriendStatus.findOne({ user_id });
        if (!existingUser) {
            res.status(200).json({
                success: true,
                status: 0,
                content: "Khong co du lieu"
            });
        } else {
            res.status(200).json({
                success: true,
                status: 1,// co du lieu
                content: existingUser
            });
        }
    } catch (error) {
        console.error("Error adding user and email to awaitingList:", error);
    }
};


//api cancel invite friend when waiting
exports.cancelFriendStatusWhenWaiting = async (req, res) => {
    const { senderUserId, receivedUser_id } = req.body;
    try {
        const existingUser = await FriendStatus.findOne({ user_id: receivedUser_id });
        if (!existingUser) {
            res.status(200).json({
                success: true,
                status: 0,
                content: "Khong co du lieu"
            });
        } else {
            // Nếu user_id đã tồn tại xoa khoi awiting list 
            const indexToRemove = existingUser.awaitingList.findIndex(
                (awaitingItem) => awaitingItem.user_awaiting_id.equals(senderUserId)
            );
            if (indexToRemove !== -1) {
                existingUser.awaitingList.splice(indexToRemove, 1);
                await existingUser.save();
                console.log("User removed from awaitingList successfully.");
                res.status(200).json({
                    success: true,
                });
            }
        }
    } catch (error) {
        console.error("Error adding user and email to awaitingList:", error);
    }
};

//api cancel invite friend when friend
exports.cancelFriendStatusWhenFriend = async (req, res) => {
    const { senderUserId, receivedUser_id } = req.body;
    try {
        const existingUser1 = await FriendStatus.findOne({ user_id: receivedUser_id });
        if (!existingUser1) {
            const existingUser2 = await FriendStatus.findOne({ user_id: senderUserId });
            if (existingUser2) {
                // Nếu user_id đã tồn tại xoa khoi friend list 
                const indexToRemove = existingUser2.acceptList.findIndex(
                    (acceptItem) => acceptItem.user_accept_id.equals(receivedUser_id)
                );
                if (indexToRemove !== -1) {
                    existingUser2.acceptList.splice(indexToRemove, 1);
                    await existingUser2.save();
                    console.log("User removed from acceptList successfully.");
                    res.status(200).json({
                        success: true,
                    });
                }
            }
        } else {
            // Nếu user_id đã tồn tại xoa khoi awiting list 
            const indexToRemove = existingUser1.acceptList.findIndex(
                (acceptItem) => acceptItem.user_accept_id.equals(senderUserId)
            );
            if (indexToRemove !== -1) {
                existingUser1.acceptList.splice(indexToRemove, 1);
                await existingUser1.save();
                console.log("User removed from acceptList successfully.");
                res.status(200).json({
                    success: true,
                });
            }
        }
    } catch (error) {
        console.error("Delete adding user acceptListt:", error);
    }
};


