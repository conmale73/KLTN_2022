import styles from "./coverPhotoAvatar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { userService } from "../../services";
import { updateAvatarRedux, updateCoverRedux } from "../../redux/user/userSlice";
const CoverPhotoAvatar = ({ changeLoadP, userIdLink}) => {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [load, setLoadTable] = useState(false);// state load khi them thanh cong
    const [selectedFile, setSelectedFile] = useState(null);//file change

    //infor-user
    const [linkCoverPhoto, setLinkCoverPhoto] = useState(user.cover_image);//cover_image
    const [linkAvatar, setLinkAvatar] = useState(user.avatar);
    
    useEffect(() => {
        if (user._id !== userIdLink) {
            userService.getUserById(userIdLink).then((response) => {
                const data = response.data.data;           
                setLinkCoverPhoto(data.cover_image)
                setLinkAvatar(data.avatar)
            })
        }
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

            <div
                className={styles.ProfilePhoto}
                style={{ backgroundImage: `url(${linkAvatar})` }}
            ></div>
            {
                (userIdLink !== user._id) && (<button
                    className={styles.ProfileFooterButton}
                >
                    Add friend
                </button>)
            }

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

    </>
}

export default CoverPhotoAvatar;