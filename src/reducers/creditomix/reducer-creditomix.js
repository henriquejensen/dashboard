import * as constants from "../../constants/constantsCreditoMix"
import {
        CHANGE_CREDITO_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
        ERROR_503,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../../constants/utils"
import { ICON_CREDITOMIX, COMPANY_PRODUCT_CREDITOMIX_LABEL } from "../../constants/constantsCompany"

//Utils
import { patternCPF, patternCNPJ } from "../../components/utils/functions/patternDocuments"
import model from "../data/creditomix/consultaCreditoMix.json"

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: {},
    tabActive: "",
    lastQueries: [],
    type: ""
}

export default function(state=getInitialState, action) {
    switch (action.type) {
        case constants.CHANGE_TAB_CREDITOMIX: {
            // verifica se a tab passada existe no array, se nao, entao busca a primeira tab e a retorna
            let newTabActive = state.response[action.payload] ? action.payload : state.response[Object.keys(state.response)[0]] ? state.response[Object.keys(state.response)[0]].label : ""

            return {
                status: SUCCESS,
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
                status: SUCCESS,
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
            let { cpf, cnpj, documento } = action.payload.response.cadastro
            if(documento)
                documento = documento.length <= 11 ? patternCPF(documento) : patternCNPJ(documento)
            else if(cpf) {
                documento = patternCPF(cpf)
            } else {
                documento = patternCNPJ(cnpj)
            }

            let newResponse = action.payload.response
            newResponse.cadastro.documento = documento
            let label = action.payload.parameters.tipo + ":" + documento

            newResponse['label'] = label
            newResponse['tipo'] = action.payload.parameters.tipo
            newResponse['icon'] = ICON_CREDITOMIX
            newResponse['produto'] = COMPANY_PRODUCT_CREDITOMIX_LABEL

            return {
                loading: false,
                status: SUCCESS,
                message: state.message,
                response: {...state.response, [label]:newResponse },
                tabActive: label,
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

        case constants.SHOW_CREDITOMIX_MODEL: {
            let newResponse = model

            newResponse['label'] = "model"
            newResponse['tipo'] = "CPF"
            newResponse['icon'] = ICON_CREDITOMIX
            newResponse['produto'] = COMPANY_PRODUCT_CREDITOMIX_LABEL

            return {
                loading: false,
                status: "",
                message: "",
                response: {...state.response, ["model"]:newResponse },
                tabActive: "model",
                lastQueries: state.lastQueries,
                type: state.type,
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

        case ERR_CONNECTION_REFUSED: {
            return {
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }

        default:
            return state
    }
}