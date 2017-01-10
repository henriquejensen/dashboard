import axios from "axios";
import ajax from "superagent";

import { URL_SEARCH, SEARCH_BY_CPF, SEARCH_BY_CNPJ, SEARCH_BY_EMAILS_RELACIONADOS, SEARCH_BY_TELEFONES_RELACIONADOS, SEARCH_BY_ENDERECOS_RELACIONADOS, SEE_LOCALIZE_MODEL, CLOSE_LOCALIZE_MODEL } from "../constants/constantsLocalize";
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT, AUTH_URL, AUTHENTICATION, LOAD_STATES } from "../constants/utils";

export function searchLocalize(document, tipo) {
	const senha = tipo+"/ajax?empresa="+localStorage.empresa+"&usuario="+localStorage.user+"&senha="+localStorage.senha+"&documento=";

	if(tipo == "pf") {
		document = patternDocument(document, 11);

		return (dispatch) => {
			ajax.get(URL_SEARCH+senha+document)
				.then((response) => {
					let data = JSON.parse(response.text);
					if(data.ERRORS) {
						dispatch({type: "REQUEST_ERROR", payload: data})
					} else {
						dispatch({type: SEARCH_BY_CPF, payload: data.PF.DADOS})
					}
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
		}
	}

}

export function seeModel() {
	return {
		type: SEE_LOCALIZE_MODEL,
		payload: "seeModel"
	}
}

export function closeModelo() {
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

export function searchTelefonesRelacionados(doc) {
	return {
		type: SEARCH_BY_TELEFONES_RELACIONADOS,
		payload: doc
	}
}

export function searchEnderecosRelacionados(doc) {
	return {
		type: SEARCH_BY_ENDERECOS_RELACIONADOS,
		payload: doc
	}
}

export function searchEmailsRelacionados(doc) {
	return {
		type: SEARCH_BY_EMAILS_RELACIONADOS,
		payload: doc
	}
}

export function authUser(empresa, user, senha) {
	let url = AUTH_URL;
	
	return (dispatch) => {
		ajax.post(url+"?empresa="+empresa+"&usuario="+user+"&senha="+senha)
			.send({empresa: empresa, usuario: user, senha: senha})
			.then((response) => {
				localStorage.setItem(AUTHENTICATION, response.body.response);
				localStorage.setItem("empresa", empresa);
				localStorage.setItem("user", user);
				localStorage.setItem("senha",senha);
				dispatch({type: LOGIN_SUCCESS, payload: response})
			})
			.catch((error) => {
				dispatch({type: LOGIN_ERROR, payload: error})
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
	}
}

export function getEstados() {
	return {
		type: LOAD_STATES,
		payload: ""
	}
}