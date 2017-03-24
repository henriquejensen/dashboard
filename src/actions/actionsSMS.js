import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";

export function getCampanhasSMS() {
	return {
		type: GET_CAMPANHAS_SMS,
		payload: ""
	}
}

export function getCentroCustoSMS() {
	return {
		type: GET_CENTRO_CUSTO_SMS,
		payload: ""
	}
}

export function getRespostasSMS() {
	return {
		type: GET_RESPOSTAS_SMS,
		payload: ""
	}
}