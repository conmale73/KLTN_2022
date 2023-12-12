import React, { useState } from "react";
import { groupService } from "../../../../services";
import { FaSearch } from "react-icons/fa";
import { setGroupInput } from "../../../../redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const GroupSearchbar = ({ searchQuery, setSearchQuery }) => {
    const [isSearching, setIsSearching] = useState(false);

    const [groups, setGroups] = useState([]);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const fetchGroups = async () => {
        const res = await groupService.searchGroupsByName(searchQuery);
        setGroups(res.data.data);
        return res.data.data;
    };

    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        setIsSearching(true);
        try {
            fetchGroups();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickSearchResult = (group) => {
        setSearchQuery(group.name);
        dispatch(setGroupInput(group.name));
        setIsSearching(false);
        navigator(`/social/groups/search/${encodeURIComponent(group.name)}`);
    };
    return (
        <div className="w-full h-[50px] ">
            <input
                className="w-full h-full bg-transparent rounded-[20px] p-[10px]
                 text-[#e4e6eb] text-[20px] border-[1px] border-[#e0d9d9]"
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => handleSearchInput(e)}
            />
            {isSearching && searchQuery != "" && (
                <div className="w-full bg-[#0000005d] pt-[10px] pb-[10px] rounded-[5px]">
                    <div className="flex flex-col w-full justify-start my-[10px] px-[10px]">
                        {groups.map((group, index) => (
                            <div
                                className="flex items-center w-full h-[50px] p-[5px] gap-[10px] cursor-pointer rounded-[10px] hover:bg-[#303030]"
                                key={index}
                            >
                                <FaSearch size="20px" />
                                <div
                                    className="overflow-ellipsis"
                                    onClick={() =>
                                        handleClickSearchResult(group)
                                    }
                                >
                                    {group.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupSearchbar;
