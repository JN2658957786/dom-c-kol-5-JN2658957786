import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { 
    mdiAccount,
    mdiAccountTie 
 } from '@mdi/js';
 import { useStore } from 'react-redux'
import { changeIsActive, changeMembersModal } from "../../../store/entities/reducer_modal";
import { changeSelectedItem, changeUpdateMode } from "../../../store/entities/reducer_shoppingList";


const Members = () => {
    
    const store = useStore()
    
    const [userType, setUserType] = useState("none")
    const [list, setList] = useState([])
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
            setList(store.getState().entities.shoppingListReducer.members)
            setUserType(store.getState().entities.userReducer.type)
        } else {
            setIsVisible(false)
        }
    })

if(store.getState().entities.tabsReducer.openTab == 'Members'){
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
            setList(store.getState().entities.shoppingListReducer.members)
            setUserType(store.getState().entities.userReducer.type)
        } else {
            setIsVisible(false)
        }
    })
}

    ///Button handlers
    const buttonHandler = (e) => {
        // console.log("!!!", {clickedOn: e})
        const currentType = store.getState().entities.userReducer.type

        const itemId = store.getState().entities.shoppingListReducer.updateItem.selectedItem
        if(itemId !== e.id) store.dispatch(changeSelectedItem({item: e.id}))

        const updateMode = store.getState().entities.shoppingListReducer.updateItem.updateMode
        
        if(currentType == "owner"){

            function SetAddModal(){
                const length = 16
                let randomNum = Math.round(Math.random() * 9)
                for (let i = 0; i < length - 1; i++) {
                    randomNum = randomNum * 10 + Math.round(Math.random() * 9)
                }
                store.dispatch(changeMembersModal({id:`${randomNum}`, name: "New member", type: e.type}))
                store.dispatch(changeIsActive({isActive: true}))
            }

            if(updateMode == "addDown") SetAddModal()
            if(updateMode == "addUp" && e.type != "owner") SetAddModal()
            if(updateMode == "delete" && e.type != "owner") {
                store.dispatch(changeMembersModal(e))
                store.dispatch(changeIsActive({isActive: true}))
            }
            if(updateMode == "rename") {
                store.dispatch(changeMembersModal(e))
                store.dispatch(changeIsActive({isActive: true}))
            }
        } 
    }

    // console.log("!!!", {list})
    
    const membersList = list.map((e) => 
    <div className="
    w-full h-12
    border-2 border-sky-400 rounded-lg
    flex
    ">
        <button 
        onClick={() => buttonHandler(e)}
        className="
        w-full h-full pl-6
        flex items-center
        font-semibold 
        ">
            {e && e.name}
        </button>

        <div className="grow"/>

        <div className="
        w-fit h-full
        flex items-center
        ">
            {e && <div className="
            pr-1
            font-semibold  
            ">
                {e.type == "owner" && <div className="underline decoration-2 decoration-red-600/50">
                    owner
                </div>}
                {e.type != "owner" && <div className="underline decoration-2 decoration-sky-400/75">
                    member
                </div>}
            </div>}


            {e.type == "owner" && <div className="
            h-10 w-12
            border-2 border-sky-400 rounded-lg
            flex justify-center items-center
            ">
                <div className="saturate-150">
                    <Icon path={mdiAccountTie} size={1.35} color={"#dc2626c0"}/>
                </div>
            </div>}

            {e.type != "owner" && <div className="
            h-10 w-12
            border-2 border-sky-400 rounded-lg
            flex justify-center items-center
            ">
                <Icon path={mdiAccount} size={1.35} color={"#38bdf8"}/>
            </div>}

            <div className="w-[2px]"/>
        </div>
    </div>)


return<>
<div className="
w-full h-fit pl-[6px]
flex flex-col
">
    {isVisible == true && <div className="
    w-[calc(100%_-_17px)] h-fit
    grid grid-cols-1 gap-2
    ">
        {userType != "none" && membersList}
    </div>}
    <div
    onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
    className="
    w-full h-[100vh]
    "/>
</div>

</>}

export default Members