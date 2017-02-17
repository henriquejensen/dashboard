import {
    CLOSE_TAB_CREDITO,
    CLOSE_CREDITO_MODEL,
    LOADING_CREDITO,
    SEE_CREDITO_MODEL,
    GET_CREDITO_LAST_QUERIES,
    CHANGE_TAB_CREDITO
} from "../constants/constantsCredito";
import {
    CHANGE_CREDITO_TYPE,
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
    response: [],
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
                type: state.type
            }

        case LOADING_CREDITO:
            return {
                loading: true,
                status: "loading",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
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
                tabActive: model.cadastroPf.cpf,
                lastQueries: state.lastQueries,
                type: state.type
            }

        case CLOSE_CREDITO_MODEL:
            return {
                status: "closeModel",
                message: "",
                loading: false,
                response: [],
                tabActive: "",
                lastQueries: state.lastQueries,
                type: state.type
            }

        case CLOSE_TAB_CREDITO:
            let newResponse = state.response.concat();
            let closed = newResponse.splice(action.payload, 1);

            return {
                status: "closeTab",
                message: "",
                loading: false,
                response: newResponse,
                tabActive: newResponse[newResponse.length-1].label,
                lastQueries: state.lastQueries,
                type: state.type
            }
        case CHANGE_CREDITO_TYPE:
            return {
                status: "changeType",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActiv,
                lastQueries: state.lastQueries,
                type: action.payload.toUpperCase()
            }

        case CHANGE_TAB_CREDITO:
            let tab = searchDocument(state.response,action.payload);
            console.log("TAB", tab)
            return {
                status: "changeTab",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.response.length > 0 ? state.response[tab].label : "",
                lastQueries: state.lastQueries,
                type: state.type
            }
    }

    return state;
}

//Busca no array das pessoas pesquisadas o documento passado
function searchDocument(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].label) {
			return i;
		}
	}

	return 0;
}