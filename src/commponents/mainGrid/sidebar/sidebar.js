import React from "react";
import Icon from '@mdi/react';
import {
    mdiPencil,
    mdiCog,
    mdiDelete
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeUpdateMode } from "../../../store/entities/reducer_shoppingList";

import SidebarButton from "./sidebarButton"


export default function(){
    
    const store = useStore()
    
    return <>
    <div className="
    w-full h-full
    border-2 border-sky-400 rounded-xl
    flex flex-col items-center
    ">
        <div className="h-1"/>
        <div className="
        w-[calc(100%_-_10px)] h-[calc(5_*_50px)]
        border-2 border-slate-200 rounded-xl
        grid grid-rows-5 divide-y-2 divide-slate-200 
        ">
            <SidebarButton name={"addUp"} rounded={"rounded-t-xl"}>
                <Icon path={mdiPencil} size={1} color={"#00000000"}/>
            </SidebarButton>

            <SidebarButton name={"addDown"} >
                <Icon path={mdiPencil} size={1} color={"#00000000"}/>
            </SidebarButton>

            <SidebarButton name={"rename"}>
                <Icon path={mdiPencil} size={1}/>
            </SidebarButton>
            
            <SidebarButton name={"modify"}>
                <Icon path={mdiCog} size={1}/>
            </SidebarButton>
            
            <SidebarButton name={"delete"} rounded={"rounded-b-xl"}>
                <Icon path={mdiDelete} size={1}/>
            </SidebarButton>

        </div>
        <button
        onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
        className="
        w-full grow
        cursor-auto
        "/>
    </div>
</>}