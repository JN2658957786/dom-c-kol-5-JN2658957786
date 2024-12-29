import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiPencil,
    mdiCog,
    mdiDelete,
    mdiTableRowPlusBefore,
    mdiTableRowPlusAfter
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";

import SidebarButton from "./sidebarButton"


export default function(){
    
    const store = useStore()

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)


    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    })

    store.subscribe(() => {
        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })
    

    return <>
    {currentTheme && <div className={`
    w-full h-full
    border-2 ${currentTheme.border} rounded-xl
    flex flex-col items-center
    `}>
        <div className="h-1"/>
        <div className={`
        w-[calc(100%_-_10px)] h-[calc(5_*_50px)]
        border-2 border-slate-200 rounded-xl
        grid grid-rows-5 divide-y-2 ${currentTheme.buttonDivide}
        `}>
            <SidebarButton name={"addUp"} rounded={"rounded-t-xl"} icon={mdiTableRowPlusBefore} size={0.85}/>
            <SidebarButton name={"addDown"} icon={mdiTableRowPlusAfter} size={0.85}/>
            <SidebarButton name={"rename"} icon={mdiPencil} size={0.8}/>
            <SidebarButton name={"modify"} icon={mdiCog} size={0.75}/>
            <SidebarButton name={"delete"} rounded={"rounded-b-xl"} icon={mdiDelete} size={0.8}/>

        </div>
        <button
        onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
        className="
        w-full grow
        cursor-auto
        "/>
    </div>}
</>}