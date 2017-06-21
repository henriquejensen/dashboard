import * as basecerta from "../constants/constantsBaseCerta";

import { apiFileUpload, apiGet } from "../api/Api";

export function filterBaseCerta(inputFilter) {
    return {
        type: basecerta.GET_LAYOUTS_BASECERTA
    }
}

export function getLayoutsBaseCerta() {
    /*let url = basecerta.URL_GET_LAYOUTS_BASECERTA
    let data = ""
    let search = basecerta.GET_LAYOUTS_BASECERTA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }*/

    return {
        type: basecerta.GET_LAYOUTS_BASECERTA
    }
}

export function getTicketsBaseCerta() {
    /*let url = basecerta.URL_GET_TICKETS_BASECERTA
    let data = ""
    let search = basecerta.GET_TICKETS_BASECERTA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }*/

    return {
        type: basecerta.GET_TICKETS_BASECERTA
    }
}

export function postNovoEnriquecimento({layout, description, file}) {
    return {
        type: basecerta.UPLOAD_NOVO_ENRIQUECIMENTO
    }
}

export function closeMessageErrorBaseCerta() {
    return {
        type: basecerta.CLOSE_MESSAGE_ERROR_BASECERTA
    }
}