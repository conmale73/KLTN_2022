import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { commentService } from "../../../services/comment.service";
import { useSelector } from "react-redux";
import { postService } from "../../../services";
import CommentItem from "./CommentItem/CommentItem";
const CommentComponent = ({ postIdO,userIdLink}) => {

    const user = useSelector((state) => state.user.data);

    //state value add comment and row textarea
    const [commentInputValues, setCommentInputValues] = useState({
        value: "",
        rows: 1,
    });
    const handleCommentClick = () => {
        setCommentInputValues({
            ...commentInputValues,
            rows: 3,
        });
    };

    const handleFocus = () => {
        setCommentInputValues({
            ...commentInputValues,
            rows: 3,
        });
    };

    const [allComments, setAllComments] = useState([]);
    //const [loadComponent, setLoadComponent] = useState(false);
    const [countComments, setCountComments] = useState(0);
    const [countLikes, setCountLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);//check like unlike

    const [hasMoreData, setHasMoreData] = useState(true);//check show morecomment

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                //get all comment
                const response = await commentService.getListCommentByPostId(postIdO, currentPage, 5);
                const data = response.data.data;
                //console.log(data);
                //setAllComments(data);
                if (data.length === 0) {
                    setHasMoreData(false);
                } else {
                    setAllComments((prevPosts) => [...prevPosts, ...data]);
                }

                //count comment
                const response2 = await commentService.getCountCommentByPostId(postIdO);
                const data2 = response2.data;
                setCountComments(data2.totalComment);

                //count like
                const response3 = await postService.getPostByPostId(postIdO);
                const data3 = response3.data.likeUserList ? response3.data.likeUserList : [];
                setCountLikes(data3.length);

                //get check user current like
                let listLikeEmail = response3.data.likeUserList;
                const isEmailInList = listLikeEmail.some(item => item.email === user.email);
                setIsLiked(isEmailInList);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchComments();
    }, [currentPage])

    const loadDataAfterAddSuccess = async () => {
        const response = await commentService.getListCommentByPostId(postIdO, 1, 5);
        const data = response.data.data;
        //console.log(data);
        setAllComments(data);
        setCountComments((data) => data + 1);
        //setCurrentPage(1);
        //setHasMoreData(true);
    }

    const handleSaveAddComment = () => {
        let dataRequest = {
            post_id: postIdO,
            user_info: {
                user_id: user._id,
                avatar: user.avatar,
                username: user.username
            },
            content: commentInputValues.value
        }
        commentService.createCommentByPostId(dataRequest).then((dataResponse) => {
            let dataShow = dataResponse.data;
            if (dataShow.result) {
                setCommentInputValues({
                    value: "",
                    rows: 1,
                });
            }
            setAllComments([]);
            setHasMoreData(true);
            if (currentPage === 1) {
                loadDataAfterAddSuccess();
            }
            else {
                setCurrentPage(1);
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleLikeClick = () => {
        // like and unlike
        let dataRequest = {
            post_id: postIdO,
            email_like: user.email
        }
        postService.postLikeAndUnlike(dataRequest).then((dataResponse) => {
            let dataShow = dataResponse.data;
            if (dataShow.result) {
                setCountLikes(dataShow.countEmail);
                setIsLiked(!isLiked);
            }
        }).catch((err) => {
            console.error(err)
        })
    };

    const loadMorePosts = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    }

    const loadComponentWhenDeleteItem = async () => {//use when delete comement
        setAllComments([]);
        setHasMoreData(true);
        if (currentPage === 1) {
            const response = await commentService.getListCommentByPostId(postIdO, 1, 5);
            const data = response.data.data;
            //console.log(data);
            setAllComments(data);
            setCountComments((data) => data - 1);
        }
        else {
            setCurrentPage(1);
        }
    }
    return (<>
        <div style={{ borderTop: "1px solid black" }}><div style={{ float: "left", display: "flex" }}><div style={{ paddingTop: "2px" }}><AiFillLike /></div><p>{countLikes}</p></div><div style={{ float: "right", display: "flex" }}>{countComments}<p style={{ marginLeft: "3px" }}>comment</p></div></div>
        <div style={{ clear: "both", display: "flex", justifyContent: "space-between", borderTop: "1px solid black" }}>
            <div onClick={handleLikeClick} style={{ display: "flex", marginLeft: "20%", marginRight: "20%", cursor: "pointer" }}>
                <div style={{ paddingTop: "3px" }}>{isLiked ? <AiFillLike /> : <AiOutlineLike />}</div> {isLiked ? <div style={{ color: "blue" }}>Like</div> : <div style={{ color: "black" }}>Like</div>}
            </div>
            <div onClick={() => handleCommentClick()} style={{ display: "flex", marginLeft: "20%", marginRight: "20%", cursor: "pointer" }}><div style={{ paddingTop: "3px" }}><FaRegComment /></div><div>Comment</div></div>
        </div>
        {/* List comment */}
        <div>

            {allComments.map((comment) => (
                <CommentItem comment={comment} key={comment._id} loadComponentWhenDeleteItem={loadComponentWhenDeleteItem} userIdLink={userIdLink}/>
            ))}
            {countComments > 0 && hasMoreData && allComments.length > 0 && (
                <button onClick={loadMorePosts}>Load more</button>
            )}
        </div>
        {/* add comment */}
        <div style={{ paddingTop: "10px" }}>
            <textarea
                rows={commentInputValues.rows}
                value={commentInputValues.value}
                onChange={(e) => {
                    setCommentInputValues({
                        ...commentInputValues,
                        value: e.target.value,
                    })
                    console.log(commentInputValues)
                }
                }
                placeholder="Write a comment..."
                style={{ width: "100%", fontSize: "15px", color: "black" }}
                onFocus={handleFocus}
            />
            <button onClick={handleSaveAddComment} style={{ background: "blue", color: "white" }}>Save</button>
        </div>
    </>);
}

export default CommentComponent;