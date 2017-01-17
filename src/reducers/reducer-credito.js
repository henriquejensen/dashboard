import {
    SEE_CREDITO_MODEL,
    CLOSE_CREDITO_MODEL,
    ICON_CREDITO,
    LOADING_CREDITO
} from "../constants/constantsCredito";

import { REQUEST_ERROR, ERR_CONNECTION_REFUSED, CHANGE_TAB, CLOSE_TAB } from "../constants/utils";

import model from "./data/jsonPadrao.json";

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
            response.label = model.baseCpfCadastral.documento;
            response.tipo = "CPF";
            response.icon = ICON_CREDITO;
            response.produto = "credito";
            return {
                loading: false,
                status: "seeModel",
                message: "",
                response: [response],
                tabActive: ""
            }

        case CLOSE_CREDITO_MODEL:
            return getInitialState;
    }

    return state;
}