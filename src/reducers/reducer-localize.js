import {
		SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		SEARCH_BY_PARAMS,
		ICON_LOCALIZE,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_EMAILS_RELACIONADOS,
		SEARCH_BY_CREDITO_PF,
		SEARCH_BY_CREDITO_PJ,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL,
		LOADING_LOCALIZE,
		CLOSE_TAB_LOCALIZE,
		CHANGE_TAB_LOCALIZE,
		CLOSE_MESSAGE_ERROR_LOCALIZE,
		GET_LOCALIZE_LAST_QUERIES
} from "../constants/constantsLocalize";
import {
		REQUEST_ERROR,
		ERR_CONNECTION_REFUSED,
		CHANGE_TAB,
		CLOSE_TAB,
		ICON_CREDITO,
		CHANGE_LOCALIZE_TYPE
} from "../constants/utils";
import model from "./data/modelLocalize.json";
import pessoasRelacionadas from "./data/pessoasRelacionadas.json";
import relacionados from "./data/relacionados.json";

import modelCredito from "./data/jsonPadraoCredito.json";
import modelCreditoCNPJ from "./data/jsonPadraoCreditoCNPJ.json";
import lastQueries from "./data/lastQueries.json";

const telefonesRelacionados = [
	{documento: 5366214700, fixos: ["12345656", "98765423"], moveis: ["989876787"]},
	{documento: 26675175807, fixos: ["55545656", "22265423"], moveis: ["456876787","997069496"]},
]

const enderecosRelacionados = [
	{documento: 5366214700, enderecos: [{bairro:"BONFIM", cep:1307070, cidade:"CAMPINAS", logradouro:"GOVENADOR PEDRO DE TOLEDO", numero:12, tipoLogradouro:"AV", uf:"SP"}]},
	{documento: 26675175807, enderecos: [{bairro:"CAMBUI", cep:1307070, cidade:"CAMPINAS", logradouro:"ANDRADE NEVES", numero:12, tipoLogradouro:"AV", uf:"SP"}]},
]

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false,
	tabActive: "",
	lastQueries: [],
	type: ""
}

let cont = 0;

