import {
    CLOSE_CREDITO_MODEL,
    CLOSE_MESSAGE_ERROR_CREDITO,
    CLOSE_TAB_CREDITO,
    CHANGE_TAB_CREDITO,
    GET_CREDITO_COMPLETA,
    GET_CREDITO_LAST_QUERIES,
    LOADING_CREDITO,
    SEARCH_BY_LOCALIZE_CPF_IN_CREDITO,
    SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO,
    SEARCH_BY_LOCALIZE_CPF,
    SEE_CREDITO_MODEL    
} from "../constants/constantsCredito";

import {
        CHANGE_CREDITO_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
		ERR_CONNECTION_REFUSED_MESSAGE,
        ERROR_503,
		ICON_CREDITO,
        ICON_LOCALIZE,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../constants/utils";

import {
    COMPANY_PRODUCT_LOCALIZE
} from "../constants/constantsCompany";

import model from "./data/credito/consultaCPF.json";
import modelCNPJ from "./data/credito/consultaCNPJ.json";
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
        produto: "",
        pessoasRelacionadas: []
    };

    switch(action.type) {
        case CHANGE_CREDITO_TYPE:
            return {
                status: SUCCESS,
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActiv,
                lastQueries: state.lastQueries,
                type: action.payload.toUpperCase()
            }

        case CHANGE_TAB_CREDITO:
            let tab = searchDocument(state.response,action.payload);
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

        case CLOSE_MESSAGE_ERROR_CREDITO:
            return {
                status: "",
                message: "",
                loading: false,
                response: state.response,
                tabActive: state.tabActive,
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

        case GET_CREDITO_COMPLETA: {
            let actionPayload = action.payload;
            let actionResponse = actionPayload.response;

            /**O documento esta vindo formatado do fornecedor
             * portanto estou salvando a entrada do cliente no lugar dele
             * pois formato este documento em todo o site
             */
            actionPayload.tipo == "CPF" ?
                actionResponse.cadastro.cpf = actionPayload.documento
            :   actionResponse.cadastro.cnpj = actionPayload.documento

            response.data = actionResponse;
            response.label = actionPayload.documento;
            response.tipo = actionPayload.tipo;
            response.icon = ICON_CREDITO;
            response.produto = "credito";
            return {
                status: SUCCESS,
                message: "",
                loading: false,
                response: [...state.response, response],
                tabActive: response.label,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }
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

        case REQUEST_ERROR:
            return {
                loading: false,
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: state.lastQueries,
                type: state.type
            }
        
        case SEARCH_BY_LOCALIZE_CPF_IN_CREDITO: {
            let verifyIfCPFExists = action.payload && action.payload.cadastro && action.payload.cadastro.cpf ? searchDocument(state.response, action.payload.cadastro.cpf) : -2;

            /*Verifica se o documento foi encontrado ou não (-1 não foi encontrado)*/
            if(verifyIfCPFExists == -1) {
                response.data = action.payload;
                response.label = action.payload.cadastro.cpf;
                response.tipo = "CPF";
                response.icon = ICON_LOCALIZE;
                response.produto = "localize";

                if(action.payload.cadastro.maeNome) {
                    response.pessoasRelacionadas[0] = {
                        nome: action.payload.cadastro.maeNome,
                        documento: action.payload.cadastro.maeCpf,
                        relacao: "Mãe"
                    }
                }
            }

            return {
                status: verifyIfCPFExists == -2 ? REQUEST_ERROR : SUCCESS,
                message: verifyIfCPFExists == -2 ? NENHUM_REGISTRO : "",
                loading: false,
                response: verifyIfCPFExists == -1 ? [...state.response, response] : state.response,
                tabActive: verifyIfCPFExists == -2 ? state.tabActive : action.payload.cadastro.cpf,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }
        case SEARCH_BY_LOCALIZE_CNPJ_IN_CREDITO: {
            let verifyIfCNPJExists = action.payload && action.payload.cadastro ? searchDocument(state.response, action.payload.cadastro.cnpj) : -2;

            /*Verifica se o documento foi encontrado ou não (-1 não foi encontrado)*/
            if(verifyIfCNPJExists == -1) {
                response.data = action.payload;
                response.label = action.payload.cadastro.cnpj;
                response.tipo = "CNPJ";
                response.icon = ICON_LOCALIZE;
                response.produto = "localize";
            }

            return {
                status: verifyIfCNPJExists == -2 ? REQUEST_ERROR : SUCCESS,
                message: verifyIfCNPJExists == -2 ? NENHUM_REGISTRO : "",
                loading: false,
                response: verifyIfCNPJExists == -1 ? [...state.response, response] : state.response,
                tabActive: verifyIfCNPJExists == -2 ? state.tabActive : action.payload.cadastro.cnpj,
                lastQueries: state.lastQueries,
                type: state.type
            }
        }
        case SEE_CREDITO_MODEL:
            let responseCNPJ = {};
            response.data = model;
            response.label = model.cadastro.cpf;
            response.tipo = "CPF";
            response.icon = ICON_CREDITO;
            response.produto = "credito";

            responseCNPJ.data = modelCNPJ;
            responseCNPJ.label = modelCNPJ.cadastro.cnpj;
            responseCNPJ.tipo = "CNPJ";
            responseCNPJ.icon = ICON_CREDITO;
            responseCNPJ.produto = "credito";

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

    return state;
}

//Busca no array das pessoas pesquisadas o documento passado
function searchDocument(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].label) {
			return i;
		}
	}

	return -1;
}