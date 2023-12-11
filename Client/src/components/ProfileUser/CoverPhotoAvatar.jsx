import styles from "./coverPhotoAvatar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { userService } from "../../services";
import { updateAvatarRedux, updateCoverRedux } from "../../redux/user/userSlice";
import io from "socket.io-client";
import { friendStatusService } from "../../services/friendStatus.service";

var socket = io("http://localhost:3000");
const CoverPhotoAvatar = ({ changeLoadP, userIdLink }) => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [load, setLoadTable] = useState(false);// state load khi them thanh cong
    const [selectedFile, setSelectedFile] = useState(null);//file change

    //infor-user
    const [linkCoverPhoto, setLinkCoverPhoto] = useState(user.cover_image);//cover_image
    const [linkAvatar, setLinkAvatar] = useState(user.avatar);

    const [stateButtunAddfrined, setStateButtunAddfrined] = useState(1);
    //1 chua ket ban
    //2 dang cho => danh cho nguoi nhan
    //3 huy ket ban ==> danh cho nguoi gui
    //4 ban be
    useEffect(() => {
        if (user._id !== userIdLink) {
            userService.getUserById(userIdLink).then((response) => {
                const data = response.data.data;
                setLinkCoverPhoto(data.cover_image)
                setLinkAvatar(data.avatar)
            })
        }

        //check trang thai
        friendStatusService.getChechfriendStatus(user._id).then((response) => {
            const data = response.data;
            console.log("du lieu trang thai");
            console.log(data);
            let listWait = data.content.awaitingList ? data.content.awaitingList : [];
            let listAccpet = data.content.acceptList ? data.content.acceptList : [];
            console.log(listWait);
            const isUserIdWaitExist = listWait.some(
                (awaitingItem) => awaitingItem.user_awaiting_id === userIdLink
            );
            if (isUserIdWaitExist) {// kiem tra list đang chờ
                setStateButtunAddfrined(2);
            }
            else {
                const isUserIdAccpetExist = listAccpet.some(// kiểm tra list bạn bè
                    (awaitingItem) => awaitingItem.user_accept_id === userIdLink
                );
                if (isUserIdAccpetExist) {// kiem tra list cho
                    setStateButtunAddfrined(4);
                } else {
                    // user đang đăng nhập là người nhận lời mời
                    // xét thêm user đang đăng nhập và người gửi lời mời
                    friendStatusService.getChechfriendStatus(userIdLink).then((response1) => {
                        const data1 = response1.data;
                        console.log("du lieu trang thai");
                        console.log(data);
                        let listWait1 = data1.content.awaitingList ? data1.content.awaitingList : [];
                        let listAccpet1 = data1.content.acceptList ? data1.content.acceptList : [];
                        console.log(listWait);
                        const isUserIdWaitExist1 = listWait1.some(
                            (awaitingItem) => awaitingItem.user_awaiting_id === user._id
                        );
                        if (isUserIdWaitExist1) {// kiem tra list đang chờ
                            setStateButtunAddfrined(3);
                        }
                        else {
                            const isUserIdAccpetExist1 = listAccpet1.some(// kiểm tra list bạn bè
                                (awaitingItem) => awaitingItem.user_accept_id === user._id
                            );
                            if (isUserIdAccpetExist1) {// kiem tra list cho
                                setStateButtunAddfrined(4);
                            }
                            else {
                                setStateButtunAddfrined(1);
                            }
                        }
                    })
                }
            }
        })


    }, [load])
    //change avatar
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const handleCloseChangeAvatar = () => setShowChangeAvatar(false);
    const handleShowChangeAvatar = () => setShowChangeAvatar(true);

    const handleSaveChangeAvatar = async () => {
        if (!selectedFile) {
            alert("vui long chon anh")
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append('uploadedFile', selectedFile);
            formData.append('email', user.email);
            const response = await userService.updateAvatar(formData);
            console.log(response);
            //set lai data rudux
            let imageA = response.data.urlImage;
            dispatch(updateAvatarRedux(imageA));
            handleCloseChangeAvatar();
            setLoadTable(!load);
            changeLoadP();
        }

    }

    //change cover image
    const [showChangeCoverPhoto, setShowChangeCoverPhoto] = useState(false);
    const handleCloseChangeCoverPhoto = () => setShowChangeCoverPhoto(false);
    const handleShowChangeCoverPhoto = () => {
        setSelectedFile(null);
        setShowChangeCoverPhoto(true)
    };

    const handleSaveChangeCoverImage = async () => {
        //console.log(selectedFile.type);
        if (!selectedFile) {
            alert("vui long chon anh")
        }
        if (selectedFile) {
            const formData = new FormData();
            formData.append('uploadedFile', selectedFile);
            formData.append('email', user.email);
            const response = await userService.updateCoverImage(formData);
            console.log(response);
            //set lai data rudux
            let imageC = response.data.urlImage;
            dispatch(updateCoverRedux(imageC));
            handleCloseChangeCoverPhoto();
            setLinkCoverPhoto(imageC);
            setLoadTable(!load);
        }

    }

    const handleSendFriendRequest = () => {
        setStateButtunAddfrined(3);
        console.log("gui add")
        socket.emit('sendFriendRequest', { senderUserId: user._id, receivedUser_id: userIdLink, username: user.username });
        // Các xử lý khác (cập nhật state, hiển thị thông báo, ...)
    };

    const handleAcceptFriend = () => {
        setStateButtunAddfrined(4);//ban be
        console.log("gui accept");
        socket.emit('acceptFriendRequest', { senderUserId: user._id, receivedUser_id: userIdLink, username: user.username });
    }

    const handleCancelInvitationRequest = (senderUserId, receivedUser_id) => {
        let dataResquest = {
            senderUserId: senderUserId,
            receivedUser_id: receivedUser_id
        }
        friendStatusService.cancelFriendWhenWaiting(dataResquest).then((dataResponse) => {
            let result = dataResponse.data.success;
            if (result) {
                setStateButtunAddfrined(1);
            }
        })
    }

    //change cover image
    const [confirmCancelFrined, setConfirmCancelFrined] = useState(false);
    const handleCloseConfirmCancelFrined = () => setConfirmCancelFrined(false);
    const handleShowConfirmCancelFrined = () => {
        setConfirmCancelFrined(true)
    };

    const handleCancelWhenFriend = (senderUserId, receivedUser_id) => {
        let dataResquest = {
            senderUserId: senderUserId,
            receivedUser_id: receivedUser_id
        }
        friendStatusService.cancelFriendWhenFriend(dataResquest).then((dataResponse) => {
            let result = dataResponse.data.success;
            if (result) {
                setStateButtunAddfrined(1);
                handleCloseConfirmCancelFrined();
            }
        })
    }

    return <>
        <div className={styles.Profile}>
            <div
                className={styles.CoverPhoto}
                style={{ backgroundImage: `url(${linkCoverPhoto})` }}
            >
                {
                    (userIdLink === user._id) && (<div className={styles.CoverButtons}>

                        <button className={styles.CoverButton} onClick={handleShowChangeAvatar}>Change Avatar</button>
                        <button className={styles.CoverButton} onClick={handleShowChangeCoverPhoto}>Change CoverPhoto</button>
                    </div>)
                }

            </div>

            <div style={{ display: "flex" }}>
                <div
                    className={styles.ProfilePhoto}
                    style={{ backgroundImage: `url(${linkAvatar})` }}
                ></div>
                {
                    (userIdLink !== user._id) && (stateButtunAddfrined === 1) && (
                        <button
                            className={styles.ProfileFooterButton}
                            onClick={handleSendFriendRequest}
                        >
                            Add friend
                        </button>

                    )
                }
                {
                    (userIdLink !== user._id) && (stateButtunAddfrined === 2) && (
                        <div className={styles.CoverButton2}><DropdownButton id="dropdown-basic-button" title="Đang chờ" style={{ background: "#1877F2" }}>
                            <Dropdown.Item onClick={(e) => {
                                e.preventDefault();
                                handleAcceptFriend();
                            }}>Chấp Nhận</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {
                                e.preventDefault();
                                handleCancelInvitationRequest(userIdLink, user._id);
                            }}>Xóa lời mời</Dropdown.Item>
                        </DropdownButton></div>
                    )
                }
                {
                    (userIdLink !== user._id) && (stateButtunAddfrined === 3) && (
                        <button
                            className={styles.ProfileFooterButton}
                            onClick={() => handleCancelInvitationRequest(user._id, userIdLink)}
                        >
                            Hủy Lời mời
                        </button>

                    )
                }
                {
                    (userIdLink !== user._id) && (stateButtunAddfrined === 4) && (
                        <button
                            className={styles.ProfileFooterButton}
                            onClick={handleShowConfirmCancelFrined}
                        >
                            Bạn bè
                        </button>

                    )
                }
            </div>


        </div>

        {/* modal avatar */}
        <Modal show={showChangeAvatar} onHide={handleCloseChangeAvatar}>
            <Modal.Header closeButton style={{ color: "black" }}>
                <Modal.Title>Change Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
                <Form.Group className="mb-3">
                    <div style={{ display: "flex" }}>
                        <div>
                            <img style={{ border: "1px solid black" }} src={user.avatar} width={100} height={100} alt="lỗi ảnh" />
                        </div>
                        <div style={{ margin: "auto" }}>
                            <Form.Control type="file" onChange={(e) => {
                                const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                                if (validImageTypes.includes(e.target.files[0].type)) {
                                    setSelectedFile(e.target.files[0]);
                                } else {
                                    alert('Vui lòng chọn một tệp hình ảnh có định dạng hợp lệ (JPEG, PNG, GIF).');
                                }
                            }} style={{ fontSize: "15px", color: "black" }} />
                        </div>
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseChangeAvatar} style={{ background: "#6C757D", fontSize: "15px" }}>
                    Close
                </Button>
                <Button onClick={handleSaveChangeAvatar} style={{ background: "#0D6EFD", fontSize: "15px" }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        {/* modal change cover image */}
        <Modal show={showChangeCoverPhoto} onHide={handleCloseChangeCoverPhoto}>
            <Modal.Header closeButton style={{ color: "black" }}>
                <Modal.Title>Change CoverPhoto</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
                <Form.Group className="mb-3">
                    <div style={{ display: "flex" }}>
                        <div>
                            <img style={{ border: "1px solid black" }} src={user.cover_image} width={100} height={100} alt="lỗi ảnh" />
                        </div>
                        <div style={{ margin: "auto" }}>
                            <Form.Control type="file" onChange={(e) => {
                                const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                                if (validImageTypes.includes(e.target.files[0].type)) {
                                    setSelectedFile(e.target.files[0]);
                                } else {
                                    alert('Vui lòng chọn một tệp hình ảnh có định dạng hợp lệ (JPEG, PNG, GIF).');
                                }
                            }} style={{ fontSize: "15px", color: "black" }} />
                        </div>
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseChangeCoverPhoto} style={{ background: "#6C757D", fontSize: "15px" }}>
                    Close
                </Button>
                <Button onClick={handleSaveChangeCoverImage} style={{ background: "#0D6EFD", fontSize: "15px" }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        {/* modal change cover image */}
        <Modal show={confirmCancelFrined} onHide={handleCloseConfirmCancelFrined}>
            <Modal.Header closeButton style={{ color: "black" }}>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
                Bạn Xác nhận hủy kết bạn chứ
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCloseConfirmCancelFrined} style={{ background: "#6C757D", fontSize: "15px" }}>
                    Close
                </Button>
                <Button onClick={()=> handleCancelWhenFriend(user._id, userIdLink)} style={{ background: "#0D6EFD", fontSize: "15px" }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    </>
}

export default CoverPhotoAvatar;