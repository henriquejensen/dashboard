import * as basecerta from "../constants/constantsBaseCerta";

import { apiFileUpload } from "../api/Api";

export function getLayoutsBaseCerta() {
    return {
        type: basecerta.GET_LAYOUTS_BASECERTA,
        payload: "tickets"
    }
}

export function getTicketsBaseCerta() {
    return {
        type: basecerta.GET_TICKETS_BASECERTA,
        payload: "tickets"
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