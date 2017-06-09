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
                layouts: [{label:"360iu", value:"360"}, {label:"A1 VOX", value:"165"}, {label:"311", value:"ABRAZ"}]
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