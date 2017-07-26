import request from "superagent"
import FileSaver from "file-saver"

import { AUTHENTICATION } from "../constants/utils"

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
        .set('authorization', localStorage.getItem(AUTHENTICATION))
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function api(dispatch, url, data, search, parameters) {
    request.post(url)
        .send(data)
        .set({authorization: localStorage.getItem(AUTHENTICATION)})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiPut(dispatch, url, data, search, parameters) {
    request.put(url)
        .send(data)
        .set({authorization: localStorage.getItem(AUTHENTICATION)})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiGet(dispatch, url, data, search, parameters) {
    request.get(url+`${data}`)
        .set({authorization: localStorage.getItem(AUTHENTICATION)})
        .end(function(error, response) {
            onEndRequestFunction(error, response, dispatch, search, parameters)
        })
}

export function apiGetWithKeySession(dispatch, url, data, search, parameters) {
    request.get(url+`${data}`)
        .set({keySession: localStorage.getItem(AUTHENTICATION)})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiWithKeySession(dispatch, url, data, search, parameters) {
    request.post(url)
        .send(data)
        .set({keySession: localStorage.getItem(AUTHENTICATION)})
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiFileUpload(dispatch, url, file, data, search, parameters) {
    request
        .post(url)
        .field(data)
        .attach(file.name, file.file)
        .set('authorization', localStorage.getItem(AUTHENTICATION))
        .end(function(error, response) {
            onEndRequest(error, response, dispatch, search, parameters)
        })
}

export function apiFileDownload(dispatch, url, filename, search) {
    request
        .get(url)
        .responseType('blob')
        .set('authorization', localStorage.getItem(AUTHENTICATION))
        .end(function(error, response) {
            try{
                onEndRequest(error, response, dispatch, search, FileSaver.saveAs(response.body, filename))
            } catch(e) {
                onEndRequest(error, response, dispatch, search, e)
            }
        })
}

export function apiPostFileDownload(dispatch, url, data, filename, search) {
    request
        .post(url)
        .send(data)
        .responseType('blob')
        .set('authorization', localStorage.getItem(AUTHENTICATION))
        .end(function(error, response) {
            try{
                onEndRequest(error, response, dispatch, search, FileSaver.saveAs(response.body, filename))
            } catch(e) {
                onEndRequest(error, response, dispatch, search, e)
            }
        })
}

function onEndRequest(error, response, dispatch, search, parameters) {
    if (response) {
        if(response.status === 200) {
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
            dispatch({type: ERROR_401_UNAUTHORIZED, payload: response.body.erro || ERROR_401_UNAUTHORIZED_MESSAGE})
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

//Funcao que não verifica se existe um body, apenas o retorno 200
function onEndRequestFunction(error, response, dispatch, search, parameters) {
    if (response) {
        if(response.status === 200) {
            dispatch({
                type: search,
                payload: {
                    response: response.body || window.open(response, "_blank"),
                    parameters: parameters
                }
            })
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