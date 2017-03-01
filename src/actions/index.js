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

export function getLastQueries() {
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
	/*return (dispatch) => {
		ajax.post('https://provider.assertivasolucoes.com.br/veiculo/5034/consultar')
			.set({'Content-Type': 'application/json', 'keySession': localStorage.getItem("token"), 'Authorization': 'Bearer ' + localStorage.getItem("token")})
			.send({document: "36891039835"})
			.end(function(err, res) {
				console.log(err, res)
				if (err || !res.ok) {
					dispatch({type: LOGIN_ERROR, payload: res.body})
				} else {
					localStorage.setItem(AUTHENTICATION, res.body.response);
					dispatch({type: LOGIN_SUCCESS, payload: res.body})
				}
			})
	}*/


	const senha = tipo+"/ajax?empresa="+localStorage.empresa+"&usuario="+localStorage.usuario+"&senha="+localStorage.senha+"&documento=";

	if(tipo == "pf") {
		console.log("BUSCA POR CPF")
		document = patternDocument(document, 11);

		return (dispatch) => {
			ajax.post("https://services.assertivasolucoes.com.br/v1/localize/1000/consultar")
				.send({cpf: document})
				.set({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'MEU_TOKEN_0123456789'})
				.then((response) => {
					console.log("CHEGOU", response, response.body)
					if(response.status == 200) {
						console.log("SEARCH_BY_CPF")
						dispatch({type: SEARCH_BY_CPF, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body})
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