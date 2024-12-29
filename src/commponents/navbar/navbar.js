import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiMenu, mdiAccount, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import store from "../../store/configureStore.js";
import { changeUpdateMode, list_list } from "../../store/entities/reducer_shoppingList.js";
import { changeIsActive } from "../../store/entities/reducer_modal.js";

import ListNameDisplay from "./listNameDisplay";
import { changeThemeCurrentMode } from "../../store/entities/reducer_theme.js";
import { changeCurrentL } from "../../store/entities/reducer_languages.js";

export default function ({children}) {

    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("Account")

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)


    useEffect(() => {
        const tempID = store.getState().entities.userReducer.id

        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
        }

        const mode = store.getState().entities.themeReducer.currentMode
        if(typeof mode == "string") setCurrentTheme(themeR[mode])

    })

    store.subscribe(() => {
        const tempID = store.getState().entities.userReducer.id
        if(tempID != userID){
            setUserID(store.getState().entities.userReducer.id)
            setUsername(store.getState().entities.userReducer.name)
        }

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            if(typeof mode == "string") setCurrentTheme(themeR[reducer.currentMode])
        }

    
        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
        
    })


    const AccountHandler = () => {
        store.dispatch(changeUpdateMode({mode: "acc"}))
        store.dispatch(changeIsActive({isActive: true}))
    }
    const MenuHandler = () => {
        const menu = store.getState().entities.menuReducer
        store.dispatch(list_list(menu.page, menu.limit))
        store.dispatch(changeUpdateMode({mode: "menu"}))
        store.dispatch(changeIsActive({isActive: true}))
    }


return (currentTheme && <>
<div className="flex flex-col h-full">
    <div className={`
    h-16 w-full
    ${currentTheme.backgroundTW}
    border-2 rounded-b-xl ${currentTheme.border}
    content-center
    `}>
        <div className="flex">

            {/* Menu button */}
            <div className="pl-2 flex z-10 rounded-md items-center">
                <div>
                    <button
                    onClick={() => {
                        // console.log("clicked menu")
                        MenuHandler()
                    }}
                    className="
                    rounded-md
                    border-[4px] border-slate-300
                    hover:ring-2 hover:ring-offset-2 hover:ring-slate-300
                    active:ring-[3px] active:ring-offset-2 active:ring-sky-400
                    shadow-inner
                    ">
                        <div className="w-8 h-8 flex justify-center items-center">
                            <Icon path={mdiMenu} size={1.25} color={currentTheme.iconHEX}/>
                        </div>
                    </button>
                </div>
                <div className="flex justify-center items-center font-bold px-2" style={{color: currentTheme.textHEX}}>
                    Menu
                </div>
            </div>


            {/* light dark mode */}
            <div style={{width: "2px"}}/>
            <button
            className={`
                w-[41px] h-[41px]
                ${currentTheme.buttonHover} rounded-lg
                flex justify-center items-center
            `}
            onClick={() => {
                const mode = (themeR.currentMode == "whiteMode") ? "darkMode" : "whiteMode"
                store.dispatch(changeThemeCurrentMode({mode}))
            }}>
                {themeR.currentMode == "darkMode" && <Icon path={mdiWeatherNight} size={1.25} color={currentTheme.modeButton}/>}
                {themeR.currentMode == "whiteMode" && <Icon path={mdiWeatherSunny} size={1.25} color={currentTheme.modeButton}/>}
            </button>


            {/* change language */}
            <button
            className={`
                w-[41px] h-[41px] pr-[2px]
                font-semibold text-lg
                ${currentTheme.buttonHover} rounded-lg
            `}  
            style={{color: currentTheme.textHEX}}
            onClick={() => {
                const tempCurrentL = store.getState().entities.languagesReducer.currentL
                let newL = ""
                if(tempCurrentL == "cz") {newL = "en"} else {newL = "cz"}
                store.dispatch(changeCurrentL(newL))
            }}
            >
                {language}
            </button>

            
            {/* Shopping list name */}
            <div className="grow grid grid-cols-1 ">
                <ListNameDisplay/>
            </div>
                
            
            {/* Account button */}
            <div className="pr-2 flex z-10 rounded-md items-center">
                <div className="flex justify-center items-center font-bold px-2" style={{color: currentTheme.textHEX}}>
                    {(username != "" && username != "Account") ? username : (
                        (language != "en") ? languageR[language].Account : "Account"
                    )}
                </div>
                <div className="flex justify-center">
                    <button 
                    onClick={() => {
                        // console.log("clicked account")
                        AccountHandler()
                    }}
                    className="
                    rounded-md
                    border-[4px] border-slate-300
                    hover:ring-2 hover:ring-offset-2 hover:ring-slate-300
                    active:ring-[3px] active:ring-offset-2 active:ring-sky-400 
                    shadow-inner
                    ">
                        <div className="w-8 h-8 flex justify-center items-center">
                            <Icon path={mdiAccount} size={1.25} color={currentTheme.iconHEX}/>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    </div>
    {children}
</div>
</>)
}

