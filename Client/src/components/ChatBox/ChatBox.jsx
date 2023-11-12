import styles from "./ChatBox.module.scss";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
import { messageService } from "../../services";
import Loading from "../Loading";
import { useState } from "react";

const ChatBox = (props) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["chat", props.chat_id],
        queryFn: () =>
            messageService
                .getMessagesByChatID(props.chat_id, page, limit)
                .then((res) => res.data.data),
    });
    if (isLoading)
        return (
            <div className="w-full h-full">
                <Loading />
            </div>
        );
    if (error) return <p>{error.message}</p>;
    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.chatBox}>
                {data.map((message, index) => {
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
        </div>
    );
};
export default ChatBox;
