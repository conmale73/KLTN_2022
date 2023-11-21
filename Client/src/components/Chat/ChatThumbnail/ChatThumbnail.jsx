import { useSelector, useDispatch } from "react-redux";
import {
    openChat,
    removeChat,
    closeChat,
} from "../../../redux/currentChatList/currentChatListSlice";
import UserInfoPreview from "../../UserInfoPreview";
import { IoMdClose } from "react-icons/io";
const ChatThumbnail = ({ index, chat }) => {
    const dispatch = useDispatch();
    const currentChatList = useSelector((state) => state.currentChatList.list);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    const user = useSelector((state) => state.user.data);

    let otherUser = chat.members.find((member) => member !== user._id);

    if (chat.members[0] == user._id && chat.members[1] == user._id) {
        otherUser = user._id;
    }
    const handleClickChatThumbnail = (chat) => {
        dispatch(openChat(chat));
        if (chat._id === currentChat._id) {
            dispatch(closeChat());
        } else {
            dispatch(openChat(chat));
        }
    };
    return (
        <>
            <div
                className="flex w-fit h-fit cursor-pointer relative flex-[1_0_21%]"
                key={index}
            >
                <div onClick={() => handleClickChatThumbnail(chat)}>
                    <UserInfoPreview
                        thumbnailHeight="40px"
                        thumbnailWidth="40px"
                        showName={false}
                        bgStyles={false}
                        user_id={otherUser}
                    />
                </div>

                <div>
                    <IoMdClose
                        size="20px"
                        className="w-fit h-fit rounded-full bg-[#555555] hover:bg-[#676668] 
                    absolute top-[-10px] text-[#ffffff] right-[-10px] text-[10px] cursor-pointer hover:scale-125"
                        onClick={() => {
                            dispatch(removeChat(chat._id));
                            dispatch(closeChat());
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default ChatThumbnail;
