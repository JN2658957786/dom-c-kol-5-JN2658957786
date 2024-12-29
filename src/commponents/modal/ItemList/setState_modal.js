import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
   mdiClose,
   mdiCheck,

   mdiChevronDoubleRight,
   mdiClockOutline,
   mdiClockAlertOutline,
   mdiDotsHorizontal,
} from "@mdi/js";
import store from "../../../store/configureStore";
import { changeModalDefault, changeModalState, changeIsActive } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItem, changeUpdateMode } from "../../../store/entities/reducer_shoppingList";

import {
    SpaceQuitButton,
    StatePreview,
    SelectState,
    QuitButton
} from "../modalComponents";


const SetStateModal = () => {

const [selectedItem, setSelectedItem] = useState({})
const [newItemName, setNewItemName] = useState(store.getState().entities.modalReducer.modal.name)
const [newState, setNewState] = useState(store.getState().entities.modalReducer.modal.state)
const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)


store.subscribe(() => {
    // console.log("!!!", selectedItem)

    const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
    let arr = [...store.getState().entities.shoppingListReducer.items]

    let index = -1
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].id == itemIndex){
            index = i
        }
    }
    setSelectedItem(store.getState().entities.shoppingListReducer.items[index])

    setNewItemName(store.getState().entities.modalReducer.modal.name)
    setNewState(store.getState().entities.modalReducer.modal.state)

    const newL = store.getState().entities.languagesReducer.currentL
    if(language != newL) setLanguage(newL)
})


const HandleSubmit = () => {
    if(selectedItem.id != -1) {
    const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
    let arr = [...store.getState().entities.shoppingListReducer.items]

    let index = -1
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].id == itemIndex){
            index = i
        }
    }

    let initObj = Object.assign({}, {...store.getState().entities.modalReducer.modal})
    let obj = {...initObj, archived: false}

    store.dispatch(changeItem({item: obj, index: index}))

    store.dispatch(changeModalDefault())
    store.dispatch(changeIsSaved({isSaved: false}))
    store.dispatch(changeIsActive({isActive: false}))
}}


function itemPreview(isNew){
        
    let checkName = ""
    let name = ""

    if(selectedItem){
        if(isNew){
            checkName = newItemName
            name = newItemName
        } else {
            checkName = selectedItem
            name = selectedItem.name
        }
    }

return<>
    <div className="
    w-full h-10
    border-2 border-sky-400
    rounded-lg
    flex items-center
    relative
    ">
        <div 
        className="
        px-2
        font-semibold
        ">
            {checkName != undefined && <div>
                {name}
            </div>}
        </div>

        <div className="grow"/>
    
        {/* statePreview */}
        <div className="
        w-[62px] h-[40px] px-[2px] py-[3px]
        ">
            {StatePreview(isNew, selectedItem, newState)}
        </div>   

    </div>
</>}


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
                        (language == "en") ? "Set state" : (
                        (language == "cz") ? "Nastavit stav" : "Set state")
                    }
                </div>
                <div className="
                w-full h-fit
                flex justify-center
                ">
                    {/* modal body */}
                    <div className="
                    w-full h-full px-6
                    flex flex-col items-center
                    ">
                        <div className="h-2"/>

                        {/* preview */}
                        <div className="
                        w-full h-fit
                        flex flex-col
                        ">
                            {itemPreview(true)}
                        </div>

                        <div className="h-10"/>

                        {/* form */}
                        <div className="
                        w-full h-[calc(4_*_28px)]
                        ">
                            {/* selection */}
                            <div className="
                            w-full h-fit pt-6
                            flex 
                            ">
                                <div className="
                                w-full h-12
                                ">
                                    <SelectState/>
                                </div>
                                
                            </div>
                        </div>

                        {/* confirm, cancel  */}
                        <div className="
                        w-full h-24 pb-5
                        flex items-center
                        ">
                            <button
                            onClick={() => {
                                store.dispatch(changeIsActive({isActive: false}))
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
            </div>
            {/*  */}
        </div>
    </div>
</>}
export default SetStateModal