import styles from "./ChatBox.module.scss";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "../../services";
import Loading from "../Loading";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

var socket = io("http://localhost:3000");

const ChatBox = (props) => {
    const user = useSelector((state) => state.user.data);
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const fetchData = async () => {
        const res = await messageService.getMessagesByChatID(
            props.chat_id,
            page,
            limit
        );
        setMessages(res.data.data);

        socket.emit("joinChat", user._id, props.chat_id);

        return res.data.data;
    };
    const { isLoading, error, data } = useQuery({
        queryKey: ["chat", props.chat_id],
        queryFn: () => fetchData(),
    });

    useEffect(() => {
        socket.on("receiveMessage", (message) => {
            setMessages((messages) => [message, ...messages]);
        });
    }, []);
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleClickSendMsg = (e) => {
        if (props.text !== "") {
            try {
                const newMessage = {
                    chat_id: props.chat_id,
                    content: props.text,
                    sender_id: user._id,
                    timeStamp: new Date(),
                };
                const res = messageService.createMessage(
                    props.chat_id,
                    user._id,
                    props.text
                );
                socket.emit("sendMessage", newMessage, props.participants);

                props.setText("");
            } catch (err) {
                console.log(err);
            } finally {
            }
        }
    };
    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.chatBox}>
                {messages?.map((message, index) => {
                    return (
                        <Message
                            key={index}
                            content={message.content}
                            sender_id={message.sender_id}
                            timeStamp={message.timeStamp}
                        />
                    );
                })}
            </div>
            {props.showTextarea && (
                <div className="w-full h-fit self-stretch px-[9px] pt-[13px] pb-3.5 items-center flex">
                    <TextareaAutosize
                        maxRows="6"
                        value={props.text}
                        onChange={(e) => {
                            props.setText(e.target.value);
                        }}
                        className="w-full h-full resize-none grow shrink basis-0 self-stretch pl-[15px] mr-[20px] pt-[13px] pb-3 bg-[#404040] 
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
