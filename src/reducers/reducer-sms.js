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
    switch(action.type) {
        case sms.CLOSE_SMS_MESSAGE: {
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.FILTER_RESPONSE_SMS: {
            let propertyToFilter = Object.keys(action.payload)[0]
            let parameterToFilter = action.payload[propertyToFilter]
            return {
                status: "",
                message: "",
                respostas: state.response.filter(response => response[propertyToFilter] == parameterToFilter),
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_CAMPANHAS_SMS: {
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: campanhasSMS.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_DETALHES_CAMPANHA: {
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: campanha[action.payload] !== undefined ? campanha[action.payload] : []
            }
        }

        case sms.GET_CENTRO_CUSTO_SMS: {
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_RESPOSTAS_SMS: {
            return {
                status: "",
                message: "",
                respostas: respostas.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.SMS_LOADING: {
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: true,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.SEND_SMS_RAPIDO: {
            return {
                status: SUCCESS,
                message: sms.MESSAGE_SUCCESS_SMS,
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }
    }

    return state;
}