import styles from "./PostList.module.scss";
import Post from "../Post";
import PostButtons from "../Post/PostButtons";
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
                        <>
                            <Post
                                key={index}
                                id={post._id}
                                user_id={post.user_id}
                                text={post.content.text}
                                createAt={post.createAt}
                                updateAt={post.updateAt}
                                privacy={post.privacy}
                                files={post.content.files}
                                likes={post.likes}
                            />
                        </>
                    );
                })}
            </div>
        </>
    );
};
export default PostList;
