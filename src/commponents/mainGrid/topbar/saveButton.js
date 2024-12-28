import React, { useState } from "react";
import Icon from '@mdi/react';
import {
    mdiContentSaveOutline 
} from '@mdi/js';
import { useStore } from "react-redux";
import { saveShoppingList, saveShoppingListDetail } from "../../../store/entities/reducer_DBshoppingLists";
import {
    changeFilter,
    changeIsSaved,
    changeShoppingListItems,
    list_archive
} from "../../../store/entities/reducer_shoppingList";

const SaveButton = () =>{

    const store = useStore()

    const [isSaved, setIsSaved] = useState(false)
    const [shoppingListID, setShoppingListID] = useState(store.getState().entities.shoppingListReducer.settings.id)

    store.subscribe(() => {
        const tempIsSaved = store.getState().entities.shoppingListReducer.settings.isSaved
        if(tempIsSaved != isSaved){
            setIsSaved(tempIsSaved)
        }
        setShoppingListID(store.getState().entities.shoppingListReducer.settings.id)
    })


    function handleClick() {
        if(isSaved == false && shoppingListID != -1){
            setIsSaved(true)
            store.dispatch(changeIsSaved({isSaved: true}))

            const list = store.getState().entities.shoppingListReducer
            const listsDetail = store.getState().entities.dbListsReducer.shoppingListsDetails

            let index = -1
            for (let i = 0; i < listsDetail.length; i++) {
                if(listsDetail[i].id == shoppingListID){
                    index = i
                }
            }
            if(index == -1) return

            const items = list.items
            let tempItems = []
            let tempObj = {}
            for (let i = 0; i < items.length; i++) {
                tempObj = {...items[i], archived: true}
                tempItems.push(tempObj)
            }

            const tempList = {...list, items:tempItems}

            const detail = {id: list.settings.id, name: list.settings.name}
            // store.dispatch(saveShoppingListDetail({detail, index}))
            // store.dispatch(saveShoppingList({list: tempList, index}))

            store.dispatch(changeShoppingListItems({items: tempItems}))
            store.dispatch(changeFilter({filter: {
                Finished: true,
                In_progress: true,
                Waiting: true,
                Delayed: true,
                Canceled: true,
                None: true,
                Archived: true,
                Non_Archived: true
            }}))

            store.dispatch(list_archive(tempList, detail, index))
        }
    }

return<>
<button
onClick={() => {handleClick()}}
className="
w-40 h-10
flex
">
    <div className="w-10 h-full flex justify-center items-center">
        {isSaved == true && <Icon path={mdiContentSaveOutline} size={1.25} color={"#00e755"}/>}
        {isSaved == false && <Icon path={mdiContentSaveOutline} size={1.25} color={"#8ba2c0"}/>}
    </div>
    {isSaved == true && <div className="
    pl-1 w-fit h-full 
    flex items-center 
    underline decoration-2 decoration-green-500 saturate-150
    font-semibold 
    ">
        saved
    </div>}
    {isSaved == false && <div className="
    pl-0 w-fit h-full 
    flex items-center
    text-slate-400 saturate-150
    font-semibold 
    ">
        save
    </div>}
</button>
</>}

export default SaveButton