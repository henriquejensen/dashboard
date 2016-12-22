import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";

const campanhasSMS = [
    [1077907, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077752, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 1, ""],
    [1077648, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077549, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077547, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 1, ""],
    [1077648, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077213, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""]
]

const centroCusto = [
    
]

const respostas = [
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [11992080030, "22/12/16 10:05", "teste 123", "Ok", ""],
    [11983246207, "21/12/16 11:28", "Longo", "teste Everton", "Ok", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
    [19997256026, "22/12/16 12:32", "Longo", "Parabens Isadora. Que Deus te abencoe ricamente. [IGREJA BATISTA AMOREIRAS]", "Parabéns Isidoro. Que Deus te abencoe ricamente papai ti am", ""],
]

export default function(state = [], action) {
    switch(action.type) {
        case GET_CAMPANHAS_SMS:
            return campanhasSMS;

        case GET_CENTRO_CUSTO_SMS:
            return centroCusto;

        case GET_RESPOSTAS_SMS:
            return respostas;
    }

    return state;
}