import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"
import * as apiActions from "../api"
import {
    addShoppingList,
    deleteShoppingLists,
    saveShoppingList,

    ListShoppingList,
    GetShoppingList
} from "../entities/reducer_DBshoppingLists";
import { changeMenuHasNext, changeMenuList, changeMenuPage } from "../entities/reducer_Menu";
import { useStore } from "react-redux";
import store from "../configureStore";
import { changeFilter, changeIsSaved, changeMembers, changeShoppingListItems, changeShoppingListMembers, changeShoppingListSettings, changeUpdateMode } from "../entities/reducer_shoppingList";
import { changeUser, changeUserType } from "../entities/reducer_user";
import { changeIsActive } from "../entities/reducer_modal";

const mock = new AxiosMockAdapter(axios, { delayResponse: 100 });

const api = (store) => (next) => async (action) => {

    if (action.type !== "api/callBegan") {
        // console.log("middleware/api action:", action)
        return next(action);
    }
    console.log("middleware/api action:", action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    next(action);
    store.dispatch({ type: onStart })


    const validUri = [
        "/shoppingList/archive",
        "/shoppingList/delete",
        "/shoppingList/leave",
        "/shoppingList/add",
        "/shoppingList/list",
        "/shoppingList/get",
        "/user/update"
    ]

    // is url valid?
    const isValid = validUri.findIndex((e) => e == url)
    if (isValid == -1) {
        const error = `${url} url is not valid`
        console.log("middleware/api axios:", {
            request: "failed",
            recivedAction: action,
            error
        })
        store.dispatch(apiActions.apiCallFailed(error))
        store.dispatch({ type: onError, payload: error })
        return;
    }

    
    try {

        mock.onPost(url, data).reply(200, data)


        axios.post(url, data).then((response) => {

            console.log("middleware/api axios:", {
                request: "successful",
                recivedAction: action,
                response: response.data
            })

            store.dispatch(apiActions.apiCallSuccess(response.data))


            if (url == "/shoppingList/archive") {
                
                store.dispatch(saveShoppingList({
                    list: response.data.list,
                    detail: response.data.detail,
                    index: response.data.index
                }))
            }
            if (url == "/shoppingList/delete") {
                store.dispatch(deleteShoppingLists({
                    index: response.data.index
                }))
            }
            if(url == "/shoppingList/leave") {
                store.dispatch(changeMembers({members: response.data.newMemberArr}))
                
                const sList = store.getState().entities.shoppingListReducer
                const newDetail = {
                    id: sList.settings.id,
                    name: sList.settings.name
                }

                const shoppingListID = store.getState().entities.shoppingListReducer.settings.id
                const listDetail = store.getState().entities.dbListsReducer.shoppingListsDetails
                let index = -1

                for (let i = 0; i < listDetail.length; i++) {
                    if(listDetail[i].id == shoppingListID){
                        index = i
                    }
                }
                if(index == -1) return;


                store.dispatch(saveShoppingList({
                    list: sList,
                    detail: newDetail,
                    index
                }))

                store.dispatch(changeIsSaved({isSaved: false}))
                store.dispatch(changeIsActive({isActive: false}))

                store.dispatch(changeShoppingListItems({items: []}))
                store.dispatch(changeShoppingListMembers({members: []}))
                store.dispatch(changeShoppingListSettings({settings: {
                    id: "-1",
                    name: "Shopping list",
                    owner: "-1",
                    isSaved: false,
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
                    }
                }}))
                
                store.dispatch(changeUserType({type: "none"}))
                store.dispatch(changeIsActive({isActive: false}))
            }
            if (url == "/shoppingList/add") {
                store.dispatch(addShoppingList({
                    list: response.data.list,
                    detail: response.data.detail
                }))
            }
            if (url == "/shoppingList/list") {
                const { page, limit } = response.data
                const shoppingLists = ListShoppingList({ store, page, limit })
                console.log(shoppingLists)

                store.dispatch(changeMenuPage({ page }))
                store.dispatch(changeMenuList({ list: shoppingLists.list }))
                store.dispatch(changeMenuHasNext({ hasNext: shoppingLists.hasNext }))

            }
            if (url == "/shoppingList/get") {
                const shoppingList = GetShoppingList({ store, index: response.data.index })

                store.dispatch(changeShoppingListItems({ items: shoppingList.list.items }))
                store.dispatch(changeShoppingListMembers({ members: shoppingList.list.members }))
                store.dispatch(changeShoppingListSettings({ settings: shoppingList.list.settings }))

                const userIndex = store.getState().entities.userReducer.id
                let arr = [...store.getState().entities.shoppingListReducer.members]

                let index = -1
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == userIndex) {
                        index = i
                    }
                }

                if (index != -1) {
                    store.dispatch(changeUserType({ type: arr[index].type }))
                }

                store.dispatch(changeFilter({
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
                }))

            }
            if (url == "/user/update") {
                store.dispatch(changeUser({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type
                }))
            }

            store.dispatch({ type: onSuccess, payload: { value: response.data } })
            console.log(response.data);
        });



    } catch (error) {
        console.log("middleware/api axios:", {
            request: "failed",
            recivedAction: action,
            error
        })
        store.dispatch(apiActions.apiCallFailed(error))
        store.dispatch({ type: onError, payload: error })
    }

}


export default api; 