import Spinner from "~/components/Spinner";
function Loading() {
    return (
        <div className="h-screen w-screen bg-white-100">
            <Spinner size={60} />
        </div>
    );
}

export default Loading;
