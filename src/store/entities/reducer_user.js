import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../api"

const initalStateObject = {
    id:"",
    name:"",
    type: "none",
    loading: false
}

const slice = createSlice({
    name: "reducer_user",
    initialState: initalStateObject,
    reducers: {
        changeUser: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.type = action.payload.type
        },
        changeUserType: (state, action) => {
            state.type = action.payload.type
        },

        listApi_Requested: (state, action) => {
            state.loading = true
        },
        listApi_Recived: (state, action) => {
            state.loading = false
        },
        listApi_RequestFailed: (state, action) => {
            state.loading  = false
        },
    }
})

export const {
    changeUser,
    changeUserType
} = slice.actions;

export default slice.reducer

export const {
    listApi_Requested,
    listApi_Recived,
    listApi_RequestFailed
} = slice.actions

// actions 
export const user_update = (id, name, type) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/user/update",
        method: "post",
        data: {
            id,
            name,
            type
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}