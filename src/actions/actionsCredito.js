import {
    CLOSE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
    GET_CREDITO_LAST_QUERIES,
    CHANGE_TAB_CREDITO
} from "../constants/constantsCredito";

export function getLastQueries(code, tipo) {
    return {
        type: GET_CREDITO_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function changeTab(index) {
	return {
		type: CHANGE_TAB_CREDITO,
		payload: index
	}
}

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