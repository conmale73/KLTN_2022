import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { postService } from "../../services";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
const PostDetail = () => {
    const { id } = useParams();

    const fetchData = async () => {
        const res = await postService.getPostById(id);
        console.log(res.data.data);
        return res.data.data;
    };
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["postDetail"],
        queryFn: fetchData,
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <div className="flex flex-col gap-2">
                <Post
                    id={data._id}
                    user_id={data.user_id}
                    text={data.content.text}
                    createAt={data.createAt}
                    updateAt={data.updateAt}
                    privacy={data.privacy}
                    files={data.content.files}
                    likes={data.likes}
                    inCommentModal={true}
                />
            </div>
        </>
    );
};

export default PostDetail;
