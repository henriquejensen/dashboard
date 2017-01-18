import {
    SEE_FOCOFISCAL_MODEL,
    CLOSE_FOCOFISCAL_MODEL,
    ICON_FOCOFISCAL,
    LOADING_FOCOFISCAL
} from "../constants/constantsFocoFiscal";

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
        case LOADING_FOCOFISCAL: {
            return {
                loading: true,
                status: "loading",
                message: "",
                response: state.response,
                tabActive: state.tabActive
            }
        }
        case SEE_FOCOFISCAL_MODEL:
            response.data = model;
            response.label = model.cadastroPf.Cpf;
            response.tipo = "CPF";
            response.icon = ICON_FOCOFISCAL;
            response.produto = "focofiscal";
            return {
                loading: false,
                status: "model",
                message: "",
                response: [response],
                tabActive: ""
            }

        case CLOSE_FOCOFISCAL_MODEL:
            return getInitialState;
    }

    return state;
}