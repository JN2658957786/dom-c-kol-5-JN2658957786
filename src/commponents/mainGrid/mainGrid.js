import React from "react";

import MemberIcon from "./memberIcon";
import Topbar from "./topbar/topbar"
import Sidebar from "./sidebar/sidebar";
import Page from "./page/page";

export default function(){ return <>
<div className="
w-full h-full
flex flex-col
">
    <div className="
    w-full h-14
    flex
    ">
        <div className="
        w-14 h-full
        p-1
        ">
            <MemberIcon/>
        </div>
        <div className="
        w-[calc(100%_-_56px)] h-full
        p-1 pr-0
        ">
            <Topbar/>
        </div>
    </div>

    <div className="
    w-full grow
    flex
    ">
        <div className="
        w-14 h-full
        p-1
        ">
            <Sidebar/>
        </div>
        <div className="
        w-[calc(100%_-_56px)] h-full
        p-1
        ">
            <Page/>
        </div>
    </div>
</div>
</>}