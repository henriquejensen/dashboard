import * as constantsCreditoMais from "../../constants/constantsCreditoMais"
import {
        CHANGE_CREDITOMAIS_TYPE,
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
import { ICON_CREDITOMAIS, COMPANY_PRODUCT_CREDITOMAIS_LABEL } from "../../constants/constantsCompany"

//Utils
import { patternCPF, patternCNPJ } from "../../components/utils/functions/patternDocuments"

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
        switch (action.type) {
            case constantsCreditoMais.CHANGE_TAB_CREDITOMAIS: {
                // verifica se a tab passada existe no array, se nao, entao busca a primeira tab e a retorna
                let newTabActive = state.response[action.payload] ? action.payload : state.response[Object.keys(state.response)[0]] ? state.response[Object.keys(state.response)[0]].label : ""

                return {
                    ...state,
                    status: SUCCESS,
                    message: "",
                    loading: false,
                    tabActive: newTabActive,
                }
            }

            case CHANGE_CREDITOMAIS_TYPE: {
                return {
                    ...state,
                    loading: false,
                    status: SUCCESS,
                    type: action.payload.toUpperCase()
                }
            }

            case constantsCreditoMais.CLOSE_TAB_CREDITOMAIS: {
                delete state.response[action.payload]
                return {
                    ...state,
                    loading: false,
                    response: { ...state.response },
                }
            }

            case constantsCreditoMais.CLOSE_MESSAGE_ERROR_CREDITOMAIS: {
                return {
                    ...state,
                    status: "",
                    message: "",
                    loading: false,
                }
            }

            case constantsCreditoMais.FETCH_CREDITOMAIS: {
                let { cpf, cnpj, documento } = action.payload.response.cadastro
                const { tipo } = action.payload.parameters
                if(documento)
                    documento = documento.length <= 11 ? patternCPF(documento) : patternCNPJ(documento)
                else if(cpf) {
                    documento = patternCPF(cpf)
                } else {
                    documento = patternCNPJ(cnpj)
                }

                let newResponse = action.payload.response
                newResponse.cadastro.documento = documento
                let label = tipo + ":" + documento + " - " + newResponse.cabecalho.entrada

                newResponse['label'] = label
                newResponse['tipo'] = tipo
                newResponse['icon'] = ICON_CREDITOMAIS
                newResponse['produto'] = COMPANY_PRODUCT_CREDITOMAIS_LABEL

                return {
                    ...state,
                    loading: false,
                    status: SUCCESS,
                    response: {...state.response, [label]:newResponse },
                    tabActive: label,
                }
            }

            case constantsCreditoMais.LOADING_CREDITOMAIS: {
                return {
                    ...state,
                    loading: true,
                }  
            }

            case constantsCreditoMais.SHOW_CREDITOMAIS_MODEL: {
                let newResponse = model
                const label = "Modelo Consulta"

                newResponse['label'] = label
                newResponse['tipo'] = "CPF"
                newResponse['icon'] = ICON_CREDITOMAIS
                newResponse['produto'] = COMPANY_PRODUCT_CREDITOMAIS_LABEL

                return {
                    ...state,
                    loading: false,
                    response: {...state.response, [label]:newResponse },
                    tabActive: label,
                }
            }

            case constantsCreditoMais.REVER_CONSULTA_CREDITOMAIS: {
                let newResponse
                let  responseServer = action.payload.response.response
                let { cabecalho } = responseServer
                const { modulo } = action.payload.parameters
                const tipo=cabecalho.entrada.length <= 11 ? "CPF" : "CNPJ"
                const label=tipo + ":" + (tipo === "CPF" ? patternCPF(cabecalho.entrada) : patternCNPJ(cabecalho.entrada)) + "REVER-CONSULTA"

                newResponse = responseServer
                newResponse.label = label
                newResponse.tipo = tipo
                newResponse.icon = ICON_CREDITOMAIS
                newResponse.produto = COMPANY_PRODUCT_CREDITOMAIS_LABEL
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