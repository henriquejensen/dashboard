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