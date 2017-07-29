import * as constantsCreditoMais from "../../constants/constantsCreditoMais"
import { api } from "../../api/Api"

export function changeTab(index) {
	return {
		type: constantsCreditoMais.CHANGE_TAB_CREDITOMAIS,
		payload: index
	}
}

export function closeTab(tab) {
    return {
        type: constantsCreditoMais.CLOSE_TAB_CREDITOMAIS,
        payload: tab
    }
}

export function closeMessageErrorCreditoMais() {
    return {
        type: constantsCreditoMais.CLOSE_MESSAGE_ERROR_CREDITOMAIS
    }
}

export function loadingCreditoMais() {
    return {
        type: constantsCreditoMais.LOADING_CREDITOMAIS
    }
}

export function showCreditoMaisModel() {
    return {
        type: constantsCreditoMais.SHOW_CREDITOMAIS_MODEL,
        payload: "model"
    }
}

export function searchCreditoMaisSimples({documento}) {
    const data = {documento}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_SIMPLES_PF : constantsCreditoMais.URL_CREDITOMAIS_SIMPLES_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}

export function searchCreditoMaisAnalitica({documento, cep}) {
    const data = {documento, cep}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_ANALITICA_PF : constantsCreditoMais.URL_CREDITOMAIS_ANALITICA_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}

export function searchCreditoMaisPlus({documento, cep}) {
    const data = {documento, cep}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_PLUS_PF : constantsCreditoMais.URL_CREDITOMAIS_PLUS_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}

export function searchCreditoMaisGold({documento, cep}) {
    const data = {documento, cep}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_GOLD_PF : constantsCreditoMais.URL_CREDITOMAIS_GOLD_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}

export function searchCreditoMaisCorporate({documento}) {
    const data = {documento}
	const url = constantsCreditoMais.URL_CREDITOMAIS_CORPORATE

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo: "CNPJ"})
	}
}

export function searchCreditoMaisSoCheque({documento}) {
    const data = {documento}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_SOCHEQUE_PF : constantsCreditoMais.URL_CREDITOMAIS_SOCHEQUE_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}

export function searchCreditoMaisChequeAnalitica({documento}) {
    const data = {documento}
    const tipo = documento.length <= 11 ? "CPF" : "CNPJ"
	const url = tipo === "CPF" ? constantsCreditoMais.URL_CREDITOMAIS_CHEQUEANALITICA_PF: constantsCreditoMais.URL_CREDITOMAIS_CHEQUEANALITICA_PJ

	return (dispatch) => {
		api(dispatch, url, data, constantsCreditoMais.FETCH_CREDITOMAIS, {tipo})
	}
}