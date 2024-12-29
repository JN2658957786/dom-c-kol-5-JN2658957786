import React, { useEffect, useState } from "react";
import { useStore } from 'react-redux'
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";
import Icon from "@mdi/react";


const Button = ({name, rounded, icon, size}) => {

    const store = useStore()
    
    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    const [isActive, setIsActive] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)


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

        const themeMode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[themeMode])
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

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })

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


    const mainClassActive = `
        w-full h-full
        flex justify-center items-center
        ${(currentTheme) ? currentTheme.buttonActivePrimary : ""}
        ring-2 ring-offset-2 ${(currentTheme) ? currentTheme.buttonActiveRing : ""}
        ${rounded}
    `
    const mainClassInactive = `
        w-full h-full
        flex justify-center items-center
        ${(currentTheme) ? currentTheme.buttonHover : ""}
        ${rounded}
    `
    const disabledClass = `
        w-full h-full
        flex justify-center items-center
        ${(currentTheme) ? currentTheme.buttonDisabled : ""}
        cursor-default
        ${rounded}
    `


    return<>
    {currentTheme && <button
    onClick={() => {
        buttonHandler()
    }}
    className="
    w-full h-full
    flex justify-center items-center
    ">

        {isActive == true && isDisabled == false &&
        <div className={mainClassActive}>
            <div className="relative">
                <div className={`absolute ${currentTheme.buttonActiveSecondary} blur-md`}>
                    <div className=" invisible">
                        <Icon path={icon} size={size}/>
                    </div>
                </div>
                <div className="relative">
                    <Icon path={icon} size={size} color={currentTheme.iconHEX}/>
                </div>
            </div>
        </div>}

        {isActive == false && isDisabled == false &&
        <div className={mainClassInactive}>
            <Icon path={icon} size={size} color={currentTheme.textHEX}/>
        </div>}

        {isDisabled == true &&
        <div className={disabledClass}>
            <Icon path={icon} size={size} color={currentTheme.textHEX}/>
        </div>}

    </button>}
</>}

export default Button