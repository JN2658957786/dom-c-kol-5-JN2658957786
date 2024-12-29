import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiAccount,
    mdiAccountTie 
} from '@mdi/js';
import { useStore } from 'react-redux'

export default function(){

    const store = useStore()

    const [userID, setUserID] = useState("")
    const [userType, setUseType] = useState("none")

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    useEffect(() => {
        const tempID = store.getState().entities.userReducer.id
        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
            setUseType(store.getState().entities.userReducer.type)
        }

        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    })

    store.subscribe(() => {
        const tempID = store.getState().entities.userReducer.id
        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
            setUseType(store.getState().entities.userReducer.type)
        }

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })
    
return <>
<div className="w-full h-full relative flex justify-center items-center">
    {currentTheme && <div className={`
    relative
    w-full h-full
    flex justify-center items-center
    border-2 ${currentTheme.border} ${(themeR.currentMode == "darkMode") ? " bg-slate-100" : ""}
    rounded-2xl
    `}>
        {userType == "owner" && <div className="saturate-150">
            <Icon path={mdiAccountTie} size={1.5} color="#dc2626c0"/>
        </div>}
        {userType == "member" && <div className="saturate-150">
            <Icon path={mdiAccount} size={1.5} color="#38bdf8"/>
        </div>}
        {userType == "none" && <div className="saturate-100">
            <Icon path={mdiAccount} size={1.5} color="#e2e8f0"/>
        </div>}
    </div>}
    
</div>
    
</>}
