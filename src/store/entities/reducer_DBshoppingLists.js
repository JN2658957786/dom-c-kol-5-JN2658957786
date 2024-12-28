import { createSlice } from "@reduxjs/toolkit"
import { useStore } from "react-redux"

const initalStateObject = {
    // listsLength: 3,
    shoppingListsDetails:[
        {id: "6219556579972973", name:"New shopping list 1"},
        {id: "4760205123261246", name:"New shopping list 2"},
        {id: "0799417201566378", name:"New shopping list 3"}
    ],
    shoppingLists: [
        {
            items:[
                {
                  id: "7731418371584164",
                  name: 'banány',
                  cost: '38',
                  costType: 'CZK',
                  count: '3',
                  dsc: '1Kg',
                  state: 'In progress',
                  archived: true
                },
                {
                    id: "1821274833348776",
                    name: 'čokoláda',
                    cost: 0,
                    costType: 'CZK',
                    count: '10',
                    dsc: 'neznám cenu',
                    state: 'None',
                    archived: true
                },
                {
                  id: "7884625049618375",
                  name: 'Mandarinky',
                  cost: '57',
                  costType: 'CZK',
                  count: '2',
                  dsc: '1Kg',
                  state: 'Waiting',
                  archived: true
                },
                {
                  id: "8805218657292235",
                  name: 'jablka',
                  cost: '33',
                  costType: 'CZK',
                  count: '5',
                  dsc: '1Kg',
                  state: 'Finished',
                  archived: true
                },
                {
                  id: "5687226121026338",
                  name: 'máslo',
                  cost: '65',
                  costType: 'CZK',
                  count: '2',
                  dsc: '1sk',
                  state: 'Canceled',
                  archived: true
                },
                {
                  id: "7251761717454611",
                  name: 'olej',
                  cost: '39',
                  costType: 'CZK',
                  count: '1',
                  dsc: '1ks',
                  state: 'Delayed',
                  archived: true
                }
            ],
            members: [
                {id:"9809889725213598", name: "user1", type: "owner"},
                {id:"2876114036701286", name: "user2", type: "member"},
                {id:"3029846138010644", name: "user3", type: "member"},
                {id:"7669290044133612", name: "member3", type: "member"},
                {id:'2350782271550000', name: "member4", type: "member"},
                {id:"8954628980493026", name: "member5", type: "member"}
            ],
            settings: {
                id: "6219556579972973",
                name: "New shopping list 1",
                owner: "9809889725213598",
                isSaved: true,
                loading: false,
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
                    Non_Archived:true
                }
            },
            updateItem: {
                updateMode: "none",
                selectedItem: -1
            }
        },
        {
            items:[
                {
                  id: "7731418371584164",
                  name: 'banány',
                  cost: '38',
                  costType: 'CZK',
                  count: '3',
                  dsc: '1Kg',
                  state: 'In progress',
                  archived: true
                },
                {
                  id: "5687226121026338",
                  name: 'máslo',
                  cost: '65',
                  costType: 'CZK',
                  count: '2',
                  dsc: '1sk',
                  state: 'Canceled',
                  archived: true
                },
                {
                  id: "7251761717454611",
                  name: 'olej',
                  cost: '39',
                  costType: 'CZK',
                  count: '1',
                  dsc: '1ks',
                  state: 'Delayed',
                  archived: true
                }
            ],
            members: [
                {id:"2876114036701286", name: "user2", type: "owner"},
                {id:"9809889725213598", name: "user1", type: "member"}
            ],
            settings: {
                id: "4760205123261246",
                name: "New shopping list 2",
                owner: "2876114036701286",
                isSaved: true,
                loading: false,
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
                    Non_Archived:true
                }
            },
            updateItem: {
                updateMode: "none",
                selectedItem: -1
            }
        },
        {
            items:[
                {
                    id: -1,
                    name: 'add new item',
                    cost: 0,
                    costType: 'CZK',
                    count: 0,
                    dsc: '',
                    state: 'None',
                    archived: true
                  }
            ],
            members: [
                {id:"3029846138010644", name: "user3", type: "owner"}
            ],
            settings: {
                id: "0799417201566378",
                name: "New shopping list 3",
                owner: "3029846138010644",
                isSaved: true,
                loading: false,
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
                    Non_Archived:true
                }
            },
            updateItem: {
                updateMode: "none",
                selectedItem: -1
            }
        }
    ]
}

const slice = createSlice({
    name: "reducer_shoppingList",
    initialState: initalStateObject,
    reducers: {
        saveShoppingList: (state, action) => {
            state.shoppingLists[action.payload.index] = action.payload.list
            state.shoppingListsDetails[action.payload.index] = action.payload.detail
        },
        deleteShoppingLists: (state, action) => {
            state.shoppingLists.splice(action.payload.index, 1)
            state.shoppingListsDetails.splice(action.payload.index, 1)
            // state.listsLength = state.listsLength - 1
        },
        addShoppingList: (state, action) => {
            state.shoppingLists.push(action.payload.list)
            state.shoppingListsDetails.push(action.payload.detail)
            // state.listsLength = state.listsLength - 1
        },
        
    }
})

export const {
    saveShoppingList,
    deleteShoppingLists,
    addShoppingList,
} = slice.actions;

export default slice.reducer

// selectors
export const ListShoppingList = ({store, page, limit}) => {

    let tempLists = []

    if(limit < 1) return;

    const detailArr = store.getState().entities.dbListsReducer.shoppingListsDetails
    for (let i = 0; i < limit; i++) {
        if(page * limit + i < detailArr.length) {
            tempLists.push(detailArr[page * limit + i])
        }
    }

    let hasNext = false
    console.log(page * limit + limit)
    console.log(detailArr[page * limit + limit])
    if(detailArr[page * limit + limit] != undefined ) hasNext = true

    return {
        page,
        limit,
        hasNext,
        list: tempLists
    }
}
export const GetShoppingList = ({store, index}) => {

    const shoppingList = store.getState().entities.dbListsReducer.shoppingLists[index]
    
    return {
        list: shoppingList
    }
}