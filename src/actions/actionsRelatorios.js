import * as constants from "../constants/constantsRelatorios"
import { TI } from "../constants/utils"

import { api, apiPostFileDownload } from "../api/Api"

export function getRelatorios() {
    return {
        type: constants.GET_RELATORIOS
    }
}

export function filterRelatorio(filters) {
    let url = constants.URL_DOWNLOAD_RELATORIOS
    let search = constants.FILTER_RELATORIO
    let data = filters
    let filename = filters.idRelatorio + ".csv"

    return (dispatch) => {
        apiPostFileDownload(dispatch, url, data, filename, search)
    }
}

export function filterRelatorioR12(filters) {
    let url = constants.URL_DOWNLOAD_RELATORIO_R12
    let search = constants.FILTER_RELATORIO_R12
    let data = filters

    return (dispatch) => {
        api(dispatch, url, data, search)
    }
}

export function loadingRelatorio () {
    return {
        type: constants.LOADING_RELATORIO
    }
}