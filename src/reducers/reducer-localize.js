import {
		CHANGE_TAB_LOCALIZE,
		CLOSE_LOCALIZE_MODEL,
		CLOSE_MESSAGE_ERROR_LOCALIZE,
		CLOSE_TAB_LOCALIZE,
		GET_LOCALIZE_LAST_QUERIES,
		LOADING_LOCALIZE,
		SEARCH_BY_DOCUMENT,
		SEARCH_BY_TELEFONE,
		SEARCH_BY_EMAIL,
		SEARCH_BY_NOME_ENDERECO,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_EMAILS_RELACIONADOS,
		SEARCH_BY_CREDITO_IN_LOCALIZE,
		SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS,
		SEARCH_BY_ENDERECOS_TELEFONES_RESULTADOS_BUSCA,
		SEE_LOCALIZE_MODEL,
} from "../constants/constantsLocalize";
import {
		CHANGE_LOCALIZE_TYPE,
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
import { COMPANY_PRODUCT_LOCALIZE, COMPANY_PRODUCT_CREDITO } from "../constants/constantsCompany";
import model from "./data/localize/modelLocalize.json";
import pessoasRelacionadas from "./data/pessoasRelacionadas.json";
import relacionados from "./data/relacionados.json";

import { patternCPF, patternCNPJ } from "../components/utils/functions/patternDocuments";

import modelCredito from "./data/credito/consultaCPF.json";
import modelCreditoCNPJ from "./data/credito/consultaCNPJ.json";
import lastQueries from "./data/lastQueries.json";

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false,
	tabActive: "",
		lastQueries: {
		CPF:[],
		CNPJ:[],
		TELEFONE:[],
		EMAIL:[],
		NOME:[],
		ENDERECO:[],
	},
	type: ""
}

