import {
    SEE_CREDITO_MODEL,
    CLOSE_CREDITO_MODEL
} from "../constants/constantsCredito";

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