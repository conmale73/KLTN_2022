import "./SearchBox.scss";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { songService } from "../../../services";

const SearchBox = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        console.log("searching:", search);
        try {
            const response = await songService.querySong(search);
            console.log("response: ", response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // useEffect(() => {
    //     if (search.length > 0) {
    //         setIsSearching(true);
    //         setTimeout(() => {
    //             setIsSearching(false);
    //             setSearchResults(["song1", "song2", "song3"]);
    //         }, 1000);
    //     } else {
    //         setSearchResults([]);
    //     }
    // }, [search]);

    return (
        <div className="searchBox">
            <div className="box">
                <form
                    onSubmit={(e) => handleSubmitSearch(e)}
                    style={{ width: "100%", display: "flex" }}
                >
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                    <div className="searchButton" onClick={handleSubmitSearch}>
                        <FaSearch className="icon" size="24px" />
                    </div>
                </form>
            </div>
            {isSearching && <div className="searching">Searching...</div>}
            {searchResults.length > 0 && (
                <div className="results">
                    {searchResults.map((result) => (
                        <div className="result">{result}</div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SearchBox;
