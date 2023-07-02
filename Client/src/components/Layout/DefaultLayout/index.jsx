import React, { useState } from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import LeftSidebar from "../../LeftSidebar";
import RightSidebar from "../../RightSidebar";


import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

function DefaultLayout({ children }) {
    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.left}> 
                <LeftSidebar />
                </div>
                <div className={styles.headerAndContent}>
                    <Header />
                    <div className={styles.content}>
                        <main role="main" className="wrapper">
                            <Outlet />
                        </main>
                    </div>
                </div>

                <div className={styles.left}> 
                <RightSidebar />
                </div>
            </div>
            <div className={styles.bottom}>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
