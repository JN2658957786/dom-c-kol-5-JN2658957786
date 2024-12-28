import { createSlice } from "@reduxjs/toolkit"
import { apiCallBegan } from "../api"
import store from "../configureStore"

const initalStateObject = {
    items: [],
    members: [],
    settings: {
        id: "-1",
        name: "Shopping list",
        owner: "-1",
        isSaved: false,
        loading: false,
        lastFetch: null,
        display: {
            mode: "list",
            cols: 1
        },
        filter: {
            Finished: true,
            In_progress: true,
            Waiting: true,
            Delayed: true,
            Canceled: true,
            None: true,
            Archived: true,
            Non_Archived: true
        }
    },
    updateItem: {
        updateMode: "none",
        selectedItem: -1
    }
}

const slice = createSlice({
    name: "reducer_shoppingList",
    initialState: initalStateObject,
    reducers: {

        changeShoppingListItems: (state, action) => {
            state.items = action.payload.items
        },
        changeShoppingListMembers: (state, action) => {
            state.members = action.payload.members
        },
        changeShoppingListSettings: (state, action) => {
            state.settings = action.payload.settings
        },

        changeItem: (state, action) => {
            state.items[action.payload.index] = action.payload.item
        },
        changeItems: (state, action) => {
            state.items = action.payload.items
        },
        changeDisplayCols: (state, action) => {
            state.settings.display.cols = action.payload.cols
        },
        changeDisplayMode: (state, action) => {
            state.settings.display.mode = action.payload.mode
        },
        changeUpdateMode: (state, action) => {
            state.updateItem.updateMode = action.payload.mode
        },
        changeSelectedItem: (state, action) => {
            state.updateItem.selectedItem = action.payload.item
        },
        changeListName: (state, action) => {
            state.settings.name = action.payload.name
        },

        changeMember: (state, action) => {
            state.members[action.payload.index] = action.payload.member
        },
        changeMembers: (state, action) => {
            state.members = action.payload.members
        },

        changeFilter: (state, action) => {
            state.settings.filter = action.payload.filter
        },
        changeIsSaved: (state, action) => {
            state.settings.isSaved = action.payload.isSaved
        },

        changeToDefault: (state, action) => {
            state.items = []
            state.members = []
            state.settings = {
                id: "-1",
                name: "Shopping list",
                owner: "-1",
                isSaved: false,
                loading: state.settings.loading,
                display: {
                    mode: "list",
                    cols: 1
                },
                filter: {
                    Finished: true,
                    In_progress: true,
                    Waiting: true,
                    Delayed: true,
                    Canceled: true,
                    None: true,
                    Archived: true,
                    Non_Archived: true
                }
            }
            state.updateItem = {
                updateMode: "none",
                selectedItem: -1
            }
        },

        listApi_Requested: (state, action) => {
            state.settings.loading = true
        },
        listApi_Recived: (state, action) => {
            state.settings.loading = false
        },
        listApi_RequestFailed: (state, action) => {
            state.settings.loading = false
        },

    }
})

export const {
    changeShoppingListItems,
    changeShoppingListMembers,
    changeShoppingListSettings,

    changeItem,
    changeItems,
    changeDisplayMode,
    changeDisplayCols,
    changeUpdateMode,
    changeSelectedItem,

    changeListName,

    changeMember,
    changeMembers,

    changeFilter,
    changeIsSaved,

    changeToDefault
} = slice.actions;

export const {
    listApi_Requested,
    listApi_Recived,
    listApi_RequestFailed
} = slice.actions

export default slice.reducer


// actions
export const list_archive = (list, detail, index) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/shoppingList/archive",
        method: "post",
        data: {
            list,
            detail,
            index
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}

export const list_delete = (index) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/shoppingList/delete",
        method: "post",
        data: {
            index
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}

export const list_leave = (newMemberArr) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/shoppingList/leave",
        method: "post",
        data: {
            newMemberArr
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}

export const list_add = (list, detail) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/shoppingList/add",
        method: "post",
        data: {
            list,
            detail
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}

export const list_list = (page, limit) => (dispatch, getState) => {


    dispatch(apiCallBegan({
        url: "/shoppingList/list",
        method: "post",
        data: {
            page,
            limit
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}

export const list_get = (index) => (dispatch, getState) => {

    dispatch(apiCallBegan({
        url: "/shoppingList/get",
        method: "post",
        data: {
            index
        },
        onSuccess: slice.actions.listApi_Recived.type,
        onStart: slice.actions.listApi_Requested.type,
        onError: slice.actions.listApi_RequestFailed.type
    }))
}