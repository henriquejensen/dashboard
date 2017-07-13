import * as constants from "../../constants/constantsCreditoMix"
import { api } from "../../api/Api";

export function changeTab(index) {
	return {
		type: constants.CHANGE_TAB_CREDITOMIX,
		payload: index
	}
}

export function closeTab(tab) {
    return {
        type: constants.CLOSE_TAB_CREDITOMIX,
        payload: tab
    }
}

export function closeMessageErrorCreditoMix() {
    return {
        type: constants.CLOSE_MESSAGE_ERROR_CREDITOMIX
    }
}


export function loadingCreditoMix() {
    return {
        type: constants.LOADING_CREDITO_MIX
    }
}

export function showCreditoMixModel() {
    return {
        type: constants.SHOW_CREDITOMIX_MODEL,
        payload: "model"
    }
}

export function searchCreditoMix(request, tipo) {
	let data = request
	let url = tipo === "CPF" ? constants.URL_CREDITOMIX_SEARCH_CPF : constants.URL_CREDITOMIX_SEARCH_CNPJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo})
	}
}

export function searchCreditoMixMaster({documento, isCpfOrCnpj, cep}) {
	let data = {documento, cep}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_MASTER_PF : constants.URL_CREDITOMIX_SEARCH_MASTER_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixPremium({documento, isCpfOrCnpj, cep}) {
	let data = {documento, cep}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_PREMIUM_PF : constants.URL_CREDITOMIX_SEARCH_PREMIUM_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixSintetica({documento, isCpfOrCnpj}) {
	let data = {documento}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_SINTETICA_PF : constants.URL_CREDITOMIX_SEARCH_SINTETICA_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixGold({documento, isCpfOrCnpj, cep}) {
	let data = {documento, cep}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_GOLD_PF : constants.URL_CREDITOMIX_SEARCH_GOLD_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixMax({documento, isCpfOrCnpj, cep}) {
	let data = {documento, cep}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_MAX_PF : constants.URL_CREDITOMIX_SEARCH_MAX_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixCompleta({documento, isCpfOrCnpj}) {
	let data = {documento}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_COMPLETA_PF : constants.URL_CREDITOMIX_SEARCH_COMPLETA_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixIntermediariaPlus({documento, isCpfOrCnpj}) {
	let data = {documento}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_INTERMEDIARIAPLUS_PF : constants.URL_CREDITOMIX_SEARCH_INTERMEDIARIAPLUS_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}

export function searchCreditoMixIntermediaria({documento, isCpfOrCnpj}) {
	let data = {documento}
	let url = isCpfOrCnpj === "CPF" ? constants.URL_CREDITOMIX_SEARCH_INTERMEDIARIA_PF : constants.URL_CREDITOMIX_SEARCH_INTERMEDIARIA_PJ

	return (dispatch) => {
		api(dispatch, url, data, constants.FETCH_CREDITOMIX, {tipo:isCpfOrCnpj})
	}
}