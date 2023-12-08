import { useQuery } from "@tanstack/react-query";
import { groupChatService } from "../../services";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import ChatPreview from "./ChatPreview";
const ChatList = () => {
    const user = useSelector((state) => state.user.data);
    const [chats, setChats] = useState([]);
    const fetchData = async () => {
        try {
            const res = await groupChatService.getChatsHaveMessagesByUserID(
                user._id
            );
            setChats(res.data.data);
            return res.data.data;
        } catch (err) {
            console.log(err);
        }
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["chats", user._id],
        queryFn: () => fetchData(),
    });
    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }
    return (
        <div className="w-full h-fit max-h-[800px]">
            {chats.length === 0 && (
                <div className="text-center text-lg text-gray-500 mt-4">
                    No chat found
                </div>
            )}
            {chats?.map((chat, index) => {
                return (
                    <ChatPreview
                        index={index}
                        chat={chat}
                        key={index}
                        lastMessage={chat.last_message}
                    />
                );
            })}
        </div>
    );
};

export default ChatList;
