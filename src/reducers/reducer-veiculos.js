import {
    SEE_VEICULOS_MODEL,
    CLOSE_VEICULOS_MODEL,
    ICON_VEICULOS,
    LOADING_VEICULOS,
    GET_VEICULOS_LAST_QUERIES
} from "../constants/constantsVeiculos";

import { REQUEST_ERROR, ERR_CONNECTION_REFUSED, CHANGE_TAB, CLOSE_TAB, CHANGE_VEICULOS_TYPE } from "../constants/utils";

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
    }

    return state;
}