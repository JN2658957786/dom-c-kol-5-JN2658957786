import React, { useState } from "react";
import NavbarSvg from "./svg_listName"
import { useStore } from "react-redux";

export default function () {

    const store = useStore()

    const [listName, setListName] = useState(store.getState().entities.shoppingListReducer.settings.name)
    const [listID, setListID] = useState(store.getState().entities.shoppingListReducer.settings.id)
    
    store.subscribe(() => {
        const name = store.getState().entities.shoppingListReducer.settings.name
        const id = store.getState().entities.shoppingListReducer.settings.id
        if(name != listName || id != listID){
            setListName(name)
            setListID(id)
        }
    })

    return <>
        <div className="w-full h-full flex flex-row justify-center items-center">
            <div className="scale-x-100">
                <NavbarSvg color="#e2e8f0" />
            </div>


            <div className="
            h-10
            overflow-hidden
            bg-slate-200
            font-bold
            flex items-center
            ">
                <div className="-translate-x-0 ">
                    
                    {listID == -1 && <p className=" invisible text-nowrap">
                        {listName}
                    </p>}
                    {listID != -1 && <p className=" text-nowrap">
                        {listName}
                    </p>}
                </div>
            </div>

            <div className="-scale-x-100">
                <NavbarSvg color="#e2e8f0" />
            </div>
        </div>
    </>
}