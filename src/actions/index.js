import ajax from "superagent";

import {
		URL_SEARCH_CPF,
		URL_SEARCH_CNPJ,
		URL_SEARCH_TELEFONE,
		URL_SEARCH_EMAIL,
		URL_SEARCH_NOME_ENDERECO,
		URL_SEARCH_PESSOAS_RELACIONADAS,
		URL_SEARCH_ULTIMAS_CONSULTAS_LOCALIZE,
		SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		SEARCH_BY_TELEFONE,
		SEARCH_BY_EMAIL,
		SEARCH_BY_NOME_ENDERECO,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL,
		LOADING_LOCALIZE,
		CLOSE_TAB_LOCALIZE,
		CHANGE_TAB_LOCALIZE,
		SEARCH_BY_CREDITO_PF,
		SEARCH_BY_CREDITO_PJ,
		CLOSE_MESSAGE_ERROR_LOCALIZE,
		GET_LOCALIZE_LAST_QUERIES
} from "../constants/constantsLocalize";
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";
import {
		LOGIN_SUCCESS,
		LOGIN_ERROR,
		LOG_OUT,
		LOADING,
		CLOSE_TAB,
		AUTH_URL,
		AUTHENTICATION,
		REQUEST_ERROR,
		ERR_CONNECTION_REFUSED
} from "../constants/utils";

export function getLastQueries(code, tipo) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_ULTIMAS_CONSULTAS_LOCALIZE)
			.send({consulta: code})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: GET_LOCALIZE_LAST_QUERIES,
							payload: {
								response: response.body,
								tipo: tipo
							}
						})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}

    return {
        type: GET_LOCALIZE_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function closeMessageErrorLocalize() {
	return {
		type: CLOSE_MESSAGE_ERROR_LOCALIZE,
		payload: "close"
	}
}

export function changeTab(index) {
	return {
		type: CHANGE_TAB_LOCALIZE,
		payload: index
	}
}

export function closeTab(index) {
	return {
		type: CLOSE_TAB_LOCALIZE,
		payload: index
	}
}

export function loadingLocalize() {
	return {
		type: LOADING_LOCALIZE,
		payload: "loading"
	}
}

export function searchCredito(document, tipo) {
	if(tipo == "pf") {
		return {
			type: SEARCH_BY_CREDITO_PF,
			payload: "credito"
		}
	}
	return {
		type: SEARCH_BY_CREDITO_PJ,
		payload: "credito"
	}
}

export function searchLocalize(document, tipo) {
	if(tipo == "pf") {
		document = patternDocument(document, 11);

		return (dispatch) => {
			ajax.post(URL_SEARCH_CPF)
				.send({cpf: document})
				.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
				.end(function(error, response) {
					if (response) {
						if (response.status == 200) {
							dispatch({type: SEARCH_BY_CPF, payload: response.body})
						} else {
							dispatch({type: REQUEST_ERROR, payload: response.body.erro})
						}
					} else {
						dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
					}
				})
		}
	} else if(tipo == "pj") {
		document = patternDocument(document, 14);

		return (dispatch) => {
			ajax.post(URL_SEARCH_CNPJ)
				.send({cnpj: document})
				.set({'Content-Type': 'application/x-www-form-urlencoded','Authorization': localStorage.getItem("token")})
				.end(function(error, response) {
					if (response) {
						if (response.status == 200) {
							dispatch({type: SEARCH_BY_CNPJ, payload: response.body})
						} else {
							dispatch({type: REQUEST_ERROR, payload: response.body.erro})
						}
					} else {
						dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
					}
				})
		}
	}
}

export function searchLocalizeByNomeEndereco(inputLocalize, tipo, labelToTab) {
		return (dispatch) => {
			ajax.post(URL_SEARCH_NOME_ENDERECO)
				.send(inputLocalize)
				.set({'Authorization': localStorage.getItem("token")})
				.end(function(error, response) {
					if (response) {
						if (response.status == 200) {
							dispatch({
								type: SEARCH_BY_NOME_ENDERECO,
								payload: {
									response: response.body,
									tipo: tipo,
									label: labelToTab
								}
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
		type: SEE_LOCALIZE_MODEL,
		payload: "model"
	}
}

export function closeModel() {
	return {
		type: CLOSE_LOCALIZE_MODEL,
		payload: "closeModel"
	}
}

function patternDocument(doc, len) {
	let docLength = doc.toString().length;

	if(docLength < len) {
		for(let i=0; i<len-docLength; i++) {
			doc = "0" + doc;
		}
	}

	return doc;
}

export function userEditInfo(nome, telefone, email) {
	const info = {
		nome: nome,
		telefone: telefone,
		email: email
	}

	return {
		type: USER_EDIT_INFO,
		payload: info
	}
}

export function userDashboard(gadgets, charts) {
	const dashboardPreferences = {
		gadgets: gadgets,
		charts: charts
	};

	return {
		type: USER_EDIT_DASHBOARD,
		payload: dashboardPreferences
	}
}

export function getCampanhasSMS() {
	return {
		type: GET_CAMPANHAS_SMS,
		payload: ""
	}
}

export function getCentroCustoSMS() {
	return {
		type: GET_CENTRO_CUSTO_SMS,
		payload: ""
	}
}

export function getRespostasSMS() {
	return {
		type: GET_RESPOSTAS_SMS,
		payload: ""
	}
}

export function searchTelefonesPessoaRelacionada(doc, docRelacionado) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_CPF)
			.send({cpf: docRelacionado})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: SEARCH_BY_TELEFONES_RELACIONADOS,
							payload: {
								response: response.body.telefones,
								documento: doc,
								documentoRelacionado: docRelacionado
							}
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

export function searchEnderecosPessoaRelacionada(doc, docRelacionado) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_CPF)
			.send({cpf: docRelacionado})
			.set({'Content-Type': 'application/x-www-form-urlencoded','authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({
							type: SEARCH_BY_ENDERECOS_RELACIONADOS,
							payload: {
								response: response.body.enderecos,
								documento: doc,
								documentoRelacionado: docRelacionado
							}
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

export function searchLocalizeByEmail(email) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_EMAIL)
			.send({email:email})
			.set({'Content-Type': 'application/x-www-form-urlencoded','Authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({type: SEARCH_BY_EMAIL, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function searchLocalizeByTelefone(telefone) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_TELEFONE)
			.send({telefone:telefone})
			.set({'Content-Type': 'application/x-www-form-urlencoded','Authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({type: SEARCH_BY_TELEFONE, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function searchPessoasRelacionadas(cpf) {
	return (dispatch) => {
		ajax.post(URL_SEARCH_PESSOAS_RELACIONADAS)
			.send({cpf})
			.set({'Content-Type': 'application/x-www-form-urlencoded','Authorization': localStorage.getItem("token")})
			.end(function(error, response) {
				if (response) {
					if (response.status == 200) {
						dispatch({type: SEARCH_BY_PESSOAS_RELACIONADOS, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}
