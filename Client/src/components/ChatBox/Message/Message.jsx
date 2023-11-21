import styles from "./Message.module.scss";
import UserInfoPreview from "../../UserInfoPreview";
import FormatDate from "../../../utils/FormatDate";
import { useSelector } from "react-redux";
const Message = (props) => {
    const singleChat = props.singleChat;
    const user = useSelector((state) => state.user.data);

    return (
        <>
            {singleChat ? (
                <>
                    {props.sender_id === user._id ? (
                        <>
                            <div className={styles.singleChatMessage}>
                                <span className={styles.myTime}>
                                    {FormatDate(props.timeStamp)}
                                </span>
                                <div className={styles.myContainer}>
                                    <p className={styles.myContent}>
                                        {props.content}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.singleChatMessage}>
                            <UserInfoPreview
                                thumbnailHeight="40px"
                                thumbnailWidth="40px"
                                showName={false}
                                user_id={props.sender_id}
                                bgStyles={false}
                            />
                            <div className={styles.peerContainer}>
                                <p className={styles.peerContent}>
                                    {props.content}
                                </p>
                            </div>
                            <span className={styles.peerTime}>
                                {FormatDate(props.timeStamp)}
                            </span>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.message}>
                    <div className={styles.messageAvatar}>
                        <UserInfoPreview
                            thumbnailHeight="40px"
                            thumbnailWidth="40px"
                            showName={true}
                            user_id={props.sender_id}
                            bgStyles={false}
                        />
                        <span className={styles.messageTime}>
                            {FormatDate(props.timeStamp)}
                        </span>
                    </div>
                    <p className={styles.messageContent}>{props.content}</p>
                </div>
            )}
        </>
    );
};
export default Message;
