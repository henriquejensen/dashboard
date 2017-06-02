import * as smsActions from "../constants/constantsSMS";

export function getCampanhasSMS() {
	return {
		type: smsActions.GET_CAMPANHAS_SMS,
		payload: ""
	}
}

export function getCentroCustoSMS() {
	return {
		type: smsActions.GET_CENTRO_CUSTO_SMS,
		payload: ""
	}
}

export function getRespostasSMS() {
	return {
		type: smsActions.GET_RESPOSTAS_SMS,
		payload: ""
	}
}

export function sendSMSRapido(request) {
	console.log("enviarSMS")
	return {
		type: smsActions.SEND_SMS_RAPIDO,
		payload: request
	}
}