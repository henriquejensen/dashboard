//Constants
import * as basecerta from "../constants/constantsBaseCerta";
import { ERR_CONNECTION_REFUSED, ERROR_503, MESSAGE_SUCCES_FILE_UPLOAD, REQUEST_ERROR, SUCCESS } from "../constants/utils";

import tickets from "./data/basecerta/tickets.json";

const getInitialState = {
    status:"",
    message:"",
    tickets: [],
    layouts: []
}

let layouts = [
    {
        idLayout: 310,
        descricaoLayout: "360iu"
    },
    {
        idLayout: 165,
        descricaoLayout: "A1 VOX"
    },
    {
        idLayout: 311,
        descricaoLayout: "ABRAZ"
    },
    {
        idLayout: 7,
        descricaoLayout: "Acao-Nectar"
    },
    {
        idLayout: 113,
        descricaoLayout: "Acert Digital"
    },
    {
        idLayout: 421,
        descricaoLayout: "Almeida_Ferraz_Celular_Email"
    },
    {
        idLayout: 391,
        descricaoLayout: "Almeida_Ferraz_Emails"
    },
    {
        idLayout: 415,
        descricaoLayout: "Almeida_Ferraz_PF_Celular_Relacionadas"
    }
]

export default function(state=getInitialState, action) {
    switch(action.type) {
        case basecerta.CLOSE_MESSAGE_ERROR_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: state.tickets,
                layouts: state.layouts
            }
        }

        case basecerta.GET_LAYOUTS_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: tickets.tickets,
                layouts: layouts.map((layout) => {return { label: layout.descricaoLayout, value: layout.idLayout }})
            }
        }

        case basecerta.GET_TICKETS_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: tickets.tickets,
                layouts: state.layouts
            }
        }

        case basecerta.UPLOAD_NOVO_ENRIQUECIMENTO: {
            return {
                status: SUCCESS,
                message: MESSAGE_SUCCES_FILE_UPLOAD,
                tickets: state.tickets,
                layouts: state.layouts
            }
        }

        case REQUEST_ERROR: {
            return {
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                tickets: state.tickets,
                layouts: state.layouts
            }
        }

        case ERR_CONNECTION_REFUSED: {
            return {
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                tickets: state.tickets,
                layouts: state.layouts
            }
        }
    }

    return state;
}

function patternLayoutsToLabelAndValue(layouts) {
    return 
}