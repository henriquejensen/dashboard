import * as constantsMonitora from "../constants/constantsMonitora"
import request from "superagent"
import { apiContentType, apiGet } from "../api/Api"

export function editarCarteira({id}) {
    const url = constantsMonitora.URL_EDITAR_CARTEIRA
    const data = ""
    const search = constantsMonitora.EDITAR_CARTEIRA_MONITORA

    return (dispatch) => {
        request.get(url)
            .set({Authorization: "hashdebug"})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body
                            }
                        })
                    }
                }
            })
    }
}

export function getCarteiras() {
    const url = constantsMonitora.URL_CARREGAR_CARTEIRAS
    const search = constantsMonitora.GET_CARTEIRAS_MONITORA

    return (dispatch) => {
        request.get(url)
            .set({Authorization: "hashdebug"})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body
                            }
                        })
                    }
                }
            })
    }
}

export function getDocumentos() {
    return {
        type: constantsMonitora.GET_DOCUMENTOS_MONITORA
    }
}

export function getDocumentosCarteira(idCarteira, carteiraNome, tipo) {
    debugger
    const idTipo = tipo == "CPF" ? 1 : 2
    const url = constantsMonitora.URL_CARREGAR_DOCUMENTOS_CARTEIRA
    const search = constantsMonitora.GET_DOCUMENTOS_CARTEIRA_MONITORA

    return (dispatch) => {
        request.post(url)
            .send({idCarteira, idTipo})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({Authorization: "hashdebug"})
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body,
                                parameters: {idCarteira, carteiraNome}
                            }
                        })
                    }
                }
            })
    }
}

export function loadingMonitora() {
    return {
        type: constantsMonitora.LOADING_MONITORA
    }
}

export function novoDocumento({idCarteira, documento, cep}) {
    return {
        type: constantsMonitora.NOVO_DOCUMENTO_MONITORA,
        payload: {
            parameters: {idCarteira, documento, cep}
        }
    }
}

export function novaCarteira(carteira) {
    debugger
    const url = constantsMonitora.URL_ADICIONAR_CARTEIRA
    const search = constantsMonitora.NOVA_CARTEIRA_MONITORA

    return (dispatch) => {
        request.post(url)
            .send(carteira)
            .set({Authorization: "hashdebug"})
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body
                            }
                        })
                    }
                }
            })
    }
}

export function removerCarteira(idCarteira) {
    const url = constantsMonitora.URL_REMOVER_CARTEIRA
    const search = constantsMonitora.GET_CARTEIRAS_MONITORA

    return (dispatch) => {
        request.post(url)
            .send({idCarteira})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({Authorization: "hashdebug"})
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body
                            }
                        })
                    }
                }
            })
    }
}

export function removerDocumento(idDocumento, documento) {
    const idTipo = documento.length > 11 ? 2 : 1
    const url = constantsMonitora.URL_REMOVER_DOCUMENTO_CARTEIRA
    const search = constantsMonitora.GET_DOCUMENTOS_MONITORA

    return (dispatch) => {
        request.post(url)
            .send({idDocumento, idTipo})
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set({Authorization: "hashdebug"})
            .end(function(error, response) {
                if (response) {
                    if(response.status === 200) {
                        dispatch({
                            type: search,
                            payload: {
                                response: response.body
                            }
                        })
                    }
                }
            })
    }
}