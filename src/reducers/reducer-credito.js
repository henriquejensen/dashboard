import * as constantsCredito from "../constants/constantsCredito"

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
} from "../constants/utils"

import {
    COMPANY_PRODUCT_CREDITO,
    COMPANY_PRODUCT_LOCALIZE,
    ICON_CREDITO,
    ICON_LOCALIZE
} from "../constants/constantsCompany"

import { patternCPF, patternCNPJ } from "../components/utils/functions/patternDocuments"

import model from "./data/credito/consultaCPF.json"
import modelCNPJ from "./data/credito/consultaCNPJ.json"
import lastQueries from "./data/lastQueries.json"

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: [],
    tabActive: "",
    lastQueries: {},
    type: ""
}

export default function(state=getInitialState, action) {
    let response = {
        data: "",
        label: "",
        tipo: "",
        icon: "",
        produto: "",
        pessoasRelacionadas: []
    }

    try {
        switch(action.type) {
            case CHANGE_CREDITO_TYPE: {
                return {
                    status: SUCCESS,
                    message: "",
                    loading: false,
                    response: state.response,
                    tabActive: state.tabActiv,
                    lastQueries: state.lastQueries,
                    type: action.payload.toUpperCase()
                }
            }

            case constantsCredito.CHANGE_TAB_CREDITO: {
                // quando se fecha a tab esta funcao é chamada, por isso se faz a verificacao
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

            case constantsCredito.CLOSE_CREDITO_MODEL: {
                return {
                    status: "closeModel",
                    message: "",
                    loading: false,
                    response: [],
                    tabActive: "",
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case constantsCredito.CLOSE_MESSAGE_ERROR_CREDITO: {
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

            case constantsCredito.CLOSE_TAB_CREDITO: {
                let newResponse = state.response.concat();
                newResponse.splice(action.payload, 1);

                return {
                    status: "closeTab",
                    message: "",
                    loading: false,
                    response: newResponse,
                    tabActive: newResponse[newResponse.length-1].label,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }            

            case constantsCredito.GET_CREDITO_COMPLETA: {
                let { tipo, documento, requestExpress } = action.payload.parameters
                documento = tipo == "CPF" ? patternCPF(documento) : patternCNPJ(documento)
                let responseServer = action.payload.response
                let label = tipo + ":" + documento + "-" + (requestExpress ? JSON.stringify(requestExpress) : "")
                let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined
                let verifyIfDocumentExists = isDocumentNotInArray(state.response, label)

                if(verifyIfDocumentExists && cadastro) {
                    /**O documento esta vindo formatado do fornecedor
                     * portanto estou salvando a entrada do cliente no lugar dele
                     * pois formato este documento em todo o site
                     */
                    tipo == "CPF" ? responseServer.cadastro.cpf = documento : responseServer.cadastro.cnpj = documento

                    response.data = responseServer
                    response.label = label
                    response.tipo = tipo
                    response.icon = ICON_CREDITO
                    response.produto = COMPANY_PRODUCT_CREDITO
                }

                return {
                    ...state,
                    status: cadastro ? SUCCESS : REQUEST_ERROR,
                    message: cadastro ? "": NENHUM_REGISTRO,
                    loading: false,
                    response: verifyIfDocumentExists && cadastro ? [...state.response, response] : state.response,
                    tabActive: cadastro ? label : state.tabActive,
                }
            }
            
            case constantsCredito.GET_CREDITO_LAST_QUERIES: {
                // tipo > { COMPLETA, INTERMEDIARIA ...}
                let tipoConsulta = action.payload.parameters.tipo
                let responseServer = action.payload.response.creditoUltimasConsultas

                return {
                    loading: false,
                    status: "lastQueries",
                    message: "",
                    response: state.response,
                    tabActive: state.tabActive,
                    lastQueries: {...state.lastQueries, [tipoConsulta]: responseServer},
                    type: state.type
                }
            }

            case constantsCredito.LOADING_CREDITO: {
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

            case constantsCredito.REVER_CONSULTA_CREDITO: {            
                let  responseServer = action.payload.response.response
                const { cabecalho } = responseServer
                const { modulo } = action.payload.parameters
                const tipo=cabecalho.entrada.length <= 11 ? "CPF" : "CNPJ"
                const label=tipo + ":" + (tipo === "CPF" ? patternCPF(cabecalho.entrada) : patternCNPJ(cabecalho.entrada)) + "REVER-CONSULTA"
                responseServer.reverConsulta = true //Boolean para identificar a rever consulta

                response.data = responseServer
                response.label = label
                response.tipo = tipo
                response.icon = ICON_CREDITO
                response.produto = COMPANY_PRODUCT_CREDITO

                return {
                    ...state,
                    status: SUCCESS,
                    message: "",
                    loading: false,
                    response: [...state.response, response],
                    tabActive: label,
                }
            }
            
            case constantsCredito.SEARCH_BY_LOCALIZE_CPF_IN_CREDITO: {
                let responseServer = action.payload;
                let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined;
                let verifyIfCPFExists = isDocumentNotInArray(state.response, cadastro.cpf);

                /*Verifica se o documento foi encontrado ou não*/
                if(verifyIfCPFExists) {
                    response.data = responseServer;
                    response.label = cadastro.cpf;
                    response.tipo = "CPF";
                    response.icon = ICON_LOCALIZE;
                    response.produto = COMPANY_PRODUCT_LOCALIZE;

                    if(cadastro.maeNome) {
                        response.pessoasRelacionadas[0] = {
                            nome: cadastro.maeNome,
                            documento: cadastro.maeCpf,
                            relacao: "Mãe"
                        }
                    }
                }
                return {
                    status: cadastro ? SUCCESS : REQUEST_ERROR,
                    message: cadastro ? "": NENHUM_REGISTRO,
                    loading: false,
                    response: verifyIfCNPJExists ? [...state.response, response] : state.response,
                    tabActive: cadastro ? cadastro.cpf : state.tabActive,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case constantsCredito.SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO: {
                let responseServer = action.payload;
                let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined;
                let verifyIfCNPJExists = isDocumentNotInArray(state.response, cadastro.cnpj);

                /*Verifica se o documento foi encontrado ou não*/
                if(verifyIfCNPJExists) {
                    response.data = responseServer;
                    response.label = cadastro.cnpj;
                    response.tipo = "CNPJ";
                    response.icon = ICON_LOCALIZE;
                    response.produto = COMPANY_PRODUCT_LOCALIZE;
                }

                return {
                    status: cadastro ? SUCCESS : REQUEST_ERROR,
                    message: cadastro ? "": NENHUM_REGISTRO,
                    loading: false,
                    response: verifyIfCNPJExists ? [...state.response, response] : state.response,
                    tabActive: cadastro ? cadastro.cnpj : state.tabActive,
                    lastQueries: state.lastQueries,
                    type: state.type
                }
            }

            case constantsCredito.SEE_CREDITO_MODEL: {
                let responseCNPJ = {}
                response.data = model
                response.label = model.cadastro.cpf
                response.tipo = "CPF"
                response.icon = ICON_CREDITO
                response.produto = COMPANY_PRODUCT_CREDITO

                responseCNPJ.data = modelCNPJ
                responseCNPJ.label = modelCNPJ.cadastro.cnpj
                responseCNPJ.tipo = "CNPJ"
                responseCNPJ.icon = ICON_CREDITO
                responseCNPJ.produto = COMPANY_PRODUCT_CREDITO

                return {
                    loading: false,
                    status: "model",
                    message: "",
                    response: [response, responseCNPJ],
                    tabActive: model.cadastro.cpf,
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
			message: error || ERR_CONNECTION_REFUSED_MESSAGE,
		}
    }
}

//Busca no array das pessoas pesquisadas o documento passado
function isDocumentNotInArray(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].label) {
			return false;
		}
	}

	return true;
}

function findLabelInArray(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].label) {
			return i;
		}
	}

	return -1;
}