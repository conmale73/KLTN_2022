import styles from "./socialHome.module.scss";
import PostTool from "../../components/PostTool";
import { useSelector } from "react-redux";
import PostList from "../../components/PostList";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { postService } from "../../services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SocialHome = () => {
    const user = useSelector((state) => state.user.data);
    const navigate = useNavigate();

    if (!user) {
        useEffect(() => {
            navigate("/authentication/login");
        }, []);
    } else {
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(5);

        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["socialHome", user._id],
            queryFn: () =>
                postService
                    .getPublicPostByUserId(user._id, page, limit)
                    .then((res) => res.data.data),
        });

        if (isLoading) return <Loading isFullScreen={true} />;

        if (error) return <p>{error.message}</p>;

        return (
            <div className={styles.socialHome}>
                <PostTool />
                <PostList data={data} />
            </div>
        );
    }
};
export default SocialHome;
