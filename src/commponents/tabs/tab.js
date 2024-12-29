import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";

import store from "../../store/configureStore";
import { changeTab } from "../../store/entities/reducer_tabs"; 
import { changeUpdateMode } from "../../store/entities/reducer_shoppingList";

export default function({name = "none", displayName = "none", icon, iconSize, rounded = "rounded-b-lg" }){

    // console.log(store.getState().entities.tabsReducer.openTab)

    const [baseButtonClass, setButtonClass] = useState("")

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    const [languageR, setLanguageR] = useState(store.getState().entities.languagesReducer)
    const [language, setLanguage] = useState(store.getState().entities.languagesReducer.currentL)

    
    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
        
        let concat = ""
        if(name === store.getState().entities.tabsReducer.openTab){
            concat = activeTab.concat(" ", `
                ring-2 ring-offset-2 ${themeR[mode].buttonActiveRing}
            `)
            setButtonClass(concat)

        } else {
            concat = disabledTab.concat(" ", `
                hover:ring-1 hover:ring-offset-2 hover:ring-slate-200
            `)
            setButtonClass(concat)
        }

    })

    const activeTab = `
        w-fit h-7
        ${(currentTheme) ? currentTheme.buttonActivePrimary : ""}
        ${rounded}
        p-2 pr-3 
        flex justify-center items-center `
    const disabledTab = `
        w-fit h-7
        ${(currentTheme) ? currentTheme.buttonDisabled : ""}
        ${rounded}
        p-2 pr-3
        flex justify-center items-center `


    function selectButtonType(){
        let concat = ""

        if(name === store.getState().entities.tabsReducer.openTab){
            concat = activeTab.concat(" ", `
                focus:ring-2 focus:ring-offset-2 focus:ring-sky-400
            `)
            setButtonClass(concat)
           
        } else {
            concat = disabledTab.concat(" ", `
                hover:ring-1 hover:ring-offset-2 hover:ring-slate-200
            `)
            setButtonClass(concat)
        }
    }

    store.subscribe(() => {
        selectButtonType()

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            if(typeof mode == "string") setCurrentTheme(themeR[reducer.currentMode])
            if(typeof mode == "number") setCurrentTheme(themeR["customMode"][reducer.currentMode])
        }

        const newL = store.getState().entities.languagesReducer.currentL
        if(language != newL) setLanguage(newL)
    })

    const buttonHandler = () => {
        const tabName = store.getState().entities.tabsReducer.openTab
        if(tabName !== name) {
            store.dispatch(changeUpdateMode({mode: "none"}))
            store.dispatch(changeTab({openTab: name}))
        }
    }

return (<>
{currentTheme && <div className="
    w-fit h-full
    flex justify-center items-center
    pb-1 pt-0
    ">

    <button 
    onClick={() => {
        // console.log(`clicked on ${store.getState().entities.tabsReducer.openTab} tab`); 
        buttonHandler()
    }}
    className={baseButtonClass}>
        {name === store.getState().entities.tabsReducer.openTab &&
        <div className="relative">
            <div className={`
            absolute
            w-full h-full
            flex justify-center items-center
            ${currentTheme.buttonActiveSecondary}
            `}>
                <div className="w-fit h-fit invisible">
                    <div className="pr-1">
                        <Icon path={icon} size={iconSize}/>
                    </div>
                    <div className="
                    pb-[1px]
                    font-semibold text-nowrap text-sm
                    ">
                        {(language == "en") ? displayName : (
                            (displayName == "Shopping list") ? languageR[language].ShoppingList : (
                            (displayName == "Members") ? languageR[language].Members : (
                            (displayName == "Settings") ? languageR[language].Settings : ""))
                        )}
                    </div>
                </div>
            </div>
            <div className="
            relative
            w-full h-full
            flex justify-center items-center
            ">
                <div className="pr-1">
                    <Icon path={icon} size={iconSize} color={currentTheme.iconHEX}/>
                </div>
                <div className="
                pb-[1px]
                font-semibold text-nowrap text-sm"
                style={{color: currentTheme.iconHEX}}
                >
                    {(language == "en") ? displayName : (
                        (displayName == "Shopping list") ? languageR[language].ShoppingList : (
                        (displayName == "Members") ? languageR[language].Members : (
                        (displayName == "Settings") ? languageR[language].Settings : ""))
                    )}
                </div>
            </div>
        </div>}

        {name !== store.getState().entities.tabsReducer.openTab &&
        <div className="
        w-full h-full
        flex justify-center items-center
        ">
            <div className="pr-1">
                <Icon path={icon} size={iconSize} color={currentTheme.iconHEX}/>
            </div>
            <div className="
            pb-[1px]
            font-semibold text-nowrap text-sm"
            style={{color: currentTheme.textHEX}}
            >
               {(language == "en") ? displayName : (
                    (displayName == "Shopping list") ? languageR[language].ShoppingList : (
                    (displayName == "Members") ? languageR[language].Members : (
                    (displayName == "Settings") ? languageR[language].Settings : ""))
                )}
            </div>
        </div>}

    </button>                
</div>}
</>)
}