import * as sms from "../constants/constantsSMS";

import { api, apiGet } from "../api/Api";

export function closeSMSMessage() {
	return {
		type: sms.CLOSE_SMS_MESSAGE,
	}
}

export function filterResponseSMS(request) {
	return {
		type: sms.FILTER_RESPONSE_SMS,
		payload: request
	}
}

export function filterCampanhasSMS(request) {
	return {
		type: sms.FILTER_CAMPANHAS_SMS,
		payload: request
	}
}

export function filterDetalhesCampanha({numero=null, status=null, id}) {
	return {
		type: sms.FILTER_DETALHES_CAMPANHA,
		payload: { numero, status, id }
	}
}

export function getCampanhasSMS() {
	return {
		type: sms.GET_CAMPANHAS_SMS,
	}
}

export function getCentroCustoSMS() {
	return {
		type: sms.GET_CENTRO_CUSTO_SMS,
	}
}

export function getDetalhesCampanha(idCampanha) {
	return {
		type: sms.GET_DETALHES_CAMPANHA,
		payload: idCampanha
	}
}

export function getRespostasSMS() {
	return {
		type: sms.GET_RESPOSTAS_SMS,
		payload: ""
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