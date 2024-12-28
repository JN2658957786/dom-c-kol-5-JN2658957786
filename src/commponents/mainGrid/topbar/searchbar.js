import React from "react";
import Icon from '@mdi/react';
import {
    mdiMagnify 
} from '@mdi/js';

const Searchbar = () =>{ return<>
<div className="
max-w-[calc(100%-55px)] w-[400px] h-10 
bg-slate-200
rounded-xl
flex
">
    <div className="
    grow h-full
    py-1 pl-2
    ">
        <div className="
        w-full h-full
        bg-slate-50
        rounded-xl
        flex items-center
        ">
            <div className="
            w-full h-fit pl-2 
            font-semibold
            text-slate-300
            ">
                <input type='text' placeholder="Search items" className="
                w-[calc(100%_-_10px)] h-8
                bg-slate-50 
                outline-none
                text-black
                "/>
            </div>
        </div>
    </div>
    <div className="
    w-12 h-10
    flex justify-center items-center 
    ">
        <Icon path={mdiMagnify} size={1}/>
    </div>
</div>
</>}

export default Searchbar