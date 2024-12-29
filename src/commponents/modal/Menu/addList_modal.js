import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiCheck,
    mdiClose
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeIsActive, changeModalDefault } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItems, changeShoppingListItems, changeShoppingListMembers, changeShoppingListSettings, changeToDefault, changeUpdateMode, list_add } from "../../../store/entities/reducer_shoppingList";

import { 
    SpaceQuitButton,
    QuitButton,
    NavbarSvg,
    FormChangeListName
 } from "../modalComponents";
import { addShoppingList, addShoppingListsDetail, changeShoppingLists, changeShoppingListsDetails, deleteShoppingList } from "../../../store/entities/reducer_DBshoppingLists";
import { changeUserType } from "../../../store/entities/reducer_user";

const Modal = () => {

    const store = useStore()

    const [userID, setUserID] = useState(store.getState().entities.userReducer.id)
    const [userName, setUserName] = useState(store.getState().entities.userReducer.name)
    const [shoppingListName, setShoppingListName] = useState(store.getState().entities.modalReducer.shoppingListModal.name)
    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)


if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "addList"){
    store.subscribe(() => {
        setUserID(store.getState().entities.userReducer.id)
        setUserName(store.getState().entities.userReducer.name)
        setShoppingListName(store.getState().entities.modalReducer.shoppingListModal.name)

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })
}


    const HandleSubmit = () => {
        
        const length = 16
        let randomNum = Math.round(Math.random() * 9)
        for (let i = 0; i < length - 1; i++) {
            randomNum = randomNum * 10 + Math.round(Math.random() * 9)
        }

        const newList = {
            items:[
                {
                    id: -1,
                    name: 'add new item',
                    cost: 0,
                    costType: 'CZK',
                    count: 0,
                    dsc: '',
                    state: 'None'
                  }
            ],
            members:[
                {
                    id: userID,
                    name: userName,
                    type: 'owner'
                }
            ],
            settings:{
                id: `${randomNum}`,
                name: shoppingListName,
                owner: userID,
                isSaved: true,
                loading: false,
                display: {
                    mode: 'list',
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
            updateItem:{
                updateMode: 'none',
                selectedItem: -1
            }
        }
        
        const newListDetail = {id: `${randomNum}`, name: shoppingListName}


        store.dispatch(list_add(newList, newListDetail))

        store.dispatch(changeModalDefault())

        store.dispatch(changeUserType({type: "none"}))
        store.dispatch(changeIsActive({isActive: false}))
        store.dispatch(changeUpdateMode({mode: "rename"}))

        store.dispatch(changeToDefault())
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
                        (language == "en") ? "Create new shopping list" : (
                        (language == "cz") ? "Vytvořte nový nákupní seznam" : "Create new shopping list")
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

                        {/* shopping list display */}
                        <div className="pt-6 w-full h-full flex flex-row justify-center items-center">
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

                    {/* form */}
                    <div className="
                    w-full h-fit pt-4
                    ">
                        {/* Name */}
                        <div className="font-semibold">
                            {
                                (language == "en") ? "name:" : (
                                (language == "cz") ? "jméno:" : "name:")
                            }
                        </div>
                        <div className="w-full h-10 border-2 border-slate-200 rounded-lg">
                            <FormChangeListName/>
                        </div>
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
                        border-[3px] border-red-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-red-400
                        font-bold text-red-600
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
                        border-[3px] border-green-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-green-400
                        font-bold text-green-600
                        relative
                        ">
                            <div className="absolute -top-[10px] right-2 bg-slate-50">
                                <Icon path={mdiCheck} size={0.75}/>
                            </div>
                            {
                                (language == "en") ? "Confirm" : (
                                    (language == "cz") ? "Potvrdit" : "Confirm"
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