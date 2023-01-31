import React, { useState } from "react";
import "./Sidebar.scss";
const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div>
            <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
                <div className="sidebar-header">
                    <h2>Sidebar</h2>
                    <button onClick={() => setShowSidebar(!showSidebar)}>
                        {showSidebar ? "Close" : "Open"}
                    </button>
                </div>
                <p>Sidebar content goes here...</p>
            </div>
        </div>
    );
};
export default Sidebar;
