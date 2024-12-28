import React, { useState } from "react";
import { useStore } from 'react-redux'
import { 
    changeModalDefault,
    changeIsActive,

    changeModalName,
    changeModalCost,
    changeModalCostType,
    changeModalCount,
    changeModalDsc,
    changeModalState,
    changeMembersModalName,
    changeMembersModalID,
    changeShoppingListModalName
} from "../../store/entities/reducer_modal";
import {
    changeUpdateMode
} from "../../store/entities/reducer_shoppingList";
import Icon from '@mdi/react';
import {
    mdiClose,
    mdiCheck,
    mdiChevronDoubleRight,
    mdiClockOutline,
    mdiClockAlertOutline,
    mdiDotsHorizontal
} from '@mdi/js';



export const SpaceQuitButton = ({toDefault = false}) => {
    const store = useStore()
return<>
    <button
    onClick={() => {
        store.dispatch(changeModalDefault())
        store.dispatch(changeIsActive({isActive: false}))
        if(toDefault) store.dispatch(changeUpdateMode({mode: "none"}))
    }}
    className="
    w-full h-full
    cursor-default
    "/>
</>}
export const QuitButton = ({toDefault = false}) => {
    const store = useStore()
return<>
    <div className="absolute top-3 right-5">
        <button 
        onClick={() => {
            store.dispatch(changeIsActive({isActive: false}))
            store.dispatch(changeModalDefault())
            if(toDefault) store.dispatch(changeUpdateMode({mode: "none"}))
        }}
        className="
        border-2 border-slate-200/75
        hover:ring-2 hover:ring-slate-200/75
        rounded-md">
            <Icon path={mdiClose} size={1.25} color={"#cbd5e1"}/>
        </button>
    </div>
</>}


export const FormChangeName = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.modal.name)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.modal.name){
            setValue(store.getState().entities.modalReducer.modal.name)
        }
    })

    return<input 
        value={value}
        autoFocus
        autoCorrect={false}
        onChange={e => setValue(e.target.value)}
        onKeyUp={e => store.dispatch(changeModalName({name: value}))}
        className="w-full h-full rounded-lg outline-none pl-2"
        defaultValue={"New item"}
    />
}
export const FormChangeCost = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.modal.cost)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.modal.cost){
            setValue(store.getState().entities.modalReducer.modal.cost)
        }
    })

    const handleInput = (e) => {
        if(e.target.value >= 0){
            if(e.target.value[e.target.value.length - 1] != Math.e){
                if(value != 0){
                    setValue(e.target.value)
                } else {
                    setValue(e.target.value[1])
                }
            }
        } else {
            setValue(0)
        }
    }

    return<input
        value={value}
        onChange={e => handleInput(e)}
        onClick={e => store.dispatch(changeModalCost({cost: value}))}
        onKeyUp={e => store.dispatch(changeModalCost({cost: value}))}
        type="number"
        defaultValue={0}
        className="w-full h-full rounded-lg outline-none pl-2"
    />
}
export const FormChangeCostType = () => {

    const store = useStore()
    
    const [value, setValue] = useState(store.getState().entities.modalReducer.modal.costType)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.modal.costType){
            setValue(store.getState().entities.modalReducer.modal.costType)
        }
    })
    
    return<select 
    value={value}
    onChange={e => {
        setValue(e.target.value)
        store.dispatch(changeModalCostType({costType: e.target.value}))
    }}
    defaultValue="Count"
    className="w-full h-full rounded-e-lg bg-white">
            <option value="CZK">CZK</option>
            <option value="EUR">EUR</option>
    </select>
}
export const FormChangeCount = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.modal.count)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.modal.count){
            setValue(store.getState().entities.modalReducer.modal.count)
        }
    })

    const handleInput = (e) => {
        if(e.target.value >= 0){
            if(e.target.value[e.target.value.length - 1] != Math.e){
                if(value != 0){
                    setValue(e.target.value)
                } else {
                    setValue(e.target.value[1])
                }
            }
        } else {
            setValue(0)
        }
    }

    return<input
        value={value}
        onChange={e => handleInput(e)}
        onClick={e => store.dispatch(changeModalCount({count: value}))}
        onKeyUp={e => store.dispatch(changeModalCount({count: value}))}
        type="number"
        defaultValue={0}
        className="w-full h-full rounded-lg outline-none pl-2"
    />
}
export const FormChangeDsc = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.modal.dsc)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.modal.dsc){
            setValue(store.getState().entities.modalReducer.modal.dsc)
        }
    })

    return<textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyUp={e => store.dispatch(changeModalDsc({dsc: value}))}
        type="number"
        placeholder="Description"
        className="w-full h-full rounded-lg outline-none pl-2"
    />
}

