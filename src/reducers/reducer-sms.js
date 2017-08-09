import * as sms from "../constants/constantsSMS"
import { SUCCESS } from "../constants/utils"

import campanhasSMS from "./data/sms/campanhas.json"
import respostas from "./data/sms/respostas.json"
import campanha from "./data/sms/campanhaDetalhes.json"

const initialState = {
	status: "",
	message: "",
    respostas: [],
	campanhas: [],
	loading: false,
    campanhaDetalhes: undefined
}

export default function(state = initialState, action) {
    try {
        switch(action.type) {
            case sms.CLOSE_SMS_MESSAGE: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.FILTER_RESPONSE_SMS: {
                return {
                    status: "",
                    message: "",
                    respostas: action.payload.response.response,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.FILTER_CAMPANHAS_SMS: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: action.payload.response.response,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.FILTER_DETALHES_CAMPANHA: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: action.payload.response.response
                }
            }

            case sms.GET_CAMPANHAS_SMS: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: action.payload.response.response,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.GET_DETALHES_CAMPANHA: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: action.payload.response.response,
                }
            }

            case sms.GET_CENTRO_CUSTO_SMS: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.GET_RESPOSTAS_SMS: {
                return {
                    status: "",
                    message: "",
                    respostas: action.payload.response.response,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            case sms.SMS_LOADING: {
                return {
                    status: "",
                    message: "",
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: true,
                    campanhaDetalhes: ""
                }
            }

            case sms.SEND_SMS_RAPIDO: {
                return {
                    status: SUCCESS,
                    message: sms.MESSAGE_SUCCESS_SMS,
                    respostas: state.respostas,
                    campanhas: state.campanhas,
                    loading: false,
                    campanhaDetalhes: ""
                }
            }

            default:
                return state
        }
    } catch (e) {
		const { error, status } = action.payload
		return {
			...state,
			loading: false,
			error: true,
			status: ERR_CONNECTION_REFUSED,
			message: error,
		}
    }
}