import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiDeleteOutline,
    mdiClose,
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeIsActive, changeModalDefault } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItems } from "../../../store/entities/reducer_shoppingList";

import { 
    SpaceQuitButton,
    QuitButton,
    StatePreview
 } from "../modalComponents";

const Modal = () => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
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

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })
}


    const HandleSubmit = () => {
        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.items]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }

        if(index != -1) arr.splice(index, 1)
        console.table(arr)
        if(arr.length == 0){
            let obj = {id: -1, name: "add new item", cost: 0, costType: 'CZK', count: 0, dsc: '', state: 'None'}
            arr.push(obj)
        }

        store.dispatch(changeItems({items: arr}))

        store.dispatch(changeIsSaved({isSaved: false}))
        store.dispatch(changeIsActive({isActive: false}))
    }


return<>
    <div className="
    w-full h-full
    relative
    ">
        <div className=" absolute w-full h-full bg-slate-600/35">
            <SpaceQuitButton/>
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
                <QuitButton/>

                {/* Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    {
                        (language == "en") ? "Delete item" : (
                        (language == "cz") ? "Smazat položku" : "Delete item")
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
                                (language == "en") ? "Are you sure you want to delete this item?" : (
                                (language == "cz") ? "Opravdu chcete tuto položku smazat?" : "Are you sure you want to delete this item?")
                            }
                        </div>

                        {/* item to delete */}
                        <div className="
                        w-full h-10
                        border-2 border-sky-400
                        rounded-lg
                        flex items-center
                        pl-2
                        font-semibold
                        ">
                            {selectedItem != undefined && <div>
                                {selectedItem.name}
                            </div>}

                            <div className="grow"/>

                            
                            <div className="
                            w-[62px] h-[40px] px-[2px] py-[3px]
                            ">
                                {StatePreview(false, selectedItem)}
                            </div>
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