export default function(state = initialState, action) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: "",
			produto: "",
			pessoasRelacionadas: []
		}

		let newState = Object.assign({},state);

		/*Verifica se existem 6 elementos */
		if(state.response.length > 5) {
			newState.response.shift();
		}

		switch(action.type) {
			case CHANGE_LOCALIZE_TYPE:
				return {
					status: SUCCESS,
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: action.payload.toUpperCase()
				}

			case CHANGE_TAB_LOCALIZE:
				let tab = searchDocument(newState.response,action.payload);
				tab = tab >= 0 ? tab : 0;

				return {
					status: "changeTab",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.response.length > 0 ? newState.response[tab].label : "",
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

			case CLOSE_TAB_LOCALIZE:
				let newResponse = newState.response.concat();
				newResponse.splice(action.payload, 1);

				return {
					status: "closeTab",
					message: "",
					loading: false,
					response: newResponse,
					tabActive: newResponse[newResponse.length-1] ? newResponse[newResponse.length-1].label : [],
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case ERR_CONNECTION_REFUSED:
				return {
					status: ERR_CONNECTION_REFUSED,
					message: ERROR_503,
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case GET_LOCALIZE_LAST_QUERIES: {
				let responseServer = action.payload.response;
				let tipo = action.payload.parameters.tipo;
				if(tipo == "NOMEOUENDERECO") {
					newState.lastQueries["NOME"] = patternJsonNomeOuEndereco(responseServer.localizeUltimasConsultas, "NOME");
					newState.lastQueries["ENDERECO"] = patternJsonNomeOuEndereco(responseServer.localizeUltimasConsultas, "ENDERECO");
				} else {
					newState.lastQueries[tipo] = responseServer.localizeUltimasConsultas;
				}

				return {
					loading: false,
					status: LAST_QUERIES,
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			}
			case LOADING_LOCALIZE:
				return {
					status: LOADING,
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
				response.produto = COMPANY_PRODUCT_LOCALIZE;

				return {
					status: "model",
					message: "",
					loading: false,
					response: [response],
					tabActive: model.cadastro.cpf,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case SEARCH_BY_CREDITO_IN_LOCALIZE: {
				let tipo = action.payload.parameters.tipo;
				let documento = action.payload.parameters.documento;
				documento = tipo == "CPF" ? patternCPF(documento) : patternCNPJ(documento);
				let responseServer = action.payload.response;
				let label = tipo + ":" + documento + "-" + COMPANY_PRODUCT_CREDITO;
				let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined;
				let verifyIfDocumentExists = isDocumentNotInArray(state.response, label);

				if(verifyIfDocumentExists && cadastro) {
					/**O documento esta vindo formatado do fornecedor
					 * portanto estou salvando a entrada do cliente no lugar dele
					 * pois formato este documento em todo o site
					 */
					tipo == "CPF" ? responseServer.cadastro.cpf = documento : responseServer.cadastro.cnpj = documento;

					response.data = responseServer;
					response.label = label;
					response.tipo = tipo;
					response.icon = ICON_CREDITO;
					response.produto = COMPANY_PRODUCT_CREDITO;
				}

				return {
					status: cadastro ? SUCCESS : REQUEST_ERROR,
					message: cadastro ? "": NENHUM_REGISTRO,
					loading: false,
					response: verifyIfDocumentExists && cadastro ? [...state.response, response] : state.response,
					tabActive: cadastro ? label : state.tabActive,
					lastQueries: state.lastQueries,
					type: state.type
				}
			}
			case SEARCH_BY_DOCUMENT: {
				let tipo = action.payload.parameters.tipo;
				let documento = action.payload.parameters.documento;
				documento = tipo == "CPF" ? patternCPF(documento) : patternCNPJ(documento);
				let responseServer = action.payload.response;
				let label = tipo + ":" + documento + "-" + COMPANY_PRODUCT_LOCALIZE;
				let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined;
				let verifyIfDocumentExists = isDocumentNotInArray(state.response, label);

				/*Verifica se o documento foi encontrado ou não (-1 não foi encontrado)*/
				if(verifyIfDocumentExists && cadastro) {
					response.data = responseServer;
					response.label = label
					response.tipo = tipo;
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
					response: verifyIfDocumentExists && cadastro ? [...state.response, response] : state.response,
					tabActive: cadastro ? label : state.tabActive,
					lastQueries: state.lastQueries,
					type: state.type
				}
			}
			case SEARCH_BY_EMAIL: {
				let responseServer = action.payload.response;
				let labelEmail = "EMAIL: "+responseServer.cabecalho.entrada;
				let verifyIfEmailExists = searchDocument(newState.response, labelEmail);
				
				if(verifyIfEmailExists == -1) {
					response.data = {
						response: responseServer.localizePorEmail,
						cabecalho: responseServer.cabecalho
					}
					response.label = labelEmail;
					response.tipo = state.response.tipo;
					response.icon = ICON_LOCALIZE;
					response.produto = state.response.produto;
				}

				return {
					status: SUCCESS,
					message: "",
					loading: false,
					response: verifyIfEmailExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfEmailExists == -1 ? labelEmail : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			}

			case SEARCH_BY_TELEFONE: {
				let responseServer = action.payload.response;
				let telefones = responseServer.localizePorTelefone;
				let labelTelefone, verifyIfTelefoneExists;
				if(telefones) {
					labelTelefone = "TEL: "+responseServer.cabecalho.entrada;
					verifyIfTelefoneExists = searchDocument(newState.response, labelTelefone);
					if(verifyIfTelefoneExists == -1) {
						response.data = {
							response: telefones,
							cabecalho: responseServer.cabecalho
						}
						response.label = labelTelefone;
						response.tipo = state.response.tipo;
						response.icon = ICON_LOCALIZE;
						response.produto = state.response.produto;
					}
				}
				return {
					status: telefones ? SUCCESS : REQUEST_ERROR,
					message: telefones ? "" : NENHUM_REGISTRO,
					loading: false,
					response: telefones && verifyIfTelefoneExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: telefones && verifyIfTelefoneExists == -1 ? labelTelefone : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			}

			case SEARCH_BY_NOME_ENDERECO: {
				/*Construcao do nome da label na tab */
				let nameLabelArray = JSON.parse(action.payload.response.cabecalho.entrada);
				let nameLabel = [];

				/**IE não suporta Object.values, mas suporta Object.keys
				 * Aqui estou verificando apenas as propriedades que possuem
				 * algum valor
				 */
				Object.keys(nameLabelArray).forEach((keyOfNameLabelArray) => {
					if(nameLabelArray[keyOfNameLabelArray])
						nameLabel.push(nameLabelArray[keyOfNameLabelArray])
				});

				nameLabel = nameLabel.toString();
				let tipo = action.payload.parameters.tipo.substring(0,3);
				let label = tipo+": "+ nameLabel;

				let nomeOuEndereco = {};
				let verifyIfNomeOrEnderecoExists = searchDocument(newState.response, label);

				if(verifyIfNomeOrEnderecoExists == -1) {
					nomeOuEndereco = {
						response: action.payload.response.localizePorNomeOuEndereco,
						cabecalho: action.payload.response.cabecalho
					}
					response.data = nomeOuEndereco;
					response.label = label;
					response.tipo = action.payload.tipo;
					response.icon = ICON_LOCALIZE;
					response.produto = action.payload.tipo;
				}

				return {
					status: SUCCESS,
					message: "",
					loading: false,
					response: verifyIfNomeOrEnderecoExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfNomeOrEnderecoExists == -1 ? label : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};
			}

			case SEARCH_BY_PESSOAS_RELACIONADOS: {
				let responseServer = action.payload.response;
				let label = action.payload.parameters.label;
				newState.response[searchDocument(newState.response,label)].pessoasRelacionadas = responseServer.localizePessoasRelacionadas;

				return {
					status: "pessoasRelacionadas"+label,
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			}
			case SEARCH_BY_TELEFONES_RELACIONADOS: {
				let responseServer = action.payload.response;
				let telefones = responseServer.telefones ? responseServer.telefones : {};
				let documento = action.payload.parameters.documento;
				let documentoRelacionado = action.payload.parameters.documentoRelacionado;

				//busca nas documentos pesquisados no localize o documento que sera inserido os telefones relacionados
				let posPessoaTelefone = searchDocument(newState.response,documento);
				//busca a pessoa relacionado que foi clicada para mostrar os telefones
				let posPessoaRelacionadaTelefones = searchPosPessoa(newState.response[posPessoaTelefone].pessoasRelacionadas, documentoRelacionado);

				//adiciona na pessoa relacionada os telefones encontrados
				telefones.fixos = telefones.fixos ? telefones.fixos : [];
				telefones.moveis = telefones.moveis ? telefones.moveis : [];
				newState.response[posPessoaTelefone].pessoasRelacionadas[posPessoaRelacionadaTelefones].telefones = telefones;
				
				return {
					status: "telefones",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}
			}

			case SEARCH_BY_ENDERECOS_RELACIONADOS: {
				let responseServer = action.payload.response;
				let enderecos = responseServer.enderecos ? responseServer.enderecos : [];
				let documento = action.payload.parameters.documento;
				let documentoRelacionado = action.payload.parameters.documentoRelacionado;

				let posPessoaEndereco = searchDocument(newState.response,documento);
				let posPessoaRelacionadaEndereco = searchPosPessoa(newState.response[posPessoaEndereco].pessoasRelacionadas, documentoRelacionado);

				newState.response[posPessoaEndereco].pessoasRelacionadas[posPessoaRelacionadaEndereco].enderecos = enderecos;

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

			case REQUEST_ERROR:
				return {
					status: REQUEST_ERROR,
					message: action.payload.mensagem,
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS: {
				let consulta = action.payload.parameters.consulta;
				let isEnderecoOuTelefone = action.payload.parameters.tipo;
				let posElemento = action.payload.parameters.posElemento;
				let responseServer = action.payload.response;
				responseServer = responseServer ? responseServer[isEnderecoOuTelefone] ? responseServer[isEnderecoOuTelefone] : [] : [];


				if(isEnderecoOuTelefone == "phone") {
					responseServer.fixos = responseServer.fixos ? responseServer.fixos : [];
					responseServer.moveis = responseServer.moveis ? responseServer.moveis : [];
				}
				newState.lastQueries[consulta][posElemento][isEnderecoOuTelefone] = responseServer;

				return {
					loading: false,
					status: "",
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: newState.lastQueries,
					type: state.type
				}
			}

			case SEARCH_BY_ENDERECOS_TELEFONES_RESULTADOS_BUSCA: {
				let indexLabel = action.payload.parameters.indexLabel;
				let indexArrayElements = action.payload.parameters.indexArrayElements;
				let isEnderecoOuTelefone = action.payload.parameters.isEnderecoOuTelefone;
				let responseServer = action.payload.response;
				responseServer = responseServer ? responseServer[isEnderecoOuTelefone] ? responseServer[isEnderecoOuTelefone] : [] : [];

				if(isEnderecoOuTelefone == "phone") {
					responseServer.fixos = responseServer.fixos ? responseServer.fixos : [];
					responseServer.moveis = responseServer.moveis ? responseServer.moveis : [];
				}
				/**indexLabel -> identifica a aba que solicitou a consulta,
				 * indexArrayElements -> elemento do array dos resultados que solicitou a consulota
				 */
				state.response[indexLabel].data.response[indexArrayElements][isEnderecoOuTelefone] = responseServer;

				return {
					loading: false,
					status: "",
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: state.lastQueries,
					type: state.type
				}
			}
		}

	return state;
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

/* Nome e endereco é retornado como json no cabecalho, esta funcao faz o parse neste
json e retira apenas as informacoes necessarias */
function patternJsonNomeOuEndereco(list, tipo) {
	let nome = [];
	let endereco = [];

	for(let i=0; i<list.length; i++) {
		let entrada = JSON.parse(list[i].entrada);
		if(tipo == "NOME" && entrada.nome)
			nome.push({entrada:entrada.nome, dataHora:list[i].dataHora});
		if(tipo == "ENDERECO" && entrada.enderecoOuCep)
			endereco.push({entrada:entrada.enderecoOuCep, dataHora:list[i].dataHora});
	}

	return tipo == "NOME" ? nome : endereco;
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

function searchPosPessoa(listPeople, doc) {
	for(let i=0; i<listPeople.length; i++) {
		if(doc == listPeople[i].documento) {
			return i;
		}
	}

	return 0;
}