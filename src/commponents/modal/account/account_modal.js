import React, { useEffect, useState } from "react";
import { useStore } from 'react-redux'
import { changeUser, user_update } from "../../../store/entities/reducer_user";
import {
    SpaceQuitButton,
    QuitButton
} from "../modalComponents";
import { changeCurrentAccountID } from "../../../store/entities/reducer_userAccounts";


const Modal = () => {

    const store = useStore()

    const [userArr, setUserArr] = useState(store.getState().entities.userAccountsReducer.userAccounts)
    const [currentUserName, setCurrentUseName] = useState(store.getState().entities.userReducer.name)


    store.subscribe(() => {
        setUserArr(store.getState().entities.userAccountsReducer.userAccounts)
        setCurrentUseName(store.getState().entities.userReducer.name)
    })  


    function handleClick(e){
        
        let currentShoppingListMembers = store.getState().entities.shoppingListReducer.members
        if(currentShoppingListMembers.length > 0){

            if(store.getState().entities.userAccountsReducer.currentAccountID != `${e.id}`){
                store.dispatch(changeCurrentAccountID({id: `${e.id}`}))
            } else {
                store.dispatch(changeCurrentAccountID({id: '-1'}))
                store.dispatch(user_update(
                    '',
                    'Account',
                    'none'
                ))
                return 0
            }
        
            const userID = store.getState().entities.userAccountsReducer.currentAccountID
            currentShoppingListMembers = store.getState().entities.shoppingListReducer.members

            for (let i = 0; i < currentShoppingListMembers.length; i++) {
                if(currentShoppingListMembers[i].id == userID){
                    const userObj = currentShoppingListMembers[i]
                    store.dispatch(user_update(
                        userObj.id,
                        userObj.name,
                        userObj.type
                    ))
                    return 0
                }
            }
            store.dispatch(changeCurrentAccountID({id: `${e.id}`}))
            store.dispatch(user_update(
                e.id,
                e.name,
                "none"
            ))

        } else {
            if(store.getState().entities.userAccountsReducer.currentAccountID != `${e.id}`){
                store.dispatch(changeCurrentAccountID({id: `${e.id}`}))
                store.dispatch(user_update(
                    e.id,
                    e.name,
                    "none"
                ))
            } else {
                store.dispatch(changeCurrentAccountID({id: '-1'}))
                store.dispatch(user_update(
                    '',
                    'Account',
                    'none'
                ))
            }
        }
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
        absolute z-10 right-0 top-0
        w-[calc(4_*_96px)] h-full
        bg-slate-50
        rounded-s-2xl
        ">
            {/* Modal */}
            <div className="
            w-full h-full
            flex flex-col
            relative
            ">
                <QuitButton toDefault={true}/>

                {/* 1 Name */}
                <div className="
                w-full h-fit py-3
                flex justify-center
                font-bold text-lg
                ">
                    Account
                </div>

                {/* 2 modal content - users */}
                <div className="
                w-full h-fit p-4
                flex-col justify-center
                ">
                    <div className="pb-4 font-semibold">
                        Current user: {currentUserName != "Account" ? currentUserName : "None"}
                    </div>

                    <div className="font-semibold ">
                        login as:
                    </div>

                    {userArr.map((e) => <div>
                        <div className="h-2"/>
                        <button 
                        onClick={() => handleClick(e)}
                        className="
                        w-full h-12
                        border-2 border-sky-400 hover:bg-slate-100 rounded-xl
                        flex items-center pl-4 font-semibold
                        ">
                            {e.name}
                        </button>
                    </div>)}

                </div>
            </div>
        </div>
    </div>
</>}

export default Modal