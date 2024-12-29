import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiCheck,
    mdiClose
} from '@mdi/js';
import { useStore } from 'react-redux'

import { changeIsActive, changeModalDefault, changeModalListName } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeListName } from "../../../store/entities/reducer_shoppingList";

import {
    SpaceQuitButton,
    QuitButton
 } from "../modalComponents";


const Modal = () => {

    const store = useStore()

    const [renameValue, setRenameValue] = useState(store.getState().entities.shoppingListReducer.settings.name)
    const [newlistName, setNewListName] = useState("")
    const [oldlistName, setOldListName] = useState(store.getState().entities.shoppingListReducer.settings.name)

    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)

    
    if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "rename"){
        store.subscribe(() => {
            setNewListName(store.getState().entities.modalReducer.detail.name)
            setOldListName(store.getState().entities.shoppingListReducer.settings.name)

            const newL = store.getState().entities.languagesReducer.currentL
            if(language != newL) setLanguage(newL)
        })
    }

    function HandleSubmit() {
        let name = newlistName
        if(newlistName.length == 0){
            name = "New shopping list"
        }

        store.dispatch(changeListName({name: name}))

        store.dispatch(changeModalDefault())
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
            flex-col items-center 
            relative
            ">
                <QuitButton/>

                {/* 1 Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center 
                font-bold text-lg
                ">
                    {
                        (language == "en") ? "Rename shopping list" : (
                        (language == "cz") ? "Přejmenovat nákupní seznam" : "Rename shopping list")
                    }
                </div>

                <div className="
                w-full h-fit px-8
                flex-col justify-center
                ">
                    
                    {/* 2 preview */}
                    <div className="
                    w-full h-fit
                    flex flex-col
                    ">
                        {/* naw name */}
                        <div className="
                        w-full h-10
                        border-2 border-sky-400
                        rounded-lg
                        flex items-center
                        relative
                        ">
                            <div className="
                            absolute left-2 -top-3
                            px-1
                            bg-slate-50
                            font-semibold text-sm text-sky-400
                            ">
                                {
                                    (language == "en") ? "New name" : (
                                    (language == "cz") ? "Nové jméno" : "New name")
                                }
                            </div>
                            <div 
                            className="
                            w-full h-full pl-2
                            font-semibold
                            flex items-center
                            ">
                                {newlistName != undefined && <div>
                                    { newlistName } 
                                </div>}

                                
                            </div>
                        </div>

                        <div className="h-3"/>

                        {/* old name */}
                        <div className="
                        w-full h-10
                        border-2 border-sky-400
                        rounded-lg
                        flex items-center
                        relative
                        ">
                            <div className="
                            absolute left-2 -top-3
                            px-1
                            bg-slate-50
                            font-semibold text-sm text-sky-400
                            ">
                                {
                                    (language == "en") ? "Old name" : (
                                    (language == "cz") ? "Staré jméno" : "Old name")
                                }
                            </div>
                            <div 
                            className="
                            w-full h-full pl-2
                            font-semibold
                            flex items-center
                            ">
                                {oldlistName != undefined && <div>
                                    { oldlistName }  
                                </div>}
                            </div>
                        </div>
                    </div>

                    {/* 3 form */}
                    <div className="
                    w-full h-full
                    ">
                        {/* name field */}
                        <div className="
                        w-full h-fit pt-6
                        ">
                            <div className="font-semibold">
                                {
                                    (language == "en") ? "New name:" : (
                                    (language == "cz") ? "Nové jméno:" : "New name:")
                                }
                            </div>
                            <div className="w-full h-10 border-2 border-slate-200 rounded-lg">
                                <input 
                                    value={renameValue}
                                    autoFocus
                                    autoCorrect={false}
                                    onChange={e => setRenameValue(e.target.value)}
                                    onKeyUp={e => store.dispatch(changeModalListName({name: renameValue}))}
                                    className="w-full h-full rounded-lg outline-none pl-2"
                                    defaultValue={"New item"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4 confirm, cancel  */}
                    <div className="
                    w-full h-24 pb-5
                    flex items-center
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
        </div>
    </div>
</>}

export default Modal