import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { MdOutlineKey } from "react-icons/md";

import { groupService } from "../../../services";
import Loading from "../../../components/Loading";
import UserPreview from "../../../components/UserPreview(FullDataProvided)";
import UserInfoPreview from "../../../components/UserInfoPreview";
import Divider from "../../../components/Divider";
const Members = ({ group_id, memberList, admins }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [members, setMembers] = useState([]);
    const searchMembers = async () => {
        const res = await groupService.searchMembersOfGroupByName(
            group_id,
            searchQuery
        );
        setMembers(res.data.data);
        return res.data.data;
    };
    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        setIsSearching(true);
        try {
            searchMembers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-[10px] max-w-[1000px] h-fit min-h-[500px] rounded-[20px] bg-[#303030] p-[10px]">
            <p className="text-[20px] text-[#e4e6eb] font-[700]">Members</p>
            <p className="text-[16px] text-[#adadad] font-[500]">
                Members of group will appear here
            </p>

            {/*Members search bar*/}
            <div className="w-full h-[40px] ">
                <input
                    className="w-full h-full bg-transparent rounded-[20px] p-[10px]
                 text-[#e4e6eb] text-[16px] border-[1px] border-[#e0d9d9]"
                    type="text"
                    placeholder="Find a member..."
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e)}
                />
            </div>
            {isSearching && searchQuery != "" ? (
                <div className="w-full pt-[10px] pb-[10px] rounded-[5px]">
                    <p>Search results</p>
                    <div className="flex flex-wrap w-full justify-start my-[10px] px-[10px] gap-[20px]">
                        {members.map((member, index) => {
                            if (admins.includes(member._id)) {
                                return (
                                    <div className="w-[30%] border-[1px] border-solid border-[#ababab] rounded-[20px] p-[2px] relative">
                                        <UserPreview
                                            key={member._id}
                                            thumbnailHeight="50px"
                                            thumbnailWidth="50px"
                                            userData={member}
                                            link={true}
                                            showName={true}
                                            bgStyles={true}
                                        />
                                        <p
                                            className="absolute top-[-10px] left-[-5px]"
                                            title="Admin"
                                        >
                                            <MdOutlineKey size="20px" />
                                        </p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="w-[30%]">
                                        <UserPreview
                                            key={member._id}
                                            thumbnailHeight="50px"
                                            thumbnailWidth="50px"
                                            userData={member}
                                            link={true}
                                            showName={true}
                                            bgStyles={true}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            ) : (
                <div className="w-full mb-[10px] rounded-[5px]">
                    <div className="flex flex-wrap w-full justify-start mb-[20px] mt-[20px] px-[10px] gap-[20px]">
                        {memberList.map((member, index) => {
                            if (admins.includes(member)) {
                                return (
                                    <div className="w-[30%] border-[1px] border-solid border-[#ababab] rounded-[20px] p-[2px] relative">
                                        <UserInfoPreview
                                            key={member}
                                            thumbnailHeight="50px"
                                            thumbnailWidth="50px"
                                            user_id={member}
                                            link={true}
                                            showName={true}
                                            bgStyles={true}
                                        />
                                        <p
                                            className="absolute top-[-10px] left-[-5px]"
                                            title="Admin"
                                        >
                                            <MdOutlineKey size="20px" />
                                        </p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="w-[30%]">
                                        <UserInfoPreview
                                            key={member}
                                            thumbnailHeight="50px"
                                            thumbnailWidth="50px"
                                            user_id={member}
                                            link={true}
                                            showName={true}
                                            bgStyles={true}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <Divider />
                    <div className="w-full flex flex-col gap-[10px]">
                        <p className="text-[20px] text-[#e4e6eb] font-[700]">
                            Group Admins
                        </p>
                        <div className="flex flex-wrap w-full justify-start mb-[20px] px-[10px] gap-[20px]">
                            {admins.map((admin, index) => (
                                <div className="w-[30%] border-[1px] border-solid border-[#ababab] rounded-[20px] p-[2px] relative">
                                    <UserInfoPreview
                                        key={admin}
                                        thumbnailHeight="50px"
                                        thumbnailWidth="50px"
                                        user_id={admin}
                                        link={true}
                                        showName={true}
                                        bgStyles={true}
                                    />
                                    <p
                                        className="absolute top-[-10px] left-[-5px]"
                                        title="Admin"
                                    >
                                        <MdOutlineKey size="20px" />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Members;
