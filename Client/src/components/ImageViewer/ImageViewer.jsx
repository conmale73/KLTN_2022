import * as Dialog from "@radix-ui/react-dialog";

const ImageViewer = ({ image }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div>
                    <img
                        src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                        alt=""
                    />
                </div>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className="flex justify-center items-center data-[state=open]:animate-contentShow fixed top-[50%] 
            left-[50%] w-fit h-fit translate-x-[-50%] translate-y-[-50%] 
            rounded-[6px] bg-neutral-800 p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                    <img
                        src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                        alt=""
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ImageViewer;
