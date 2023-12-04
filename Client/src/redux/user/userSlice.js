import { createSlice } from "@reduxjs/toolkit";

let user =
    localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user"))
        : null;

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: user,
    },
    reducers: {
        getUser(state, action) {
            state.data = action.payload;
        },
        setUser(state, action) {
            state.data = action.payload;
        },
        logout(state) {
            state.data = null;
        },
        updateAvatarRedux(state, action) {
            // Sửa trường "name" trong "data"
            state.data.avatar = action.payload;
            // Cập nhật dữ liệu mới vào Local Storage
            localStorage.setItem("user", JSON.stringify(state.data));
        },
        updateCoverRedux(state, action) {
            state.data.cover_image = action.payload;
            localStorage.setItem("user", JSON.stringify(state.data));
        },
    },
});
export const { getUser, setUser, logout,updateAvatarRedux,updateCoverRedux} = userSlice.actions;

export default userSlice.reducer;
