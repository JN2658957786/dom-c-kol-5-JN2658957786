import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2"
import { useStore } from 'react-redux'

import ItemList from "./items";
import Members from "./members";
import Detail from "./detail"

export default function(){

    const store = useStore()

    const py = "32"
    const heightCalc = `calc(100vh - 60px - 48px - 56px - 15px - ${py}px )`

    const [openTab, setOpenTab] = useState("Shopping list")

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)


    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    })

    store.subscribe(() => {
        const newTab = store.getState().entities.tabsReducer.openTab
        if(openTab != newTab) setOpenTab(newTab)

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })

return<>
    {currentTheme && <div className={`
    w-full h-full
    border-2 ${currentTheme.border}
    rounded-xl
    overflow-hidden
    flex justify-center items-start
    `}>
        <div className="
        w-full h-full px-1 py-4
        border-2 border-white/0
        rounded-xl
        overflow-hidden
        ">
            <Scrollbars autoHeight autoHeightMax={heightCalc} >
                {openTab == "Shopping list" &&
                    <ItemList/>
                }
                {openTab == "Members" &&
                    <Members/>
                }
            </Scrollbars>
                {openTab == "Detail" &&
                    <div className="w-full h-[calc(100vh_-_60px_-_48px_-_56px_-_15px_-__32px)]">
                        <Detail/>
                    </div>
                }
                
        </div>
    </div>}
</>}