export const SelectState = () => {

    const store = useStore()

    const [handlerstate, setHandlerState] = useState("none")
    function StateButtonHandler(name) {

        if(name != handlerstate){
            setHandlerState(name)
            store.dispatch(changeModalState({state: name}))
        }
    }

    const arrVariants = [
        {name: "Finished", icon: mdiCheck, color:"#4ade80", buttonClass:`
            w-full h-full border-[3px] border-green-400 rounded-lg
            hover:border-[4px] active:border-[5px] 
            flex justify-center items-center`,
            lineColor:"bg-green-400 w-full flex justify-center"
        },
        {name: "In progress", icon: mdiChevronDoubleRight, color:"#22d3ee", buttonClass:`
            w-full h-full border-[3px] border-cyan-400 rounded-lg
            hover:border-[4px] active:border-[5px]
            flex justify-center items-center`,
            lineColor:"bg-cyan-400 w-full flex justify-center"
        },
        {name: "Waiting", icon: mdiClockOutline, color:"#facc15", buttonClass:`
            w-full h-full border-[3px] border-yellow-400 rounded-lg
            hover:border-[4px] active:border-[5px]
            flex justify-center items-center`,
            lineColor:"bg-yellow-400 w-full flex justify-center"
        },
        {name: "Delayed", icon: mdiClockAlertOutline, color:"#f97316", buttonClass:`
            w-full h-full border-[3px] border-orange-500 rounded-lg
            hover:border-[4px] active:border-[5px]
            flex justify-center items-center`,
            lineColor:"bg-orange-500 w-full flex justify-center" 
        },
        {name: "Canceled", icon: mdiClose, color:"#dc2626", buttonClass:`
            w-full h-full border-[3px] border-red-600 rounded-lg
            hover:border-[4px] active:border-[5px]
            flex justify-center items-center`,
            lineColor:"bg-red-600 w-full flex justify-center" 
        },
        {name: "None", icon: mdiDotsHorizontal, color:"#94a3b8", buttonClass:`
            w-full h-full border-[3px] border-slate-400 rounded-lg
            hover:border-[4px] active:border-[5px]
            flex justify-center items-center`,
            lineColor:"bg-slate-400 w-full flex justify-center" 
        },
    ]

    let currentState = "None" 
    currentState = store.getState().entities.modalReducer.modal.state

    
    const listItems = arrVariants.map((e) => <>
    {currentState != e.name && <button
    onClick={() => StateButtonHandler(e.name)}
    className="
    w-[calc(100%/6.5)] h-full p-[6px] relative
    ">
        <div className="absolute w-[calc(100%_-_13px)] h-fit -top-4 flex justify-center font-semibold text-sm text-nowrap">
            {e.name}
        </div>
        <div className={e.buttonClass}>
            <Icon path={e.icon} size={1.1} color={e.color}/>
        </div>
    </button>}
    {currentState == e.name && <div className="
    w-[calc(100%-100%/6.5*5)] h-full px-[4px] py-[1px] relative 
    ">
        <div className="absolute w-[calc(100%_-_10px)] h-fit -top-[28px] flex justify-center font-semibold">
            {e.name}
        </div>
        <div className={e.lineColor}>
            <div className="absolute w-[calc(100%_-_24px)] bg-inherit h-[3px] -top-[4px]"/>
        </div>
        <div className={e.buttonClass}>
            <Icon path={e.icon} size={1.65} color={e.color}/>
        </div>
        <div className={e.lineColor}>
            <div className="absolute w-[calc(100%_-_24px)] bg-inherit h-[3px] -bottom-[4px]"/>
        </div>
    </div>}
</>)

return<>
<div className="
w-full h-full
flex flex-row
">
    {listItems}
</div>
</>}
export const StatePreview = (isNew, selectedItem, newState) => {
    let variant = ""
    if(selectedItem) variant = selectedItem.state
    if(isNew){
        variant = newState
    }

    switch(variant){
        case "Finished": {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-green-400 rounded-lg">
                <Icon path={mdiCheck} size={1} color={"#4ade80"}/>
            </div>
        </>}
            break;
        case "In progress": {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-cyan-400 rounded-lg">
                <Icon path={mdiChevronDoubleRight} size={1} color={"#22d3ee"}/>
            </div>
        </>}
            break;
        case "Waiting": {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-yellow-400 rounded-lg">
                <Icon path={mdiClockOutline} size={1} color={"#facc15"}/>
            </div>
        </>}
            break;
        case "Delayed": {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-orange-500 rounded-lg">
                <Icon path={mdiClockAlertOutline} size={1} color={"#f97316"}/>
            </div>
        </>}
            break;
        case "Canceled": return<>
        <div className="w-full h-full border-[3px] flex justify-center items-center
         border-red-600 rounded-lg">
            <Icon path={mdiClose} size={1} color={"#dc2626"}/>
        </div>
    </>
            break;
        case "None": {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-slate-400 rounded-lg">
                <Icon path={mdiDotsHorizontal} size={1} color={"#94a3b8"}/>
            </div>
        </>}
            break;
        default: {return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            border-slate-400 rounded-lg">
                <Icon path={mdiDotsHorizontal} size={1} color={"#94a3b8"}/>
            </div>
        </>}
    }
}

