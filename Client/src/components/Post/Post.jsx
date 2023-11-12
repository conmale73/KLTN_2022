import styles from "./Post.module.scss";
import { useState } from "react";
import { userService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import ImageContainer from "../ImageContainer";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { FormatDate } from "../../utils";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import MiniAudioPlayer from "../MiniAudioPlayer";

const Post = ({ key, user_id, text, timeStamp, privacy, files }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = files.filter((file) => {
        return file.fileInfo.type.startsWith("image/");
    });
    const audios = files.filter((file) => {
        return file.fileInfo.type.startsWith("audio/");
    });

    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["post", user_id],
        queryFn: () =>
            userService.getUserById(user_id).then((res) => res.data.data),
    });
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <div className={styles.post} key={key}>
                <div className={styles.infoContainer}>
                    <div className={styles.avatar}>
                        <img src={data.avatar} alt="" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{data.username}</div>
                        <div className={styles.timeStamp}>
                            {FormatDate(timeStamp)}

                            <span className={styles.privacy}>
                                {privacy == "PUBLIC" && (
                                    <BsGlobeAsiaAustralia
                                        size="15px"
                                        title="Public"
                                    />
                                )}
                                {privacy == "FRIEND" && (
                                    <FaUserFriends size="15px" title="Friend" />
                                )}
                                {privacy == "PRIVATE" && (
                                    <AiFillLock size="15px" Private />
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.text}>{text}</div>
                    <div className={styles.files}>
                        {audios.length > 0 && (
                            <>
                                {audios.map((audio, index) => {
                                    return (
                                        <div
                                            className={styles.audioContainer}
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
                        {images.length > 0 && (
                            <>
                                <Swiper
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{
                                        swiper:
                                            thumbsSwiper &&
                                            !thumbsSwiper.destroyed
                                                ? thumbsSwiper
                                                : null,
                                    }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {images.map((image) => {
                                        return (
                                            <SwiperSlide>
                                                <img
                                                    src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    {images.map((image) => {
                                        return (
                                            <SwiperSlide>
                                                <img
                                                    src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Post;
