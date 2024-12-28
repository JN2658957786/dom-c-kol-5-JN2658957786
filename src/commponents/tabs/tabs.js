import React, { useState } from "react";
import {
    mdiFormatListBulletedSquare,
    mdiAccountOutline,
    mdiCog 
} from '@mdi/js';

import Tab from "./tab";

export default function ({children}) {

return <>
<div className="
w-full h-[38px]
">
    <div className="
    w-full h-full
    flex flex-col items-center
    ">
        <div className="w-[calc(100%_-_8px)] h-2 bg-slate-200"/>
        <div className="
        w-full h-full
        flex
        ">
            <div className="w-1"/>
            <Tab name={"Shopping list"} displayName={"Shopping list"}
            icon={mdiFormatListBulletedSquare} iconSize={1}
            rounded="rounded-es-lg"/>
            <div className="w-[2px] h-full bg-slate-100"/>
            <Tab name={"Members"} displayName={"Members"}
            icon={mdiAccountOutline} iconSize={1}
            rounded="rounded-ee-lg"/>

            <div className="
            grow
            p-[6px]
            h-full
            flex justify-center items-center
            ">
                <div className="
                w-0 sm:w-fit h-full
                flex justify-center items-center
                ">
                    <div className="h-full w-3  bg-slate-200/50 rounded-md  skew-x-12"/>
                    <div className="w-1"/>
                    <div className="h-full w-3  bg-slate-200/50 rounded-md  skew-x-12"/>
                    <div className="w-1"/>
                    <div className="h-full w-3  bg-slate-200/50 rounded-md  skew-x-12"/>
                </div>
            </div>

            <Tab name={"Detail"} displayName={"Settings"}
            icon={mdiCog} iconSize={0.8}/>
            <div className="w-1"/>
        </div>
    </div>
</div>
{children}
</>}