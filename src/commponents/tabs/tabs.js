import React, { useEffect, useState } from "react";
import {
    mdiFormatListBulletedSquare,
    mdiAccountOutline,
    mdiCog 
} from '@mdi/js';

import Tab from "./tab";
import { useStore } from "react-redux";

export default function ({children}) {

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

return (<>
{currentTheme && <div className="
w-full h-[38px]
">
    <div className="
    w-full h-full
    flex flex-col items-center
    ">
        <div className={`w-[calc(100%_-_8px)] h-2 ${currentTheme.listNameSVGbg}`}/>
        <div className="
        w-full h-full
        flex
        ">
            <div className="w-1"/>
            <Tab name={"Shopping list"} displayName={"Shopping list"}
            icon={mdiFormatListBulletedSquare} iconSize={1}
            rounded="rounded-es-lg"/>
            <div className={`w-[2px] h-[28px] ${currentTheme.listNameSVGbg}`}/>
            <Tab name={"Members"} displayName={"Members"}
            icon={mdiAccountOutline} iconSize={1}
            rounded="rounded-ee-lg"/>

            <div className="
            grow
            p-[6px]
            h-full
            flex justify-center items-center
            ">
                <div className="
                w-0 sm:w-fit h-full
                flex justify-center items-center
                ">
                    <div className={`h-full w-2  ${(themeR == "whiteMode") ? "bg-slate-200/50" : currentTheme.listNameSVGbg} rounded-md  skew-x-12`}/>
                    <div className="w-1"/>
                    <div className={`h-full w-2  ${(themeR == "whiteMode") ? "bg-slate-200/50" : currentTheme.listNameSVGbg} rounded-md  skew-x-12`}/>
                    <div className="w-1"/>
                    <div className={`h-full w-2  ${(themeR == "whiteMode") ? "bg-slate-200/50" : currentTheme.listNameSVGbg} rounded-md  skew-x-12`}/>
                </div>
            </div>

            <Tab name={"Detail"} displayName={"Settings"}
            icon={mdiCog} iconSize={0.8}/>
            <div className="w-1"/>
        </div>
    </div>
</div>}
{children}
</>)
}