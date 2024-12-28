import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiCheck,
    mdiClose,
    mdiAccount,
    mdiAccountTie
} from '@mdi/js';
import { useStore } from 'react-redux'

import { changeIsActive, changeModalDefault, changeModalName } from "../../../store/entities/reducer_modal";
import { changeIsSaved, changeItem, changeMember } from "../../../store/entities/reducer_shoppingList";

import {
    SpaceQuitButton,
    QuitButton,
    FormChangeName,
    StatePreview,
    FormChangeMemberName
} from "../modalComponents";


const Modal = () => {

    const store = useStore()

    const [selectedItem, setSelectedItem] = useState({})
    const [newItemName, setNewItemName] = useState("")


    if(store.getState().entities.shoppingListReducer.updateItem.updateMode == "rename"){
        store.subscribe(() => {

            const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
            let arr = [...store.getState().entities.shoppingListReducer.members]

            let index = -1
            for (let i = 0; i < arr.length; i++) {
                if(arr[i]){
                    if(arr[i].id == itemIndex){
                        index = i
                    }
                }
            }
            setSelectedItem(store.getState().entities.shoppingListReducer.members[index])

            setNewItemName(store.getState().entities.modalReducer.membersModal.name)
        })
    }

    
    const HandleSubmit = () => {
        const itemIndex = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        let arr = [...store.getState().entities.shoppingListReducer.members]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemIndex){
                index = i
            }
        }

        let initObj = Object.assign({}, {...store.getState().entities.modalReducer.membersModal})
        let obj = {...initObj}

        store.dispatch(changeMember({member: obj, index: index}))

        store.dispatch(changeModalDefault())
        store.dispatch(changeIsSaved({isSaved: false}))
        store.dispatch(changeIsActive({isActive: false}))
    }


    function itemPreview(isNew){
        
        let checkName = ""
        let name = ""
        let userType =""

        if(selectedItem){
            if(isNew){
                checkName = newItemName
                name = newItemName
                userType = selectedItem.type
            } else {
                checkName = selectedItem
                name = selectedItem.name
                userType = selectedItem.type
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
            <div className="h-fit w-fit pr-1">
                {userType == "owner" && <div className="saturate-150">
                    <div className="flex items-center font-semibold">
                        Owner
                        <Icon path={mdiAccountTie} size={1.5} color="#dc2626c0"/>
                    </div>
                </div>}
                {userType == "member" && <div className="saturate-150">
                    <div className="flex items-center font-semibold">
                        Member
                        <Icon path={mdiAccount} size={1.5} color="#38bdf8"/>
                    </div>
                </div>}
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
            {/*  */}
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
                    Rename item
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
                        {/* naw name */}
                        {itemPreview(true)}

                        <div className="h-3"/>

                        {/* old name */}
                        {itemPreview(false)}
                            
                    </div>

                    {/* form */}
                    <div className="
                    w-full h-full
                    ">
                        {/* name field */}
                        <div className="
                        w-full h-fit pt-6
                        ">
                            <div className="font-semibold">new name:</div>
                            <div className="w-full h-10 border-2 border-slate-200 rounded-lg">
                                <FormChangeMemberName/>
                            </div>
                        </div>
                    </div>

                    {/* confirm, cancel  */}
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
            </div>
            {/*  */}
        </div>
    </div>
</>}

export default Modal