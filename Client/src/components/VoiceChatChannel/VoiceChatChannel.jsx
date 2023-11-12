import { GiSpeaker } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import * as Tooltip from "@radix-ui/react-tooltip";

const VoiceChatChannel = ({ room_id }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <div
                        className="group flex items-center w-full h-fit 
        hover:bg-[#676668] gap-[5px] p-[3px] cursor-pointer rounded-[5px]"
                    >
                        <div>
                            <GiSpeaker className="" size="25px" />
                        </div>

                        <div className="text-[18px] line-clamp-1 w-[50%]">
                            Voice Channel 1
                        </div>
                        <div className="w-[35%] flex flex-row-reverse right-0">
                            <AiFillSetting
                                className="hidden group-hover:flex hover:text-white"
                                size="25px"
                                title="Setting"
                            />
                        </div>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
             data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade 
             data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade 
             data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade 
             text-[#adadad] select-none rounded-[4px] bg-[#303030] 
             px-[15px] py-[10px] text-[15px] leading-none 
             shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
             will-change-[transform,opacity]"
                        sideOffset={5}
                    >
                        Voice Channel 1
                        <Tooltip.Arrow className="fill-[#303030]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
export default VoiceChatChannel;
