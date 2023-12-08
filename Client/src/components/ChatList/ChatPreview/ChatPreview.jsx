import UserInfoPreview from "../../UserInfoPreview";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
    openChat,
    addChat,
} from "../../../redux/currentChatList/currentChatListSlice";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "../../../services";
import Loading from "../../Loading";
const ChatPreview = (props) => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [lastMessage, setLastMessage] = useState(props.lastMessage);
    const handleOnClick = () => {
        dispatch(addChat(props.chat));
        dispatch(openChat(props.chat));
    };
    // const fetchData = async () => {
    //     try {
    //         const res = await messageService.getLastMessage(props.chat?._id);
    //         setLastMessage(res.data.data);
    //         return res.data.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // const { isLoading, error, data } = useQuery({
    //     queryKey: ["chatPreview", props.chat?._id],
    //     queryFn: () => fetchData(),
    // });
    // if (isLoading) return <Loading />;
    // if (error) {
    //     console.log(error);
    //     return <p>{error.message}</p>;
    // }
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
                            src={`data:${props.chat?.group_thumbnail?.fileInfo?.type};base64,${props.chat?.group_thumbnail?.dataURL}`}
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
                                {`${
                                    lastMessage?.sender_id === user._id
                                        ? "You"
                                        : lastMessage?.sender_name
                                }: ${lastMessage?.content}`}
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
                            lastMessage={lastMessage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatPreview;
