import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";

import store from "../../store/configureStore";
import { changeTab } from "../../store/entities/reducer_tabs"; 
import { changeUpdateMode } from "../../store/entities/reducer_shoppingList";

export default function({name = "none", displayName = "none", icon, iconSize, rounded = "rounded-b-lg" }){

    // console.log(store.getState().entities.tabsReducer.openTab)

    const [baseButtonClass, setButtonClass] = useState("")

    const activeTab = `
        w-fit h-7
        bg-sky-400 saturate-200
        ${rounded}
        p-2 pr-3 
        flex justify-center items-center `
    const disabledTab = `
        w-fit h-7
        bg-slate-200
        ${rounded}
        p-2 pr-3
        flex justify-center items-center `

    useEffect(() => {
        let concat = ""

        if(name === store.getState().entities.tabsReducer.openTab){
            concat = activeTab.concat(" ", `
                ring-2 ring-offset-2 ring-sky-400
            `)
            setButtonClass(concat)

        } else {
            concat = disabledTab.concat(" ", `
                hover:ring-2 hover:ring-offset-2 hover:ring-slate-200
            `)
            setButtonClass(concat)
        }
    })

    function selectButtonType(){
        let concat = ""

        if(name === store.getState().entities.tabsReducer.openTab){
            concat = activeTab.concat(" ", `
                focus:ring-2 focus:ring-offset-2 focus:ring-sky-400
            `)
            setButtonClass(concat)
           
        } else {
            concat = disabledTab.concat(" ", `
                hover:ring-2 hover:ring-offset-2 hover:ring-slate-200
            `)
            setButtonClass(concat)
        }
    }

    store.subscribe(() => { selectButtonType() })

    const buttonHandler = () => {
        const tabName = store.getState().entities.tabsReducer.openTab
        if(tabName !== name) {
            store.dispatch(changeUpdateMode({mode: "none"}))
            store.dispatch(changeTab({openTab: name}))
        }
    }

return <>
<div className="
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
            <div className="
            absolute
            w-full h-full
            flex justify-center items-center
            bg-cyan-200/65 saturate-150 blur-md
            ">
                <div className="w-fit h-fit invisible">
                    <div className="pr-1">
                        <Icon path={icon} size={iconSize}/>
                    </div>
                    <div className="
                    pb-[1px]
                    font-semibold text-nowrap
                    ">
                        {displayName}
                    </div>
                </div>
            </div>
            <div className="
            relative
            w-full h-full
            flex justify-center items-center
            ">
                <div className="pr-1">
                    <Icon path={icon} size={iconSize}/>
                </div>
                <div className="
                pb-[1px]
                font-semibold text-nowrap
                ">
                    {displayName}
                </div>
            </div>
        </div>}

        {name !== store.getState().entities.tabsReducer.openTab &&
        <div className="
        w-full h-full
        flex justify-center items-center
        ">
            <div className="pr-1">
                <Icon path={icon} size={iconSize}/>
            </div>
            <div className="
            pb-[1px]
            font-semibold text-nowrap
            ">
                {displayName}
            </div>
        </div>}

    </button>                
</div>
</>}