import axios from "axios";
import ajax from "superagent";

import { URL_SEARCH, SEARCH_BY_CPF, SEARCH_BY_CNPJ, SEARCH_BY_EMAILS_RELECIONADOS, SEARCH_BY_TELEFONES_RELECIONADOS, SEARCH_BY_ENDERECOS_RELECIONADOS } from "../constants/constantsLocalize";
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";

export function searchLocalize(document, tipo) {
	let type = "";

	if(tipo == "pf") {
		document = patternDocument(document, 11);
		type = SEARCH_BY_CPF;

	} else if(tipo == "pj") {
		document = patternDocument(document, 14);
		type = SEARCH_BY_CNPJ;
	}
	const senha = tipo+"/ajax?empresa=ASSERTIVA&usuario=HENRIQUE.TEIXEIRA&senha=conexao182&documento=";
	const data = ajax.get(URL_SEARCH+senha+document);

	return {
		type: type,
		payload: data
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
		type: SEARCH_BY_TELEFONES_RELECIONADOS,
		payload: doc
	}
}

export function searchEnderecosRelacionados(doc) {
	return {
		type: SEARCH_BY_ENDERECOS_RELECIONADOS,
		payload: doc
	}
}

export function searchEmailsRelacionados(doc) {
	return {
		type: SEARCH_BY_EMAILS_RELECIONADOS,
		payload: doc
	}
}
