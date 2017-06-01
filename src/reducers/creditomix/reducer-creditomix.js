import * as constants from "../../constants/constantsCreditoMix"
import {
        CHANGE_CREDITO_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
		ERR_CONNECTION_REFUSED_MESSAGE,
        ERROR_503,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../../constants/utils";
import { ICON_CREDITOMIX, COMPANY_PRODUCT_CREDITOMIX_LABEL } from "../../constants/constantsCompany"
import model from "../data/creditomix/consultaCreditoMix.json"

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: {},
    tabActive: "",
    lastQueries: {},
    type: ""
}

export default function(state=getInitialState, action) {
    //console.log("ACTIONS", action)
    switch (action.type) {
        case constants.CHANGE_TAB_CREDITOMIX: {
            // verifica se a tab passada existe no array, se nao, entao busca a primeira tab e a retorna
            let newTabActive = state.response[action.payload] ? action.payload : state.response[Object.keys(state.response)[0]] ? state.response[Object.keys(state.response)[0]].label : ""
            return {
                status: "changeTab",
                message: "",
                loading: false,
                response: state.response,
                tabActive: newTabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        case constants.CHANGE_CREDITOMIX_TYPE: {
            return {
                loading: false,
                status: state.status,
                message: state.message,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: action.payload.toUpperCase()
             }
        }

        case constants.CLOSE_TAB_CREDITOMIX: {
            delete state.response[action.payload]
            return {
                status: "closeTab",
                message: "",
                loading: false,
                response: { ...state.response },
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        case constants.CLOSE_MESSAGE_ERROR_CREDITOMIX: {
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

        case constants.FETCH_CREDITOMIX: {            
            let documento = action.payload.response.cadastro.cpf ? action.payload.response.cadastro.cpf : action.payload.response.cadastro.cnpj
            documento = documento.toString()
            let newResponse = action.payload.response

            newResponse['label'] = documento;
            newResponse['tipo'] = action.payload.parameters.tipo;
            newResponse['icon'] = ICON_CREDITOMIX;
            newResponse['produto'] = COMPANY_PRODUCT_CREDITOMIX_LABEL;

            return {
                loading: false,
                status: state.status,
                message: state.message,
                response: {...state.response, [documento]:newResponse },
                tabActive: documento,
                lastQueries: state.lastQueries,
                type: state.type,
             }
        }

        case constants.LOADING_CREDITO_MIX: {
            return {
                status: "loading",
                message: "",
                loading: true,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }  
        }

        case REQUEST_ERROR: {
            return {
                loading: false,
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        case constants.SHOW_CREDITOMIX_MODEL: {
            let newResponse = model

            newResponse['label'] = "model"
            newResponse['tipo'] = "CPF"
            newResponse['icon'] = ICON_CREDITOMIX
            newResponse['produto'] = COMPANY_PRODUCT_CREDITOMIX_LABEL

            return {
                loading: false,
                status: state.status,
                message: state.message,
                response: {...state.response, ["model"]:newResponse },
                tabActive: "model",
                lastQueries: state.lastQueries,
                type: state.type,
             }
        }

        default:
            return state
    }
}