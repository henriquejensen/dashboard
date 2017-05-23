import {
    CHANGE_TAB_VEICULOS,
    CLOSE_MESSAGE_ERROR_VEICULOS,
    CLOSE_TAB_VEICULOS,
    GET_FOCOFISCAL,
    GET_VEICULOS,
    GET_VEICULOS_LAST_QUERIES,
    LOADING_VEICULOS,
    SEE_VEICULOS_MODEL
} from "../constants/constantsVeiculos";

import { COMPANY_PRODUCT_VEICULOS } from "../constants/constantsCompany";
import { CHANGE_VEICULOS_TYPE, CLOSE_TAB, ERR_CONNECTION_REFUSED, ERROR_503, ICON_VEICULOS, LOADING, REQUEST_ERROR } from "../constants/utils";

import veiculos from "./data/veiculos/veiculosPoucosDados.json";
import lastQueries from "./data/lastQueries.json";

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: "",
    tabActive: "",
    lastQueries: [],
    type: "PLACA"
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
        case CHANGE_TAB_VEICULOS: {
            let tab = findLabelInArray(state.response,action.payload);
            tab = tab >= 0 ? tab : 0;

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

        case CHANGE_VEICULOS_TYPE:
            return {
                status: "changeType",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: action.payload.toUpperCase()
            }

        case CLOSE_MESSAGE_ERROR_VEICULOS: {
            return {
                status: "",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        case CLOSE_TAB_VEICULOS: {
            let newResponse = state.response.concat();
            newResponse.splice(action.payload, 1);

            return {
                loading: false,
                status: "closeModel",
                message: "",
                response: newResponse,
                tabActive: newResponse[newResponse.length-1] ? newResponse[newResponse.length-1].label : [],
                lastQueries: state.lastQueries,
                type: state.type
            }
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

        case GET_VEICULOS: {
            let tipo = action.payload.parameters.tipoInput;
            let tab = tipo + ":" + action.payload.parameters.input;
            let responseServer = action.payload.response;
            //Procura no array de pesquisados se ja existe
            let pos = searchLabel(state.response, tab);
            //let newState = state.response.concat();
            let newStateResponse = state.response.concat();

            response.data = responseServer;
            response.label = tab;
            response.tipo = tipo;
            response.icon = ICON_VEICULOS;
            response.produto = COMPANY_PRODUCT_VEICULOS;

            if(pos !== -1) {
                //newState[pos] = response;
                newStateResponse[pos] = response;
            }

            return {
                loading: false,
                status: "model",
                message: "",
                response: pos === -1 ? [...state.response, response] : newStateResponse,
                tabActive: tab,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }
        
        case GET_VEICULOS_LAST_QUERIES: {
            return {
                loading: false,
                status: "lastQueries",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: lastQueries.veiculos,
                type: state.type
            }
        }

        case LOADING_VEICULOS: {
            return {
                loading: true,
                status: LOADING,
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        case SEE_VEICULOS_MODEL: {
            let tipo = action.payload.params.tipo;
            let tab = tipo + ":" + action.payload.params.input;

            response.data = veiculos;
            response.label = tab;
            response.tipo = tipo;
            response.icon = ICON_VEICULOS;
            response.produto = COMPANY_PRODUCT_VEICULOS;
            
            return {
                loading: false,
                status: "model",
                message: "",
                response: [response],
                tabActive: tab,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }
    }

    return state;
}

function searchLabel(list, label) {
	for(let i=0; i<list.length; i++) {
		if(label == list[i].label) {
			return i;
		}
	}

	return -1;
}

function findLabelInArray(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].label) {
			return i;
		}
	}

	return -1;
}