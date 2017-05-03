import ajax from "superagent";

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
    ajax.post(url)
        .send(data)
        .set({'Content-Type': 'application/x-www-form-urlencoded',authorization: localStorage.getItem("token")})
        .end(function(error, response) {
            if (response) {
                if(response.status == 200) {
                    if(!response.body.erro && response.body[Object.keys(response.body)[1]]) {
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
                            payload: {mensagem: response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
                        });
                    }
                } else if(response.status == 401) {
                    dispatch({type: ERROR_401_UNAUTHORIZED, payload: ERROR_401_UNAUTHORIZED_MESSAGE})
                } else {
                    dispatch({
                        type: REQUEST_ERROR,
                        payload: {mensagem: response.body ? response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO : NENHUM_REGISTRO}
                    });
                }
            } else {
                dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
            }
        })

}

export function api(dispatch, url, data, search, parameters) {
    ajax.post(url)
        .send(data)
        .set({authorization: localStorage.getItem("token")})
        .end(function(error, response) {
            if (response) {
                if(response.status == 200) {
                    /**Verifica se a response veio sem erro e possui conteudo no body, tem que ter mais que o cabecalho */
                    if(!response.body.erro && response.body[Object.keys(response.body)[1]]) {
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
                            payload: {mensagem: response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO}
                        });
                    }
                } else if(response.status == 401) {
                    dispatch({type: ERROR_401_UNAUTHORIZED, payload: ERROR_401_UNAUTHORIZED_MESSAGE})
                } else {
                    dispatch({
                        type: REQUEST_ERROR,
                        payload: {mensagem: response.body ? response.body.erro ? response.body.erro.mensagem : NENHUM_REGISTRO : NENHUM_REGISTRO}
                    });
                }
            } else {
                dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
            }
        })

}