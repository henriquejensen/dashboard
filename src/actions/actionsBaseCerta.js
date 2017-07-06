import * as basecerta from "../constants/constantsBaseCerta"
import { COMPANY_PRODUCT_BASECERTA_LABEL } from "../constants/constantsCompany"

import { apiFileUpload, apiFileDownload, apiGet, api } from "../api/Api"

export function filterBaseCerta({ ticket="", layout="", clienteLogin="", usuario="", nomeArquivo="", numPage="", limitar="" }) {
    let data = `?ticket=${ticket}&layout=${layout}&clienteLogin=${clienteLogin}&usuario=${usuario}&nomeArquivo=${nomeArquivo}&numPage=${numPage}&numPageSize=${limitar}`
    let url = basecerta.URL_FILTER_BASECERTA
    let search = basecerta.GET_TICKETS_BASECERTA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function getDocumentoSaidaBaseCerta(id) {
    let data = `${id}`
    let url = basecerta.URL_DOWNLOAD_SAIDA+data
    let search = basecerta.GET_DOCUMENTO_SAIDA_BASECERTA
    let filename = COMPANY_PRODUCT_BASECERTA_LABEL + ".zip"

    return (dispatch) => {
        apiFileDownload(dispatch, url, filename, search)
    }
}

export function getDocumentoEntradaBaseCerta(id) {
    let data = `${id}`
    let url = basecerta.URL_DOWNLOAD_ENTRADA+data
    let search = basecerta.GET_DOCUMENTO_ENTRADA_BASECERTA

    return (dispatch) => {
        apiFileDownload(dispatch, url, COMPANY_PRODUCT_BASECERTA_LABEL, search)
    }
}

export function getLayoutsBaseCerta() {
    let url = basecerta.URL_GET_LAYOUTS_BASECERTA
    let data = ""
    let search = basecerta.GET_LAYOUTS_BASECERTA
    let layouts = JSON.parse(localStorage.getItem(basecerta.GET_LAYOUTS_BASECERTA)) || null

    if(!layouts) {
        return (dispatch) => {
            apiGet(dispatch, url, data, search)
        }
    }

    return {
        type: basecerta.GET_LAYOUTS_BASECERTA,
        payload: {
            response: {
                response: layouts
            }
        }
    }
}

export function getTicketsBaseCerta(ticket) {
    let url = basecerta.URL_GET_TICKETS_BASECERTA
    let data =  ticket ? `/filter?ticket=${ticket}` : ""
    let search = basecerta.GET_TICKETS_BASECERTA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function loadingBaseCerta() {
    return {
        type: basecerta.LOADING_BASECERTA
    }
}

export function postNovoEnriquecimento({layout, description, file, mailDNS}) {
    let url = basecerta.URL_UPLOAD_NOVO_ENRIQUECIMENTO
    let data = {layout, description, mailDNS}
    let search = basecerta.UPLOAD_NOVO_ENRIQUECIMENTO

    return (dispatch) => {
        apiFileUpload(dispatch, url, {name:"file", file:file}, data, search)
    }
}

export function closeMessageErrorBaseCerta() {
    return {
        type: basecerta.CLOSE_MESSAGE_ERROR_BASECERTA
    }
}