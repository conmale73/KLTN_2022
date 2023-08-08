import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "./App.css";
import useShowScrollbar from "./hooks/useShowScrollbar";
import { SongProvider } from "./context/SongContext";
function App() {
    useShowScrollbar();
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
