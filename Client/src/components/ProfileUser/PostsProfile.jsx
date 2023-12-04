import { useEffect } from "react";
import styles from "./postsProfile.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { postService } from "../../services";
import { Modal, Button, Form } from 'react-bootstrap';
import CommentComponent from "./PostChildComponent/CommentComponent";
import PostContentComponent from "./PostChildComponent/PostContentComponent";
const PostsProfile = ({ userIdLink }) => {

    const user = useSelector((state) => state.user.data);
    const [allPosts, setAllPosts] = useState([]);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await postService.getPostByUserId(userIdLink, currentPage, pageSize);
                const data = response.data.data;
                if (data.length === 0) {
                    setHasMoreData(false);
                } else {
                    setAllPosts((prevPosts) => [...prevPosts, ...data]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [currentPage])

    const handleLoadListPost = async () => {
        // Fetch lại dữ liệu mới sau khi tạo bài đăng thành công
        const response = await postService.getPostByUserId(userIdLink, 1, pageSize);
        const newData = response.data.data;
        if (newData.length > 0) {
            setAllPosts(newData);
        }
    }

    const loadMorePosts = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const [value, setValue] = useState("");
    const [valuePrivacy, setValuePrivacy] = useState("PUBLIC");
    const [createPost, setCreatePost] = useState(false);
    const handleCloseAddPost = () => setCreatePost(false);
    const handleShowCreatePost = () => {
        setValue("");
        setValuePrivacy("PUBLIC");
        setCreatePost(true);
    };

    async function post(dataPost) {
        try {
            const res = await postService.createNewPost(dataPost);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreatePost = async () => {
        let dataPost = {
            user_id: user._id,
            content: {
                text: value,
                files: [],
            },
            privacy: valuePrivacy,
        };
        try {
            await post(dataPost);
            // Fetch lại dữ liệu mới sau khi tạo bài đăng thành công
            const response = await postService.getPostByUserId(userIdLink, 1, pageSize);
            const newData = response.data.data;
            if (newData.length > 0) {
                // Nếu có dữ liệu mới, thêm vào đầu mảng allPosts
                setAllPosts(newData);
            }

            handleCloseAddPost();
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>

            <div className={styles.Tspost}>
                {
                    (user._id === userIdLink) && (
                        <div className={styles.TspostP}>
                            <div className={styles.Tspost__content}>
                                <div className={styles.Tspost__content__avatar}>
                                    <img src={user.avatar} alt="User Avatar" />
                                </div>
                                <div className={styles.Tspost__content__text} onClick={handleShowCreatePost}>
                                    <p>Bạn đang nghĩ gì?</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                {allPosts.map((post) => (
                    <div className={styles.TspostP2} key={post._id}>
                        <PostContentComponent post={post} user={user} handleLoadListPost={handleLoadListPost} userIdLink={userIdLink}/>
                        {/* LIKE AND COMMENT */}
                        <CommentComponent postIdO={post._id} userIdLink={userIdLink}/>
                    </div>
                ))}
                {hasMoreData && allPosts.length > 0 && (
                    <button onClick={loadMorePosts}>Load more</button>
                )}
            </div>
            <Modal show={createPost} onHide={handleCloseAddPost} style={{ top: "20%" }} size="lg">
                <Modal.Header closeButton style={{ color: "black" }}>
                    <Modal.Title><div style={{ paddingLeft: "310px", fontSize: "25px" }}><b>Create Posts</b></div></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "black" }}>
                    <div style={{ display: "flex", marginBottom: "5px" }}>
                        <div style={{
                            width: "60px",
                            height: " 60px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            objectFit: "cover",
                            border: "2px solid black",
                            paddingTop: "25px",
                            marginRight: "10px"
                        }}><img src={user.avatar} alt="User Avatar" /></div>
                        <div>
                            <div style={{ color: "black" }}><b>{user.username}</b>
                            </div>
                            <div> <Form.Select
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setValuePrivacy(e.target.value)
                                }}
                                style={{ fontSize: "15px" }}
                            >
                                <option value="PUBLIC">Public</option>
                                <option value="FRIEND">Friends</option>
                                <option value="PRIVATE">Only me</option>
                            </Form.Select></div>
                        </div>
                    </div>
                    <Form.Group className="mb-3">
                        <div style={{ display: "flex" }}>

                            <Form.Control
                                as="textarea"
                                rows={5}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                style={{ fontSize: "15px", color: "black" }}
                                placeholder="What's on your mind?"
                            />

                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseAddPost} style={{ flex: "1", background: "#6C757D", fontSize: "15px" }}>
                        Close
                    </Button>
                    <Button onClick={handleCreatePost} style={{ flex: "1", background: "#0D6EFD", fontSize: "15px" }}>
                        Posts
                    </Button>
                </Modal.Footer>
            </Modal></>
    );
}

export default PostsProfile;
