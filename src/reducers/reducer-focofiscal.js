import * as focofiscal from "../constants/constantsFocoFiscal"
import {
    CHANGE_FOCOFISCAL_TYPE,
    ERR_CONNECTION_REFUSED,
    ERROR_503,
    NENHUM_REGISTRO,
    REQUEST_ERROR
} from "../constants/utils"
import { COMPANY_PRODUCT_FOCOFISCAL_LABEL, ICON_FOCOFISCAL } from "../constants/constantsCompany"

//Data
import focoFiscalPF from "./data/focofiscal/responsePF.json"
import focoFiscalPJ from "./data/focofiscal/responsePJ.json"
import lastQueries from "./data/lastQueries.json"

//Utils
import { patternCPF, patternCNPJ } from "../components/utils/functions/patternDocuments"

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
    try {
        switch(action.type) {
            case focofiscal.CHANGE_TAB_FOCOFISCAL: {
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

            case CHANGE_FOCOFISCAL_TYPE: {
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

            case focofiscal.CLOSE_MESSAGE_ERROR_FOCOFISCAL: {
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

            case focofiscal.CLOSE_TAB_FOCOFISCAL: {
                delete state.response[action.payload]
                return {
                    loading: false,
                    status: "closeModel",
                    message: "",
                    response: { ...state.response },
                    tabActive: state.tabActive,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case focofiscal.FETCH_FOCOFISCAL: {
                let responseIsNull = !action.payload.response.cadastro
                let documento, newResponse, label

                if(!responseIsNull) {
                    const { cpf, cnpj } = action.payload.response.cadastro
                    const tipo = cpf ? "CPF" : "CNPJ"
                    documento = cpf ? cpf : cnpj
                    documento = documento.toString()
                    label = tipo + ":" + documento
                    newResponse = action.payload.response

                    newResponse['label'] = label
                    newResponse['tipo'] = action.payload.parameters.tipo
                    newResponse['icon'] = ICON_FOCOFISCAL
                    newResponse['produto'] = COMPANY_PRODUCT_FOCOFISCAL_LABEL
                }

                return {
                    ...state,
                    loading: false,
                    status: !responseIsNull ? "" : REQUEST_ERROR,
                    message: !responseIsNull ? "" : NENHUM_REGISTRO,
                    response: !responseIsNull ? {...state.response, [label]:newResponse } : state.response,
                    tabActive: !responseIsNull ? label : state.tabActive,
                }
            }

            case focofiscal.GET_FOCOFISCAL_LAST_QUERIES: {
                return {
                    loading: false,
                    status: "lastQueries",
                    message: "",
                    response: state.response,
                    tabActive: state.tabActive,
                    lastQueries: lastQueries.focofiscal,
                    type: state.type
                }
            }

            case focofiscal.LOADING_FOCOFISCAL: {
                return {
                    loading: true,
                    status: "loading",
                    message: "",
                    response: state.response,
                    tabActive: state.tabActive,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case focofiscal.SEE_FOCOFISCAL_MODEL: {
                let responsePF = focoFiscalPF
                responsePF['label'] = "modelPF"
                responsePF['tipo'] = "CPF"
                responsePF['icon'] = ICON_FOCOFISCAL
                responsePF['produto'] = COMPANY_PRODUCT_FOCOFISCAL_LABEL

                let responsePJ = focoFiscalPJ
                responsePJ['label'] = "modelPJ"
                responsePJ['tipo'] = "CNPJ"
                responsePJ['icon'] = ICON_FOCOFISCAL
                responsePJ['produto'] = COMPANY_PRODUCT_FOCOFISCAL_LABEL

                return {
                    loading: false,
                    status: "",
                    message: "",
                    response: {...state.response, ["modelPF"]:responsePF, ["modelPJ"]:responsePJ },
                    tabActive: "modelPF",
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case focofiscal.REVER_CONSULTA_FOCOFISCAL: {
                let newResponse
                let  responseServer = action.payload.response.response
                let { cabecalho } = responseServer
                const { modulo } = action.payload.parameters
                const tipo=cabecalho.entrada.length <= 11 ? "CPF" : "CNPJ"
                const label=tipo + ":" + (tipo === "CPF" ? patternCPF(cabecalho.entrada) : patternCNPJ(cabecalho.entrada)) + "REVER-CONSULTA"

                newResponse = responseServer
                newResponse.label = label
                newResponse.tipo = tipo
                newResponse.icon = ICON_FOCOFISCAL
                newResponse.produto = COMPANY_PRODUCT_FOCOFISCAL_LABEL
                newResponse.reverConsulta = true //Boolean para identificar a rever consulta

                return {
                    ...state,
                    loading: false,
                    response: {...state.response, [label]:newResponse },
                    tabActive: label
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