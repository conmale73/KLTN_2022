import styles from "./Room.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { roomService, messageService } from "../../services";
import UserInfoPreview from "../../components/UserInfoPreview";
import { FiLogOut } from "react-icons/fi";
import ChatBox from "../../components/ChatBox";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineClose, AiFillSetting } from "react-icons/ai";
import { FaMicrophone, FaHeadphones, FaSignInAlt } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { PiPaperPlaneRightFill, PiShareFatFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import VoiceChatChannel from "../../components/VoiceChatChannel";
const Room = () => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const user = useSelector((state) => state.user.data);
    const [isJoined, setIsJoined] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["room", id],
        queryFn: () => roomService.getRoomById(id).then((res) => res.data.data),
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    const handleClickJoin = (e) => {
        try {
            const res = roomService.joinRoom(data._id, user._id);
            console.log(res);
            console.log(data._id, user._id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleStateModal = (e) => {
        setOpen(!open);
    };

    const handleClickSendMsg = (e) => {
        if (text !== "") {
            try {
                const res = messageService.createMessage(
                    data.chat_id[0],
                    user._id,
                    text
                );
                console.log(res);
                setText("");
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleClickQuit = () => {
        try {
            const res = roomService.quitRoom(data._id, user._id);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className={styles.room}>
                <div className={styles.roomInfo}>
                    <div className={styles.roomThumbnail}>
                        <img src={data.thumbnail} alt="thumbnail" />
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.roomName}>{data.name}</div>
                        <div className={styles.roomCreator}>
                            <p>Creator: </p>
                            <UserInfoPreview
                                thumbnailHeight="40px"
                                thumbnailWidth="40px"
                                showName={true}
                                user_id={data.creator_id}
                            />
                        </div>
                        <div className={styles.roomDescription}>
                            {`Description: ${data.description}`}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Dialog.Root
                            open={open}
                            onOpenChange={(e) => handleStateModal(e)}
                        >
                            <Dialog.Trigger asChild>
                                <div
                                    className={styles.joinButton}
                                    onClick={(e) => handleClickJoin(e)}
                                >
                                    <FaSignInAlt
                                        size="30px"
                                        className={styles.joinIcon}
                                    />
                                    <p className={styles.joinText}>Join</p>
                                </div>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                                {/* Modal  */}
                                <Dialog.Content
                                    className="data-[state=open]:animate-contentShow fixed top-[50%] 
                                    left-[50%] w-full max-w-[1910px] h-full translate-x-[-50%] translate-y-[-50%] 
                                    rounded-[6px] bg-[#18191a] overflow-y-scroll overflow-x-hidden"
                                    onInteractOutside={(e) =>
                                        e.preventDefault()
                                    }
                                >
                                    {/* Header */}
                                    <div
                                        style={{
                                            display: "flex",
                                            borderBottom: "1px solid #4d4d4d",
                                            paddingBottom: "10px",
                                            paddingTop: "10px",
                                        }}
                                    >
                                        <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                            {data.name}
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

                                    {/* Body */}
                                    <div className="w-full h-[calc(100%-60px)] justify-center items-start inline-flex">
                                        {/* Left */}
                                        <div className="w-[300px] h-full relative flex-col justify-start items-start flex">
                                            <div className="w-[300px] h-[200px] relative">
                                                <img
                                                    className="w-[300px] h-[200px] left-0 top-0 absolute"
                                                    src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.6435-9/46496119_519018838597512_1156244267400691712_n.jpg?stp=dst-jpg_p180x540&_nc_cat=105&ccb=1-7&_nc_sid=300f58&_nc_ohc=C5v064vHSgUAX_UcJOm&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfDnsJcw-Bc70xd4bi8Rhb4h7BrWzgb1DY1VaVJIjljGUA&oe=656EFDD3"
                                                />
                                                <div className="left-[32px] top-[10px] absolute text-white text-[25px] font-semibold font-['Inter'] line-clamp-1">
                                                    {data.name}
                                                </div>
                                            </div>
                                            <div className="pl-1.5 pr-2 pt-[7px] pb-[79px] flex-col justify-start items-start gap-2 inline-flex">
                                                <div className="text-neutral-200 text-lg font-normal font-['Inter']">
                                                    Voice Channels
                                                </div>
                                                <div className="w-[286px] h-[35px] relative flex-col justify-start items-start flex">
                                                    <VoiceChatChannel />
                                                </div>
                                            </div>
                                            <div className=" flex w-[286px] h-[60px] absolute bottom-0">
                                                <div className="w-fit h-fit right-[10px] top-[18px] absolute">
                                                    <AiFillSetting size="25px" />
                                                </div>
                                                <div className="w-fit h-fit right-[60px] top-[18px] absolute">
                                                    <FaHeadphones size="25px" />
                                                </div>
                                                <div className="w-fit h-fit right-[110px] top-[18px] absolute">
                                                    <FaMicrophone size="25px" />
                                                </div>
                                                <div className="absolute left-0 w-[140px] overflow-hidden">
                                                    <UserInfoPreview
                                                        thumbnailHeight="50px"
                                                        thumbnailWidth="50px"
                                                        showName={true}
                                                        user_id={user._id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Middle */}
                                        <div className="w-[1300px] h-full bg-[#303030] flex-col justify-end items-center inline-flex">
                                            <ChatBox
                                                chat_id={data.chat_id[0]}
                                            />

                                            <div className="self-stretch px-[9px] pt-[13px] pb-3.5 items-center flex">
                                                <TextareaAutosize
                                                    maxRows="6"
                                                    value={text}
                                                    onChange={handleTextChange}
                                                    className="resize-none grow shrink basis-0 self-stretch pl-[15px] mr-[20px] pt-[13px] pb-3 bg-[#404040] 
                                                rounded-[10px] border justify-end items-center gap-[1127px] inline-flex"
                                                    placeholder="Message..."
                                                />
                                                <PiPaperPlaneRightFill
                                                    onClick={(e) =>
                                                        handleClickSendMsg(e)
                                                    }
                                                    size="30px"
                                                    className="right-[50px] bottom-[20px] cursor-pointer hover:text-[#ffffff]"
                                                />
                                            </div>
                                        </div>
                                        {/* Right */}
                                        <div className="w-[300px] pl-[13px] pr-3 pt-[9px]  flex-col justify-start items-start gap-3 inline-flex">
                                            <div className="text-white text-[25px] font-bold font-['Inter']">
                                                Participants
                                            </div>
                                            {data.participants.map(
                                                (participant, index) => {
                                                    return (
                                                        <UserInfoPreview
                                                            key={index}
                                                            thumbnailHeight="40px"
                                                            thumbnailWidth="40px"
                                                            showName={true}
                                                            user_id={
                                                                participant
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>

                        <div className={styles.shareButton}>
                            <PiShareFatFill
                                size="30px"
                                className={styles.shareIcon}
                            />
                            <p className={styles.shareText}>Share</p>
                        </div>
                        {data.participants.includes(user._id) ? (
                            <div
                                className={styles.quitButton}
                                onClick={handleClickQuit}
                            >
                                <FiLogOut
                                    size="30px"
                                    className={styles.quitIcon}
                                />
                                <p className={styles.quitText}>Quit</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className={styles.roomContent}>
                    <div className={styles.roomParticipants}>
                        <div className="text-[30px] font-[500]">
                            Participants:
                        </div>
                        <div className="flex gap-[10px] min-h-[100px] items-start">
                            {data.participants.map((participant, index) => {
                                return (
                                    <UserInfoPreview
                                        key={index}
                                        thumbnailHeight="40px"
                                        thumbnailWidth="40px"
                                        showName={false}
                                        user_id={participant}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.roomChat}>
                        <div className="text-[30px] font-[500] mt-[10px] mb-[10px] h-fit">
                            Live Chat:
                        </div>
                        <div className={styles.chatBox}>
                            <ChatBox chat_id={data.chat_id[0]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Room;
