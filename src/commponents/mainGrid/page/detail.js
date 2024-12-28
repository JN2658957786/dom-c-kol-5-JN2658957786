import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { 
    mdiClose,
    mdiPencil
 } from '@mdi/js';
import { changeIsActive } from "../../../store/entities/reducer_modal";
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";
import { useStore } from 'react-redux'

const Detail = () => {

    const store = useStore()

    const [listName, setListName] = useState("")
    const [userID, setUserID] = useState("")
    const [userType, setUseType] = useState("none")
    
    const [slateClass, setSlateClass] = useState(`
        px-8 py-4
        w-[calc(4*40px)] h-10
        border-4 border-slate-400 saturate-150 rounded-xl
        flex items-center justify-center
        cursor-default
        relative
    `)
    const [redClass, setRedClass] = useState(`
        px-8 py-4
        w-[calc(4*40px)] h-10
        border-4 border-red-600 saturate-150 rounded-xl
        hover:border-[5px]
        flex items-center justify-center
        relative
    `)
    const [leaveClass, setLeaveClass] = useState(redClass)
    const [deleteClass, setDeleteClass] = useState(slateClass)
    const [isVisible, setIsVisible] = useState(true)
    


    useEffect(() => {
        const userIndex = store.getState().entities.userReducer.id
        let arr = [...store.getState().entities.shoppingListReducer.members]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == userIndex){
                index = i
            }
        }

        if(index != -1){
            setIsVisible(true)
            setListName(store.getState().entities.shoppingListReducer.settings.name)
            const tempID = store.getState().entities.userReducer.id
            if(tempID != userID){
                setUserID(store.getState().entities.userReducer.id)
                setUseType(store.getState().entities.userReducer.type)
            }
            if(userType == "owner"){
                setLeaveClass(slateClass)
                setDeleteClass(redClass)
            } else {
                setLeaveClass(redClass)
                setDeleteClass(slateClass)
            }
        } else {
            setIsVisible(false)
        }
    })
    
if(store.getState().entities.tabsReducer.openTab == 'Detail'){
    store.subscribe(() =>{
        const userIndex = store.getState().entities.userReducer.id
        let arr = [...store.getState().entities.shoppingListReducer.members]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == userIndex){
                index = i
            }
        }

        if(index != -1){
            setIsVisible(true)
            setListName(store.getState().entities.shoppingListReducer.settings.name)
            const tempID = store.getState().entities.userReducer.id
            if(tempID != userID){
                setUserID(store.getState().entities.userReducer.id)
                setUseType(store.getState().entities.userReducer.type)
            }
            if(userType == "owner"){
                setLeaveClass(slateClass)
                setDeleteClass(redClass)
            } else {
                setLeaveClass(redClass)
                setDeleteClass(slateClass)
            }
        } else {
            setIsVisible(false)
        }
    })
}

    ///Button handlers
    function renameHandler() {
        const updateMode = store.getState().entities.shoppingListReducer.updateItem.updateMode
        if(updateMode == "rename") store.dispatch(changeIsActive({isActive: true}))
        
        if( updateMode == "rename" ) {}
    
    }
    function leaveListHandler() {
        const updateMode = store.getState().entities.shoppingListReducer.updateItem.updateMode
        if(updateMode == "none" && userType == "member") {
            store.dispatch(changeUpdateMode({mode: "leaveList"}))
            store.dispatch(changeIsActive({isActive: true}))
        }
    }
    function deleteListHandler() {
        if(userType == "owner") {
            store.dispatch(changeUpdateMode({mode: "delete"}))
            store.dispatch(changeIsActive({isActive: true}))
        }
    }


return<>
{userType != "none" && isVisible == true && <div className="
w-full h-full
flex flex-col
">
    <div className="px-8 pt-4 w-full h-fit">
        <button 
        onClick={() => renameHandler()}
        className="
        w-full h-20
        border-4 border-sky-400 saturate-200 rounded-xl
        hover:border-[6px]
        relative
        ">
            {userType == "owner" && <div className="absolute -top-[14px] right-[14px] bg-slate-50">
                <Icon path={mdiPencil} size={1} color={"#38bdf8 "}/>
            </div>}

            <div className="font-bold text-xl">
                {listName}
            </div>
        </button>
    </div>

    <button 
        className="h-8 cursor-default"
        onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
    />

    <div className="px-8 w-full h-fit flex">
        <button
        onClick={() => leaveListHandler()}
        className={leaveClass}>
            {userType != "owner" && <div className="absolute -top-[12px] left-2 bg-slate-50">
                <Icon path={mdiClose} size={0.85} color={"#dc2626"}/>
            </div>}
            {userType == "owner" &&<div className="font-semibold text-nowrap text-slate-500 cursor-default">
                Leave this list
            </div>}
            {userType != "owner" &&<div className="font-semibold text-nowrap">
                Leave this list
            </div>}
        </button>
        <button 
            className="grow h-full cursor-default"
            onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
        />
    </div>

    <button 
        className="h-8 cursor-default"
        onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
    />

    <div className="px-8 w-full h-fit flex">
        <button
        onClick={() => deleteListHandler()}
        className={deleteClass}>
            {userType == "owner" && <div className="absolute -top-[12px] left-2 bg-slate-50">
                <Icon path={mdiClose} size={0.85} color={"#dc2626"}/>
            </div>}
            {userType != "owner" &&<div className="font-semibold text-nowrap text-slate-500 cursor-default">
                Delete this list
            </div>}
            {userType == "owner" &&<div className="font-semibold text-nowrap">
                Delete this list
            </div>}
        </button>
        <button 
            className="grow h-full cursor-default"
            onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
        />
    </div>

    <button
    onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
    className="
    w-full grow cursor-default
    "/>
</div>}

</>}

export default Detail