const func = ({ dispatch, getState }) => (next) => (action) => {

    if (typeof action === "function") {
        //console.log("middleware/func: ", "action is function")
        action(dispatch, getState);
    } else {
        //console.log("middleware/func: ", `"action is object"`)
        return next(action);
    }
}

export default func