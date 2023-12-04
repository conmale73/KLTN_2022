import styles from "./Post.module.scss";
import { useState, useEffect } from "react";
import { userService, postService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import ImageViewer from "../ImageViewer";
import LikesViewer from "../LikesViewer";
import CommentModal from "../CommentModal";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import {
    FaUserFriends,
    FaRegHeart,
    FaHeart,
    FaRegCommentAlt,
} from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { AiFillLock } from "react-icons/ai";
import { FormatDate } from "../../utils";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

import MiniAudioPlayer from "../MiniAudioPlayer";
import UserInfoPreview from "../UserInfoPreview";
import { Link } from "react-router-dom";
const Post = (props) => {
    const images =
        props?.files?.filter((file) => {
            return file.fileInfo.type.startsWith("image/");
        }) || [];
    const audios =
        props?.files?.filter((file) => {
            return file.fileInfo.type.startsWith("audio/");
        }) || [];
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const user = useSelector((state) => state.user.data);
    const [more, setMore] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.likes);
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [userInfo, setUserInfo] = useState();

    const fetchUserInfo = async () => {
        const res = await userService.getUserById(props.user_id);
        setUserInfo(res.data.data);
        return res.data.data;
    };
    const fetchComments = async () => {};
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["homeUserInfoPreview", props.user_id],
        queryFn: () => fetchUserInfo(),
    });

    useEffect(() => {
        if (likes.find((like) => like.user_id == user._id)) {
            setLiked(true);
        }
    }, []);
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const handleClickShowMore = (e) => {
        e.preventDefault();
        setMore(!more);
    };
    const handleClickLike = () => {
        try {
            postService.likePost(props.id, user._id);
            setLiked(!liked);
            likes.push({ user_id: user._id });
        } catch (error) {
            console.log(error);
        }
    };
    const handleClickUnLike = () => {
        try {
            postService.unlikePost(props.id, user._id);
            setLiked(!liked);
            setLikes(likes.filter((like) => like.user_id != user._id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickComment = () => {
        setOpenCommentModal(true);
    };
    return (
        <>
            <div className={styles.post} key={props.id}>
                <div className={styles.infoContainer}>
                    <div className={styles.avatar}>
                        <UserInfoPreview
                            thumbnailHeight="40px"
                            thumbnailWidth="40px"
                            showName={false}
                            user_id={props.user_id}
                            bgStyles={false}
                        />
                    </div>
                    <div className={styles.info}>
                        <Link
                            to={`/profile/?id=${props.user_id}`}
                            className="w-fit"
                        >
                            <p className={styles.name}>{data?.username}</p>
                        </Link>

                        <p className={styles.createAt}>
                            {FormatDate(props.createAt)}

                            <span className={styles.privacy}>
                                {props.privacy == "PUBLIC" && (
                                    <BsGlobeAsiaAustralia
                                        size="15px"
                                        title="Public"
                                    />
                                )}
                                {props.privacy == "FRIEND" && (
                                    <FaUserFriends size="15px" title="Friend" />
                                )}
                                {props.privacy == "PRIVATE" && (
                                    <AiFillLock size="15px" Private />
                                )}
                            </span>
                        </p>
                    </div>
                    <div className={styles.optionButtons}>
                        <Link to={`/social/post/${props.id}`}>
                            <div className={styles.detailButton} title="Detail">
                                <BiDetail className={styles.icon} />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={styles.content}>
                    <p className={styles.text}>
                        {props.text.length > 300 ? (
                            <>
                                {more ? (
                                    <>
                                        {props.text}
                                        <span
                                            className={styles.readMore}
                                            onClick={(e) =>
                                                handleClickShowMore(e)
                                            }
                                        >
                                            Show less
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {props.text.slice(0, 300) + "..."}
                                        <span
                                            className={styles.readMore}
                                            onClick={(e) =>
                                                handleClickShowMore(e)
                                            }
                                        >
                                            Show more
                                        </span>
                                    </>
                                )}
                            </>
                        ) : (
                            <>{props.text}</>
                        )}
                    </p>

                    <div className={styles.files}>
                        <div className={styles.audios}>
                            {audios.length > 0 && (
                                <>
                                    {audios.map((audio, index) => {
                                        return (
                                            <div
                                                className={
                                                    styles.audioContainer
                                                }
                                                key={index}
                                            >
                                                <MiniAudioPlayer
                                                    dataURL={`data:${audio.fileInfo.type};base64,${audio.dataURL}`}
                                                />
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>

                        {images?.length > 0 && (
                            <div className="flex max-w-[80%] max-h-[80%] justify-center items-center flex-col">
                                <Swiper
                                    key={`slideMain_${props.id}`}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{
                                        swiper:
                                            thumbsSwiper &&
                                            !thumbsSwiper.destroyed
                                                ? thumbsSwiper
                                                : null,
                                    }}
                                    modules={[
                                        FreeMode,
                                        Controller,
                                        Navigation,
                                        Thumbs,
                                    ]}
                                    className="mySwiper2"
                                >
                                    {images.map((image, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div>
                                                    <ImageViewer
                                                        image={image}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                {images?.length > 1 && (
                                    <Swiper
                                        key={`slideThumb_${props.id}`}
                                        // onSwiper={setThumbsSwiper}
                                        onSwiper={(swiper) =>
                                            setThumbsSwiper(swiper)
                                        }
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        slideToClickedSlide={true}
                                        centeredSlides={true}
                                        modules={[
                                            FreeMode,
                                            Controller,
                                            Navigation,
                                            Thumbs,
                                        ]}
                                        className="mySwiper"
                                    >
                                        {images?.map((image, index) => {
                                            return (
                                                <SwiperSlide
                                                    key={`slide_${index}`}
                                                >
                                                    <div key={index}>
                                                        <img
                                                            src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.reactions}>
                    {likes.length > 0 && <LikesViewer likes={likes} />}

                    {props.inCommentModal ? (
                        <div
                            className={`flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute right-2`}
                        >
                            <FaRegCommentAlt className="" />
                            <span>{comments.length + " comments"}</span>
                        </div>
                    ) : (
                        <CommentModal
                            username={data?.username}
                            id={props.id}
                            user_id={props.user_id}
                            text={props.text}
                            createAt={props.createAt}
                            updateAt={props.updateAt}
                            privacy={props.privacy}
                            files={props.files}
                            likes={props.likes}
                            openCommentModal={openCommentModal}
                            setOpenCommentModal={setOpenCommentModal}
                        />
                    )}
                </div>
                <div className={styles.actions}>
                    {liked ? (
                        <div
                            className={styles.liked}
                            onClick={() => handleClickUnLike()}
                        >
                            <FaHeart className={styles.icon} />
                            <span>Liked</span>
                        </div>
                    ) : (
                        <div
                            className={styles.like}
                            onClick={() => handleClickLike()}
                        >
                            <FaRegHeart className={styles.icon} />
                            <span>Like</span>
                        </div>
                    )}
                    {props.inCommentModal ? (
                        <div className={styles.comment}>
                            <FaRegCommentAlt className={styles.icon} />
                            <span>Comment</span>
                        </div>
                    ) : (
                        <div
                            className={styles.comment}
                            onClick={() => handleClickComment()}
                        >
                            <FaRegCommentAlt className={styles.icon} />
                            <span>Comment</span>
                        </div>
                    )}

                    <div className={styles.share}>
                        <FaRegShareFromSquare className={styles.icon} />
                        <span>Share</span>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Post;
