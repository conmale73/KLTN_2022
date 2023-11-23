import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { userService } from "../../services";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const UserInfoPreview = (props) => {
    const onlineUsers = useSelector((state) => state.onlineUsers.data);
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["userInfoPreview", props.user_id],
        queryFn: () =>
            userService.getUserById(props.user_id).then((res) => res.data.data),
    });
    if (isLoading) return <Loading />;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <HoverCard.Root>
                {props.bgStyles ? (
                    <div
                        className={`flex items-center gap-[5px] cursor-pointer hover:bg-[#545454] w-full p-[5px] rounded-[3px]`}
                    >
                        <HoverCard.Trigger asChild>
                            <div
                                className="relative border-[1px] border-[#545454] rounded-full"
                                style={{
                                    minWidth: props.thumbnailWidth,
                                    minHeight: props.thumbnailHeight,
                                    width: props.thumbnailWidth,
                                    height: props.thumbnailHeight,
                                }}
                            >
                                <img
                                    className={`w-full h-full object-contain rounded-full`}
                                    src={data.avatar}
                                    alt={data.username}
                                />
                                {onlineUsers?.some(
                                    (user) => user?.user_id === data._id
                                ) && (
                                    <div
                                        className="w-[15px] h-[15px] absolute bottom-[-3px] 
                            right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                    ></div>
                                )}
                            </div>
                        </HoverCard.Trigger>
                        {props.showName && (
                            <div
                                className="text-[20px] line-clamp-1"
                                title={data.username}
                            >
                                {data.username}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={`flex items-center gap-[5px]`}>
                        <HoverCard.Trigger asChild>
                            <div
                                className="w-fit h-fit relative border-[1px] border-[#676668] rounded-full"
                                style={{
                                    minWidth: props.thumbnailWidth,
                                    minHeight: props.thumbnailHeight,
                                    width: props.thumbnailWidth,
                                    height: props.thumbnailHeight,
                                }}
                            >
                                <img
                                    className={`w-full h-full object-cover rounded-full`}
                                    src={data.avatar}
                                    alt={data.username}
                                />
                                {onlineUsers?.some(
                                    (user) => user?.user_id === data._id
                                ) && (
                                    <div
                                        className="w-[15px] h-[15px] absolute bottom-[-3px] 
                            right-[-3px] rounded-full bg-[#23A55A] border-neutral-950 border-[2px]"
                                    ></div>
                                )}
                            </div>
                        </HoverCard.Trigger>
                        <div className="flex flex-col w-[90%]">
                            {props.showName && (
                                <div
                                    className="text-[20px] line-clamp-1"
                                    title={data.username}
                                >
                                    {data.username}
                                </div>
                            )}
                            {props.chatPreview != "" && (
                                <p className="text-[15px] text-ellipsis line-clamp-1 max-w-[100%] font-[400] text-[#adadad]">
                                    {props.chatPreview}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <HoverCard.Portal>
                    <HoverCard.Content
                        className="data-[side=bottom]:animate-slideUpAndFade 
                        data-[side=right]:animate-slideLeftAndFade 
                        data-[side=left]:animate-slideRightAndFade 
                        data-[side=top]:animate-slideDownAndFade 
                        data-[state=open]:transition-all
                        w-[300px] rounded-md bg-[#303030] p-5 
                        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] "
                        sideOffset={5}
                    >
                        <div className="flex flex-col gap-[7px]">
                            <img
                                className="block h-[70px] w-[70px] rounded-full"
                                src={data.avatar}
                                alt={data.username}
                            />
                            <div className="flex flex-col gap-[15px]">
                                <div>
                                    <Link to={`/profile/?id=${data._id}`}>
                                        <div className="text-[20px] line-clamp-1 max-w-[100%] hover:underline m-0  font-medium leading-[1.5]">
                                            {data.username}
                                        </div>
                                    </Link>

                                    <div className=" m-0 text-[15px] leading-[1.5]">
                                        {data.email}
                                    </div>
                                </div>
                                <div className=" m-0 text-[15px] leading-[1.5]">
                                    Components, icons, colors, and templates for
                                    building high-quality, accessible UI. Free
                                    and open-source.
                                </div>
                            </div>
                        </div>

                        <HoverCard.Arrow className="fill-[#303030]" />
                    </HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        </>
    );
};
export default UserInfoPreview;
