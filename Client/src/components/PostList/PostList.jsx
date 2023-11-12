import styles from "./PostList.module.scss";
import Post from "../Post";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../../services";
import Loading from "../Loading";
import { useState } from "react";
const PostList = (props) => {
    return (
        <>
            <div className={styles.postList}>
                {props.data?.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            user_id={post.user_id}
                            text={post.content.text}
                            timeStamp={post.timeStamp}
                            privacy={post.privacy}
                            files={post.content.files}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default PostList;
