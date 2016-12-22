import axios from "axios";
import ajax from "superagent";

import { URL_SEARCH, SEARCH_BY_CPF } from "../constants/constantsLocalize";
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS } from "../constants/constantsSMS";

export function searchLocalize(document, tipo) {
	
	if(tipo == "pf") {
		document = patternDocument(document, 11);
	} else if(tipo == "pj") {
		document = patternDocument(document, 14);
	}
	const senha = tipo+"/ajax?empresa=ASSERTIVA&usuario=HENRIQUE.TEIXEIRA&senha=conexao182&documento=";
	const request = ajax.get(URL_SEARCH+senha+document);

	return {
		type: SEARCH_BY_CPF,
		payload: request
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