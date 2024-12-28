import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiMenu, mdiAccount } from '@mdi/js';
import store from "../../store/configureStore.js";
import { changeUpdateMode, list_list } from "../../store/entities/reducer_shoppingList.js";
import { changeIsActive } from "../../store/entities/reducer_modal.js";

import ListNameDisplay from "./listNameDisplay";

export default function ({children}) {

    // const [listName, setListName] = useState(store.getState().entities.shoppingListReducer.settings.name)
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("Account")


    useEffect(() => {
        const tempID = store.getState().entities.userReducer.id
        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
            setUsername(store.getState().entities.userAccountsReducer.currentAccountID)
        }
        
    })

    store.subscribe(() => {
        // setListName(store.getState().entities.shoppingListReducer.settings.name)
        const tempID = store.getState().entities.userReducer.id
        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
            setUsername(store.getState().entities.userReducer.name)
        }
    })

    const AccountHandler = () => {
        store.dispatch(changeUpdateMode({mode: "acc"}))
        store.dispatch(changeIsActive({isActive: true}))
    }
    const MenuHandler = () => {
        const menu = store.getState().entities.menuReducer
        store.dispatch(list_list(menu.page, menu.limit))
        store.dispatch(changeUpdateMode({mode: "menu"}))
        store.dispatch(changeIsActive({isActive: true}))
    }


return <>
<div className="flex flex-col h-full">
    <div className="
    h-16 w-full
    bg-slate-50
    border-2 rounded-b-xl border-sky-400
    content-center
    ">
        <div className="flex">

            {/* Menu button */}
            <div className="pl-2 flex z-10 rounded-md items-center">
                <div>
                    <button
                    onClick={() => {
                        // console.log("clicked menu")
                        MenuHandler()
                    }}
                    className="
                    rounded-md
                    border-[4px] border-slate-300
                    hover:ring-2 hover:ring-offset-2 hover:ring-slate-300
                    active:ring-[3px] active:ring-offset-2 active:ring-sky-400 
                    shadow-inner
                    ">
                        <div className="w-8 h-8 flex justify-center items-center">
                            <Icon path={mdiMenu} size={1.25}/>
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center font-bold px-2">
                    Menu
                </div>
            </div>

            
            {/* Shopping list name */}
            <div className="grow grid grid-cols-1 ">
                <ListNameDisplay/>
            </div>
                
            
            {/* Account button */}
            <div className="pr-2 flex z-10 rounded-md items-center">
                <div className="flex justify-center items-center font-bold px-2">
                    {username}
                </div>
                <div className="flex justify-center">
                    <button 
                    onClick={() => {
                        // console.log("clicked account")
                        AccountHandler()
                    }}
                    className="
                    rounded-md
                    border-[4px] border-slate-300
                    hover:ring-2 hover:ring-offset-2 hover:ring-slate-300
                    active:ring-[3px] active:ring-offset-2 active:ring-sky-400 
                    shadow-inner
                    ">
                        <div className="w-8 h-8 flex justify-center items-center">
                            <Icon path={mdiAccount} size={1.25}/>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    </div>
    {children}
</div>
</>
}

