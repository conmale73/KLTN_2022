import UserInfoPreview from "../UserInfoPreview";
import { useDispatch, useSelector } from "react-redux";
import {
    addChat,
    openChat,
} from "../../redux/currentChatList/currentChatListSlice";
import { groupChatService } from "../../services";

const Contact = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const handleClickContact = async () => {
        const members = [user._id, props.contact._id];

        try {
            const dataPost = {
                members: members,
            };
            const res = await groupChatService.getGroupChatOfTwoUsers(dataPost);
            dispatch(addChat(res.data));
            dispatch(openChat(res.data));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div
            key={props.index}
            className="w-full h-fit cursor-pointer"
            onClick={handleClickContact}
        >
            <UserInfoPreview
                thumbnailHeight="40px"
                thumbnailWidth="40px"
                showName={true}
                bgStyles={true}
                user_id={props.contact._id}
                displayOnlineStatus={true}
            />
        </div>
    );
};

export default Contact;
