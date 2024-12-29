import React, { useEffect, useState } from "react";
import NavbarSvg from "./svg_listName"
import { useStore } from "react-redux";

export default function () {

    const store = useStore()

    const [listName, setListName] = useState(store.getState().entities.shoppingListReducer.settings.name)
    const [listID, setListID] = useState(store.getState().entities.shoppingListReducer.settings.id)
    
    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        if(typeof mode == "string") setCurrentTheme(themeR[mode])
    })

    store.subscribe(() => {
        const name = store.getState().entities.shoppingListReducer.settings.name
        const id = store.getState().entities.shoppingListReducer.settings.id
        if(name != listName || id != listID){
            setListName(name)
            setListID(id)
        }

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            if(typeof mode == "string") setCurrentTheme(themeR[reducer.currentMode])
        }
    })

    return (<>
        {currentTheme && <div className="w-full h-full flex flex-row justify-center items-center">
            <div className="scale-x-100">
                <NavbarSvg color={currentTheme.listNameSVGHEX} />
            </div>


            <div className={`
            h-10
            overflow-hidden
            ${currentTheme.listNameSVGbg}
            font-bold
            flex items-center
            `}>
                <div className="-translate-x-0 ">
                    
                    {listID == -1 && <p className="invisible text-nowrap">
                        {listName}
                    </p>}
                    {listID != -1 && <p className="text-nowrap" style={{color: currentTheme.textHEX}}>
                        {listName}
                    </p>}
                </div>
            </div>

            <div className="-scale-x-100">
                <NavbarSvg color={currentTheme.listNameSVGHEX} />
            </div>
        </div>}
    </>)
}