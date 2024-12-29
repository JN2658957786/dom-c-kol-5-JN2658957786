import { createSlice } from "@reduxjs/toolkit"

const initalStateObject = {
    currentMode: "darkMode",
    whiteMode: {
        background: "bg-slate-50",
        border: "border-sky-400",
        iconHEX: "#000000",
        textHEX: "#000000",
        modeButton: "#fbbf24",
        listNameSVGHEX: "#e2e8f0",
        listNameSVGbg: "bg-slate-200",

        buttonActivePrimary: "bg-sky-400 saturate-200",
        buttonActiveSecondary: "bg-cyan-200/65 saturate-150 blur-md",
        buttonActiveRing: "ring-sky-400",
        buttonNotActive: "bg-slate-200",
        buttonDisabled: "bg-slate-200",
        buttonHover: "hover:bg-slate-100",
        buttonDivide: "divide-slate-300",

        itemDefaultD: "bg-slate-200/50",
        itemHoverD: "hover:bg-slate-300/65",
        itemActiveD: "active:bg-sky-400",
        itemHover: "hover:border-slate-200  hover:border-2",
        itemActive: "active:border-slate-200 active:border-4",
        itemBorder: "border-sky-400",

        loaderBg: "bg-slate-400/35",

        modalSpace: "bg-slate-600/35"
    },
    darkMode: {
        background: "bg-gray-900",
        border: "border-violet-800",
        iconHEX: "#ffffff",
        textHEX: "#cbd5e1",
        modeButton: "#2563eb",
        listNameSVGHEX: "#475569",
        listNameSVGbg: "bg-slate-600",

        buttonActivePrimary: "bg-violet-800 saturate-200",
        buttonActiveSecondary: "bg-purple-200/35 saturate-150 blur-sm",
        buttonActiveRing: "ring-violet-800",
        buttonNActive: "bg-slate-600",
        buttonDisabled: "bg-slate-600",
        buttonHover: "hover:bg-violet-900/85",
        buttonDivide: "divide-slate-700",

        itemDefaultD: "bg-slate-600/50",
        itemHoverD: "hover:bg-slate-500/65",
        itemActiveD: "active:bg-violet-800",
        itemHover: "hover:border-violet-600  hover:border-2",
        itemActive: "active:border-purple-700 active:border-4",
        itemBorder: "border-gray-600",

        loaderBg: "bg-slate-950/35",

        modalSpace: "bg-slate-950/50 saturate-150"
    }
}

const slice = createSlice({
    name: "reducer_theme",
    initialState: initalStateObject,
    reducers: {
        changeThemeCurrentMode: (state, action) => {
            state.currentMode = action.payload.mode
        }
    }
})

export const {
    changeThemeCurrentMode
} = slice.actions;

export default slice.reducer