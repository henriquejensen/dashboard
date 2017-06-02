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
	GET_CREDITO_INTERMEDIARIA,
	GET_CREDITO_INTERMEDIARIAPLUS,
	GET_CREDITO_SIMPLES,
	GET_CREDITO_EXPRESS,
    GET_CREDITO_LAST_QUERIES,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
    URL_CREDITO_SEARCH_CHEQUE,
    URL_CREDITO_SEARCH_COMPLETA,
	URL_CREDITO_SEARCH_COMPLETA_PJ,
    URL_CREDITO_SEARCH_INTERMEDIARIA_PF,
    URL_CREDITO_SEARCH_INTERMEDIARIA_PJ,
    URL_CREDITO_SEARCH_INTERMEDIARIAPLUS_PF,
    URL_CREDITO_SEARCH_INTERMEDIARIAPLUS_PJ,
    URL_CREDITO_SEARCH_SIMPLES_PF,
    URL_CREDITO_SEARCH_SIMPLES_PJ
} from "../constants/constantsCredito";
import {
	ERR_CONNECTION_REFUSED,
	REQUEST_ERROR,
	ERROR_401_UNAUTHORIZED,
	ERROR_401_UNAUTHORIZED_MESSAGE
} from "../constants/utils";

import { apiContentType, api } from "../api/Api";

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

export function searchCreditoCheque(cheque) {
	let url = URL_CREDITO_SEARCH_CHEQUE;
	let data = {cheque};
	let search = GET_CREDITO_CHEQUE;

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {cheque:cheque})
	}
}

export function searchCreditoCompleta(documento, tipo, search) {
	documento = documento.toString().replace(/[^0-9]/g,"");
	let data = tipo === "CPF" ? {cpf:documento} : {cnpj:documento};
	let url = tipo === "CPF" ? URL_CREDITO_SEARCH_COMPLETA : URL_CREDITO_SEARCH_COMPLETA_PJ;

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {tipo, documento})
	}
}

export function searchCreditoIntermediaria(documento, uf) {
    documento = documento.toString().replace(/[^0-9]/g,"")
    let tipo = documento.length > 11 ? "CNPJ" : "CPF"
	let url = documento.length > 11 ? URL_CREDITO_SEARCH_INTERMEDIARIA_PJ : URL_CREDITO_SEARCH_INTERMEDIARIA_PF
	let data = tipo === "CPF" ? {document:documento, type:"pf", uf} : {document:documento, type:"pj", uf};

	return (dispatch) => {
		apiContentType(dispatch, url, data, GET_CREDITO_COMPLETA, {tipo, documento})
	}
}

export function searchCreditoIntermediariaPlus(documento, uf) {
    documento = documento.toString().replace(/[^0-9]/g,"")
    let tipo = documento.length > 11 ? "CNPJ" : "CPF"
	let url = documento.length > 11 ? URL_CREDITO_SEARCH_INTERMEDIARIAPLUS_PJ : URL_CREDITO_SEARCH_INTERMEDIARIAPLUS_PF
	let data = tipo === "CPF" ? {document:documento, type:"pf", uf} : {document:documento, type:"pj", uf};

	return (dispatch) => {
		apiContentType(dispatch, url, data, GET_CREDITO_COMPLETA, {tipo, documento})
	}
}

export function searchCreditoSimples(documento) {
    documento = documento.toString().replace(/[^0-9]/g,"")
    let tipo = documento.length > 11 ? "CNPJ" : "CPF"
	let url = documento.length > 11 ? URL_CREDITO_SEARCH_SIMPLES_PJ : URL_CREDITO_SEARCH_SIMPLES_PF
	let data = tipo === "CPF" ? {cpf:documento} : {cnpj:documento};

	return (dispatch) => {
		apiContentType(dispatch, url, data, GET_CREDITO_COMPLETA, {tipo, documento})
	}
}


export function seeModel() {
    return {
        type: SEE_CREDITO_MODEL,
        payload: ""
    }
}