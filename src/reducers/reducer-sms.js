import { GET_CAMPANHAS_SMS, GET_CENTRO_CUSTO_SMS, GET_RESPOSTAS_SMS } from "../constants/constantsSMS";

import campanhasSMS from "./data/sms/campanhas.json";

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
            return campanhasSMS.campanhas;

        case GET_CENTRO_CUSTO_SMS:
            return campanhasSMS.campanhas;

        case GET_RESPOSTAS_SMS:
            return respostas;
    }

    return state;
}