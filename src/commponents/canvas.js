import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";

export default function ({ children }) {

    const store = useStore()

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    },[])

    store.subscribe(() => {
        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })

    console.log({currentTheme})
    return <>
        {currentTheme && <div className={`
        w-screen
        h-screen
        ${currentTheme.background}
        `}>
            {children}
        </div>}
    </>
}