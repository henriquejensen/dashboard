import * as sms from "../constants/constantsSMS";

import { api, apiGet } from "../api/Api";

export function closeSMSMessage() {
	return {
		type: sms.CLOSE_SMS_MESSAGE,
	}
}

export function filterResponstasSMS({ id, campanha, dataInicio, dataFim, cliente, usuario, limitar }) {
    let url = sms.URL_GET_RESPOSTAS
	let data = "?"
	data = data + ( id ? `id=${id}` : "" )
	data = data + ( campanha ? (data.length > 1 ? "&" : "") + `campanha=${campanha}` : "" )
	data = data + ( dataInicio ? (data.length > 1 ? "&" : "") + `dataInicio=${dataInicio}` : "" )
	data = data + ( dataFim ? (data.length > 1 ? "&" : "") + `dataFim=${dataFim}` : "" )
	data = data + ( cliente ? (data.length > 1 ? "&" : "") + `cliente=${cliente}` : "" )
	data = data + ( usuario ? (data.length > 1 ? "&" : "") + `usuario=${usuario}` : "" )
    data = data + ( limitar ? (data.length > 1 ? "&" : "") + `numPageSize=${limitar}` : "" )
    let search = sms.FILTER_RESPONSE_SMS

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
	}
}

export function filterCampanhasSMS({ id, campanha, dataInicio, dataFim, cliente, usuario, limitar }) {
    let url = sms.URL_GET_CAMPANHAS
    let data = "?"
	data = data + ( id ? `id=${id}` : "" )
	data = data + ( campanha ? (data.length > 1 ? "&" : "") + `campanha=${campanha}` : "" )
	data = data + ( dataInicio ? (data.length > 1 ? "&" : "") + `dataInicio=${dataInicio}` : "" )
	data = data + ( dataFim ? (data.length > 1 ? "&" : "") + `dataFim=${dataFim}` : "" )
	data = data + ( cliente ? (data.length > 1 ? "&" : "") + `cliente=${cliente}` : "" )
	data = data + ( usuario ? (data.length > 1 ? "&" : "") + `usuario=${usuario}` : "" )
    data = data + ( limitar ? (data.length > 1 ? "&" : "") + `numPageSize=${limitar}` : "" )
    let search = sms.FILTER_CAMPANHAS_SMS

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
	}
}

export function filterDetalhesCampanha({numero=null, status=null, id}) {
    let url = sms.URL_GET_DETALHES_CAMPANHA
    let data = "?"
	data = data + ( id ? `id=${id}` : "" )
	data = data + ( numero ? (data.length > 1 ? "&" : "") + `numero=${numero}` : "" )
	data = data + ( status ? (data.length > 1 ? "&" : "") + `status=${status}` : "" )
    let search = sms.FILTER_DETALHES_CAMPANHA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
	}
}

export function getCampanhasSMS() {
    let url = sms.URL_GET_CAMPANHAS
    let data = ""
    let search = sms.GET_CAMPANHAS_SMS

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function getCentroCustoSMS() {
	return {
		type: sms.GET_CENTRO_CUSTO_SMS,
	}
}

export function getDetalhesCampanha(idCampanha) {
    let url = sms.URL_GET_DETALHES_CAMPANHA
    let data = `?id=${idCampanha}`
    let search = sms.GET_DETALHES_CAMPANHA

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function getRespostasSMS() {
    let url = sms.URL_GET_RESPOSTAS
    let data = ""
    let search = sms.GET_RESPOSTAS_SMS

    return (dispatch) => {
        apiGet(dispatch, url, data, search)
    }
}

export function loadingSMS() {
	return {
		type: sms.SMS_LOADING
	}
}

export function sendSMSRapido(request) {
    let url = sms.URL_SEND_SMS
    let data = request
    let search = sms.SEND_SMS_RAPIDO

    return (dispatch) => {
        api(dispatch, url, data, search)
    }

	/*return {
		type: sms.SEND_SMS_RAPIDO
	}*/
}