import styles from "./PostList.module.scss";
import Post from "../Post";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../../services";
import Loading from "../Loading";
import { useState } from "react";
const PostList = (props) => {
    const userId = props.userId;
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["listPost", userId],
        queryFn: () =>
            postService
                .getPostByUserId(userId, page, limit)
                .then((res) => res.data.data),
    });

    if (isLoading) return <Loading isFullScreen={true} />;

    if (error) return <p>{error.message}</p>;
    return (
        <>
            <div className={styles.postList}>
                {data?.map((post, index) => {
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
