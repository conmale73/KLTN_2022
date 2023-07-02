import React from "react";
import "./Banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
    Pagination,
    EffectCoverflow,
    Navigation,
    HashNavigation,
    Autoplay
} from "swiper";

const Banners = [
    {
        id: 1,
        title: "EDM Now",
        image: "https://photo-zmp3.zmdcdn.me/banner/c/2/f/3/c2f362cf77d98456993b0534a8bd8bb4.jpg",
    },
    {
        id: 2,
        title: "Tia sáng cuối cùng",
        image: "https://photo-zmp3.zmdcdn.me/banner/2/b/b/4/2bb4e367720820cf9c49dadd68e95130.jpg",
    },
    {
        id: 3,
        title: "Trào lưu nhạc hot",
        image: "https://photo-zmp3.zmdcdn.me/banner/c/d/7/6/cd7668823bdd3cf431a21111cbc13c4d.jpg",
    },
    {
        id: 4,
        title: "Một tuần chẳng nắng",
        image: "https://photo-zmp3.zmdcdn.me/banner/0/e/1/6/0e16f7abdae1325c75c2c10ef5e68d4c.jpg",
    },
    {
        id: 5,
        title: "Ta đã quên nhau bao lâu",
        image: "https://photo-zmp3.zmdcdn.me/banner/5/2/d/9/52d9d7a73b0d8b0389161b95db450e52.jpg",
    },
];
function Banner() {
    return (
        <div className="banner">
            <>
                <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={20}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {Banners.map((banner) => (
                        <SwiperSlide>
                            <img src={banner.image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </div>
    );
}
export default Banner;
