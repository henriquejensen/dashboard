import * as sms from "../constants/constantsSMS";

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

export function getCampanhasSMS() {
	return {
		type: sms.GET_CAMPANHAS_SMS,
		payload: ""
	}
}

export function getCentroCustoSMS() {
	return {
		type: sms.GET_CENTRO_CUSTO_SMS,
		payload: ""
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
	return {
		type: sms.SEND_SMS_RAPIDO,
		payload: request
	}
}