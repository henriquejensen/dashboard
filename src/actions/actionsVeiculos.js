import {
    SEE_VEICULOS_MODEL,
    CLOSE_VEICULOS_MODEL,
    CLOSE_TAB_VEICULOS,
    CHANGE_TAB_VEICULOS,
    LOADING_VEICULOS,
    GET_VEICULOS_LAST_QUERIES
} from "../constants/constantsVeiculos";

export function getLastQueries(code, tipo) {
    return {
        type: GET_VEICULOS_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loading() {
    return {
        type: LOADING_VEICULOS,
        payload: "loading"
    }
}

export function seeModel() {
    return {
        type: SEE_VEICULOS_MODEL,
        payload: ""
    }
}

export function closeModel() {
    return {
        type: CLOSE_VEICULOS_MODEL,
        payload: ""
    }
}

export function closeTab() {
    return {
        type: CLOSE_VEICULOS_MODEL,
        payload: ""
    }
}

export function changeTab() {
    return {
        type: CHANGE_TAB_VEICULOS,
        payload: ""
    }
}