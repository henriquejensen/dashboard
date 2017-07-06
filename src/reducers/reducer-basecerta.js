//Constants
import * as basecerta from "../constants/constantsBaseCerta";
import { ERR_CONNECTION_REFUSED, ERROR_503, MESSAGE_SUCCES_FILE_UPLOAD, REQUEST_ERROR, SUCCESS } from "../constants/utils";

import tickets from "./data/basecerta/tickets.json";

const getInitialState = {
    status:"",
    message:"",
    tickets: [],
    layouts: [],
    loading: false
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case basecerta.CLOSE_MESSAGE_ERROR_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: state.tickets,
                layouts: state.layouts,
                loading: false
            }
        }

        case basecerta.GET_DOCUMENTO_ENTRADA_BASECERTA: {
            return {
                documentoSaida: action.payload.response,
                status: "",
                message: "",
                tickets: state.tickets,
                layouts: state.layouts,
                loading: false
            }
        }

        case basecerta.GET_LAYOUTS_BASECERTA: {
            let layouts = action.payload.response.response
            localStorage.setItem(basecerta.GET_LAYOUTS_BASECERTA, JSON.stringify(layouts))
            
            return {
                status:"",
                message:"",
                tickets: state.tickets,
                layouts: layouts.map((layout) => {return { label: layout.descricaoLayout, value: layout.idLayout }}),
                loading: false
            }
        }

        case basecerta.GET_TICKETS_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: action.payload.response.response,
                layouts: state.layouts,
                loading: false
            }
        }

        case basecerta.LOADING_BASECERTA: {
            return {
                status:"",
                message:"",
                tickets: state.response,
                layouts: state.layouts,
                loading: true
            }
        }

        case basecerta.UPLOAD_NOVO_ENRIQUECIMENTO: {
            return {
                status: SUCCESS,
                message: MESSAGE_SUCCES_FILE_UPLOAD,
                tickets: action.payload.response.response,
                layouts: state.layouts,
                loading: false
            }
        }

        case REQUEST_ERROR: {
            return {
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                tickets: state.tickets,
                layouts: state.layouts,
                loading: false
            }
        }

        case ERR_CONNECTION_REFUSED: {
            return {
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                tickets: state.tickets,
                layouts: state.layouts,
                loading: false
            }
        }
    }

    return state;
}

function patternLayoutsToLabelAndValue(layouts) {
    return 
}