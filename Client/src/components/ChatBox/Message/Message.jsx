import styles from "./Message.module.scss";
import UserInfoPreview from "../../UserInfoPreview";
import FormatDate from "../../../utils/FormatDate";

const Message = (props) => {
    return (
        <div className={styles.message}>
            <div className={styles.messageAvatar}>
                <UserInfoPreview
                    thumbnailHeight="40px"
                    thumbnailWidth="40px"
                    showName={true}
                    user_id={props.sender_id}
                />
                <span className={styles.messageTime}>
                    {FormatDate(props.timeStamp)}
                </span>
            </div>
            <div className={styles.messageContent}>{props.content}</div>
        </div>
    );
};
export default Message;
