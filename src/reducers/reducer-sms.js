import * as sms from "../constants/constantsSMS"
import { SUCCESS } from "../constants/utils"

import campanhasSMS from "./data/sms/campanhas.json"
import respostas from "./data/sms/respostas.json"
import campanha from "./data/sms/campanhaDetalhes.json"

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false,
    campanhaDetalhes: undefined
}

export default function(state = initialState, action) {
    console.log("REDUCERS", action)
    switch(action.type) {
        case sms.CLOSE_SMS_MESSAGE: {
            return {
                status: "",
                message: "",
                response: state.response,
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
                response: state.response.filter(response => response[propertyToFilter] == parameterToFilter),
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_CAMPANHAS_SMS: {
            return {
                status: "",
                message: "",
                response: campanhasSMS.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_DETALHES_CAMPANHA: {
            console.log("GET_DETALHES_CAMPANHA", campanha, action.payload)
            return {
                status: "",
                message: "",
                response: state.response,
                loading: false,
                campanhaDetalhes: campanha[action.payload] !== undefined ? campanha[action.payload] : []
            }
        }

        case sms.GET_CENTRO_CUSTO_SMS: {
            return {
                status: "",
                message: "",
                response: state.response,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.GET_RESPOSTAS_SMS: {
            return {
                status: "",
                message: "",
                response: respostas.respostas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.SMS_LOADING: {
            return {
                status: "",
                message: "",
                response: state.response,
                loading: true,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.SEND_SMS_RAPIDO: {
            return {
                status: SUCCESS,
                message: sms.MESSAGE_SUCCESS_SMS,
                response: state.response,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }
    }

    return state;
}