export const FormChangeMemberName = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.membersModal.name)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.membersModal.name){
            setValue(store.getState().entities.modalReducer.membersModal.name)
        }
    })

    return<input 
        value={value}
        autoFocus
        autoCorrect={false}
        onChange={e => setValue(e.target.value)}
        onKeyUp={e => store.dispatch(changeMembersModalName({name: value}))}
        className="w-full h-full rounded-lg outline-none pl-2"
        defaultValue={"New item"}
    />
}
export const FormChangeMemberID = () => {

    const store = useStore()

    const [value, setValue] = useState(store.getState().entities.modalReducer.membersModal.id)

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.membersModal.id){
            setValue(store.getState().entities.modalReducer.membersModal.id)
        }
    })

    const handleInput = (e) => {
        if(e.target.value >= 0){
            if(e.target.value[e.target.value.length - 1] != Math.e){
                if(value != 0){
                    setValue(e.target.value)
                } else {
                    setValue(e.target.value[1])
                }
            }
        } else {
            setValue(0)
        }
    }

    return<input 
        value={value}
        autoFocus
        autoCorrect={false}
        onChange={e => handleInput(e)}
        onKeyUp={e => store.dispatch(changeMembersModalID({id: value}))}
        className="w-full h-full rounded-lg outline-none pl-2"
        type="number"
        defaultValue={0}
    />
}

export const FormChangeListName = () => {

    const store = useStore()

    const [value, setValue] = useState("New shopping list")

    store.subscribe(() => {
        if(value != store.getState().entities.modalReducer.shoppingListModal.name){
            setValue(store.getState().entities.modalReducer.shoppingListModal.name)
        }
    })

    return<input 
        value={value}
        autoFocus
        autoCorrect={false}
        onChange={e => setValue(e.target.value)}
        onKeyUp={e => store.dispatch(changeShoppingListModalName({name: value}))}
        className="w-full h-full rounded-lg outline-none pl-2"
        defaultValue={"New item"}
    />
}


export const NavbarSvg = ({ color = "#D9D9D9" }) => {

    return <>
        <svg width="55" height="40" viewBox="0 0 55 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="55" height="40" fill="none" />
            <g clip-path="url(#clip0_0_1)">
                <path d="M9.75955 3.57953C10.3253 1.46815 12.2387 0 14.4246 0V0C17.6002 0 19.9116 3.01227 19.0896 6.07968L10.9592 36.4205C10.3934 38.5319 8.48006 40 6.29418 40V40C3.11855 40 0.807195 36.9877 1.62917 33.9203L9.75955 3.57953Z"
                    fill={color} />
                <path d="M25.1671 4.44698C25.87 1.82393 28.247 0 30.9626 0L38.5393 0C42.4845 0 45.356 3.74226 44.3348 7.55302L36.8317 35.553C36.1288 38.1761 33.7517 40 31.0361 40H23.4595C19.5143 40 16.6428 36.2577 17.664 32.447L25.1671 4.44698Z"
                    fill={color} />
                <path d="M50.3881 3.62221C50.9607 1.48565 52.8968 0 55.1088 0V0V40H48.4595C44.5143 40 41.6428 36.2577 42.664 32.447L50.3881 3.62221Z"
                    fill={color} />
            </g>
            <defs>
                <clipPath id="clip0_0_1">
                    <rect width="55" height="40" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </>
}