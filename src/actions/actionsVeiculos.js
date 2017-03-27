import ajax from "superagent";

import {
    CHANGE_TAB_VEICULOS,
    CLOSE_MESSAGE_ERROR_VEICULOS,
    CLOSE_TAB_VEICULOS,
    CLOSE_VEICULOS_MODEL,
    LOADING_VEICULOS,
    GET_VEICULOS,
    GET_VEICULOS_LAST_QUERIES,
    SEE_VEICULOS_MODEL,
    URL_VEICULOS_SEARCH
} from "../constants/constantsVeiculos";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function changeTab() {
    return {
        type: CHANGE_TAB_VEICULOS,
        payload: ""
    }
}

export function closeMessageErrorVeiculos() {
	return {
		type: CLOSE_MESSAGE_ERROR_VEICULOS,
		payload: "close"
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

export function searchByVeiculos(data) {
	return (dispatch) => {
		ajax.post(URL_VEICULOS_SEARCH)
			.send({data:data})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_FOCOFISCAL,
							payload: data
						})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function seeModel() {
    return {
        type: SEE_VEICULOS_MODEL,
        payload: ""
    }
}