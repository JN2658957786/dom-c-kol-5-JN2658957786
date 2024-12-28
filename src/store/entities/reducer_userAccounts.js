import { createSlice, current } from "@reduxjs/toolkit"

const initalStateObject = {
    currentAccountID:"-1",
    userAccounts: [
        {id:"9809889725213598", name: "user1"},
        {id:"2876114036701286", name: "user2"},
        {id:"3029846138010644", name: "user3"}
    ],
}

const slice = createSlice({
    name: "reducer_accounts",
    initialState: initalStateObject,
    reducers: {
        changeAccounts: (state, action) => {
            state.userAccounts = action.payload
        },
        changeCurrentAccountID: (state, action) => {
            state.currentAccountID = action.payload.id
        },

    }
})

export const {
    changeAccounts,
    changeCurrentAccountID
} = slice.actions;

export default slice.reducer