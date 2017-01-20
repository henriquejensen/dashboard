import {
    CHANGE_TAB_CREDITO,
    CLOSE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    ICON_CREDITO,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL
} from "../constants/constantsCredito";

import { REQUEST_ERROR, ERR_CONNECTION_REFUSED, CHANGE_TAB, CLOSE_TAB } from "../constants/utils";

import model from "./data/jsonPadraoCredito.json";
import modelCNPJ from "./data/jsonPadraoCreditoCNPJ.json";

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: "",
    tabActive: ""
}

export default function(state=getInitialState, action) {
    let response = {
        data: "",
        label: "",
        tipo: "",
        icon: "",
        produto: ""
    };

    let responseCNPJ = {
        data: "",
        label: "",
        tipo: "",
        icon: "",
        produto: ""
    }

    switch(action.type) {
        case LOADING_CREDITO: {
            return {
                loading: true,
                status: "loading",
                message: "",
                response: state.response,
                tabActive: state.tabActive
            }
        }
        case SEE_CREDITO_MODEL:
            response.data = model;
            response.label = model.cadastroPf.cpf;
            response.tipo = "CPF";
            response.icon = ICON_CREDITO;
            response.produto = "credito";

            responseCNPJ.data = modelCNPJ;
            responseCNPJ.label = modelCNPJ.cadastroPj.cnpj;
            responseCNPJ.tipo = "CNPJ";
            responseCNPJ.icon = ICON_CREDITO;
            responseCNPJ.produto = "credito";
            return {
                loading: false,
                status: "model",
                message: "",
                response: [response, responseCNPJ],
                tabActive: ""
            }

        case CLOSE_CREDITO_MODEL:
            return getInitialState;

        case CHANGE_TAB_CREDITO:
            return {
                loading: false,
                status: "changeTab",
                message: "",
                response: state.response,
                tabActive: action.payload
            }

        case CLOSE_TAB_CREDITO:
            let newResponse = state.response.concat();
            let closed = newResponse.splice(action.payload, 1);

            return {
                status: "closeTab",
                message: "",
                loading: false,
                response: newResponse,
                tabActive: ""
            }
    }

    return state;
}