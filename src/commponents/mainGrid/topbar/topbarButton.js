import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiFormatListBulletedSquare,
    mdiViewGridOutline,
    mdiDotsHorizontal
} from '@mdi/js';

import { useStore } from 'react-redux'
import { changeDisplayCols, changeDisplayMode, changeUpdateMode } from "../../../store/entities/reducer_shoppingList";
import { changeIsActive } from "../../../store/entities/reducer_modal";

const Button = ({name, icon, size, rounded}) => {

    const store = useStore()
    const [gridMode, setGridMode] = useState("")

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)


    useEffect(() => {
        const mode = store.getState().entities.shoppingListReducer.settings.display.mode 
        setGridMode(mode)

        const themeMode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[themeMode])
    })

    store.subscribe(() => {
        setGridMode(store.getState().entities.shoppingListReducer.settings.display.mode)

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })


    const mainClass = `
        w-14 h-7
        flex justify-center items-center
        ${(currentTheme) ? currentTheme.buttonActivePrimary : ""}
        ring-2 ring-offset-2 ${(currentTheme) ? currentTheme.buttonActiveRing : ""}
        ${rounded}
    `

    function changeSettings() {
        switch(name){
            case "list": {
                    if(gridMode != "list"){
                    store.dispatch(changeDisplayMode({mode: `${name}`}))
                    store.dispatch(changeDisplayCols({cols: 1}) )
                    }};
                break;
            case "grid": {
                    if(gridMode != "grid"){
                    store.dispatch(changeDisplayMode({mode: `${name}`}))
                    store.dispatch(changeDisplayCols({cols: 2}) )
                    }};
                break;
            case "settings": {
                    if(gridMode != "settings"){
                    if(store.getState().entities.tabsReducer.openTab == 'Shopping list'){
                        store.dispatch(changeUpdateMode({mode: "filter"}))
                        store.dispatch(changeIsActive({isActive: true}))
                    }
                    }};
                break;
            default: {};
        }
    }


return<>
    {currentTheme && <button
    onClick={() => {
        // console.log(`clicked ${name} mode`); 
        changeSettings()
    }}
    className="
    w-full h-full
    ">
        {gridMode === `${name}` &&
        <div className={mainClass}>
            <div className="realtive">
                <div className={`absolute ${currentTheme.buttonActiveSecondary}`}>
                    <div className=" invisible"><Icon path={icon} size={1.1}/></div>
                </div>
                <div className="relative">
                    <Icon path={icon} size={size} color={currentTheme.iconHEX}/>
                </div>
            </div>
        </div>}

        {gridMode !== `${name}` &&
        <div className={`w-14 h-full flex justify-center items-center ${currentTheme.buttonHover} ${rounded}`}>
            <Icon path={icon} size={size} color={currentTheme.textHEX}/>
        </div>}
    </button>}
</>} 

export default Button