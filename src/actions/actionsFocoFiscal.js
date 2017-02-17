import {
    SEE_FOCOFISCAL_MODEL,
    CLOSE_FOCOFISCAL_MODEL,
    CLOSE_TAB_FOCOFISCAL,
    CHANGE_TAB_FOCOFISCAL,
    LOADING_FOCOFISCAL,
    GET_FOCOFISCAL_LAST_QUERIES
} from "../constants/constantsFocoFiscal";

export function getLastQueries() {
    return {
        type: GET_FOCOFISCAL_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loading() {
    return {
        type: LOADING_FOCOFISCAL,
        payload: "loading"
    }
}

export function seeModel() {
    return {
        type: SEE_FOCOFISCAL_MODEL,
        payload: ""
    }
}

export function closeModel() {
    return {
        type: CLOSE_FOCOFISCAL_MODEL,
        payload: ""
    }
}

export function closeTab(tab) {
    return {
        type: CLOSE_TAB_FOCOFISCAL,
        payload: tab
    }
}

export function changeTab(index) {
	return {
		type: CHANGE_TAB_FOCOFISCAL,
		payload: index
	}
}