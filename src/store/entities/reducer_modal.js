import { createSlice } from "@reduxjs/toolkit"

const initalStateObject = {
    isActive: false,
    modal: {
        id: -1,
        name: "New item",
        cost: 0,
        costType: "CZK",
        count: 0,
        dsc: "",
        state: "None",
        archived: false
    },
    membersModal: {
        id: -1,
        name: "",
        type: "none"
    },
    shoppingListModal:{
        name: "New shopping list"
    },
    detail: {
        name: "New shopping list"
    }
}

const slice = createSlice({
    name: "reducer_modal",
    initialState: initalStateObject,
    reducers: {
        changeIsActive: (state, action) => {
            state.isActive = action.payload.isActive
        },

        
        changeModalID: (state, action) => {
            state.modal.id = action.payload.id
        },
        changeModalName: (state, action) => {
            state.modal.name = action.payload.name
        },
        changeModalCost: (state, action) => {
            state.modal.cost = action.payload.cost
        },
        changeModalCostType: (state, action) => {
            state.modal.costType = action.payload.costType
        },
        changeModalCount: (state, action) => {
            state.modal.count = action.payload.count
        },
        changeModalDsc: (state, action) => {
            state.modal.dsc = action.payload.dsc
        },
        changeModalState: (state, action) => {
            state.modal.state = action.payload.state
        },
        changeModalDefault: (state, action) => {
            state.modal = {
                id: -1,
                name: "New item",
                cost: 0,
                costType: "CZK",
                count: 0,
                dsc: "",
                state: "None",
                archived: false
            }
            state.membersModal = {
                id: -1,
                name: "",
                type: "none"
            }
            state.shoppingListModal = {
                name: "New shopping list"
            }
        },
        changeModalAll: (state, action) => {
            state.modal = action.payload
        },
        changeModalListName: (state, action) => {
            state.detail.name = action.payload.name
        },

        changeMembersModal: (state, action) => {
            state.membersModal = action.payload
        },
        changeMembersModalName: (state, action) => {
            state.membersModal.name = action.payload.name
        },
        changeMembersModalID: (state, action) => {
            state.membersModal.id = action.payload.id
        },

        changeShoppingListModalName: (state, action) => {
            state.shoppingListModal.name = action.payload.name
        },
        
    }
})

export const {
    changeIsActive,

    changeModalID,
    changeModalName,
    changeModalCost,
    changeModalCostType,
    changeModalCount,
    changeModalDsc,
    changeModalState,

    changeModalDefault,
    changeModalAll,

    changeModalListName,

    changeMembersModal,
    changeMembersModalName,
    changeMembersModalID,

    changeShoppingListModalName
} = slice.actions;

export default slice.reducer