import { createSlice } from "@reduxjs/toolkit"

const initalStateObject = {
    openTab: "Shopping list"
}

const slice = createSlice({
    name: "reducer_tabs",
    initialState: initalStateObject,
    reducers: {
        changeTab: (state, action) => {
            state.openTab = action.payload.openTab
        }
    }
})

export const {
    changeTab
} = slice.actions;

export default slice.reducer