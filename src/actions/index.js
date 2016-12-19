import axios from "axios";
import ajax from "superagent";

import { URL_SEARCH, SEARCH_BY_CPF } from "../constants/constantsLocalize";

export function searchLocalize(document, tipo) {
	document = patternCPF(document);
	const senha = tipo+"/ajax?empresa=ASSERTIVA&usuario=HENRIQUE.TEIXEIRA&senha=conexao182&documento=";
	const request = ajax.get(URL_SEARCH+senha+document);

	return {
		type: SEARCH_BY_CPF,
		payload: request
	}
}

function patternCPF(cpf) {
	let cpfLength = cpf.toString().length;

	if(cpfLength < 11) {
		for(let i=0; i<11-cpfLength; i++) {
			cpf = "0" + cpf;
		}
	}

	return cpf;
}