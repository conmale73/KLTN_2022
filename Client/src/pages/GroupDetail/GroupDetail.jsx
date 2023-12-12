import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setExtend } from "../../redux/mode/modeSlice";
import { useParams } from "react-router-dom";
import { groupService } from "../../services";
import { useQuery } from "@tanstack/react-query";

import { FaPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import Loading from "../../components/Loading";
import ImageViewer from "../../components/ImageViewer";
import UserInfoPreview from "../../components/UserInfoPreview";
const GroupDetail = () => {
    const { group_id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data) || { _id: "" };
    useEffect(() => {
        dispatch(setExtend("groupDetail"));

        return () => {
            dispatch(setExtend(null));
        };
    }, []);

    const [group, setGroup] = useState(null);
    const fetchGroup = async () => {
        const res = await groupService.getGroupById(group_id, user._id);
        setGroup(res.data.data);
        return res.data.data;
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["groupDetail", group_id],
        queryFn: () => fetchGroup(),
    });

    if (isLoading) return <Loading isFullScreen={true} />;
    if (error) return <p>{error.message}</p>;

    const handleClickInvite = () => {};

    const handleClickJoin = () => {};
    return (
        <div className="container flex w-full">
            <div
                className={`groupHeader w-full h-[600px] flex flex-col items-center bg-[#303030]
             `}
            >
                <div
                    className="imageContainer flex justify-center groupThumbnail w-[80%] h-[400px] 
                object-fill relative"
                >
                    {group && (
                        <ImageViewer
                            image={group?.thumbnail?.files[0]}
                            objectFit="cover"
                        />
                    )}

                    <div className="groupBy flex items-center gap-2 pl-[10px] absolute bottom-0 h-[50px] w-full bg-[#414141]">
                        <span className="">{`Group by`}</span>
                        <UserInfoPreview
                            nameOnly={true}
                            user_id={group?.creator_id}
                            link={true}
                        />
                    </div>
                </div>
                <div className="groupInfo w-full h-[200px] flex justify-center">
                    <div className="w-[80%] ">
                        <div className="groupName text-[30px] font-bold text-start">
                            {group?.name}
                        </div>
                        <div className="groupMemberPreview flex w-full h-fit items-center gap-2 relative">
                            {group?.members?.map((member, index) => {
                                if (index < 10) {
                                    return (
                                        <UserInfoPreview
                                            thumbnailWidth="30px"
                                            thumbnailHeight="30px"
                                            key={index}
                                            user_id={member}
                                            showName={false}
                                            displayOnlineStatus={false}
                                        />
                                    );
                                }
                            })}
                            {group?.members.includes(user._id) ? (
                                <span
                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                    onClick={() => handleClickInvite()}
                                >
                                    <FaPlus size="18px" />
                                    <div className="text-[18px] font-bold">
                                        Invite
                                    </div>
                                </span>
                            ) : (
                                <span
                                    className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 w-fit h-[40px]"
                                    onClick={() => handleClickJoin()}
                                >
                                    <FaUserGroup size="18px" />
                                    <div className="text-[18px] font-bold">
                                        Join group
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupDetail;
