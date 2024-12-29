import { createSlice } from "@reduxjs/toolkit"

const initalStateObject = {
    currentL: "cz",
    cz: {
        Account: "Účet",

        ShoppingList: "Nákupní seznam",
        Members: "Členové",
        Settings: "Nastavení",

        save: "uložit",
        saved: "uloženo",

        leaveThisList: "Opustit tento seznam",
        deleteThisList: "Smazat tento seznam",

        owner: "vlastník",
        member: "člen"
    }
}

const slice = createSlice({
    name: "reducer_languages",
    initialState: initalStateObject,
    reducers: {
        changeCurrentL: (state, action) => {
            state.currentL = action.payload
        }
    }
})

export const {
    changeCurrentL
} = slice.actions;

export default slice.reducer