import * as sms from "../constants/constantsSMS";

export function closeSMSMessage() {
	return {
		type: sms.CLOSE_SMS_MESSAGE,
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