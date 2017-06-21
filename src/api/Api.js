import request from "superagent";

import {
		REQUEST_ERROR,
		ERR_CONNECTION_REFUSED,
		NENHUM_REGISTRO,
		ERROR_400_UNAUTHORIZED,
		ERROR_400_UNAUTHORIZED_MESSAGE,
		ERROR_401_UNAUTHORIZED,
		ERROR_401_UNAUTHORIZED_MESSAGE
} from "../constants/utils";

export function apiContentType(dispatch, url, data, search, parameters) {
    request.post(url)
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('authorization', localStorage.getItem("token"))
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function api(dispatch, url, data, search, parameters) {
    request.post(url)
        .send(data)
        .set({authorization: localStorage.getItem("token")})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiGet(dispatch, url, data, search, parameters) {
    request.get(url+`${data}`)
        .set({authorization: localStorage.getItem("token")})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiGetWithKeySession(dispatch, url, data, search, parameters) {
    request.get(url+`${data}`)
        .set({keySession: localStorage.getItem("token")})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiWithKeySession(dispatch, url, data, search, parameters) {
    request.post(url)
        .send(data)
        .set({keySession: localStorage.getItem("token")})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiFileUpload(dispatch, url, data, search, parameters) {
    request
        .post(url)
        .field(data)
        .set('authorization', localStorage.getItem("token"))
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

function onEndRequest(error, response, dispatch, search, parameters) {
    if (response) {
        if(response.status === 200) {
            /**Verifica se o body possui informacao */
            //let valuesBody = response.body ? Object.keys(response.body) : [];
            if(response.body) {
                dispatch({
                    type: search,
                    payload: {
                        response: response.body,
                        parameters: parameters
                    }
                })
            } else {
                /**alguns retornos de json são entregues com as informacoes em null e status 200, por isso a verificacao */
                dispatch({
                    type: REQUEST_ERROR,
                    payload: {mensagem: response.body && response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
                });
            }
        } /*else if(response.status === 400) {
            dispatch({type: "ERROR_400_UNAUTHORIZED", payload: "ERROR_400_UNAUTHORIZED_MESSAGE"})
        }*/ else if(response.status === 401) {
            dispatch({type: ERROR_401_UNAUTHORIZED, payload: ERROR_401_UNAUTHORIZED_MESSAGE})
        } else {
            dispatch({
                type: REQUEST_ERROR,
                payload: {mensagem: response.body && response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
            });
        }
    } else {
        dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
    }
}