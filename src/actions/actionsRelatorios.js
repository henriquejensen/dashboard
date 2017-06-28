import * as constants from "../constants/constantsRelatorios"
import { TI } from "../constants/utils"

import { apiFileDownload } from "../api/Api"

export function getRelatorios() {
    return {
        type: constants.GET_RELATORIOS
    }
}

export function filterRelatorio(filters) {
    let url = constants.URL_DOWNLOAD_RELATORIOS
    let search = "FILTER_RELATORIO"
    let filename = filters.idRelatorio + ".csv"

    return (dispatch) => {
        apiFileDownload(dispatch, url, filename, search)
    }
}