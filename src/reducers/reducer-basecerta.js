//Constants
import * as basecerta from "../constants/constantsBaseCerta";
import { ERR_CONNECTION_REFUSED, ERROR_503, MESSAGE_SUCCES_FILE_UPLOAD, REQUEST_ERROR, SUCCESS } from "../constants/utils";

import tickets from "./data/basecerta/tickets.json";

const getInitialState = {
    status:"",
    message:"",
    tickets: [],
    layouts: [],
    loading: false,
    ticketDuplicado: null
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case basecerta.CLOSE_MESSAGE_ERROR_BASECERTA: {
            return {
                ...state,
                status:"",
                message:"",
                loading: false
            }
        }

        case basecerta.GET_DOCUMENTO_ENTRADA_BASECERTA: {
            return {
                ...state,
                documentoSaida: action.payload.response,
                status: "",
                message: "",
                loading: false
            }
        }

        case basecerta.GET_LAYOUTS_BASECERTA: {
            let layouts = action.payload.response.response
            localStorage.setItem(basecerta.GET_LAYOUTS_BASECERTA, JSON.stringify(layouts))
            
            return {
                ...state,
                tickets: state.tickets,
                layouts: layouts.map((layout) => {return { label: layout.descricaoLayout, value: layout.idLayout }}),
                loading: false
            }
        }

        case basecerta.GET_TICKETS_BASECERTA: {
            return {
                ...state,
                tickets: action.payload.response.response,
                layouts: state.layouts,
                loading: false
            }
        }

        case basecerta.LOADING_BASECERTA: {
            return {
                ...state,
                loading: true
            }
        }

        case basecerta.UPLOAD_NOVO_ENRIQUECIMENTO: {
            debugger
            const { response } = action.payload.response
            const isDuplicate = response[0].idDuplicado && response[0].status == 18
            return {
                status: isDuplicate ? basecerta.UPLOAD_NOVO_ENRIQUECIMENTO : SUCCESS,
                message: MESSAGE_SUCCES_FILE_UPLOAD,
                tickets: isDuplicate ? state.tickets : response,
                ticketDuplicado: response[0].id,
                layouts: state.layouts,
                loading: false
            }
        }

        case REQUEST_ERROR: {
            return {
                ...state,
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                loading: false
            }
        }

        case ERR_CONNECTION_REFUSED: {
            return {
                ...state,
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                loading: false
            }
        }
    }

    return state;
}

function patternLayoutsToLabelAndValue(layouts) {
    return 
}