import React from "react";
import styles from "./Home.module.scss";
import Banner from "./Banner";
import Recently from "./Recently";
import Recommend from "./Recommend";
const Home = (props) => {
    document.title = props.title;
    return (
        <div className={styles.home}>
            <Banner />
            <Recently />
            <Recommend />
            <Recommend />
        </div>
    );
};
export default Home;
