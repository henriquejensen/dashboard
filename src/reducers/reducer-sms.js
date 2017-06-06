import * as sms from "../constants/constantsSMS"
import { SUCCESS } from "../constants/utils"

import campanhasSMS from "./data/sms/campanhas.json"

const respostas = [
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [11992080030, "22/12/16 10:05", "teste 123", "Ok", ""],
    [11983246207, "21/12/16 11:28", "Longo", "teste Everton", "Ok", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
]

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false
}

export default function(state = initialState, action) {
    console.log("REDUCERS", action)
    switch(action.type) {
        case sms.CLOSE_SMS_MESSAGE: {
            return {
                status: "",
                message: "",
                response: state.response,
                loading: false
            }
        }

        case sms.GET_CAMPANHAS_SMS: {
            return campanhasSMS.campanhas;
        }

        case sms.GET_CENTRO_CUSTO_SMS:
            return campanhasSMS.campanhas;

        case sms.GET_RESPOSTAS_SMS:
            return respostas;

        case sms.SMS_LOADING: {
            return {
                status: "",
                message: "",
                response: state.response,
                loading: true
            }
        }

        case sms.SEND_SMS_RAPIDO: {
            return {
                status: SUCCESS,
                message: sms.MESSAGE_SUCCESS_SMS,
                response: state.response,
                loading: false
            }
        }
    }

    return state;
}