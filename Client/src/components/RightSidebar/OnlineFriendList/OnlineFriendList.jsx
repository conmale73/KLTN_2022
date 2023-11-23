import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./onlineFriendList.module.scss";
import SmallSong from "../../Song/SongSmall/SongSmall";
import { useQueries } from "@tanstack/react-query";
import { userService } from "../../../services";
import Loading from "../../Loading";
import Contact from "../../Contact";
const OnlineFriendList = () => {
    const user = useSelector((state) => state.user.data);
    const [contacts, setContacts] = useState([]);

    async function fetchContacts() {
        const res = await userService.getAllUsers();
        setContacts(res.data.data);
        return res.data.data;
    }

    const { isLoading, error, data } = useQueries({
        queries: [
            {
                queryKey: ["contacts", user?._id],
                queryFn: () => fetchContacts(),
            },
        ],
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;
    return (
        <div className="onlineFriendList mt-6">
            {contacts.map((contact, index) => (
                <Contact key={index} contact={contact} />
            ))}
        </div>
    );
};
export default OnlineFriendList;
