import {
    CLOSE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
} from "../constants/constantsCredito";

export function loading() {
    return {
        type: LOADING_CREDITO,
        payload: "loading"
    }
}

export function seeModel() {
    return {
        type: SEE_CREDITO_MODEL,
        payload: ""
    }
}

export function closeModel() {
    return {
        type: CLOSE_CREDITO_MODEL,
        payload: ""
    }
}

export function closeTab(tab) {
    return {
        type: CLOSE_TAB_CREDITO,
        payload: tab
    }
}