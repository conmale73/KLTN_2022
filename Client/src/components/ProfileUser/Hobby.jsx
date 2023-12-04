import { useEffect, useState } from "react";
import styles from "./hobby.module.scss";
import { hobbyService } from "../../services/hobby.service";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap';
const Hobby = ({ userIdLink }) => {

    const user = useSelector((state) => state.user.data);
    const [load, setLoad] = useState(false);
    const [hobbyList, setHobbyList] = useState([]);

    useEffect(() => {
        hobbyService.getAllHobby(userIdLink).then((response) => {
            console.log(response.data)
            setHobbyList(response.data.reverse())
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [load])

    const [expandedButtons, setExpandedButtons] = useState({});
    const toggleButtons = (hobbyId) => {
        setExpandedButtons(prevState => ({
            ...prevState,
            [hobbyId]: !prevState[hobbyId]//key dynamic
        }));
    };

    const deleteHobbyById = (id) => {
        hobbyService.deleteHobby(id).then((dataResponse) => {
            let dataShow = dataResponse.data;
            if (dataShow.result) {
                setLoad(!load);
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    //them hobby
    const [value, setValue] = useState("");

    const [showAddHobby, setShowAddHobby] = useState(false);
    const handleCloseAddHobby = () => setShowAddHobby(false);
    const handleShowAddHobby = () => {
        setValue("");
        setShowAddHobby(true);
    };

    const handleSaveHobby = () => {
        if (!value) {
            alert("du lieu loi")
        }
        let dataReq = {
            user_id: user._id,
            content: value
        }
        hobbyService.addHobby(dataReq).then((dataResponse) => {
            let dataShow = dataResponse.data;
            if (dataShow.result) {
                handleCloseAddHobby();
                setLoad(!load);
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <> <div id="C" className={styles.Tspost} style={{ maxWidth: "200px", height: "500px" }}>
            <div className={styles.TspostP} style={{ textAlign: "center", color: "black" }}>
                <div style={{
                    color: "blue",
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderBottom: "1px solid",
                    marginBottom: "10px"
                }}>Hobby</div>
                {
                    (user._id === userIdLink) && (
                        <><div onClick={handleShowAddHobby} className={styles.DivAdd} >Thêm hobby</div>
                            <hr style={{ marginLeft: "40px", marginRight: "40px" }}></hr></>
                    )
                }

                <div style={{ textAlign: "start", paddingLeft: "50px" }}>
                    {hobbyList.map((hobby) => (
                        <div key={hobby._id}>{hobby.content}
                            {
                                (user._id === userIdLink) && (<button className={styles.EllipsisButton} onClick={() => toggleButtons(hobby._id)}> ...</button>)
                            }

                            {expandedButtons[hobby._id] && (
                                <div>
                                    <button className={styles.DeleteButton} onClick={() => deleteHobbyById(hobby._id)}>Xóa</button>
                                </div>
                            )}</div>
                    ))}
                </div>
            </div>

        </div>

            <Modal show={showAddHobby} onHide={handleCloseAddHobby}>
                <Modal.Header closeButton style={{ color: "black" }}>
                    <Modal.Title>Thêm hobby</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "black" }}>
                    <Form.Group className="mb-3">
                        <div style={{ display: "flex" }}>
                            <div style={{ margin: "auto" }}>
                                <Form.Control type="text" onChange={(e) => {
                                    (setValue(e.target.value));
                                }} style={{ fontSize: "15px", color: "black" }} />
                            </div>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseAddHobby} style={{ background: "#6C757D", fontSize: "15px" }}>
                        Close
                    </Button>
                    <Button onClick={handleSaveHobby} style={{ background: "#0D6EFD", fontSize: "15px" }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Hobby;