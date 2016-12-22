import { GET_CAMPANHAS_SMS } from "../constants/constantsSMS";

const campanhasSMS = [
    [1077907, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077752, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 1, ""],
    [1077648, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077549, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077547, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 1, ""],
    [1077648, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""],
    [1077213, "Grupo: ASS_INTERNO_API_SP,Grupo: API_SP", "SMS Web Service", "22/12/16 12:39", "Padrão", "Curto, Web Service", 0, ""]
]

export default function(state = campanhasSMS, action) {
    switch(action.type) {
        case GET_CAMPANHAS_SMS:
            return state;
    }

    return state;
}