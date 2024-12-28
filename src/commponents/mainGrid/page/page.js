import React, { useState } from "react";
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
    store.subscribe(() => {
        setOpenTab(store.getState().entities.tabsReducer.openTab)
    })

return<>
    <div className="
    w-full h-full
    border-2 border-sky-400
    rounded-xl
    overflow-hidden
    flex justify-center items-start
    ">
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
    </div>
</>}
