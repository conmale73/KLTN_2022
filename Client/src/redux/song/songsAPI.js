import { songService } from "../../services";
import { getAllSongs, getOneSong } from "./songsSlice";

export const getAllSongsAPI = () => async (dispatch) => {
    let res = await songService.getSongs();
    dispatch(getAllSongs(res));
};

export const getOneSongAPI = (id) => async (dispatch) => {
    let res = await songService.getSong(id);
    dispatch(getOneSong(res));
};
