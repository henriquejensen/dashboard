import ajax from "superagent";

import {
    CHANGE_TAB_FOCOFISCAL,
    CLOSE_FOCOFISCAL_MODEL,
    CLOSE_MESSAGE_ERROR_FOCOFISCAL,
    CLOSE_TAB_FOCOFISCAL,
    GET_FOCOFISCAL,
    GET_FOCOFISCAL_LAST_QUERIES,
    GET_FOCOFISCAL_RECEITAPF,
    GET_FOCOFISCAL_SINTEGRAUNIFICADA,
    LOADING_FOCOFISCAL,
    SEE_FOCOFISCAL_MODEL,
    URL_FOCOFISCAL_SEARCH,
    URL_FOCOFISCAL_SEARCH_RECEITAPF,
    URL_FOCOFISCAL_SEARCH_SINTEGRAUNIFICADA
} from "../constants/constantsFocoFiscal";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function changeTab(index) {
	return {
		type: CHANGE_TAB_FOCOFISCAL,
		payload: index
	}
}

export function closeMessageErrorFocoFiscal() {
	return {
		type: CLOSE_MESSAGE_ERROR_FOCOFISCAL,
		payload: "close"
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

export function getLastQueries() {
    return {
        type: GET_FOCOFISCAL_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loadingFocoFiscal() {
    return {
        type: LOADING_FOCOFISCAL,
        payload: "loading"
    }
}

export function searchByFocoFiscal(documento) {
	return (dispatch) => {
		ajax.post(URL_FOCOFISCAL_SEARCH)
			.send({documento:documento})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_FOCOFISCAL,
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

export function searchByReceitaPF(documento, dataNascimento) {
	return (dispatch) => {
		ajax.post(URL_FOCOFISCAL_SEARCH_RECEITAPF)
			.send({documento:documento, dataNascimento:dataNascimento})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_FOCOFISCAL_RECEITAPF,
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

export function searchBySintegraUnificada(documento, estado) {
	return (dispatch) => {
		ajax.post(URL_FOCOFISCAL_SEARCH_SINTEGRAUNIFICADA)
			.send({documento:documento, estado:estado})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_FOCOFISCAL_SINTEGRAUNIFICADA,
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
        type: SEE_FOCOFISCAL_MODEL,
        payload: ""
    }
}