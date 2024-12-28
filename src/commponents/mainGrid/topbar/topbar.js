import React, { useEffect, useState } from "react";
import Icon from '@mdi/react';
import {
    mdiFormatListBulletedSquare,
    mdiGridLarge,
    mdiFilterCogOutline
} from '@mdi/js';

// import store from "../../../store/configureStore";

import TopbarButton from "./topbarButton"
// import Searchbar from "./searchbar";
import SaveButton from "./saveButton";

export default function(){

    // const [mode, setMode] = useState("list")
    // store.subscribe(() => { setMode(store.getState().entities.shoppingList.settings.display.mode) })

return <>
    <div className="
    w-full h-full
    flex items-center
    ">
        <div className="
        grow h-full
        border-2 border-r-0 border-sky-400
        rounded-l-xl
        "/>

        <div className="
        w-[calc(100%_-_198px)] h-full
        border-2 border-l-0 border-sky-400
        rounded-r-xl
        flex items-center justify-end
        ">
            <SaveButton/>
            <div className="grow"/>
            {/* <Searchbar/> */}
            <div className="w-1"/>
        </div>

        <div className="pr-2"/>

        <div className="
        max-w-full w-fit  h-9
        grid grid-cols-3
        border-2 border-slate-200 divide-x-2 divide-slate-200
        rounded-xl
        ">

            <TopbarButton name={"list"} icon={mdiFormatListBulletedSquare} size={1.1} rounded={"rounded-s-xl"}/>
            <TopbarButton name={"grid"} icon={mdiGridLarge} size={1.1}/>
            <TopbarButton name={"settings"} icon={mdiFilterCogOutline} size={1.1} rounded={"rounded-e-xl"}/>
                        
        </div>

        <div className="pr-1"/>
    </div>
</>}
