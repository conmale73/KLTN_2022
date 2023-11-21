import React, { useState } from "react";

import Header from "../../Header";
import Footer from "../../Footer";
import LeftSidebar from "../../LeftSidebar";
import RightSidebar from "../../RightSidebar";
import ToReadingButton from "../../ToReadingButton";

import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setShowFooter } from "../../../redux/showFooter/showFooterSlice";

function DefaultLayout({ children }) {
    const showFooter = useSelector((state) => state.showFooter.show);
    const dispatch = useDispatch();

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <LeftSidebar />

                <div className={styles.headerAndContent}>
                    <div className={styles.header}>
                        <Header />
                    </div>

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
            <div
                className={`${styles.bottom} ${showFooter ? "" : styles.hide}`}
            >
                <button
                    className={styles.toggleButton}
                    onClick={() => dispatch(setShowFooter(!showFooter))}
                    title={showFooter ? "Hide" : "Show"}
                >
                    {showFooter ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;
