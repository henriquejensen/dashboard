//Constants
import * as basecerta from "../constants/constantsBaseCerta";
import { ERR_CONNECTION_REFUSED, MESSAGE_SUCCES_FILE_UPLOAD, REQUEST_ERROR, SUCCESS } from "../constants/utils";

import tickets from "./data/basecerta/tickets.json";

const getInitialState = {
    tickets: [],
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case basecerta.CLOSE_MESSAGE_ERROR_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: state.tickets
            }
        }

        case basecerta.GET_TICKETS_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: tickets.tickets
            }
        }

        case basecerta.UPLOAD_NOVO_ENRIQUECIMENTO: {
            return {
                status: SUCCESS,
                message: MESSAGE_SUCCES_FILE_UPLOAD,
                tickets: state.tickets
            }
        }

        case REQUEST_ERROR: {
            return {
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                tickets: state.tickets
            }
        }

        case ERR_CONNECTION_REFUSED: {
            return {
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                tickets: state.tickets
            }
        }
    }

    return state;
}