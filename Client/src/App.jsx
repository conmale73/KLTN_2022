import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import useShowScrollbar from "./hooks/useShowScrollbar";
import { SongProvider } from "./context/SongContext";
import { useEffect } from "react";
function App() {
    useShowScrollbar();

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
    }
    useEffect(() => {
        google?.accounts.id.initialize({
            client_id:
                "424626895989-uiicjbj1fk9205u8n1kk5g9tjqgn7p3p.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });
    }, []);
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
