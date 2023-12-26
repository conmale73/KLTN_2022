import { useState } from "react";
import { useSelector } from "react-redux";

import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
const Friends = () => {
    document.title = "Friends | MySPACE";
    const user = useSelector((state) => state.user.data);

    return (
        <div className="w-full flex flex-col gap-[30px] ">
            <div className="flex flex-col">
                <p className="text-[#f0f0f0] text-[20px] font-bold">
                    Friend List
                </p>
                <FriendList user_id={user._id} />
            </div>
            <div className="flex flex-col">
                <p className="text-[#f0f0f0] text-[20px] font-bold">
                    Friend Requests
                </p>
                <FriendRequests user_id={user._id} />
            </div>
        </div>
    );
};

export default Friends;
