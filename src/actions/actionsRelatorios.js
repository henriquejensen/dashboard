import * as constants from "../constants/constantsRelatorios"
import { TI } from "../constants/utils"

import { apiPostFileDownload } from "../api/Api"

export function getRelatorios() {
    return {
        type: constants.GET_RELATORIOS
    }
}

export function filterRelatorio(filters) {
    let url = constants.URL_DOWNLOAD_RELATORIOS
    let search = "FILTER_RELATORIO"
    let data = filters
    let filename = filters.idRelatorio + ".csv"

    return (dispatch) => {
        apiPostFileDownload(dispatch, url, data, filename, search)
    }
}