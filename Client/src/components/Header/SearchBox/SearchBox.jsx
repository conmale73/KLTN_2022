import "./SearchBox.scss";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { searchService } from "../../../services";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../../redux/search/searchSlice";
const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
        setIsSearching(true);
        try {
            async function fetchData() {
                const response = await searchService.query(e.target.value);
                setSearchResults(response.data);
            }
            fetchData();
        } catch (error) {}
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setIsSearching(false);
        navigator(`/music/search-results?q=${encodeURIComponent(searchInput)}`);
        dispatch(setInput(searchInput));
        localStorage.setItem("searchInput", JSON.stringify(searchInput));
    };
    const handleClickResult = (e) => {
        setSearchInput(e.target.innerText);
        setIsSearching(false);
        navigator(
            `/music/search-results?q=${encodeURIComponent(e.target.innerText)}`
        );
        dispatch(setInput(e.target.innerText));
        localStorage.setItem("searchInput", JSON.stringify(e.target.innerText));
    };

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
                        value={searchInput}
                        onChange={(e) => handleSearchInput(e)}
                    />
                    <div className="searchButton" onClick={handleSubmitSearch}>
                        <FaSearch className="icon" size="24px" />
                    </div>
                </form>
            </div>

            {isSearching && searchInput != "" && (
                <div className="results">
                    {searchResults.map((result) => (
                        <div
                            className="result"
                            onClick={(e) => handleClickResult(e)}
                        >
                            <div className="icon">
                                <AiOutlineSearch size="24px" />
                            </div>
                            <div className="text">{result}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default SearchBox;
