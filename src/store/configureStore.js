import { configureStore, Tuple } from "@reduxjs/toolkit";

// root reducer
import reducers from "./reducer"

// middleware
import logger from "./middleware/logger";
import func from "./middleware/func";
import api from "./middleware/api";

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(
        logger("`input param`"),
        func,
        api
    )
})

export default store;