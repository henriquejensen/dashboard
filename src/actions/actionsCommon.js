import ajax from "superagent";

import { apiContentType, api } from "../api/Api";

import {
		CHANGE_COLOR_MENU,
		CLOSE_MESSAGE_CHANGE_PASSWORD,
		INFO_URL,
		INFO_ERROR,
		INFO_SUCCESS,
		LOGIN_SUCCESS,
		LOGIN_ERROR,
		LOG_OUT,
		LOADING,
		AUTH_URL,
		AUTHENTICATION,
		REQUEST_CHANGE_PASSWORD,
		RESET_CHANGE_PASSWORD,
		URL_REQUEST_CHANGE_PASSWORD,
		URL_RESET_CHANGE_PASSWORD
} from "../constants/utils";

import { apiWithKeySession } from "../api/Api";

/* Muda o tipo do produto, ex: Localizel, tipo cpf ao clicar em cnpj muda para cnpj */
export function changeProductType(product, type) {
	return {
		type: "CHANGE_" + product.toUpperCase() + "_TYPE",
		payload: type
	}
}

export function changeColorMenu(color) {
    return {
        type: CHANGE_COLOR_MENU,
        payload: color
    }
}

export function closeChangePasswordMessage(color) {
    return {
        type: CLOSE_MESSAGE_CHANGE_PASSWORD
    }
}

export function getUserData() {
	let url = INFO_URL;
	let data = {};
	let search = INFO_SUCCESS;

	return (dispatch) => {
		apiWithKeySession(dispatch, url, data, search)
	}
}

export function authUser(empresa, user, senha) {
	return (dispatch) => {
		ajax.post(AUTH_URL)
			.type('form')
			.send({ empresa: empresa, usuario: user, senha: senha})
			.end(function(err, res) {
				if (err || !res.ok) {
					dispatch({type: LOGIN_ERROR, payload: res.body})
				} else {
					localStorage.setItem(AUTHENTICATION, res.body.response);
					dispatch({type: LOGIN_SUCCESS, payload: res.body})
				}
			})
	}
}

export function logOut() {
	localStorage.removeItem(AUTHENTICATION);
	return {
		type: LOG_OUT,
		payload: "logout"
	}
}

export function loading() {
	return {
		type: LOADING,
		payload: "loading"
	}
}

export function requestChangePassword(empresa, usuario) {
	let url = URL_REQUEST_CHANGE_PASSWORD
	let data = { usuario, empresa }
	let search = REQUEST_CHANGE_PASSWORD
	return (dispatch) => {
		apiContentType(dispatch, url, data, search)
	}
}

export function resetChangePassword({ empresa, usuario, password, key }) {
	let url = URL_RESET_CHANGE_PASSWORD
	let data = { empresa, usuario, password, key }
	let search = RESET_CHANGE_PASSWORD
	return (dispatch) => {
		apiContentType(dispatch, url, data, search)
	}
}