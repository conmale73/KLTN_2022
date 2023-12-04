import styles from "./PostButtons.module.scss";
import {
    FaUserFriends,
    FaRegHeart,
    FaHeart,
    FaRegCommentAlt,
} from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { userService, postService } from "../../../services";
import LikesViewer from "../../LikesViewer";
import CommentModal from "../../CommentModal";
const PostButtons = (props) => {
    const user = useSelector((state) => state.user.data);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([props.likes]);
    const [openCommentModal, setOpenCommentModal] = useState(false);

    useEffect(() => {
        if (props.likes.find((like) => like.user_id == user._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, []);
    useEffect(() => {
        if (likes.find((like) => like.user_id == user._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [liked]);
    const handleClickLike = () => {
        try {
            postService.likePost(props.id, user._id);
            setLiked(true);
            likes.push({ user_id: user._id });
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickUnLike = () => {
        try {
            postService.unlikePost(props.id, user._id);
            setLiked(false);
            setLikes(likes.filter((like) => like.user_id != user._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickComment = () => {
        if (props.openCommentModal) return;
        setOpenCommentModal(true);
    };
    return (
        <>
            <div className={styles.reactions}>
                {likes.length > 0 && <LikesViewer likes={likes} />}

                {props.openCommentModal ? (
                    <div
                        className={`flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute right-2`}
                    >
                        <FaRegCommentAlt className="" />
                        <span>{props.comments.length + " comments"}</span>
                    </div>
                ) : (
                    <CommentModal
                        username={props.data.username}
                        id={props.id}
                        user_id={props.user_id}
                        text={props.text}
                        createAt={props.createAt}
                        updateAt={props.updateAt}
                        privacy={props.privacy}
                        files={props.files}
                        likes={props.likes}
                        liked={props.liked}
                        openCommentModal={openCommentModal}
                        setOpenCommentModal={setOpenCommentModal}
                    />
                )}
            </div>
            <div className={styles.actions}>
                {liked ? (
                    <div
                        className={styles.liked}
                        onClick={() => handleClickUnLike()}
                    >
                        <FaHeart className={styles.icon} />
                        <span>Liked</span>
                    </div>
                ) : (
                    <div
                        className={styles.like}
                        onClick={() => handleClickLike()}
                    >
                        <FaRegHeart className={styles.icon} />
                        <span>Like</span>
                    </div>
                )}
                {props.openCommentModal ? (
                    <div className={styles.comment}>
                        <FaRegCommentAlt className={styles.icon} />
                        <span>Comment</span>
                    </div>
                ) : (
                    <div
                        className={styles.comment}
                        onClick={() => handleClickComment()}
                    >
                        <FaRegCommentAlt className={styles.icon} />
                        <span>Comment</span>
                    </div>
                )}

                <div className={styles.share}>
                    <FaRegShareFromSquare className={styles.icon} />
                    <span>Share</span>
                </div>
            </div>
        </>
    );
};

export default PostButtons;
