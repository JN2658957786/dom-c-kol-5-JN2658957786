import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiDeleteOutline,
    mdiClose,
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeIsActive, changeModalDefault } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItems, changeShoppingListItems, changeShoppingListMembers, changeShoppingListSettings, changeUpdateMode, list_delete } from "../../../store/entities/reducer_shoppingList";

import { 
    SpaceQuitButton,
    QuitButton,
    NavbarSvg
 } from "../modalComponents";
import { deleteShoppingLists, deleteShoppingListsDetails } from "../../../store/entities/reducer_DBshoppingLists";
import { changeUserType } from "../../../store/entities/reducer_user";

const Modal = () => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
    const [shoppingListName, setShoppingListName] = useState(store.getState().entities.shoppingListReducer.settings.name)

    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)


if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "delete"){
    store.subscribe(() => {
        // console.log("!!! selectedItem:", selectedItem)

        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.items]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }
        setSelectedItem(store.getState().entities.shoppingListReducer.items[index])
        setShoppingListName(store.getState().entities.shoppingListReducer.settings.name)

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })
}


    const HandleSubmit = () => {
        const shoppingListID = store.getState().entities.shoppingListReducer.settings.id
        const listDetail = store.getState().entities.dbListsReducer.shoppingListsDetails
        const list = store.getState().entities.dbListsReducer.shoppingLists
        let tempListDetail = []
        let tempList = []
        let index = -1

        // console.log({listDetail})
        // console.log({list})

        for (let i = 0; i < listDetail.length; i++) {
            if(listDetail[i].id != shoppingListID){
                tempListDetail.push(listDetail[i])
                tempList.push(list[i])
            }
            else {
                console.log("found delete index: ", i)
                index = i
            }
        }

        if(index == -1) return;
        
        
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
        store.dispatch(changeUpdateMode({mode: "rename"}))
        
        store.dispatch(list_delete(index))
    }

return<>
    <div className="
    w-full h-full
    relative
    ">
        <div className=" absolute w-full h-full bg-slate-600/35">
            <SpaceQuitButton toDefault={true}/>
        </div>
        <div className="
        absolute z-10 inset-0 left-[calc(50%_-_2_*_128px)] top-16
        w-[calc(4_*_128px)] h-fit
        bg-slate-50
        rounded-2xl
        ">

            {/* Modal */}
            <div className="
            w-full h-full
            flex flex-col
            relative
            ">
                <QuitButton toDefault={true}/>

                {/* Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    {
                        (language == "en") ? "Delete this shopping list" : (
                            (language == "cz") ? "Smazat tento nákupní seznam" : "Delete this shopping list"
                        )
                    }
                </div>

                {/* modal body */}
                <div className="
                w-full h-fit px-6
                flex-col justify-center
                ">
                    {/* preview */}
                    <div className="
                    w-full h-fit
                    flex flex-col
                    ">
                        <div className="
                        w-full h-8
                        font-semibold
                        ">
                            {
                                (language == "en") ? "Are you sure you want to delete this shopping list?" : (
                                    (language == "cz") ? "Opravdu chcete smazat tento nákupní seznam?" : "Are you sure you want to delete this shopping list?"
                                )
                            }
                        </div>

                        <div className="h-4"/>

                        {/* shopping list display */}
                        <div className="w-full h-full flex flex-row justify-center items-center">
                            <div className="scale-x-100">
                                <NavbarSvg color="#e2e8f0" />
                            </div>
                            <div className="
                            h-10
                            overflow-hidden
                            bg-slate-200
                            font-bold
                            flex items-center
                            ">
                                <div className="-translate-x-0 ">
                                    
                                    <p className=" text-nowrap">
                                        {shoppingListName}
                                    </p>
                                </div>
                            </div>
                            <div className="-scale-x-100">
                                <NavbarSvg color="#e2e8f0" />
                            </div>
                        </div>
                        {/*  */}
                            
                    </div>

                    {/* confirm, cancel  */}
                    <div className="
                    w-full h-28 pb-5
                    flex items-end
                    ">
                        <button
                        onClick={() => store.dispatch(changeIsActive({isActive: false}))}
                        className="
                        w-32 h-10 
                        border-[3px] border-slate-400 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-slate-300
                        font-bold text-slate-500
                        relative
                        ">
                            <div className="absolute -top-[10px] left-2 bg-slate-50">
                                <Icon path={mdiClose} size={0.75}/>
                            </div>
                            {
                                (language == "en") ? "Cancel" : (
                                    (language == "cz") ? "Zrušit" : "Cancel"
                                )
                            }
                        </button>

                        <div className="grow"/>

                        <button
                        onClick={() => {
                            HandleSubmit()
                            store.dispatch(changeModalDefault())
                        }}
                        className="
                        w-32 h-10 
                        border-[3px] border-red-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-red-400
                        font-bold text-red-600
                        relative
                        ">
                            <div className="absolute -top-[10px] right-2 bg-slate-50">
                                <Icon path={mdiDeleteOutline} size={0.75}/>
                            </div>
                            {
                                (language == "en") ? "Delete" : (
                                    (language == "cz") ? "Vymazat" : "Delete"
                                )
                            }
                        </button>
                    
                    </div>
                </div>

            </div>
            {/*  */}
            
        </div>
    </div>
</>}

export default Modal