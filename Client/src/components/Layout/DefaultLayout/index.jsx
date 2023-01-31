import React, { useState } from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import Sidebar from "../../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
function DefaultLayout({ children }) {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Header />
            <Sidebar isOpen={isOpen} />
            <main role="main" className="wrapper">
                <div className="content">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default DefaultLayout;
