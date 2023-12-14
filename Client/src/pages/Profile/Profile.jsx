import styles from "./Profile.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";

import { FaPen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import { userService } from "../../services";
import Loading from "../../components/Loading";
import ImageViewer from "../../components/ImageViewer";
import ProfileAbout from "./About/ProfileAbout";
import ProfileFriends from "./Friends/ProfileFriends";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import AvatarEditorComponent from "./ImageEditor/AvatarEditor";
import BackgroundEditor from "./BackgroundEditor";
import { setUser } from "../../redux/user/userSlice";
const Profile = () => {
    const user = useSelector((state) => state.user.data);
    const { user_id } = useParams();
    const navigator = useNavigate();

    if (user == null) {
        return (
            <>
                <p>You are not signed in. Please sign in to continue</p>
                <button
                    className={styles.signInButton}
                    onClick={() => navigator("/authentication/login")}
                >
                    Sign In
                </button>
            </>
        );
    } else {
        const [userData, setUserData] = useState(null);
        const dispatch = useDispatch();
        const [selectedTab, setSelectedTab] = useState("Posts"); // ["Posts", "About", "Friends"]

        const [file, setFile] = useState(null);
        const [originalFile, setOriginalFile] = useState(null);

        const [backgroundFile, setBackgroundFile] = useState(null);
        const [originalBackgroundFile, setOriginalBackgroundFile] =
            useState(null);

        const [isEditUsername, setIsEditUsername] = useState(false);
        const [username, setUsername] = useState("");

        const fetchUserData = async () => {
            const res = await userService.getUserById(user_id);
            setUserData(res.data.data);
            setFile({
                dataURL: `data:${res.data.data.avatar.files[0].fileInfo.type};base64,${res.data.data.avatar.files[0].dataURL}`,
                fileInfo: res.data.data.avatar.files[0].fileInfo,
            });
            setOriginalFile({
                dataURL: `data:${res.data.data.avatar.files[0].fileInfo.type};base64,${res.data.data.avatar.files[0].dataURL}`,
                fileInfo: res.data.data.avatar.files[0].fileInfo,
            });

            setBackgroundFile({
                dataURL: res.data.data.background.files[0].dataURL,
                fileInfo: res.data.data.background.files[0].fileInfo,
            });
            setOriginalBackgroundFile({
                dataURL: res.data.data.background.files[0].dataURL,
                fileInfo: res.data.data.background.files[0].fileInfo,
            });

            return res.data.data;
        };
        const { isLoading, error, data, isFetching } = useQuery({
            queryKey: ["profile", user_id],
            queryFn: () => fetchUserData(),
        });

        if (isLoading) return <Loading isFullScreen={true} />;
        if (error) return <p>{error.message}</p>;

        const handleEditUsername = async () => {
            try {
                const userdata = {
                    description: userData.description,
                    user_id: user_id,
                    username: username,
                    musicType: userData.musicType,
                    phone: userData.phone,
                    birthday: userData.birthday,
                };
                console.log(userdata);
                const res = await userService.updateUserInfo(userdata);
                setUserData(res.data.data);
                setIsEditUsername(false);
            } catch (error) {
                console.log(error);
            }
        };
        return (
            <div className="container flex w-full flex-col gap-[20px] rounded-[20px]">
                <div
                    className={`profileHeader w-full h-[580px] flex flex-col items-center bg-[#303030] rounded-[20px]
             `}
                >
                    <div
                        className="imageContainer flex justify-center w-[90%] h-[400px] 
                object-fill relative z-[1]"
                    >
                        {userData && (
                            <ImageViewer
                                image={userData?.background?.files[0]}
                                objectFit="cover"
                            />
                        )}
                        <div className="profileAvatar w-[150px] h-[150px] flex absolute bottom-[-100px] left-[20px] rounded-full">
                            {userData && (
                                <div className="rounded-full">
                                    <ImageViewer
                                        image={userData?.avatar?.files[0]}
                                        objectFit="cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="profileInfo w-full h-[180px] flex flex-col items-center justify-between relative">
                        <div className="w-[80%] mt-[20px] relative">
                            <div className="profileName pl-[140px] text-[30px] font-bold text-start">
                                {userData?.username}
                            </div>
                            <div className="profileName pl-[140px] text-[18px] font-[400] text-[#adadad] text-start">
                                5 friends
                            </div>
                            <Dialog.Root>
                                {userData?._id == user._id && (
                                    <Dialog.Trigger asChild>
                                        <div
                                            className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                             hover:bg-[#676668] absolute right-0 top-[10px] w-fit h-[40px]"
                                        >
                                            <FaPen size="18px" />
                                            <div className="text-[18px] font-bold">
                                                Edit Profile
                                            </div>
                                        </div>
                                    </Dialog.Trigger>
                                )}

                                <Dialog.Portal>
                                    <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                                    <Dialog.Content
                                        className={` flex data-[state=open]:animate-contentShow fixed top-[50%] 
                                    left-[50%] min-w-[600px] h-fit translate-x-[-50%] translate-y-[-50%] overflow-x-hidden 
                                    rounded-[6px] bg-neutral-800 p-[25px] 
                                    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
                                    >
                                        <div className="flex flex-col gap-2 overflow-auto w-full min-h-[600px] max-h-[800px] relative">
                                            <div
                                                style={{
                                                    display: "flex",
                                                    borderBottom:
                                                        "1px solid #4d4d4d",
                                                    paddingBottom: "10px",
                                                }}
                                            >
                                                <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                                    Edit Profile
                                                </Dialog.Title>
                                                <Dialog.Close asChild>
                                                    <button className="rounded-full bg-[#404040] p-[5px] hover:bg-[#505050] ">
                                                        <AiOutlineClose
                                                            size="25px"
                                                            color="#9d9d9d"
                                                        />
                                                    </button>
                                                </Dialog.Close>
                                            </div>

                                            <div className="flex flex-col h-fit min-h-[300px] mt-[20px]">
                                                <div className="w-full h-fit mb-[40px]">
                                                    <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                        Username
                                                        <div
                                                            className="flex items-center justify-center gap-2 p-[7px] rounded-[5px] cursor-pointer bg-[#555555]
                                                            hover:bg-[#676668] absolute right-0 top-0 w-fit h-[40px]"
                                                            onClick={() => {
                                                                setIsEditUsername(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <FaPen size="18px" />
                                                            <div className="text-[18px] font-bold">
                                                                Edit
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-[10px]">
                                                        {isEditUsername ? (
                                                            <div className="w-full">
                                                                <input
                                                                    value={
                                                                        username
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        setUsername(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    maxLength={
                                                                        24
                                                                    }
                                                                    type="text"
                                                                    className="w-full max-w-[300px] h-[40px] rounded-[5px] bg-[#404040] text-[#e4e6eb] p-[10px] text-[18px] m-[10px]"
                                                                />
                                                                <div className="w-full flex gap-[10px] m-[10px]">
                                                                    <div
                                                                        className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] cursor-pointer
                                                        p-[5px] gap-[5px] bg-[#404040] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                        onClick={() => {
                                                                            setIsEditUsername(
                                                                                false
                                                                            );
                                                                            setUsername(
                                                                                userData?.username
                                                                            );
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </div>
                                                                    {username !=
                                                                    userData?.username ? (
                                                                        <div
                                                                            className="
                                                        flex justify-center cursor-pointer items-center h-[30px] w-[100px] rounded-[5px]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                            onClick={() =>
                                                                                handleEditUsername()
                                                                            }
                                                                        >
                                                                            Save
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className="
                                                        flex justify-center items-center h-[30px] w-[100px] rounded-[5px] opacity-[0.5]
                                                        p-[5px] gap-[5px] bg-[#606060] hover:bg-[#555555] hover:text-[#fff]
                                                        "
                                                                        >
                                                                            Save
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-[#e4e6eb] text-[15px] font-bold m-[10px]">
                                                                {
                                                                    userData?.username
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                        Avatar
                                                        <AvatarEditorComponent
                                                            image={file}
                                                            setImage={setFile}
                                                            originalImage={
                                                                originalFile
                                                            }
                                                            setUserData={
                                                                setUserData
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full h-[200px] rounded-[10px] mt-[10px] flex items-center justify-center">
                                                        <div className="w-[150px] h-[150px]">
                                                            <ImageViewer
                                                                image={
                                                                    userData
                                                                        ?.avatar
                                                                        ?.files[0]
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-fit">
                                                    <div className="text-[#e4e6eb] text-[18px] font-bold relative">
                                                        Background
                                                        <BackgroundEditor
                                                            image={
                                                                backgroundFile
                                                            }
                                                            setImage={
                                                                setBackgroundFile
                                                            }
                                                            originalImage={
                                                                originalBackgroundFile
                                                            }
                                                            setUserData={
                                                                setUserData
                                                            }
                                                        />
                                                    </div>
                                                    <div className="w-full h-[200px] rounded-[10px] mt-[30px] flex items-center justify-center">
                                                        <div className="w-[400px] h-[200px]">
                                                            <ImageViewer
                                                                image={
                                                                    userData
                                                                        ?.background
                                                                        ?.files[0]
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                        <div className={`${styles.nav}`}>
                            <div className={`${styles.navMenu}`}>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "Posts"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("Posts")}
                                >
                                    <p className={styles.text}>Posts</p>
                                </div>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "About"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("About")}
                                >
                                    <p className={styles.text}>About</p>
                                </div>
                                <div
                                    className={`${styles.navItem} ${
                                        selectedTab == "Friends"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={(e) => setSelectedTab("Friends")}
                                >
                                    <p className={styles.text}>Friends</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {selectedTab == "Posts" && (
                        <ProfilePosts user_id={user_id} />
                    )}
                    {selectedTab == "About" && (
                        <ProfileAbout user_id={user_id} />
                    )}
                    {selectedTab == "Friends" && (
                        <ProfileFriends user_id={user_id} />
                    )}
                </div>
            </div>
        );
    }
};
export default Profile;
