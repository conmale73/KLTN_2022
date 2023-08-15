import React from "react";
import styles from "./Home.module.scss";
import { useState, useEffect } from "react";
import { recommendationService } from "../../services/recommendation.service";
import HomeModules from "./HomeModules";
const Home = (props) => {
    document.title = props.title;
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await recommendationService.getHome(
                    "VN",
                    "en"
                );
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        console.log("searchResults: ", searchResults);
    }, [searchResults]);

    return (
        <div className={styles.home}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <HomeModules data={searchResults} />
            )}
        </div>
    );
};
export default Home;
