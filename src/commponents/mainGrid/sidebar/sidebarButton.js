import React, { useEffect, useState } from "react";
import { useStore } from 'react-redux'
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";

import SvgAdd from "./svgAdd"


const Button = ({children, name, rounded}) => {

    const store = useStore()
    
    const mainClassActive = `
        w-full h-full
        flex justify-center items-center
        bg-sky-400 saturate-200
        ring-2 ring-offset-2 ring-sky-400
        ${rounded}
    `
    const mainClassInactive = `
        w-full h-full
        flex justify-center items-center
        hover:bg-slate-100
        ${rounded}
    `
    const disabledClass = `
        w-full h-full
        flex justify-center items-center
        bg-slate-200
        cursor-default
    `

    const [isActive, setIsActive] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    
    const buttonHandler = () => {
        const userId = store.getState().entities.userReducer.id
        const usersArr = store.getState().entities.shoppingListReducer.members
        let isUser = false

        for (let i = 0; i < usersArr.length; i++) {
            if(usersArr[i].id == userId){
                isUser = true
            }
        }

        if(!isDisabled && isUser){
            const mode = store.getState().entities.shoppingListReducer.updateItem.updateMode
            if(mode != name) store.dispatch(changeUpdateMode({mode: name}))
            if(mode == name) store.dispatch(changeUpdateMode({mode: "none"}))
        }
    }

    useEffect(() => {
        const mode = store.getState().entities.shoppingListReducer.updateItem.updateMode
        const openTab = store.getState().entities.tabsReducer.openTab
        const currentType = store.getState().entities.userReducer.type
    
        if(mode == name && isActive == false) setIsActive(true)
        if(mode != name && isActive == true) setIsActive(false)
        
        if(currentType == "owner" ) {
            setIsDisabled(false)
            if(openTab == "Members" && name == "modify" ) setIsDisabled(true)
            if(openTab == "Detail" && name != "rename" ) setIsDisabled(true)
        }

        if(currentType != "owner" ) {
            setIsDisabled(true)
        }        
    })

    store.subscribe(() => {
        const mode = store.getState().entities.shoppingListReducer.updateItem.updateMode
        const openTab = store.getState().entities.tabsReducer.openTab
        const currentType = store.getState().entities.userReducer.type

        if(mode == name && isActive == false) setIsActive(true)
        if(mode != name && isActive == true) setIsActive(false)

        if(currentType == "owner" ) {
            setIsDisabled(false)
            if(openTab == "Members" && name == "modify" ) setIsDisabled(true)
            if(openTab == "Detail" && name != "rename" ) setIsDisabled(true)
        }

        if(currentType != "owner" ) {
            setIsDisabled(true)
        }  
    })

    const svg = () => {
        switch(name){
            case "addUp": {return<div>
                <SvgAdd/>
            </div>} 
            case "addDown": {return<div className="-scale-y-100">
                <SvgAdd/>
            </div>} 
        }
    }

    return<>
    <button
    onClick={() => {
        // console.log(`clicked on ${name}`)
        buttonHandler()
    }}
    className="
    w-full h-full
    flex justify-center items-center
    ">

        {isActive == true && isDisabled == false &&
        <div className={mainClassActive}>
            <div className="relative">
                <div className="absolute bg-cyan-200 saturate-150 blur-md">
                    <div className=" invisible">
                        {children}
                    </div>
                </div>
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>}

        {isActive == false && isDisabled == false &&
        <div className={mainClassInactive}>
            {children}
        </div>}

        <div className="absolute z-10">
            {svg()}
        </div>

        {isDisabled == true &&
        <div className={disabledClass}>
            {children}
        </div>}

        <div className="absolute z-10">
            {svg()}
        </div>
        
        

    </button>
</>}

export default Button