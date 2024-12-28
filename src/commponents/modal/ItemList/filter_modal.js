import React, { useEffect, useState } from "react";
import { QuitButton, SpaceQuitButton, StatePreview } from "../modalComponents";
import { changeIsActive } from "../../../store/entities/reducer_modal";
import { useStore } from "react-redux";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import { changeDisplayCols, changeDisplayMode, changeFilter } from "../../../store/entities/reducer_shoppingList";


const Modal = () => {

    const store = useStore()

    const [filter, setFilter] = useState(store.getState().entities.shoppingListReducer.settings.filter)
    
    store.subscribe(() => {
        if(store.getState().entities.shoppingListReducer.settings.filter != filter){
            setFilter(store.getState().entities.shoppingListReducer.settings.filter)
        }
    })

    function stateCheck(name){

        let tempName = ""
        if(name == "In progress"){
            tempName = "In_progress"
        } else {
            tempName = name
        }
        const state = filter[tempName]

        function changeMode(){
            let obj = {...filter}
            obj[tempName] = !obj[tempName]
            setFilter(obj)
        }

        let isVisible = true
        if(name == "Archived" || name == "Non_Archived")isVisible = false

    return<>
        <button
        onClick={() => {changeMode()}}
        className="w-12 h-12 justify-self-center">
            {isVisible == true && StatePreview(true, "", name)}
            {isVisible == false && <div className="flex items-center font-semibold">
                {name}
            </div>}

            <div className="h-2"/>

            {state == true && <div className="
            w-12 h-12
            border-[3px] border-green-400 rounded-lg
            flex items-center justify-center
            ">
                <Icon path={mdiCheck} size={1} color={"#4ade80"}/>
            </div>}
            {state == false && <div className="
            w-12 h-12
            border-[3px] border-red-600 rounded-lg
            flex items-center justify-center
            ">
                <Icon path={mdiClose} size={1} color={"#dc2626"}/>
            </div>}
        </button>
    </>}

    function HandleSubmit(){
        store.dispatch(changeFilter({filter: filter}))

        store.dispatch(changeIsActive({isActive: false}))
        store.dispatch(changeDisplayMode({mode: `list`}))
        store.dispatch(changeDisplayCols({cols: 1}) )
    }


return<>
    <div className="
    w-full h-full
    relative
    ">
        <div className=" absolute w-full h-full bg-slate-600/35">
            <SpaceQuitButton toDefault={true}/>
        </div>
        <div className="
        absolute z-10 inset-0 left-[calc(50%_-_2_*_128px)] top-16
        w-[calc(4_*_128px)] h-fit
        bg-slate-50
        rounded-2xl
        ">
            {/*  */}
            <div className="
            w-full h-full
            flex flex-col
            relative
            ">
                <QuitButton toDefault={true}/>

                {/* Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    Filter items
                </div>
                
                <div className="
                w-full h-fit px-6
                flex-col
                ">
                    {/* form */}
                    <div className="grid grid-cols-6">
                        {stateCheck("Finished")}
                        {stateCheck("In progress")}
                        {stateCheck("Waiting")}
                        {stateCheck("Delayed")}
                        {stateCheck("Canceled")}
                        {stateCheck("None")}
                    </div>
                    <div className="h-20"/>
                    <div className="grid grid-cols-6">
                        <div className="flex justify-center">
                            {stateCheck("Archived")}
                        </div>
                        <div className="flex justify-center">
                            {stateCheck("Non_Archived")}
                        </div>
                    </div>

                    <div className="h-16"/>

                    {/* confirm, cancel  */}
                    <div className="
                    w-full h-24
                    flex items-center
                    ">
                        <button
                        onClick={() => {
                            store.dispatch(changeIsActive({isActive: false}))
                            store.dispatch(changeDisplayMode({mode: `list`}))
                            store.dispatch(changeDisplayCols({cols: 1}))
                        }}
                        className="
                        w-32 h-10 
                        border-[3px] border-red-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-red-400
                        font-bold text-red-600
                        relative
                        ">
                            <div className="absolute -top-[10px] left-2 bg-slate-50">
                                <Icon path={mdiClose} size={0.75}/>
                            </div>
                            Cancel
                        </button>

                        <div className="grow"/>

                        <button
                        onClick={() => {HandleSubmit()}}
                        className="
                        w-32 h-10 
                        border-[3px] border-green-500 saturate-150 rounded-lg
                        hover:border-[4px]
                        active:ring-2 active:ring-offset-2 active:ring-green-400
                        font-bold text-green-600
                        relative
                        ">
                            <div className="absolute -top-[10px] right-2 bg-slate-50">
                                <Icon path={mdiCheck} size={0.75}/>
                            </div>
                            Confirm
                        </button>
                    </div>
                </div>

            </div>
            {/*  */}
        </div>
    </div>
</>}

export default Modal