import React, { useEffect, useState } from "react";
import {
    changeIsActive
 } from "../../../store/entities/reducer_modal";
 import { useStore } from 'react-redux'
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";

import {
    QuitButton,
    SpaceQuitButton,
    StatePreview,
    FormChangeDsc
} from "../modalComponents";

const Modal = () => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
    // const [selectedDsc, setSelectedDsc] = useState("")

    useEffect(() => {
        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.items]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }
        setSelectedItem(store.getState().entities.shoppingListReducer.items[index])
        // setSelectedDsc(store.getState().entities.shoppingListReducer.items[index].dsc)
    })

if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "view"){

    store.subscribe(() => {

        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.items]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }
        setSelectedItem(store.getState().entities.shoppingListReducer.items[index])
        // setSelectedDsc(store.getState().entities.shoppingListReducer.items[index].dsc)
        
    })
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
            flex flex-col items-center
            relative
            ">
                <QuitButton toDefault={true}/>

                {/* Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    View item
                </div>

                {/* modal body */}
                <div className="
                w-11/12 h-fit pt-5
                flex-col justify-center
                ">
                    {/* form */}
                    <div className="
                    w-full h-fit -translate-y-4
                    ">
                        {/* Name */}
                        <div className="font-semibold">name:</div>
                        <div className="
                        w-full h-10 flex">
                            <div className="
                            grow h-full
                            border-2 border-slate-200 rounded-lg outline-none pl-2
                            flex items-center
                            text-nowrap font-semibold
                            ">
                                {selectedItem.name}
                            </div>
                            <div className="w-[2px]"/>
                            <div className="w-20 h-full">
                                {StatePreview(false, selectedItem)}
                            </div>
                        </div>

                        {/* Cost per item */}
                        <div className="pt-2 font-semibold">cost per item:</div>
                        <div className="w-full h-10 flex">
                            <div className="grow h-full border-2 border-slate-200 rounded-s-lg">
                                <div className="
                                w-full h-full rounded-lg outline-none pl-2
                                flex items-center
                                text-nowrap font-semibold
                                ">
                                    {selectedItem.cost}
                                </div>
                            </div>
                            <div className="w-[2px]"/>
                            <div className="w-20 h-full border-2 border-slate-200 rounded-e-lg">
                                <div className="
                                w-full h-full rounded-lg outline-none pl-2
                                flex items-center
                                text-nowrap font-semibold
                                ">
                                    {selectedItem.costType}
                                </div>
                            </div>
                        </div>

                        {/* Count */}
                        <div className="font-semibold">count:</div>
                        <div className="
                        w-full h-10 border-2 border-slate-200 rounded-lg pl-2
                        flex items-center
                        text-nowrap font-semibold
                        ">
                            {selectedItem.count}
                        </div>

                        {/* Description */}
                        <div className="pt-2 font-semibold">description:</div>
                        <div className="w-full h-[120px] border-2 border-slate-200 rounded-lg">
                            <textarea 
                            disabled
                            className="
                            w-full h-full rounded-lg outline-none pl-2
                            bg-slate-50
                            flex items-center
                            text-nowrap font-semibold
                            ">
                                {store.getState().entities.modalReducer.modal.dsc}
                            </textarea>
                        </div>
                    </div>

                    {/* cancel  */}
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
                        border-[3px] border-slate-300 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-slate-300
                        font-bold text-slate-400
                        relative
                        ">
                            Cancel
                        </button>

                        <div className="grow"/>

                    </div>
                </div>
            </div>
            {/*  */}
        </div>
    </div>
</>}

export default Modal