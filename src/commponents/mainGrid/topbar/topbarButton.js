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

    const mainClass = `
        w-14 h-full
        flex justify-center items-center
        bg-sky-400 saturate-200
        ring-2 ring-offset-2 ring-sky-400
        ${rounded}
    `
    const [gridMode, setGridMode] = useState("")


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

    useEffect(() => {
        const mode = store.getState().entities.shoppingListReducer.settings.display.mode 
        setGridMode(mode)
    })
    store.subscribe(() => {
        setGridMode(store.getState().entities.shoppingListReducer.settings.display.mode)
    })

return<>
    <button
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
                <div className="absolute bg-cyan-200 saturate-150 blur-md">
                    <div className=" invisible"><Icon path={icon} size={1.1}/></div>
                </div>
                <div className="relative">
                    <Icon path={icon} size={size}/>
                </div>
            </div>
        </div>}

        {gridMode !== `${name}` &&
        <div className="w-14 h-full flex justify-center items-center hover:bg-slate-100">
            <Icon path={icon} size={size}/>
        </div>}
    </button>
</>} 

export default Button