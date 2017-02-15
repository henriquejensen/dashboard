import {
    CLOSE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
    GET_CREDITO_LAST_QUERIES
} from "../constants/constantsCredito";
import {
    ICON_CREDITO,
} from "../constants/utils";

import { REQUEST_ERROR, ERR_CONNECTION_REFUSED, CHANGE_TAB, CLOSE_TAB } from "../constants/utils";

import model from "./data/jsonPadraoCredito.json";
import modelCNPJ from "./data/jsonPadraoCreditoCNPJ.json";
import lastQueries from "./data/lastQueries.json";

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: "",
    tabActive: "",
    lastQueries: []
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
        case GET_CREDITO_LAST_QUERIES:
            return {
                loading: false,
                status: "lastQueries",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: lastQueries.credito,
            }

        case LOADING_CREDITO:
            return {
                loading: true,
                status: "loading",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries
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
                tabActive: "",
                lastQueries: state.lastQueries
            }

        case CLOSE_CREDITO_MODEL:
            return getInitialState;

        case CLOSE_TAB_CREDITO:
            let newResponse = state.response.concat();
            let closed = newResponse.splice(action.payload, 1);

            return {
                status: "closeTab",
                message: "",
                loading: false,
                response: newResponse,
                tabActive: "",
                lastQueries: state.lastQueries
            }
    }

    return state;
}