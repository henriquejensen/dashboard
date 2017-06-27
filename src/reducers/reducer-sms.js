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
            let id = action.payload.id
            let respostaResponse = respostas.respostas

            if(id) {
                respostaResponse = respostaResponse.filter(resposta => resposta.campanha.id == id)
            }

            return {
                status: "",
                message: "",
                respostas: respostaResponse,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.FILTER_CAMPANHAS_SMS: {
            let id = action.payload.id
            let campanhasResponse = campanhasSMS.campanhas

            if(id) {
                campanhasResponse = campanhasResponse.filter(campanha => campanha.id == id)
            }
            
            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: campanhasResponse,
                loading: false,
                campanhaDetalhes: state.campanhaDetalhes
            }
        }

        case sms.FILTER_DETALHES_CAMPANHA: {
            let { numero, status, id } = action.payload
            let campanhaDetalhes = campanha[id]
            let campanhaDetalhesResponse = []

            if(!numero && !status)
                campanhaDetalhesResponse = campanhaDetalhes

            else {
                if(numero && status)
                    campanhaDetalhesResponse = campanhaDetalhes.filter(camp => camp.numero == numero && camp.status == status)
                else if (numero)
                    campanhaDetalhesResponse = campanhaDetalhes.filter(camp => camp.numero == numero)
                else if (status)
                    campanhaDetalhesResponse = campanhaDetalhes.filter(camp => camp.status == status)
            }

            return {
                status: "",
                message: "",
                respostas: state.respostas,
                campanhas: state.campanhas,
                loading: false,
                campanhaDetalhes: campanhaDetalhesResponse
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