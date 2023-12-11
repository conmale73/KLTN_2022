import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import useShowScrollbar from "./hooks/useShowScrollbar";
import { SongProvider } from "./context/SongContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/onlineUsers/onlineUsersSlice";
import { voiceChannelService } from "./services";
import { useState } from "react";
import { setAddTotal, setNotificationList } from "./redux/notificationStore/notificationUserSlice";
import { notificationService } from "./services/notification.service";
function App() {
    useShowScrollbar();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const notificationlist = useSelector((state) => state.notificationSlice);
    const currentVoiceChannel = useSelector(
        (state) => state.currentVoiceChannel.data
    );
    //const [totalNotification, setTotalNotification] = useState(0);

    useEffect(() => {
        if (user) {
            const socket = io("http://localhost:3000");

            socket.on("connect", () => {
                console.log("ok luon chay")
                console.log(notificationlist)
                socket.emit("addNewOnlineUser", user._id);
            });

            socket.on("getOnlineUsers", (data) => {
                dispatch(setOnlineUsers(data));
            });

            socket.on('receiveFriendRequest', (notification) => {
                // Xử lý khi nhận được thông báo kết bạn
                console.log('Received friend request:', notification);
                //dispatch(addNotificationList(notification.content));
                notificationService.getListNotificationByUserId(user._id, 1, 5).then((dataResponse) => {
                    console.log(dataResponse.data.data);
                    let listNofity = dataResponse.data.data;
                    dispatch(setNotificationList(listNofity));
                    dispatch(setAddTotal());
                }).catch((error) => {
                    console.error(error)
                })

            });

            socket.on('receiveAcceptFriendRequest', (notification) => {
                // Xử lý khi nhận được thông báo kết bạn
                console.log('Received accept friend request:', notification);
                //dispatch(addNotificationList(notification.content));
                notificationService.getListNotificationByUserId(user._id, 1, 5).then((dataResponse) => {
                    console.log(dataResponse.data.data);
                    let listNofity = dataResponse.data.data;
                    dispatch(setNotificationList(listNofity));
                    dispatch(setAddTotal());
                }).catch((error) => {
                    console.error(error)
                })

            });

            // Emit an event when the user is about to leave the page
            const handleBeforeUnload = () => {
                socket.emit("deleteOnlineUser", user._id);
                voiceChannelService.leaveAllVoiceChannel(user._id);

                socket.on("getOnlineUsers", (data) => {
                    dispatch(setOnlineUsers(data));
                });
            };


            // Attach the event listener
            window.addEventListener("beforeunload", handleBeforeUnload);

            return () => {
                // Remove the event listener when the component is unmounted
                window.removeEventListener("beforeunload", handleBeforeUnload);

                socket.emit("deleteOnlineUser", user._id);
                socket.on("getOnlineUsers", (data) => {
                    dispatch(setOnlineUsers(data));
                });
                socket.disconnect();
            };
        }
    }, [user]);
    return (
        <Router>
            <SongProvider>
                <div className="background-image">
                    <div className="App">
                        <Routes />
                    </div>
                </div>
            </SongProvider>
        </Router>
    );
}

export default App;
