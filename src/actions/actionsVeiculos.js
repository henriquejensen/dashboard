import { apiContentType, api } from "../api/Api";

import {
    CHANGE_TAB_VEICULOS,
    CLOSE_MESSAGE_ERROR_VEICULOS,
    CLOSE_TAB_VEICULOS,
    LOADING_VEICULOS,
    GET_VEICULOS,
    GET_VEICULOS_LAST_QUERIES,
    SEE_VEICULOS_MODEL,
    URL_VEICULOS_SEARCH
} from "../constants/constantsVeiculos";
import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function changeTab(index) {
    return {
        type: CHANGE_TAB_VEICULOS,
        payload: index
    }
}

export function closeMessageErrorVeiculos() {
	return {
		type: CLOSE_MESSAGE_ERROR_VEICULOS,
		payload: "close"
	}
}

export function closeTab(index) {
    return {
        type: CLOSE_TAB_VEICULOS,
        payload: index
    }
}

export function getLastQueries(code, tipo) {
    return {
        type: GET_VEICULOS_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loadingVeiculos() {
    return {
        type: LOADING_VEICULOS,
        payload: "loading"
    }
}

export function searchByVeiculos(tipoInput, input, dataToSend, flagsSelected) {
    let url = URL_VEICULOS_SEARCH;
    let data = dataToSend;
    let search = GET_VEICULOS;

    return (dispatch) => {
        api(dispatch, url, data, search, {tipoInput, input, flagsSelected})
    }
}

export function seeModel(input) {
    return {
        type: SEE_VEICULOS_MODEL,
        payload: {
            params: {
                tipo: "PLACA",
                input: "111XXX"
            }
        }
    }
}