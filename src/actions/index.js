import ajax from "superagent";

import {
		URL_SEARCH,
		SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		SEARCH_BY_PARAMS,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL,
		LOADING_LOCALIZE,
		CLOSE_TAB_LOCALIZE,
		SEARCH_BY_CREDITO_PF,
		SEARCH_BY_CREDITO_PJ,
		CLOSE_MESSAGE_ERROR_LOCALIZE
} from "../constants/constantsLocalize";
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";
import {
		LOGIN_SUCCESS,
		LOGIN_ERROR,
		LOG_OUT,
		LOADING,
		CHANGE_TAB,
		CLOSE_TAB,
		AUTH_URL,
		AUTHENTICATION,
		REQUEST_ERROR,
		ERR_CONNECTION_REFUSED
} from "../constants/utils";

export function closeMessageErrorLocalize() {
	return {
		type: CLOSE_MESSAGE_ERROR_LOCALIZE,
		payload: "close"
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
	const senha = tipo+"/ajax?empresa="+localStorage.empresa+"&usuario="+localStorage.user+"&senha="+localStorage.senha+"&documento=";

	if(tipo == "pf") {
		document = patternDocument(document, 11);

		return (dispatch) => {
			ajax.get(URL_SEARCH+senha+document)
				.then((response) => {
					let data = JSON.parse(response.text);
					if(data.ERRORS) {
						dispatch({type: REQUEST_ERROR, payload: data})
					} else {
						dispatch({type: SEARCH_BY_CPF, payload: data.PF.DADOS})
					}
				})
				.catch((error) => {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				})
		}

	} else if(tipo == "pj") {
		document = patternDocument(document, 14);

		return (dispatch) => {
			ajax.get(URL_SEARCH+senha+document)
				.then((response) => {
					let data = JSON.parse(response.text);
					if(data.ERRORS) {
						dispatch({type: "REQUEST_ERROR", payload: data})
					} else {
						dispatch({type: SEARCH_BY_CNPJ, payload: data.PJ.DADOS})
					}
				})
				.catch((error) => {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				})
		}
	}
}

export function searchLocalizeByParams(inputLocalize, tipo) {
	return {
		type: SEARCH_BY_PARAMS,
		payload: {
			input: inputLocalize,
			tipo: tipo
		}
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

export function searchPessoasRelacionadas(doc, tipo) {
	return {
		type: SEARCH_BY_PESSOAS_RELACIONADOS,
		payload: {
			documento: doc,
			tipo: tipo
		}
	}
}

export function showRelacionados(doc, docRelacionado, tipo) {
	if( tipo == "telefone") {
		return {
			type: SEARCH_BY_TELEFONES_RELACIONADOS,
			payload: {
				documento: doc,
				documentoRelacionado: docRelacionado
			}
		}
	} else if( tipo == "endereco") {
		return {
			type: SEARCH_BY_ENDERECOS_RELACIONADOS,
			payload: {
				documento: doc,
				documentoRelacionado: docRelacionado
			}
		}
	}
}

export function authUser(empresa, user, senha) {
	return (dispatch) => {
		ajax.get(AUTH_URL+"?empresa="+empresa+"&usuario="+user+"&senha="+senha)
			.end(function(err, res) {
				if (err || !res.ok) {
					dispatch({type: LOGIN_ERROR, payload: res.body})
				} else {
					localStorage.setItem(AUTHENTICATION, res.body.response);
					localStorage.setItem("empresa", empresa);
					localStorage.setItem("user", user);
					localStorage.setItem("senha",senha);
					dispatch({type: LOGIN_SUCCESS, payload: res.body})
				}
			})
	}
}

export function logOut() {
	localStorage.removeItem(AUTHENTICATION);
	localStorage.removeItem("empresa");
	localStorage.removeItem("user");
	localStorage.removeItem("senha");
	return {
		type: LOG_OUT,
		payload: "logout"
	}
}

export function loading() {
	return {
		type: LOADING,
		payload: "loadingAuth"
	}
}