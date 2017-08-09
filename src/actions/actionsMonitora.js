import * as constantsMonitora from "../constants/constantsMonitora"
import request from "superagent"
import { apiContentType, apiGet, api } from "../api/Api"

export function getCarteiras() {
    const url = constantsMonitora.URL_CARREGAR_CARTEIRAS
    const search = constantsMonitora.GET_CARTEIRAS_MONITORA

    return (dispatch) => {
        apiGet(dispatch, url, "", search)
    }
}

export function getDocumentos(idCarteira, carteiraNome, tipo) {
    const idTipo = tipo == "CPF" ? 1 : 2
    const url = constantsMonitora.URL_CARREGAR_DOCUMENTOS_CARTEIRA
    const data = {idCarteira}
    const search = constantsMonitora.GET_DOCUMENTOS_CARTEIRA_MONITORA

    return (dispatch) => {
        apiContentType(dispatch, url, data, search, {idCarteira, carteiraNome})
    }
}

export function verDocumentoDetalhes({idCarteira, idDocumento}) {
    const url = constantsMonitora.URL_DETALHES_DOCUMENTO_CARTEIRA
    const data = {idCarteira, idDocumento}
    const search = constantsMonitora.VISUALIZAR_DOCUMENTOS_CARTEIRA_MONITORA

    return (dispatch) => {
        apiContentType(dispatch, url, data, search)
    }
}

export function loadingMonitora() {
    return {
        type: constantsMonitora.LOADING_MONITORA
    }
}

export function novoDocumento({idCarteira, documento, cep}) {
    const url = constantsMonitora.URL_ADICIONAR_DOCUMENTO_CARTEIRA
    const data = {idCarteira, documento, cep}
    const search = constantsMonitora.NOVO_DOCUMENTO_MONITORA

    return (dispatch) => {
        apiContentType(dispatch, url, data, search, {idCarteira, documento, cep})
    }    
}

export function novaCarteira(carteira) {
    const url = carteira.id ? constantsMonitora.URL_EDITAR_CARTEIRA : constantsMonitora.URL_ADICIONAR_CARTEIRA
    const data = carteira
    const search = constantsMonitora.NOVA_CARTEIRA_MONITORA

    return (dispatch) => {
        api(dispatch, url, data, search)
    }    

}

export function removerCarteira(idCarteira) {
    const url = constantsMonitora.URL_REMOVER_CARTEIRA
    const data = {idCarteira}
    const search = constantsMonitora.GET_CARTEIRAS_MONITORA

    return (dispatch) => {
        apiContentType(dispatch, url, data, search)
    }
}

export function removerDocumento(idDocumento, documento) {
    const idTipo = documento.length > 11 ? 2 : 1
    const url = constantsMonitora.URL_REMOVER_DOCUMENTO_CARTEIRA
    const data = {idDocumento, idTipo}
    const search = constantsMonitora.GET_DOCUMENTOS_MONITORA

    return (dispatch) => {
        apiContentType(dispatch, url, data, search)
    }
}