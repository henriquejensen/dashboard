import ajax from "superagent";
import { api, apiContentType } from "../api/Api";

import * as focofiscal from "../constants/constantsFocoFiscal";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function changeTab(index) {
	return {
		type: focofiscal.CHANGE_TAB_FOCOFISCAL,
		payload: index
	}
}

export function closeMessageErrorFocoFiscal() {
	return {
		type: focofiscal.CLOSE_MESSAGE_ERROR_FOCOFISCAL,
		payload: "close"
	}
}

export function closeTab(tab) {
    return {
        type: focofiscal.CLOSE_TAB_FOCOFISCAL,
        payload: tab
    }
}

export function getLastQueries() {
    return {
        type: focofiscal.GET_FOCOFISCAL_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function loadingFocoFiscal() {
    return {
        type: focofiscal.LOADING_FOCOFISCAL,
        payload: "loading"
    }
}

export function searchByFocoFiscal(documento) {
	let data = {documento}
	let url = focofiscal.URL_FOCOFISCAL_SEARCH

	return (dispatch) => {
		apiContentType(dispatch, url, data, focofiscal.FETCH_FOCOFISCAL, {tipo:"CNPJ"})
	}
}

export function searchByReceitaPF(documento, dataNascimento) {
	let data = {documento,dataNascimento}
	let url = focofiscal.URL_FOCOFISCAL_SEARCH_RECEITAPF

	return (dispatch) => {
		apiContentType(dispatch, url, data, focofiscal.FETCH_FOCOFISCAL, {tipo:"CPF"})
	}
}

export function searchBySintegraUnificada(documento, estado) {
	let data = {documento,"uf":estado}
	let url = focofiscal.URL_FOCOFISCAL_SEARCH_SINTEGRAUNIFICADA

	return (dispatch) => {
		apiContentType(dispatch, url, data, focofiscal.FETCH_FOCOFISCAL, {tipo:"CNPJ"})
	}
}

export function seeModel() {
    return {
        type: focofiscal.SEE_FOCOFISCAL_MODEL
    }
}