export default function(state = initialState, action) {
	if(action.payload) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: "",
			produto: "",
			pessoasRelacionadas: {
				pessoasTelefones: [],
				pessoasEnderecos: []
			}
		}

		let newState = Object.assign({},state);

		if(state.response.length > 6) {
			newState.response.shift();
		}

		switch(action.type) {
			case CHANGE_LOCALIZE_TYPE:
				return {
					status: "changeType",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: action.payload.toUpperCase()
				}
			case GET_LOCALIZE_LAST_QUERIES:
				return {
					loading: false,
					status: "lastQueries",
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: lastQueries.localize,
					type: newState.type
				}

			case LOADING_LOCALIZE:
				return {
					status: "loading",
					message: "",
					loading: true,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			case SEE_LOCALIZE_MODEL:
				response.data = model;
				response.label = model.cadastro.cpf;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "modelLocalize";

				return {
					status: "model",
					message: "",
					loading: false,
					response: [response],
					tabActive: model.cadastro.cpf,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case SEARCH_BY_CREDITO_PF:
				response.data = modelCredito;
				response.label = modelCredito.cadastroPf.cpf;
				response.tipo = "CPF";
				response.icon = ICON_CREDITO;
				response.produto = "credito";

				return {
					loading: false,
					status: "success",
					message: "",
					response: [...newState.response, response],
					tabActive: modelCredito.cadastroPf.cpf,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case SEARCH_BY_CREDITO_PJ:
				response.data = modelCreditoCNPJ;
				response.label = modelCreditoCNPJ.cadastroPj.cnpj;
				response.tipo = "CNPJ";
				response.icon = ICON_CREDITO;
				response.produto = "credito";

				return {
					loading: false,
					status: "success",
					message: "",
					response: [...newState.response, response],
					tabActive: modelCreditoCNPJ.cadastroPj.cnpj,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case CLOSE_LOCALIZE_MODEL:
				return {
					loading: false,
					status: "closeModel",
					message: "",
					response: [],
					tabActive: "",
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case CLOSE_TAB_LOCALIZE:
				let newResponse = newState.response.concat();
				newResponse.splice(action.payload, 1);

				return {
					status: "closeTab",
					message: "",
					loading: false,
					response: newResponse,
					tabActive: newResponse[newResponse.length-1].label,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case CHANGE_TAB_LOCALIZE:
				let tab = searchDocument(newState.response,action.payload)
				return {
					status: "changeTab",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.response.length > 0 ? newState.response[tab].label : "",
					lastQueries: newState.lastQueries,
					type: newState.type
				}
				
			case SEARCH_BY_CPF:
				console.log("REDUCER", action.payload);
				response.data = action.payload;
				response.label = action.payload.cadastro.cpf;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "modelLocalize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: [...newState.response, response],
					tabActive: action.payload.cadastro.cpf,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_CNPJ:
				response.data = action.payload;
				response.label = action.payload.cadastro.cnpj;
				response.tipo = "CNPJ";
				response.icon = ICON_LOCALIZE;
				response.produto = "modelLocalize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: [...newState.response, response],
					tabActive: action.payload.cadastro.cnpj,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_PARAMS:
				cont++;
				response.data = relacionados;
				response.label = cont;
				response.tipo = action.payload.tipo;
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: newState.status == "model" ? [response] : [...newState.response, response],
					tabActive: cont,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_PESSOAS_RELACIONADOS:
				if(action.payload.tipo == "telefone") {
					newState.response[searchPessoa(newState.response,action.payload.documento)].pessoasRelacionadas.pessoasTelefones = pessoasRelacionadas.pessoasRelacionadas;
				} else if(action.payload.tipo == "endereco") {
					newState.response[searchPessoa(newState.response,action.payload.documento)].pessoasRelacionadas.pessoasEnderecos = pessoasRelacionadas.pessoasRelacionadas;
				}
				
				return {
					status: "pessoas "+action.payload.tipo,
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_TELEFONES_RELACIONADOS:
				//busca nas documentos pesquisados no localize o documento que sera inserido os telefones relacionados
				let posPessoaTelefone = searchPessoa(newState.response,action.payload.documento);

				//busca a pessoa relacionado que foi clicada para mostrar os telefones
				let posPessoaRelacionadaTelefones = searchPosPessoa(newState.response[posPessoaTelefone].pessoasRelacionadas.pessoasTelefones, action.payload.documentoRelacionado);

				//adciona na pessoa relacionada os telefones encontrados
				newState.response[posPessoaTelefone].pessoasRelacionadas.pessoasTelefones[posPessoaRelacionadaTelefones].telefones = searchTelefonesRelacionados(telefonesRelacionados, action.payload.documentoRelacionado);
				
				return {
					status: "telefones",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_ENDERECOS_RELACIONADOS:
				let posPessoaEndereco = searchPessoa(newState.response,action.payload.documento);
				let posPessoaRelacionadaEndereco = searchPosPessoa(newState.response[posPessoaEndereco].pessoasRelacionadas.pessoasEnderecos, action.payload.documentoRelacionado);

				newState.response[posPessoaEndereco].pessoasRelacionadas.pessoasEnderecos[posPessoaRelacionadaEndereco].enderecos = searchEnderecosRelacionados(enderecosRelacionados, action.payload.documentoRelacionado);
				return {
					status: "enderecos",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case REQUEST_ERROR:
				return {
					status: "error request",
					message: action.payload.ERRORS.ERROR.content,
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case ERR_CONNECTION_REFUSED:
				return {
					status: "error connection",
					message: "Serviço temporariamente indisponível, tente novamente mais tarde",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case CLOSE_MESSAGE_ERROR_LOCALIZE:
				return {
					status: "",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

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

//Busca no array de pessoas pesquisadas o documento passado
function searchPessoa(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].data.CPF) {
			return i;
		}
	}

	return 0;
}

function searchPosPessoa(listPeople, doc) {
	for(let i=0; i<listPeople.length; i++) {
		if(doc == listPeople[i].documento) {
			return i;
		}
	}
}

//funcao recebe a lista das pessoas pesquisadas, a lista de telefones de todos os telefones e o documento que esta solicitando os telefones
// retorna um objeto dos telefones fixos e moveis da lista de telefones
function searchTelefonesRelacionados(listPhones, doc) {
	for(let j=0; j<listPhones.length; j++) {
		if(doc == listPhones[j].documento) {
			return {
				fixos: listPhones[j].fixos,
				moveis: listPhones[j].moveis
			}
		}
	}
}

//funcao recebe a lista das pessoas pesquisadas, a lista de telefones de todos os telefones e o documento que esta solicitando os telefones
// retorna um objeto dos telefones fixos e moveis da lista de telefones
function searchEnderecosRelacionados(listAddress, doc) {
	for(let j=0; j<listAddress.length; j++) {
		if(doc == listAddress[j].documento) {
			return listAddress[j].enderecos
		}
	}
}