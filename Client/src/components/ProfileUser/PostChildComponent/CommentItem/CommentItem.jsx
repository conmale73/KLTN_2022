import { useState } from "react";
import { FormatDate } from "../../../../utils";
import styles from "./commentItem.module.scss";
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { commentService } from "../../../../services/comment.service";
import { useSelector } from "react-redux";
const CommentItem = ({ comment, loadComponentWhenDeleteItem, userIdLink }) => {

    const user = useSelector((state) => state.user.data);
    const [value, setValue] = useState(comment.content);

    const [updateComment, setUpdateComment] = useState(false);
    const handleCloseUpdateComment = () => setUpdateComment(false);
    const handleShowUpdateComment = () => {
        setUpdateComment(true);
    };

    async function put(dataPost) {
        try {
            const res = await commentService.putCommentById(dataPost);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSaveUpdateComment = async () => {
        let dataPost = {
            comment_id: comment._id,
            content: value,
        };

        try {
            await put(dataPost);
            handleCloseUpdateComment();
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteComment = async (comment_id) => {
        let dataRequest = {
            comment_id: comment_id
        }
        try {
            const res = await commentService.deleteCommentById(dataRequest);
            console.log(res);
            alert(res.data.message);
            loadComponentWhenDeleteItem();
        } catch (err) {
            console.log(err);
        }
    }
    return (<>
        <div className={styles.Tspost__content1} style={{ background: '#F0F2F5', marginBottom: "2px" }}>
            <div className={styles.Tspost__content1__avatar1}>
                <img src={comment.user_info.avatar} alt="User Avatar" />
            </div>
            <div className={styles.Tspost__content1__text1}>
                <div style={{ color: "black", fontSize: "12px", display: "flex" }}><div style={{ marginRight: "20px" }}><b>{comment.user_info.username}</b></div><div style={{ fontSize: "10px" }}>{FormatDate(comment.timeStamp)}</div></div>
                <div>{value}</div>
            </div>
            {
                ((user._id === comment.user_info.user_id) || (user._id === userIdLink)) && (
                    <DropdownButton id="dropdown-basic-button" title="..." style={{ background: "#1877F2" }}>
                        {
                            (user._id === comment.user_info.user_id) && (
                                <Dropdown.Item onClick={(e) => {
                                    e.preventDefault();
                                    handleShowUpdateComment();
                                }}>Edit</Dropdown.Item>
                            )
                        }

                        <Dropdown.Item onClick={(e) => {
                            e.preventDefault();
                            handleDeleteComment(comment._id);
                        }}>Xóa</Dropdown.Item>
                    </DropdownButton>
                )
            }

        </div>

        {/* modal update */}
        <Modal show={updateComment} onHide={handleCloseUpdateComment} style={{ top: "20%" }}>
            <Modal.Header closeButton style={{ color: "black" }}>
                <Modal.Title><div style={{ paddingLeft: "120px", fontSize: "25px" }}><b>Update Comments</b></div></Modal.Title>
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
                    }}><img src={comment.user_info.avatar} alt="User Avatar" /></div>
                    <div>
                        <div style={{ color: "black" }}><b>{comment.user_info.username}</b>
                        </div>
                        <div><i>{FormatDate(comment.timeStamp)}</i></div>
                    </div>
                </div>
                <Form.Group className="mb-3">
                    <div style={{ display: "flex" }}>
                        <Form.Control
                            as="textarea"
                            rows={3}
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
                <Button onClick={handleCloseUpdateComment} style={{ flex: "1", background: "#6C757D", fontSize: "15px" }}>
                    Close
                </Button>
                <Button onClick={handleSaveUpdateComment} style={{ flex: "1", background: "#0D6EFD", fontSize: "15px" }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default CommentItem;