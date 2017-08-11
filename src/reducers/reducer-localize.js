import * as localize from "../constants/constantsLocalize"
import {
		CHANGE_LOCALIZE_TYPE,
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
import { COMPANY_PRODUCT_LOCALIZE, COMPANY_PRODUCT_CREDITO, ICON_CREDITO, ICON_LOCALIZE } from "../constants/constantsCompany"
import model from "./data/localize/modelLocalize.json"
import pessoasRelacionadas from "./data/pessoasRelacionadas.json"
import relacionados from "./data/relacionados.json"

import { patternCPF, patternCNPJ } from "../components/utils/functions/patternDocuments"

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

	try {
		switch(action.type) {
			case CHANGE_LOCALIZE_TYPE: {
				return {
					...state,
					status: SUCCESS,
					message: "",
					loading: false,
					type: action.payload.toUpperCase()
				}
			}

			case localize.CHANGE_TAB_LOCALIZE: {
				let tab = searchDocument(state.response,action.payload)
				tab = tab >= 0 ? tab : 0;

				return {
					...state,
					status: "changeTab",
					message: "",
					loading: false,
					tabActive: state.response.length > 0 ? state.response[tab].label : "",
				}
			}

			case localize.CLOSE_LOCALIZE_MODEL: {
				return {
					...state,
					loading: false,
					message: "",
					response: [],
				}
			}

			case localize.CLOSE_MESSAGE_ERROR_LOCALIZE: {
				return {
					...state,
					status: "",
					message: "",
					loading: false,
				}
			}

			case localize.CLOSE_TAB_LOCALIZE: {
				let newResponse = state.response.concat();
				newResponse.splice(action.payload, 1);

				return {
					...state,
					message: "",
					loading: false,
					response: newResponse,
					tabActive: newResponse[newResponse.length-1] ? newResponse[newResponse.length-1].label : [],
				}
			}

			case localize.GET_LOCALIZE_LAST_QUERIES: {				
				let responseServer = action.payload.response
				let tipo = action.payload.parameters.tipo
				if(tipo.match("SEARCH-ADDRESS-OR-NAME")) {
					state.lastQueries[tipo] = responseServer.localizeUltimasConsultas.map(val => {
						return{
							dataHora: val.dataHora,
							entrada: JSON.parse(val.entrada)
						}
					})
				} else {
					state.lastQueries[tipo] = responseServer.localizeUltimasConsultas;
				}

				return {
					...state,
					loading: false,
					status: LAST_QUERIES,
				}
			}

			case localize.LOADING_LOCALIZE: {
				return {
					...state,
					status: LOADING,
					loading: true,
				}
			}

			case localize.REVER_CONSULTA_LOCALIZE: {
				let  responseServer = action.payload.response.response
				const { cabecalho } = responseServer
				const { modulo } = action.payload.parameters
				let tipo=modulo, dataToResponse = {}, label, produto=modulo
				responseServer.reverConsulta = true //Boolean para identificar a rever consulta

				switch(modulo) {
					case localize.MODULO_NOME_ENDERECO: {
						let nameLabelArray = JSON.parse(cabecalho.entrada)
						let nameLabel = []
						Object.keys(nameLabelArray).forEach((keyOfNameLabelArray) => {
							if(nameLabelArray[keyOfNameLabelArray])
								nameLabel.push(nameLabelArray[keyOfNameLabelArray])
						})
						label = "REV" + ":" + nameLabel.toString() + "-" + COMPANY_PRODUCT_LOCALIZE
						dataToResponse = {
							response: responseServer.localizePorNomeOuEndereco,
							cabecalho: cabecalho,
							reverConsulta: true
						}
						break
					}
					case localize.MODULO_TELEFONE: {
						dataToResponse = {
							response: responseServer.localizePorTelefone,
							cabecalho: cabecalho,
							reverConsulta: true
						}
						label = "REV" + ":" + cabecalho.entrada
						break
					}
					case localize.MODULO_EMAIL: {
						dataToResponse = {
							response: responseServer.localizePorEmail,
							cabecalho: cabecalho,
							reverConsulta: true
						}
						label = "EMAIL" + ":" + cabecalho.entrada
						break
					}
					default: {
						produto = COMPANY_PRODUCT_LOCALIZE
						tipo = cabecalho.entrada.length <= 11 ? "CPF" : "CNPJ"
						label = tipo + ":" + (tipo === "CPF" ? patternCPF(cabecalho.entrada) : patternCNPJ(cabecalho.entrada))
						dataToResponse = responseServer
					}
				}

				response.data = dataToResponse
				response.label = label
				response.tipo = tipo
				response.icon = ICON_LOCALIZE
				response.produto = produto
				
				return {
					...state,
					loading: false,
					response: [...state.response, response],
					tabActive: label
				}
			}

			case localize.SEE_LOCALIZE_MODEL: {
				const label = "Modelo Consulta"
				const tab = isDocumentNotInArray(state.response,label)
				
				response.data = model
				response.label = label
				response.tipo = "CPF"
				response.icon = ICON_LOCALIZE
				response.produto = COMPANY_PRODUCT_LOCALIZE

				return {
					...state,
					loading: false,
					response: tab ? [...state.response, response] : state.response,
					tabActive: label,
				}
			}

			case localize.SEARCH_BY_CREDITO_IN_LOCALIZE: {
				let { tipo, documento } = action.payload.parameters
				documento = tipo == "CPF" ? patternCPF(documento) : patternCNPJ(documento)
				let responseServer = action.payload.response
				const label = tipo + ":" + documento + "-" + COMPANY_PRODUCT_CREDITO
				let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined
				const verifyIfDocumentExists = isDocumentNotInArray(state.response, label)

				if(verifyIfDocumentExists && cadastro) {
					/**O documento esta vindo formatado do fornecedor
					 * portanto estou salvando a entrada do cliente no lugar dele
					 * pois faço a formatação deste documento em todo o site
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

			case localize.SEARCH_BY_DOCUMENT: {
				let { tipo, documento } = action.payload.parameters
				documento = tipo == "CPF" ? patternCPF(documento) : patternCNPJ(documento)
				let responseServer = action.payload.response
				let label = tipo + ":" + documento + "-" + COMPANY_PRODUCT_LOCALIZE
				let cadastro = responseServer && responseServer.cadastro ? responseServer.cadastro : undefined
				let verifyIfDocumentExists = isDocumentNotInArray(state.response, label)

				/*Verifica se o documento foi encontrado ou não (-1 não foi encontrado)*/
				if(verifyIfDocumentExists && cadastro) {
					response.data = responseServer
					response.label = label
					response.tipo = tipo
					response.icon = ICON_LOCALIZE
					response.produto = COMPANY_PRODUCT_LOCALIZE

					if(cadastro.maeNome) {
						response.pessoasRelacionadas[0] = {
							nome: cadastro.maeNome,
							documento: cadastro.maeCpf,
							relacao: "Mãe"
						}
					}
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

			case localize.SEARCH_BY_EMAIL: {
				let responseServer = action.payload.response;
				let labelEmail = "EMAIL: "+responseServer.cabecalho.entrada;
				let verifyIfEmailExists = searchDocument(state.response, labelEmail);
				
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
					...state,
					status: SUCCESS,
					loading: false,
					response: verifyIfEmailExists == -1 ? [...state.response, response] : state.response,
					tabActive: verifyIfEmailExists == -1 ? labelEmail : state.tabActive,
				}
			}

			case localize.SEARCH_BY_TELEFONE: {
				let responseServer = action.payload.response;
				let telefones = responseServer.localizePorTelefone;
				let labelTelefone, verifyIfTelefoneExists;
				if(telefones) {
					labelTelefone = "TEL: "+responseServer.cabecalho.entrada;
					verifyIfTelefoneExists = searchDocument(state.response, labelTelefone);
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
					...state,
					status: telefones ? SUCCESS : REQUEST_ERROR,
					message: telefones ? "" : NENHUM_REGISTRO,
					loading: false,
					response: telefones && verifyIfTelefoneExists == -1 ? [...state.response, response] : state.response,
					tabActive: telefones && verifyIfTelefoneExists == -1 ? labelTelefone : state.tabActive,
				}
			}

			case localize.SEARCH_BY_NOME_ENDERECO: {
				/*Construcao do nome da label na tab */
				let nameLabelArray = JSON.parse(action.payload.response.cabecalho.entrada)
				let nameLabel = []

				/**IE não suporta Object.values, mas suporta Object.keys
				 * Aqui estou verificando apenas as propriedades que possuem
				 * algum valor
				 */
				Object.keys(nameLabelArray).forEach((keyOfNameLabelArray) => {
					if(nameLabelArray[keyOfNameLabelArray])
						nameLabel.push(nameLabelArray[keyOfNameLabelArray])
				})

				nameLabel = nameLabel.toString()
				let tipo = action.payload.parameters.tipo.substring(0,3)
				let label = tipo+": "+ nameLabel

				let nomeOuEndereco = {}
				let verifyIfNomeOrEnderecoExists = searchDocument(state.response, label);

				if(verifyIfNomeOrEnderecoExists == -1) {
					nomeOuEndereco = {
						response: action.payload.response.localizePorNomeOuEndereco,
						cabecalho: action.payload.response.cabecalho
					}
					response.data = nomeOuEndereco
					response.label = label
					response.tipo = action.payload.tipo
					response.icon = ICON_LOCALIZE
					response.produto = action.payload.tipo
				}

				return {
					...state,
					status: SUCCESS,
					message: "",
					loading: false,
					response: verifyIfNomeOrEnderecoExists == -1 ? [...state.response, response] : state.response,
					tabActive: label
				};
			}

			case localize.SEARCH_BY_PESSOAS_RELACIONADOS: {
				let responseServer = action.payload.response;
				let label = action.payload.parameters.label;
				state.response[searchDocument(state.response,label)].pessoasRelacionadas = responseServer.localizePessoasRelacionadas;

				return {
					...state,
					status: "pessoasRelacionadas"+label,
					message: "",
					loading: false,
				}
			}

			case localize.SEARCH_BY_TELEFONES_RELACIONADOS: {
				let responseServer = action.payload.response;
				let telefones = responseServer.telefones ? responseServer.telefones : {};
				let documento = action.payload.parameters.documento;
				let documentoRelacionado = action.payload.parameters.documentoRelacionado;

				//busca nas documentos pesquisados no localize o documento que sera inserido os telefones relacionados
				let posPessoaTelefone = searchDocument(state.response,documento);
				//busca a pessoa relacionado que foi clicada para mostrar os telefones
				let posPessoaRelacionadaTelefones = searchPosPessoa(state.response[posPessoaTelefone].pessoasRelacionadas, documentoRelacionado);

				//adiciona na pessoa relacionada os telefones encontrados
				telefones.fixos = telefones.fixos ? telefones.fixos : [];
				telefones.moveis = telefones.moveis ? telefones.moveis : [];
				state.response[posPessoaTelefone].pessoasRelacionadas[posPessoaRelacionadaTelefones].telefones = telefones;
				
				return {
					...state,
					message: "",
					loading: false,
				}
			}

			case localize.SEARCH_BY_ENDERECOS_RELACIONADOS: {
				let responseServer = action.payload.response;
				let enderecos = responseServer.enderecos ? responseServer.enderecos : [];
				let documento = action.payload.parameters.documento;
				let documentoRelacionado = action.payload.parameters.documentoRelacionado;

				let posPessoaEndereco = searchDocument(state.response,documento);
				let posPessoaRelacionadaEndereco = searchPosPessoa(state.response[posPessoaEndereco].pessoasRelacionadas, documentoRelacionado);

				state.response[posPessoaEndereco].pessoasRelacionadas[posPessoaRelacionadaEndereco].enderecos = enderecos;

				return {
					...state,
					loading: false,
				}
			}

			case localize.SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS: {
				let consulta = action.payload.parameters.consulta;
				let isEnderecoOuTelefone = action.payload.parameters.tipo;
				let posElemento = action.payload.parameters.posElemento;
				let responseServer = action.payload.response;
				responseServer = responseServer ? responseServer[isEnderecoOuTelefone] ? responseServer[isEnderecoOuTelefone] : [] : [];

				if(isEnderecoOuTelefone == "phone") {
					responseServer.fixos = responseServer.fixos ? responseServer.fixos : [];
					responseServer.moveis = responseServer.moveis ? responseServer.moveis : [];
				}
				state.lastQueries[consulta][posElemento][isEnderecoOuTelefone] = responseServer;

				return {
					...state,
					loading: false,
				}
			}

			case localize.SEARCH_BY_ENDERECOS_TELEFONES_RESULTADOS_BUSCA: {
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
					...state,
					loading: false,
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
			return false
		}
	}

	return true
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
			return i
		}
	}

	return -1
}

function searchPosPessoa(listPeople, doc) {
	for(let i=0; i<listPeople.length; i++) {
		if(doc == listPeople[i].documento) {
			return i
		}
	}

	return 0
}