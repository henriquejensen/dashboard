import {
    CLOSE_MESSAGE_ERROR_VEICULOS,
    CLOSE_VEICULOS_MODEL,
    ICON_VEICULOS,
    GET_FOCOFISCAL,
    GET_VEICULOS_LAST_QUERIES,
    LOADING_VEICULOS,
    SEE_VEICULOS_MODEL
} from "../constants/constantsVeiculos";

import { CHANGE_TAB, CHANGE_VEICULOS_TYPE, CLOSE_TAB, ERR_CONNECTION_REFUSED, ERROR_503, REQUEST_ERROR } from "../constants/utils";

import model from "./data/jsonPadrao.json";
import lastQueries from "./data/lastQueries.json";

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: "",
    tabActive: "",
    lastQueries: [],
    type: ""
}

export default function(state=getInitialState, action) {
    let response = {
        data: "",
        label: "",
        tipo: "",
        icon: "",
        produto: ""
    }

    switch(action.type) {
        case CHANGE_VEICULOS_TYPE:
            return {
                status: "changeType",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActiv,
                lastQueries: state.lastQueries,
                type: action.payload.toUpperCase()
            }

        case CLOSE_MESSAGE_ERROR_VEICULOS:
            return {
                status: "",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }

        case CLOSE_VEICULOS_MODEL:
            return {
                loading: false,
                status: "closeModel",
                message: "",
                response: "",
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }

        case ERR_CONNECTION_REFUSED:
            return {
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }    

        case GET_VEICULOS_LAST_QUERIES:
            return {
                loading: false,
                status: "lastQueries",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: lastQueries.veiculos,
                type: state.type
            }

        case LOADING_VEICULOS:
            return {
                loading: true,
                status: "loading",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }

        case SEE_VEICULOS_MODEL:
            response.data = model;
            response.label = model.cadastroPf.cpf;
            response.tipo = "CPF";
            response.icon = ICON_FOCOFISCAL;
            response.produto = "focofiscal";
            return {
                loading: false,
                status: "model",
                message: "",
                response: [response],
                tabActive: model.cadastroPf.cpf,
                lastQueries: state.lastQueries,
                type: state.type
            }
    }

    return state;
}