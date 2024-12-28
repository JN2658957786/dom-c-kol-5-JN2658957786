import { combineReducers } from "@reduxjs/toolkit";
import tabsReducer from "./entities/reducer_tabs"
import shoppingListReducer from "./entities/reducer_shoppingList"
import modalReducer from "./entities/reducer_modal"
import userAccountsReducer from "./entities/reducer_userAccounts"
import userReducer from "./entities/reducer_user"
import dbListsReducer from "./entities/reducer_DBshoppingLists"
import menuReducer from "./entities/reducer_Menu"

export default combineReducers({
    tabsReducer,
    shoppingListReducer,
    modalReducer,
    userAccountsReducer,
    userReducer,
    menuReducer,
    dbListsReducer
})