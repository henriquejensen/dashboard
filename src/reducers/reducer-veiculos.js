import * as constantsVeiculos from "../constants/constantsVeiculos"

import { COMPANY_PRODUCT_VEICULOS, ICON_VEICULOS } from "../constants/constantsCompany"
import { CHANGE_VEICULOS_TYPE, CLOSE_TAB, ERR_CONNECTION_REFUSED, ERROR_503, LOADING, REQUEST_ERROR } from "../constants/utils";

import veiculos from "./data/veiculos/veiculosPoucosDados.json"
import lastQueries from "./data/lastQueries.json"

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

    try {
        switch(action.type) {
            case constantsVeiculos.CHANGE_TAB_VEICULOS: {
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

            case CHANGE_VEICULOS_TYPE: {
                return {
                    status: "changeType",
                    message: "",
                    loading: false,
                    response: state.response,
                    tabActive: state.tabActive,
                    lastQueries: state.lastQueries,
                    type: action.payload.toUpperCase()
                }
            }

            case constantsVeiculos.CLOSE_MESSAGE_ERROR_VEICULOS: {
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

            case constantsVeiculos.CLOSE_TAB_VEICULOS: {
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

            case constantsVeiculos.GET_VEICULOS: {
                let { tipo, flagsSelected } = action.payload.parameters
                let responseServer = action.payload.response
                let label = tipo + ":" + action.payload.parameters.input + " - " + flagsSelected.toString()
                //Procura no array de pesquisados se ja existe
                let pos = searchLabel(state.response, label)
                //let newState = state.response.concat()
                let newStateResponse = state.response.concat()

                responseServer.cabecalho.flagsSelecionadas = flagsSelected

                response.data = responseServer
                response.label = label
                response.tipo = tipo
                response.icon = ICON_VEICULOS
                response.produto = COMPANY_PRODUCT_VEICULOS

                if(pos !== -1) {
                    //newState[pos] = response
                    newStateResponse[pos] = response
                }

                return {
                    ...state,
                    loading: false,
                    response: pos === -1 ? [...state.response, response] : newStateResponse,
                    tabActive: label
                }
            }
            
            case constantsVeiculos.GET_VEICULOS_LAST_QUERIES: {
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

            case constantsVeiculos.LOADING_VEICULOS: {
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

            case constantsVeiculos.REVER_CONSULTA_VEICULOS: {
                let  responseServer = action.payload.response.response
                let { entrada } = responseServer.cabecalho
                entrada = JSON.parse(entrada)
                const { modulo } = action.payload.parameters
                let tipo, valor
                [tipo,valor] = entrada.chassi ? ["CHASSI", entrada.chassi]
                            : entrada.numeroMotor ? ["N°MOTOR", entrada.numeroMotor]
                            : ["PLACA", entrada.placa]

                const label=tipo + ":" + valor +  + "REVER-CONSULTA"
                responseServer.reverConsulta = true //Boolean para identificar a rever consulta

                response.data = responseServer
                response.label = label
                response.tipo = tipo
                response.icon = ICON_VEICULOS
                response.produto = COMPANY_PRODUCT_VEICULOS

                return {
                    ...state,
                    loading: false,
                    response: [...state.response, response],
                    tabActive: label,
                }
            }

            case constantsVeiculos.SEE_VEICULOS_MODEL: {
                let tipo = action.payload.parameters.tipo
                let tab = tipo + ":" + action.payload.parameters.input

                response.data = veiculos;
                response.label = tab;
                response.tipo = tipo;
                response.icon = ICON_VEICULOS;
                response.produto = COMPANY_PRODUCT_VEICULOS;
                
                return {
                    loading: false,
                    status: "model",
                    message: "",
                    response: [...state.response, response],
                    tabActive: tab,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            default:
                return state
        }
    } catch (e) {
		const { error, status } = action.payload
		return {
			...state,
			loading: false,
			error: true,
			status: ERR_CONNECTION_REFUSED,
			message: error,
		}
    }

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