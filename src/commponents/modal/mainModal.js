import React, { useEffect, useState } from "react";
import store from "../../store/configureStore";
import { changeIsActive } from "../../store/entities/reducer_modal";

import AddItemModal from "./ItemList/add_modal"
import RenameModal from "./ItemList/rename_modal"
import DeleteItemModal from "./ItemList/delete_modal"
import ModifyModal from "./ItemList/modify_modal"
import SetStateModal from "./ItemList/setState_modal"
import ViewModal from "./ItemList/view_modal"
import FilterModal from "./ItemList/filter_modal"

import RenameListModal from "./DetailList/rename_modal"
import LeaveListModal from "./DetailList/leaveList_modal"
import DeleteListModal from "./DetailList/delete_modal"

import AccountModal from "./account/account_modal"
import MenuModal from "./Menu/menu_modal"
import AddListModal from "./Menu/addList_modal"

import AddMemberModal from "./MemberList/add_modal"
import DeleteMemberModal from "./MemberList/delete_modal"
import ReanmeMemberModal from "./MemberList/rename_modal"

const MainModal = () => {
    
    const [show, setShow] = useState(false)
    const [tab, setTab] = useState("Shopping list")
    const [mode, setMode] =useState("none")
    const [mainModalClass, setMainModalClass] = useState(`
        absolute z-20
        w-screen h-screen
        overflow-visible
        invisible
        flex
    `)

    useEffect(() => {
        setShow(store.getState().entities.modalReducer.isActive)
        setMode(store.getState().entities.shoppingListReducer.updateItem.updateMode)
        setTab(store.getState().entities.tabsReducer.openTab)
    })

    store.subscribe(() => {
        // console.log({tab})
        // console.log({mode})
        setShow(store.getState().entities.modalReducer.isActive)
        setMode(store.getState().entities.shoppingListReducer.updateItem.updateMode)
        setTab(store.getState().entities.tabsReducer.openTab)
    })

    useEffect(() => {
        if(show){
        setMainModalClass(`
            absolute z-20
            w-screen h-screen
            overflow-hidden
            flex
        `)} else {
            setMainModalClass(`
            absolute z-20
            w-screen h-screen
            overflow-hidden
            flex
            invisible
            `) 
        }
    }, [show])

    const modals = () => {
        switch(tab){
            case "Shopping list": {return shoppingListModals()}
            break;
            case "Detail": {return DetailModals()}
            break;
            case "Members": {return MembersModals()}
        }
    }

    const shoppingListModals = () => {
        switch(mode){
            case "addUp": {return <AddItemModal name={"add up"}/>}
            break;
            case "addDown": {return <AddItemModal name={"add down"}/>}
            break;
            case "delete": {return <DeleteItemModal/>}
            break;
            case "rename": {return <RenameModal/>}
            break;
            case "modify": {return <ModifyModal/>}
            break;
            case "state": {return <SetStateModal/>}
            break;
            case "view": {return <ViewModal/>}
            break;
            case "acc": {return <AccountModal/>}
            break;
            case "menu": {return <MenuModal/>}
            break;
            case "filter": {return <FilterModal/>}
            break;
            case "addList": {return <AddListModal/>}
            break;
        }
    }

    const MembersModals = () => {
        switch(mode){
            case "acc": {return <AccountModal/>}
            break;
            case "menu": {return <MenuModal/>}
            break;
            case "addUp": {return <AddMemberModal name={"add up"}/>}
            break;
            case "addDown": {return <AddMemberModal name={"add down"}/>}
            break;
            case "delete": {return <DeleteMemberModal/>}
            break;
            case "rename": {return <ReanmeMemberModal/>}
            break;
            case "addList": {return <AddListModal/>}
            break;
        }
    }

    const DetailModals = () => {
        switch(mode){
            case "rename": {return <RenameListModal/>}
            break;
            case "delete": {return <DeleteListModal/>}
            break;
            case "leaveList": {return <LeaveListModal/>}
            break;
            case "acc": {return <AccountModal/>}
            break;
            case "menu": {return <MenuModal/>}
            break;
            case "addList": {return <AddListModal/>}
            break;
        }
    }
    

return<>
    <div className={mainModalClass}>
        {modals()}
    </div>
</>}

export default MainModal
