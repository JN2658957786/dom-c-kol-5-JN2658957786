const logger = (param) => (store) => (next) => (action) => {

    // console.log("param: ", param)
    console.log("middleware/logger action: ", action.type)
    return next(action) //return only used by test
}

export default logger