import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ChatList from "../../ChatList";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import styles from "./Messenger.module.scss";

const Messenger = ({ open, setOpen }) => {
    const handleStateDropdown = () => {
        setOpen(!open);
    };
    return (
        <DropdownMenu.Root
            modal={false}
            open={open}
            onOpenChange={handleStateDropdown}
        >
            <DropdownMenu.Trigger asChild>
                <div className={styles.button} onClick={() => setOpen(true)}>
                    <BiSolidMessageRoundedDetail
                        className={styles.button}
                        size="24px"
                        title="Messages"
                    />
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="w-[400px] h-fit bg-[#303030] rounded-[10px] shadow-lg">
                    <ChatList />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Messenger;
