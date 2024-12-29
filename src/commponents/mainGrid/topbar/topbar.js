import React, { useEffect, useState } from "react";
import {
    mdiFormatListBulletedSquare,
    mdiGridLarge,
    mdiFilterCogOutline
} from '@mdi/js';

import TopbarButton from "./topbarButton"
import SaveButton from "./saveButton";
import { useStore } from "react-redux";

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
    {currentTheme && <div className="
    w-full h-full
    flex items-center
    ">
        <div className={`
        grow h-full
        border-2 border-r-0 ${currentTheme.border}
        rounded-l-xl
        `}/>

        <div className={`
        w-[calc(100%_-_198px)] h-full
        border-2 border-l-0 ${currentTheme.border}
        rounded-r-xl
        flex items-center justify-end
        `}>
            <SaveButton/>
            <div className="grow"/>
            {/* <Searchbar/> */}
            <div className="w-1"/>
        </div>

        <div className="pr-2"/>

        <div className="
        max-w-full w-fit h-8
        grid grid-cols-3
        border-2 border-slate-200 divide-x-2 divide-slate-200
        rounded-xl
        ">

            <TopbarButton name={"list"} icon={mdiFormatListBulletedSquare} size={1} rounded={"rounded-s-xl"}/>
            <TopbarButton name={"grid"} icon={mdiGridLarge} size={1}/>
            <TopbarButton name={"settings"} icon={mdiFilterCogOutline} size={1} rounded={"rounded-e-xl"}/>
                        
        </div>

        <div className="pr-1"/>
    </div>}
</>}
