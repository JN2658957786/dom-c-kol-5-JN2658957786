import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiDeleteOutline,
    mdiClose,
    mdiAccount
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeIsActive, changeModalDefault } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItems, changeMembers, changeUpdateMode, list_leave } from "../../../store/entities/reducer_shoppingList";

import { 
    SpaceQuitButton,
    QuitButton,
    NavbarSvg
} from "../modalComponents";


const Modal = () => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
    const [shoppingListName, setShoppingListName] = useState(store.getState().entities.shoppingListReducer.settings.name)

    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)


if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "delete"){
    store.subscribe(() => {
        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.members]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }
        setSelectedItem(store.getState().entities.shoppingListReducer.members[index])
        setShoppingListName(store.getState().entities.shoppingListReducer.settings.name)

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })
}


    const HandleSubmit = () => {
        const userIndex = store.getState().entities.userReducer.id
        let arr = [...store.getState().entities.shoppingListReducer.members]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == userIndex){
                index = i
            }
        }

        // console.log("!!! delete:", {index})
        if(index != -1) arr.splice(index, 1)

        store.dispatch(list_leave(arr))

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
                        (language == "en") ? "Leave shopping list" : (
                        (language == "cz") ? "Opustit nákupní seznam" : "Leave shopping list")
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
                                (language == "en") ? "Are you sure you want to leave this shopping list?" : (
                                (language == "cz") ? "Opravdu chcete opustit tento nákupní seznam?" : "Are you sure you want to leave this shopping list?")
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
                    w-full h-fit pt-10 pb-5
                    flex items-end
                    ">
                        <button
                        onClick={() => {
                            store.dispatch(changeIsActive({isActive: false}))
                            store.dispatch(changeUpdateMode({mode: "none"}))
                        }}
                        className="
                        w-32 h-10 
                        border-[3px] border-slate-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-slate-400
                        font-bold text-slate-600
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
                            store.dispatch(changeUpdateMode({mode: "none"}))
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