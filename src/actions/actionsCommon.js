import request from "superagent"
import FileSaver from "file-saver"

import { apiContentType, api, apiGet } from "../api/Api"

import {
		CHANGE_COLOR_MENU,
		CLOSE_MESSAGE_CHANGE_PASSWORD,
		FOTO_URL,
		GET_COOKIE_SESSION,
		GET_USER_PHOTO,
		ERROR,
		INFO_URL,
		INFO_SUCCESS,
		IP_USER,
		LOG_OUT,
		AUTH_URL,
		REQUEST_CHANGE_PASSWORD,
		RESET_CHANGE_PASSWORD,
		SET_COOKIE_SESSION,
		URL_REQUEST_CHANGE_PASSWORD,
		URL_RESET_CHANGE_PASSWORD
} from "../constants/utils"
import * as constantsUser from "../constants/constantsUser"

import { apiWithKeySession } from "../api/Api"

/* Muda o tipo do produto, ex: Localizel, tipo cpf ao clicar em cnpj muda para cnpj */
export function changeProductType(product, type) {
	return {
		type: "CHANGE_" + product + "_TYPE",
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
	let url = INFO_URL
	let data = {}
	let search = INFO_SUCCESS

	return (dispatch) => {
		apiWithKeySession(dispatch, url, data, search)
	}
}

export function getUserPhoto( userId ) {
	let url = FOTO_URL
	let data = `${userId}.jpg`
	let search = GET_USER_PHOTO

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function getCookieSession({ cliente, usuario, senha }) {
    let data = `?empresa=${cliente}&usuario=${usuario}&senha=${senha}`
    let url = GET_COOKIE_SESSION
    let search = SET_COOKIE_SESSION

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function authUser({ cliente, usuario, senha }) {
	let url = AUTH_URL
	let data = { empresa:cliente, usuario, senha }
	let search = constantsUser.GET_USER_TOKEN

	return (dispatch) => {
		apiContentType(dispatch, url, data, search)
	}
}

export function logOut() {
	return {
		type: LOG_OUT
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

export function setAuthFromCookie(auth) {
	return {
		type: constantsUser.GET_USER_TOKEN,
		payload: {
			response: {
				response: auth
			}
		}
	}
}