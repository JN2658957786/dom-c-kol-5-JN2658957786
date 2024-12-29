import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
    mdiCheck,
    mdiChevronDoubleRight,
    mdiClockOutline,
    mdiClockAlertOutline,
    mdiClose,
    mdiDotsHorizontal,

    mdiChevronUp,
    mdiChevronDown 
} from '@mdi/js';
import { useStore } from 'react-redux'
import { changeSelectedItem, changeUpdateMode, changeItems, changeIsSaved } from "../../../store/entities/reducer_shoppingList";
import { changeModalAll, changeIsActive, changeModalState } from "../../../store/entities/reducer_modal";

const List = () => {

    const store = useStore()

    const [gridCols, setGridCols] = useState(store.getState().entities.shoppingListReducer.settings.display.cols)
    const [gridClass, setGridClass] = useState(`
        w-[calc(100%_-_17px)] h-fit
        grid grid-cols-1
        gap-x-2 gap-y-1 
        `)
    const [items, setItems] = useState(store.getState().entities.shoppingListReducer.items)
    const [userType, setUserType] = useState(store.getState().entities.userReducer.type)
    const [filter, setFilter] = useState(store.getState().entities.shoppingListReducer.settings.filter)
    const [isVisible, setIsVisible] = useState(true)

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)


    ///
    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    })

    //store subscribe
    if(store.getState().entities.tabsReducer.openTab == 'Shopping list'){
        store.subscribe(() =>{
            const userIndex = store.getState().entities.userReducer.id
            let arr = [...store.getState().entities.shoppingListReducer.members]

            let index = -1
            for (let i = 0; i < arr.length; i++) {
                if(arr[i].id == userIndex){
                    index = i
                }
            }

            if(index != -1){
                setIsVisible(true)
                setGridCols(store.getState().entities.shoppingListReducer.settings.display.cols)

                setUserType(store.getState().entities.userReducer.type)

                setFilter(store.getState().entities.shoppingListReducer.settings.filter)
                setItems(store.getState().entities.shoppingListReducer.items)
                
            } else {
                setIsVisible(false)
            }

            if(store.getState().entities.themeReducer != themeR) {
                const reducer = store.getState().entities.themeReducer
                setThemeR(reducer)
                setCurrentTheme(themeR[reducer.currentMode])
            }
        })
    }

    ///on columns number change 
    useEffect(() => {
        switch(gridCols){
            case 1: {setGridClass("w-[calc(100%_-_17px)] h-fit  grid grid-cols-1  gap-x-2 gap-y-1")}
                break;
            case 2: {setGridClass("w-[calc(100%_-_17px)] h-fit  grid grid-cols-2  gap-x-2 gap-y-1")}
                break;
        }
        // console.log("update2!")
    }, [gridCols])


    ///state styles
    const setState = (state) => {
        switch(state){
            case "Finished": {return<>
                <div className="w-full h-full border-[3px] flex justify-center items-center
                hover:border-[4px]
                border-green-400 rounded-lg">
                    <Icon path={mdiCheck} size={1} color={"#4ade80"}/>
                </div>
            </>}
                break;
            case "In progress": {return<>
                <div className="w-full h-full border-[3px] flex justify-center items-center
                hover:border-[4px]
                border-cyan-400 rounded-lg">
                    <Icon path={mdiChevronDoubleRight} size={1} color={"#22d3ee"}/>
                </div>
            </>}
                break;
            case "Waiting": {return<>
                <div className="w-full h-full border-[3px] flex justify-center items-center
                hover:border-[4px]
                border-yellow-400 rounded-lg">
                    <Icon path={mdiClockOutline} size={1} color={"#facc15"}/>
                </div>
            </>}
                break;
            case "Delayed": {return<>
                <div className="w-full h-full border-[3px] flex justify-center items-center
                hover:border-[4px]
                border-orange-500 rounded-lg">
                    <Icon path={mdiClockAlertOutline} size={1} color={"#f97316"}/>
                </div>
            </>}
                break;
            case "Canceled": return<>
            <div className="w-full h-full border-[3px] flex justify-center items-center
            hover:border-[4px]
             border-red-600 rounded-lg">
                <Icon path={mdiClose} size={1} color={"#dc2626"}/>
            </div>
        </>
                break;
            case "None": {return<>
                <div className="w-full h-full border-[3px] flex justify-center items-center
                hover:border-[4px]
                border-slate-400 rounded-lg">
                    <Icon path={mdiDotsHorizontal} size={1} color={"#94a3b8"}/>
                </div>
            </>}
                break;
        }
    }


    ///Button handlers
    function buttonHandler(e)  {
        const currentType = store.getState().entities.userReducer.type
        if(currentType != "none"){

            const itemId = store.getState().entities.shoppingListReducer.updateItem.selectedItem
            if(itemId !== e.id) store.dispatch(changeSelectedItem({item: e.id}))
    
            const updateMode = store.getState().entities.shoppingListReducer.updateItem.updateMode
    
            // console.log({e})
            if(e.id != -1){
                if(updateMode == "none") {
                    store.dispatch(changeModalAll(e))
                    store.dispatch(changeUpdateMode({mode: "view"}))
                }
        
                if( updateMode == "rename" || updateMode == "modify" || updateMode == "state") store.dispatch(changeModalAll(e))
                    
                if( updateMode == "delete" ) store.dispatch(changeModalState({state: e.state}))
            }
                    
            if( updateMode == "addUp" || updateMode == "addDown" ) store.dispatch(changeModalState({state: "None"}))
        
            if(e.id != -1 || updateMode == "addUp" || updateMode == "addDown"){
                store.dispatch(changeIsActive({isActive: true}))
            }
        }
    }
    function stateButtonHandler(e) {
        const currentType = store.getState().entities.userReducer.type
        if(currentType != "none" && e.id != -1){
            store.dispatch(changeIsActive({isActive: true}))
            store.dispatch(changeUpdateMode({mode: "state"}))

            const itemId = store.getState().entities.shoppingListReducer.updateItem.selectedItem
            if(itemId !== e.id) store.dispatch(changeSelectedItem({item: e.id}))

            const updateMode = store.getState().entities.shoppingListReducer.updateItem.updateMode

            if(updateMode == "none") {
                store.dispatch(changeUpdateMode({mode: "state"}))
                store.dispatch(changeModalAll(e))
            }
            if(updateMode == "state") {
                store.dispatch(changeModalAll(e))
            }
            
            if( updateMode == "rename" || updateMode == "modify" ) store.dispatch(changeModalAll(e))
        
            if( updateMode == "delete" ) store.dispatch(changeModalState({state: e.state}))

            if( updateMode == "addUp" || updateMode == "addDown" ) store.dispatch(changeModalState({state: "None"}))
        
            store.dispatch(changeIsActive({isActive: true}))
        }
    }
    function moveHandler(e, isUp) {
        const currentType = store.getState().entities.userReducer.type
        if(currentType != "owner") return 0

        //find index
        const itemID = e.id
        const items = store.getState().entities.shoppingListReducer.items
        let arr = [...items]

        let index = -1
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].id == itemID){
                index = i
            }
        }
        // console.log("is up?", isUp, "  index:", index)

        //move limits
        let canMove = false
        if(isUp){
            if(index > 0) canMove = true
        } else {
            if(index < arr.length - 1) canMove = true
        }

        //move
        if(canMove){
            const tempItem = e
            if(isUp){
                arr[index] = arr[index - 1]
                arr[index - 1] = tempItem
            } else {
                arr[index] = arr[index + 1]
                arr[index + 1] = tempItem
            }
        }

        // console.log({arr})
        store.dispatch(changeItems({items: arr}))
        store.dispatch(changeIsSaved({isSaved: false}))
    }


    const listItems = items.map((e) => {

        let tempState = e.state
        const isArchived = e.archived
        if(tempState == "In progress") tempState = "In_progress"
        if(filter[tempState] == false){
            return
        }
        if(isArchived){
            if(filter["Archived"] == false) return
        } else {
            if(filter["Non_Archived"] == false) return
        }

        if(!currentTheme) return;
        
        return<div className="
        w-full h-12
        flex justify-center
        ">
            <button
            onClick={() => {
                // console.log(`clicked on item id:${e.id}`)
                buttonHandler(e)
            }}
            className={`
            w-full h-full
            ${currentTheme.itemDefaultD}
            ${currentTheme.itemHoverD}
            ${currentTheme.itemActiveD}
            flex
            `}>
                <div className="w-[3px] h-full flex flex-col">
                    <div className={`w-full h-2 ${currentTheme.background}`}/>
                    <div className="w-full grow"/>
                    <div className={`w-full h-2 ${currentTheme.background}`}/>
                </div>
                <div className={`
                w-[calc(100%_-_3px)] h-full
                ${currentTheme.background}
                flex
                `}>
                    <div className="w-1"/>
                    <div className={`
                    w-full h-full
                    rounded-s-lg
                    border-2 border-e-0 ${currentTheme.itemBorder}
                    ${currentTheme.background}
                    flex items-center
                    `}>
                        <div className="w-[4px]"/>
                        <div className={`
                        py-1 pl-1 w-full h-full
                        `}>

                            <div
                            className={`
                            p-1 pl-4
                            max-w-[calc(500px-135px)] w-full h-full
                            saturate-150
                            border-0
                            ${currentTheme.itemHover}
                            ${currentTheme.itemActive}
                            rounded-lg
                            flex items-center justify-start
                            font-semibold text-nowrap overflow-x-auto overflow-y-hidden`}
                            style={{scrollbarWidth: "thin", color: currentTheme.iconHEX}}
                            >
                                {e.name}
                            </div>
                        </div>
                        <div className="w-[4px]"/>
                        
                    </div>
                </div>

            </button>

            <div className={`
            border-2 border-s-0 ${currentTheme.itemBorder}
            rounded-e-lg
            flex
            `}>
                {userType == "owner" && <div className="
                w-6 h-full py-[2px]
                flex flex-col
                ">
                    <button
                    onClick={() => moveHandler(e, true)}
                    className={`
                    w-full h-1/2
                    border-2 ${(themeR.currentMode == "whiteMode") ? "border-slate-200" : "border-slate-600"}
                    hover:border-slate-300
                    rounded-t-md
                    flex justify-center items-center
                    `}>
                        <Icon path={mdiChevronUp} size={1} color={currentTheme.iconHEX}/>
                    </button>
                    <button
                    onClick={() => moveHandler(e, false)}
                    className={`
                    w-full h-1/2
                    border-2 ${(themeR.currentMode == "whiteMode") ? "border-slate-200" : "border-slate-600"}
                    hover:border-slate-300
                    rounded-b-md
                    flex justify-center items-center
                    `}>
                        <Icon path={mdiChevronDown} size={1} color={currentTheme.iconHEX}/>
                    </button>
                </div>}

                <div className="w-1"/>

                <button
                onClick={() => {
                    stateButtonHandler(e)
                    }
                }
                className="
                w-16 h-full p-[2px]
                ">
                    {setState(e.state)}
                </button>
            </div>
        </div>}
    )

return<>
{currentTheme && <div className="
w-full h-full
flex flex-col
">
    <div className="h-full" style={{maxWidth: "100%", width: `${(gridCols == 1) ? "500px" : "1000px"}`, alignSelf: "center"}}>
        {isVisible == true && <div className={gridClass}>
            {userType != "none" && listItems}
        </div>}
    </div>
    <div
    onClick={() => store.dispatch(changeUpdateMode({mode: "none"}))}
    className="
    w-full h-[100vh]
    "/>
</div>}

</>}

export default List
