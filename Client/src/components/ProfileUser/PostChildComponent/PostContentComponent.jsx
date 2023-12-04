import { useState } from "react";
import { FormatDate } from "../../../utils";
import styles from "./PostContentComponent.module.scss";
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { postService, userService } from "../../../services";
import { useEffect } from "react";
const PostContentComponent = ({ post, user, handleLoadListPost, userIdLink }) => {

    const [updatePost, setUpdatePost] = useState(false);
    const handleCloseUpdatePost = () => setUpdatePost(false);
    const [valuePrivacy, setValuePrivacy] = useState(post.privacy);
    const [value, setValue] = useState(post.content.text);
    const handleShowUpdatePost = () => {
        setUpdatePost(true);
    };

    //infor-user
    const [textUserName, setTextUserName] = useState(user.username);
    const [linkAvatar, setLinkAvatar] = useState(user.avatar);
    useEffect(() => {
        if (user._id !== userIdLink) {
            userService.getUserById(userIdLink).then((response) => {
                const data = response.data.data;
                setTextUserName(data.username)
                setLinkAvatar(data.avatar)
            })
        }
    }, [])

    async function put(dataPost) {
        try {
            const res = await postService.putPostById(dataPost);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSaveUpdatePost = async () => {
        let dataPost = {
            post_id: post._id,
            content: {
                text: value,
                files: [],
            },
            privacy: valuePrivacy,
        };

        try {
            await put(dataPost);
            handleCloseUpdatePost();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeletePost = async (id) => {
        let dataRequest = {
            post_id: id
        }
        try {
            const res = await postService.deletePostById(dataRequest);
            console.log(res);
            alert(res.data.message);
            handleLoadListPost();
        } catch (err) {
            console.log(err);
        }

    };

    return (<>
        <div className={styles.Tspost__content1}>
            <div className={styles.Tspost__content1__avatar1}>
                <img src={linkAvatar} alt="User Avatar" />
            </div>
            <div className={styles.Tspost__content1__text1}>
                <div style={{ color: "black" }}><b>{textUserName}</b></div>
                <div>{FormatDate(post.timeStamp)}</div>
            </div>
            {
                (user._id === userIdLink) && (
                    <DropdownButton id="dropdown-basic-button" title="..." style={{ background: "blue" }}>
                        <Dropdown.Item onClick={(e) => {
                            e.preventDefault();
                            handleShowUpdatePost();
                        }}>Edit post</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => {
                            e.preventDefault();
                            handleDeletePost(post._id);
                        }}>Delete post</Dropdown.Item>
                    </DropdownButton>
                )
            }

        </div>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>{value}</div>

        {/* modal update */}
        <Modal show={updatePost} onHide={handleCloseUpdatePost} style={{ top: "20%" }} size="lg">
            <Modal.Header closeButton style={{ color: "black" }}>
                <Modal.Title><div style={{ paddingLeft: "310px", fontSize: "25px" }}><b>Update Posts</b></div></Modal.Title>
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
                            defaultValue={valuePrivacy}
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
                            defaultValue={value}
                        />
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseUpdatePost} style={{ flex: "1", background: "#6C757D", fontSize: "15px" }}>
                    Close
                </Button>
                <Button onClick={handleSaveUpdatePost} style={{ flex: "1", background: "#0D6EFD", fontSize: "15px" }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default PostContentComponent;