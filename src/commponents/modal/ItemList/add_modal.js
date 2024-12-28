import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiCheck,
    mdiClose
} from '@mdi/js';
import { useStore } from 'react-redux'
import { 
    changeIsActive,
    changeModalDefault
 } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItems } from "../../../store/entities/reducer_shoppingList";

import {
    SpaceQuitButton,
    QuitButton,

    FormChangeName,
    FormChangeCost,
    FormChangeCostType,
    FormChangeCount,
    FormChangeDsc,

    SelectState,
    StatePreview
} from "../modalComponents";


const Modal = (props) => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
    const [newItemName, setNewItemName] = useState("New item")
    const [newState, setNewState] = useState("none")

    if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "addUp" || store.getState().entities.shoppingListReducer.updateItem.updateMode == "addDown"){
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

            setNewItemName(store.getState().entities.modalReducer.modal.name)
            setNewState(store.getState().entities.modalReducer.modal.state)
        })
    }

    function HandleSubmit() {
        //random id
        const length = 16
        let randomNum = Math.round(Math.random() * 9)
        for (let i = 0; i < length - 1; i++) {
            randomNum = randomNum * 10 + Math.round(Math.random() * 9)
        }

        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.items]

        let index = -1
        let rootIndex = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == -1){
                rootIndex = i
            }
            if(arr[i].id == itemIndex){
                index = i
            }
        }

        if(rootIndex != -1){
            arr.splice(rootIndex, 1)
        }

        let initObj = Object.assign({}, {...store.getState().entities.modalReducer.modal})
        let obj = {...initObj}

        randomNum = JSON.stringify(randomNum)
        obj = {...obj, id:randomNum}

        if(props.name == "add up"){
            arr.splice(index, 0, obj) 
        } else if(props.name == "add down"){
            if((index + 1) == arr.length){
                arr.push(obj)
            } else {
                arr.splice((index + 1), 0, obj)
            }
        }

        
        // console.table(arr)
        store.dispatch(changeItems({items: arr}))

        store.dispatch(changeIsSaved({isSaved: false}))
        store.dispatch(changeIsActive({isActive: false}))
    }    


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
            {isNew && <div className="
            absolute left-2 -top-3
            px-1
            bg-slate-50
            font-semibold text-sm text-sky-400
            ">
                New item
            </div>}
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
                    {props.name}
                </div>

                {/* modal body */}
                <div className="
                w-full h-fit
                flex justify-center
                ">
                    {(props.name == "add up" || props.name == "add down") && <>

                        <div className="
                        w-11/12 h-full
                        flex flex-col items-center
                        ">
                            {/* preview */}
                            <div className="
                            w-full h-fit
                            flex flex-col
                            ">
                                {props.name == "add up" && <div className="w-full h-fit">
                                    {/* item to add */}
                                    {itemPreview(true)}

                                    <div className="h-3"/>

                                    {/* based on item */}
                                    {itemPreview(false)}
                                </div>}
                                {props.name == "add down" &&<div className="w-full h-fit">
                                    {/* based on item */}
                                    {itemPreview(false)}

                                    <div className="h-3"/>

                                    {/* item to add */}
                                    {itemPreview(true)}
                                </div>}
                            </div>

                            {/* form */}
                            <div className="
                            w-full h-full
                            ">
                                {/* fields */}
                                <div className="
                                w-full h-fit pt-4
                                ">
                                    {/* Name */}
                                    <div className="font-semibold">name:</div>
                                    <div className="w-full h-10 border-2 border-slate-200 rounded-lg">
                                        <FormChangeName/>
                                    </div>

                                    {/* Cost per item */}
                                    <div className="pt-2 font-semibold">cost per item:</div>
                                    <div className="w-full h-10 flex">
                                        <div className="grow h-full border-2 border-slate-200 rounded-s-lg">
                                            <FormChangeCost/>
                                        </div>
                                        <div className="w-[2px]"/>
                                        <div className="w-20 h-full border-2 border-slate-200 rounded-e-lg">
                                            <FormChangeCostType/>
                                        </div>
                                    </div>

                                    {/* Count */}
                                    <div className="font-semibold">count:</div>
                                    <div className="w-full h-10 border-2 border-slate-200 rounded-lg">
                                        <FormChangeCount/>
                                    </div>


                                    {/* Description */}
                                    <div className="pt-2 font-semibold">description:</div>
                                    <div className="w-full h-[120px] border-2 border-slate-200 rounded-lg">
                                        <FormChangeDsc/>
                                    </div>
                                </div>

                                {/* state */}
                                <div className="
                                w-full h-fit pt-10
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
                            w-full h-24 pb-5 pt-10
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
                                    Cancel
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
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
            {/*  */}

        </div>
    </div>
</>}

export default Modal