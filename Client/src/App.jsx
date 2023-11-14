import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import useShowScrollbar from "./hooks/useShowScrollbar";
import { SongProvider } from "./context/SongContext";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/onlineUsers/onlineUsersSlice";

function App() {
    useShowScrollbar();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);

    useEffect(() => {
        if (user) {
            // Connect to the Socket.IO server (use your server URL)
            const socket = new io("http://localhost:3000");

            socket.on("connect", () => {
                socket.emit("addNewOnlineUser", user._id);
            });

            socket.on("getOnlineUsers", (data) => {
                dispatch(setOnlineUsers(data));
            });

            return () => {
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
