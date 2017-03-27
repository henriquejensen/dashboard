import ajax from "superagent";

import {
    CHANGE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    CLOSE_MESSAGE_ERROR_CREDITO,
    CLOSE_TAB_CREDITO,
    GET_CREDITO_CHEQUE,
    GET_CREDITO_COMPLETA,
    GET_CREDITO_LAST_QUERIES,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
    URL_CREDITO_SEARCH_CHEQUE,
    URL_CREDITO_SEARCH_COMPLETA
} from "../constants/constantsCredito";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";


export function changeTab(index) {
	return {
		type: CHANGE_TAB_CREDITO,
		payload: index
	}
}

export function closeMessageErrorCredito() {
	return {
		type: CLOSE_MESSAGE_ERROR_CREDITO,
		payload: "close"
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

export function getLastQueries(code, tipo) {
    return {
        type: GET_CREDITO_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loadingCredito() {
    return {
        type: LOADING_CREDITO,
        payload: "loading"
    }
}

export function searchCreditoCheque(chequeData) {
	return (dispatch) => {
		ajax.post(URL_CREDITO_SEARCH_CHEQUE)
			.send({cheque:chequeData})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_CREDITO_CHEQUE,
							payload: chequeData
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

export function searchCreditoCompleta(documento) {
	return (dispatch) => {
		ajax.post(URL_CREDITO_SEARCH_COMPLETA)
			.send({cpf:documento})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_CREDITO_COMPLETA,
							payload: documento
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
        type: SEE_CREDITO_MODEL,
        payload: ""
    }
}