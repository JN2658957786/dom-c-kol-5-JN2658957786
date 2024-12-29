import React, { useEffect, useState } from "react";
import { useStore } from 'react-redux'
import { changeUser, changeUserType } from "../../../store/entities/reducer_user";
import {
    SpaceQuitButton
} from "../modalComponents";
import Icon from '@mdi/react';
import {
    mdiChevronLeft,
    mdiChevronRight,
    mdiClose
} from '@mdi/js';
import { changeCurrentAccountID } from "../../../store/entities/reducer_userAccounts";
import { changeIsActive, changeModalDefault } from "../../../store/entities/reducer_modal";
import {
    changeFilter,
    changeShoppingListItems,
    changeShoppingListMembers,
    changeShoppingListSettings,
    changeUpdateMode,
    list_get,
    list_list
} from "../../../store/entities/reducer_shoppingList";


const Modal = () => {

    const store = useStore()

    const [ownerID, setOwnerID] = useState(store.getState().entities.userReducer.id)
    const [listsDetail, setListsDetail] = useState(store.getState().entities.menuReducer.list)
    const [detail, setDetail] = useState({id: "-1", name: ""})
    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)

    store.subscribe(() => {
        setOwnerID(store.getState().entities.userReducer.id)
        setListsDetail(store.getState().entities.menuReducer.list)

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })


    /// handlers
    function handleAddList(){
        store.dispatch(changeUpdateMode({mode: "addList"}))
        store.dispatch(changeIsActive({isActive: true}))
        
    }
    function handleClick(e, i){
        const menu = store.getState().entities.menuReducer
        const { page, limit } = menu

        if(e != detail){
            setDetail(e)

            const index = page * limit + i
            store.dispatch(list_get( index ))

        }
    }
    function previousPage(){
        const menu = store.getState().entities.menuReducer
        const { page, limit } = menu
        if(page <= 0) return;

        store.dispatch(list_list(page - 1, limit))
    }
    function nextPage(){
        const menu = store.getState().entities.menuReducer
        const { page, limit, hasNext } = menu
        if(!hasNext) return;

        store.dispatch(list_list(page + 1, limit))
    }

    const list = listsDetail.map((e, i) => {return<>
        <button
        onClick={() => {handleClick(e, i)}}
        className="
        w-full h-12 pl-2
        border-2 border-sky-400 rounded-lg
        hover:bg-slate-100
        flex items-center
        font-semibold
        ">
            <div>
                {e.name}
            </div>
        </button>
        <div className="h-4"/>
    </>})

return<>
    <div className="
    w-full h-full
    relative
    ">
        <div className=" absolute w-full h-full bg-slate-600/35">
            <SpaceQuitButton toDefault={true}/>
        </div>
        <div className="
        absolute z-10 left-0 top-0
        w-[calc(4_*_96px)] h-full
        bg-slate-50
        rounded-e-2xl
        ">
            {/* Modal */}
            <div className="
            w-full h-full
            flex flex-col
            relative
            ">
                <div className="absolute top-3 left-5">
                    <button 
                    onClick={() => {
                        store.dispatch(changeIsActive({isActive: false}))
                        store.dispatch(changeModalDefault())
                        store.dispatch(changeUpdateMode({mode: "none"}))
                    }}
                    className="
                    border-2 border-slate-200/75
                    hover:ring-2 hover:ring-slate-200/75
                    rounded-md">
                        <Icon path={mdiClose} size={1.25} color={"#cbd5e1"}/>
                    </button>
                </div>

                {/* 1 Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    {
                        (language == "en") ? "Shopping lists" : (
                        (language == "cz") ? "Nákupní seznamy" : "Shopping lists")
                    }
                </div>

                <div className="w-full grow pb-16 overflow-y-scroll no-scrollbar">
                    <div className="w-full h-fit px-5 pt-5">
                        {list}
                    </div>

                    {ownerID != "" && ownerID != "-1" && store.getState().entities.menuReducer.hasNext == false &&
                    <div className="w-full h-fit px-5">
                        <button
                        onClick={() => {handleAddList()}}
                        className="
                        w-full h-12 pl-2
                        border-2 border-sky-400 rounded-lg
                        hover:bg-slate-100
                        font-semibold
                        flex items-center justify-center
                        ">
                            {
                                (language == "en") ? "Add new shopping list" : (
                                (language == "cz") ? "Přidat nový nákupní seznam" : "Add new shopping list")
                            }
                        </button>

                    </div>}
                    {(ownerID == "" || ownerID == "-1") && store.getState().entities.menuReducer.hasNext == false &&
                    <div className="w-full h-fit px-5">
                        <div
                        className="
                        w-full h-12 pl-2
                        border-2 border-sky-400 rounded-lg
                        font-semibold
                        flex items-center justify-center
                        ">
                            Log in to add new shopping list
                        </div>

                    </div>}
                </div>

                
                <div className="
                absolute bottom-0 z-30
                w-full h-fit p-4 
                flex justify-center">
                    {store.getState().entities.menuReducer.page > 0 && <button
                    className="
                    border-2 border-sky-400 rounded-md
                    hover:bg-slate-200"
                    onClick={() => previousPage()}
                    >
                        <Icon path={mdiChevronLeft} size={1}/>
                    </button>}
                    {store.getState().entities.menuReducer.page <= 0 && <button
                    className="
                    border-2 border-sky-400 rounded-md
                    bg-slate-300"
                    >
                        <Icon path={mdiChevronLeft} size={1}/>
                    </button>}

                    <div className="w-2"/>

                    {store.getState().entities.menuReducer.hasNext == true && <button className="
                    border-2 border-sky-400 rounded-md
                    hover:bg-slate-200"
                    onClick={() => nextPage()}
                    >
                        <Icon path={mdiChevronRight} size={1}/>
                    </button>}
                    {store.getState().entities.menuReducer.hasNext == false && <button className="
                    border-2 border-sky-400 rounded-md
                    bg-slate-300"
                    >
                        <Icon path={mdiChevronRight} size={1}/>
                    </button>}

                    <div className="absolute translate-x-[calc(16*4px)] flex">
                        <div className="
                        w-12 h-fit
                        border-2 border-sky-400 rounded-md
                        flex justify-center items-center 
                        ">
                            {store.getState().entities.menuReducer.page + 1}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</>}

export default Modal