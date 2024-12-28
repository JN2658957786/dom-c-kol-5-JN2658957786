import { createSlice } from "@reduxjs/toolkit"

const initalStateObject = {
    page: 0,
    limit: 10,
    hasNext: false,
    list: []
}

const slice = createSlice({
    name: "reducer_menu",
    initialState: initalStateObject,
    reducers: {
        changeMenuPage: (state, action) => {
            state.page = action.payload.page
        },
        changeMenuLimit: (state, action) => {
            state.limit = action.payload.limit
        },
        changeMenuHasNext: (state, action) => {
            state.hasNext = action.payload.hasNext
        },
        changeMenuList: (state, action) => {
            state.list = action.payload.list
        },
    }
})

export const {
    changeMenuPage,
    changeMenuLimit,
    changeMenuHasNext,
    changeMenuList
} = slice.actions;

export default slice.reducer