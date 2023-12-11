import { createSlice } from "@reduxjs/toolkit";

const currentNotificationListSlice = createSlice({
    name: "notificationList",
    initialState: {
        list: [],
        total: 0,
    },
    reducers: {
        setTotal(state, action) {
            state.total = action.payload;
        },
        setAddTotal(state, action) {
            state.total += 1;
        },
        setNotificationList(state, action) {
            let additem = action.payload;
            state.list = additem;
        },
        removeNotificationList(state, action) {
            state.list = state.list.filter(item => item.id !== action.payload);
            state.total -= 1;
        },
        clearList: state => {
            state.list = [];
            state.total = 0;
        },
    },
});

export const {removeNotificationList,clearList,setNotificationList,setTotal,setAddTotal} =
    currentNotificationListSlice.actions;

export default currentNotificationListSlice.reducer;
