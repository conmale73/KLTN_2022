import UserInfoPreview from "../../UserInfoPreview";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    openChat,
    addChat,
} from "../../../redux/currentChatList/currentChatListSlice";
const ChatPreview = (props) => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(addChat(props.chat));
        dispatch(openChat(props.chat));
    };
    return (
        <div
            className="chatPreviewContainer w-full h-[80px] p-[5px] rounded-[5px]"
            key={props.index}
        >
            <div
                className="p-[5px] m-[5px] hover:bg-[#505050] rounded-[10px] cursor-pointer"
                onClick={handleOnClick}
            >
                {props.chat?.group_id ? (
                    <div className="flex gap-[5px]">
                        <img
                            className="w-[50px] h-[50px] rounded-full object-contain border-[1px] border-[#505050]"
                            src={`data:${props.chat?.group_thumbnail.fileInfo.type};base64,${props.chat?.group_thumbnail.dataURL}`}
                            alt=""
                        />
                        <div className="flex flex-col flex-1">
                            <p className="text-[20px] line-clamp-1 max-w-[100%]">
                                {props.chat?.group_name}
                            </p>
                            <p
                                className="text-[15px] text-ellipsis line-clamp-1 
                            max-w-[100%] font-[400] text-[#adadad]"
                            >
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Earum quae quis consequatur
                                dicta tenetur perferendis excepturi facere
                                repellendus voluptas aperiam officia enim
                                temporibus harum ipsam, possimus quam nam
                                asperiores fugit.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <UserInfoPreview
                            thumbnailHeight="50px"
                            thumbnailWidth="50px"
                            showName={true}
                            bgStyles={false}
                            user_id={props.chat?.members.find(
                                (member) => member !== user._id
                            )}
                            chatPreview="lorem  ipsum dolor sit amet, consectetur adipiscing elit."
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatPreview;
