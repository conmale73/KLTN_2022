import * as Dialog from "@radix-ui/react-dialog";
import UserInfoPreview from "../UserInfoPreview";
import { FaHeart } from "react-icons/fa";
const LikesViewer = (props) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="flex items-center gap-2 cursor-pointer hover:border-b-[1px] border-solid border-[#676668] absolute left-2">
                    <FaHeart />
                    <span>{props.likes.length + " likes"}</span>
                </div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className="flex data-[state=open]:animate-contentShow fixed top-[50%] 
            left-[50%] w-[400px] h-[600px] translate-x-[-50%] translate-y-[-50%] 
            rounded-[6px] bg-neutral-800 p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                    <div className="flex flex-col gap-2 overflow-auto w-full">
                        {props.likes.map((like, index) => {
                            return (
                                <UserInfoPreview
                                    key={index}
                                    thumbnailHeight="40px"
                                    thumbnailWidth="40px"
                                    showName={true}
                                    user_id={like.user_id}
                                    bgStyles={true}
                                    link={true}
                                />
                            );
                        })}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
export default LikesViewer;
