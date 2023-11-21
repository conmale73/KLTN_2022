import styles from "./ChatBox.module.scss";
import Message from "./Message";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { messageService } from "../../services";
import Loading from "../Loading";
import { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import InfiniteScroll from "react-infinite-scroll-component";

var socket = io("http://localhost:3000");

const ChatBox = (props) => {
    const user = useSelector((state) => state.user.data);
    const currentChat = useSelector(
        (state) => state.currentChatList.currentChat
    );
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [text, setText] = useState("");

    const fetchData = async () => {
        const res = await messageService.getMessagesByChatID(
            props.chat_id,
            page,
            limit
        );
        setMessages(res.data.data);
        setTotalPages(res.data.totalPages);

        return res.data.data;
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ["chat", props.chat_id],
        queryFn: () => fetchData(),
    });
    useEffect(() => {
        socket.emit("joinChat", user._id, props.chat_id);

        socket.on("receiveMessage", (message) => {
            setMessages((messages) => [message, ...messages]);
        });
        setMessages([]);
        setPage(1);
    }, [props.chat_id]);

    if (isLoading) return <Loading />;
    if (error) {
        console.log(error);
        return <p>{error.message}</p>;
    }

    const handleClickSendMsg = (e) => {
        if (text !== "") {
            try {
                const newMessage = {
                    chat_id: props.chat_id,
                    content: text,
                    sender_id: user._id,
                    timeStamp: new Date(),
                };
                const res = messageService.createMessage(
                    props.chat_id,
                    user._id,
                    text
                );
                socket.emit("sendMessage", newMessage);
                setMessages((messages) => [newMessage, ...messages]);
                setText("");
            } catch (err) {
                console.log(err);
            } finally {
            }
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                // Add a newline character at the cursor position
                setText((prevText) => prevText + "\n");
            } else {
                e.preventDefault();
                handleClickSendMsg(e);
            }
        }
    };
    const handleClickLoadMore = async () => {
        if (page < totalPages) {
            setPage((page) => page + 1);
            const res = await messageService.getMessagesByChatID(
                props.chat_id,
                page + 1,
                limit
            );
            setMessages((messages) => [...messages, ...res.data.data]);
        }
    };
    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.chatBox} id="chatBox">
                {messages?.map((message, index) => (
                    <Message
                        key={index}
                        content={message.content}
                        sender_id={message.sender_id}
                        timeStamp={message.timeStamp}
                        singleChat={props.singleChat}
                    />
                ))}
                {page < totalPages ? (
                    <p
                        className="text-center text-[#adadad] hover:text-[#ffffff] cursor-pointer"
                        onClick={handleClickLoadMore}
                    >
                        Load more...
                    </p>
                ) : (
                    <></>
                )}
            </div>
            {props.showTextarea && (
                <div className="w-full h-fit self-stretch px-[9px] pt-[13px] pb-3.5 items-center flex">
                    <TextareaAutosize
                        maxRows="6"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        onKeyDown={(e) => handleKeyDown(e)}
                        className="w-full h-full resize-none grow shrink basis-0 self-stretch pl-[15px] mr-[20px] pt-[13px] pb-3 text-[20px] bg-[#404040] 
                                                rounded-[10px] border justify-end items-center gap-[1127px] inline-flex"
                        placeholder="Message..."
                    />
                    <PiPaperPlaneRightFill
                        onClick={(e) => handleClickSendMsg(e)}
                        size="30px"
                        className="right-[50px] bottom-[20px] cursor-pointer hover:text-[#ffffff]"
                    />
                </div>
            )}
        </div>
    );
};
export default ChatBox;
