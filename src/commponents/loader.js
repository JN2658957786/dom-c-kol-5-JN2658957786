import React, { useEffect, useState } from "react";
import { useStore } from "react-redux";

export default function () {
    
    const store = useStore()
    
    const [isLoading, setIsLoading] = useState(false)

    const [themeR, setThemeR] = useState(store.getState().entities.themeReducer)
    const [currentTheme, setCurrentTheme] = useState(null)

    useEffect(() => {
        const mode = store.getState().entities.themeReducer.currentMode
        setCurrentTheme(themeR[mode])
    },[])

    store.subscribe(() => {
        const tempIsLoadingList = store.getState().entities.shoppingListReducer.settings.loading
        const tempIsLoadingUser = store.getState().entities.userReducer.loading
        setIsLoading(tempIsLoadingList || tempIsLoadingUser)

        if(store.getState().entities.themeReducer != themeR) {
            const reducer = store.getState().entities.themeReducer
            setThemeR(reducer)
            setCurrentTheme(themeR[reducer.currentMode])
        }
    })

return <>
    {isLoading == true && currentTheme && <div className={`
    w-screen
    h-screen
    ${currentTheme.loaderBg}
    absolute z-50
    flex justify-center items-center
    `}>
            <svg width="100" height="100" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stop-color="#fff" stop-opacity="0" offset="0%" />
                        <stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
                        <stop stop-color="#fff" offset="100%" />
                    </linearGradient>
                </defs>
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="0.9s"
                                repeatCount="indefinite" />
                        </path>
                        <circle fill="#fff" cx="36" cy="18" r="1">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="0.9s"
                                repeatCount="indefinite" />
                        </circle>
                    </g>
                </g>
            </svg>
        </div>}
    </>
}