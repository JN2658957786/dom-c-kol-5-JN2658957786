
// api calls
export function apiCallBegan({
    url = "/",
    data = {},
    method = "get",
    onStart = "api/call_Request",
    onSuccess = "api/call_Recived",
    onError = "api/call_Failed"
    }) {

    return {
        type: "api/callBegan",
        payload: {
            url,
            method,
            data,
            onStart,
            onSuccess,
            onError
        }
    }
}

export function apiCallFailed(error) {
    return {
        type: "api/callFailed",
        payload: error
    }
}

export function apiCallSuccess(data) {
    return {
        type: "api/callSuccess",
        data: data
    }
}