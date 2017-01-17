import {
    CHANGE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    CLOSE_TAB_CREDITO,
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
    console.log("SEEE MODEL")
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