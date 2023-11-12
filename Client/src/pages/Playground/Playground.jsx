import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { roomService } from "../../services";
import { useSelector } from "react-redux";
import RoomThumbnail from "../../components/RoomThumbnail";

const Playground = () => {
    const user = useSelector((state) => state.user.data);
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["playground"],
        queryFn: () =>
            roomService.getAllPublicRooms().then((res) => res.data.data),
    });
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;
    return (
        <div>
            <h1>Playground</h1>
            {data?.map((room, index) => {
                return <RoomThumbnail key={index} data={room} />;
            })}
        </div>
    );
};
export default Playground;
