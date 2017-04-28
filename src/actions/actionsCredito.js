import ajax from "superagent";

import {
		URL_SEARCH_CPF,
		URL_SEARCH_CNPJ
} from "../constants/constantsLocalize";

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
    URL_CREDITO_SEARCH_COMPLETA,
	URL_CREDITO_SEARCH_COMPLETA_PJ
} from "../constants/constantsCredito";

import {
	ERR_CONNECTION_REFUSED,
	REQUEST_ERROR,
	ERROR_401_UNAUTHORIZED,
	ERROR_401_UNAUTHORIZED_MESSAGE
} from "../constants/utils";


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

export function searchCreditoCompleta(documento, tipo, search) {
	documento = documento.replace(/[^0-9]/g,"");
	let data = tipo === "CPF" ? {cpf:documento} : {cnpj:documento};
	let url = tipo === "CPF" ? URL_CREDITO_SEARCH_COMPLETA : URL_CREDITO_SEARCH_COMPLETA_PJ;

	return (dispatch) => {
		ajax.post(url)
			.send(data)
			.set({'Content-Type': 'application/x-www-form-urlencoded',Authorization: localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if(response.status == 200) {
						if(response.body.cadastro) {
							dispatch({
								type: search,
								payload: {
									response: response.body,
									tipo: tipo,
									documento: documento
								}
							})
						} else {
							/**alguns retornos de json são entregues com as informacoes em null e status 200, por isso a verificacao */
							dispatch({
								type: REQUEST_ERROR,
								payload: {mensagem: response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
							});
						}
					}
					 else if(response.status == 401) {
						dispatch({type: ERROR_401_UNAUTHORIZED, payload: ERROR_401_UNAUTHORIZED_MESSAGE})
					} else {
						dispatch({
							type: REQUEST_ERROR,
							payload: {mensagem: response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
						});
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