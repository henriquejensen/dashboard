import {
		SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		SEARCH_BY_TELEFONE,
		SEARCH_BY_EMAIL,
		SEARCH_BY_NOME_ENDERECO,
		ICON_LOCALIZE,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_EMAILS_RELACIONADOS,
		SEARCH_BY_CREDITO_PF,
		SEARCH_BY_CREDITO_PJ,
		SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS,
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
		CHANGE_LOCALIZE_TYPE,
		NENHUM_REGISTRO
} from "../constants/utils";
import model from "./data/modelLocalize.json";
import pessoasRelacionadas from "./data/pessoasRelacionadas.json";
import relacionados from "./data/relacionados.json";

import modelCredito from "./data/jsonPadraoCredito.json";
import modelCreditoCNPJ from "./data/jsonPadraoCreditoCNPJ.json";
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
					status: "changeType",
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: action.payload.toUpperCase()
				}
			case GET_LOCALIZE_LAST_QUERIES:
				if(action.payload.tipo == "NOMEOUENDERECO") {
					newState.lastQueries["NOME"] = patternJsonNomeOuEndereco(action.payload.response.localizeUltimasConsultas, "NOME");
					newState.lastQueries["ENDERECO"] = patternJsonNomeOuEndereco(action.payload.response.localizeUltimasConsultas, "ENDERECO");
				} else {
					newState.lastQueries[action.payload.tipo] = action.payload.response.localizeUltimasConsultas;
				}
				return {
					loading: false,
					status: "lastQueries",
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: newState.lastQueries,
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
				response.produto = "localize";

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
				let verifyIfCreditoPFExists = searchDocument(newState.response, modelCredito.cadastroPf.cpf);

				if(verifyIfCreditoPFExists == -1) {
					response.data = modelCredito;
					response.label = modelCredito.cadastroPf.cpf;
					response.tipo = "CPF";
					response.icon = ICON_CREDITO;
					response.produto = "credito";
				}

				return {
					loading: false,
					status: "success",
					message: "",
					response: verifyIfCreditoPFExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfCreditoPFExists == -1 ? modelCredito.cadastroPf.cpf : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				}

			case SEARCH_BY_CREDITO_PJ:
				let verifyIfCreditoPJExists = searchDocument(newState.response, modelCreditoCNPJ.cadastroPj.cnpj);

				if(verifyIfCreditoPJExists == -1) {
					response.data = modelCreditoCNPJ;
					response.label = modelCreditoCNPJ.cadastroPj.cnpj;
					response.tipo = "CNPJ";
					response.icon = ICON_CREDITO;
					response.produto = "credito";
				}

				return {
					loading: false,
					status: "success",
					message: "",
					response: verifyIfCreditoPJExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfCreditoPJExists == -1 ? modelCreditoCNPJ.cadastroPj.cnpj : newState.tabActive,
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
				
			case SEARCH_BY_CPF:
				let verifyIfCPFExists = action.payload && action.payload.cadastro  ? searchDocument(newState.response, action.payload.cadastro.cpf) : -2;

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
					status: verifyIfCPFExists == -2 ? REQUEST_ERROR : "sucesss",
					message: verifyIfCPFExists == -2 ? NENHUM_REGISTRO : "",
					loading: false,
					response: verifyIfCPFExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfCPFExists == -2 ? newState.tabActive : action.payload.cadastro.cpf,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_CNPJ:
				let verifyIfCNPJExists = action.payload && action.payload.cadastro ? searchDocument(newState.response, action.payload.cadastro.cnpj) : -2;

				/*Verifica se o documento foi encontrado ou não (-1 não foi encontrado)*/
				if(verifyIfCNPJExists == -1) {
					response.data = action.payload;
					response.label = action.payload.cadastro.cnpj;
					response.tipo = "CNPJ";
					response.icon = ICON_LOCALIZE;
					response.produto = "localize";
				}

				return {
					status: verifyIfCNPJExists == -2 ? REQUEST_ERROR : "sucesss",
					message: verifyIfCNPJExists == -2 ? NENHUM_REGISTRO : "",
					loading: false,
					response: verifyIfCNPJExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfCNPJExists == -2 ? newState.tabActive : action.payload.cadastro.cnpj,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_EMAIL:
				let labelEmail = "Email:"+action.payload.cabecalho.entrada.split("@")[0];
				let verifyIfEmailExists = searchDocument(newState.response, labelEmail);
				
				if(verifyIfEmailExists == -1) {
					action.payload.localizePorEmail["cabecalho"] = action.payload.cabecalho;
					response.data = action.payload.localizePorEmail;
					response.label = labelEmail;
					response.tipo = action.payload.tipo;
					response.icon = ICON_LOCALIZE;
					response.produto = action.payload.tipo;
				}

				return {
					status: "success",
					message: "",
					loading: false,
					response: verifyIfEmailExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfEmailExists == -1 ? labelEmail : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_TELEFONE:
				let telefones = action.payload.localizePorTelefone;
				let labelTelefone, verifyIfTelefoneExists;
				if(telefones) {
					labelTelefone = "Tel:"+action.payload.cabecalho.entrada;
					verifyIfTelefoneExists = searchDocument(newState.response, labelTelefone);
					if(verifyIfTelefoneExists == -1) {
						telefones["cabecalho"] = action.payload.cabecalho;
						response.data = telefones;
						response.label = labelTelefone;
						response.tipo = action.payload.tipo;
						response.icon = ICON_LOCALIZE;
						response.produto = action.payload.tipo;
					}
				}
				return {
					status: telefones ? "success" : REQUEST_ERROR,
					message: telefones ? "" : NENHUM_REGISTRO,
					loading: false,
					response: telefones && verifyIfTelefoneExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: telefones && verifyIfTelefoneExists == -1 ? labelTelefone : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_NOME_ENDERECO:
				let label = action.payload.tipo+":"+action.payload.label;
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
					status: "success",
					message: "",
					loading: false,
					response: verifyIfNomeOrEnderecoExists == -1 ? [...newState.response, response] : newState.response,
					tabActive: verifyIfNomeOrEnderecoExists == -1 ? label : newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_PESSOAS_RELACIONADOS:
				newState.response[searchDocument(newState.response,action.payload.cabecalho.entrada)].pessoasRelacionadas = action.payload.localizePessoasRelacionadas;

				return {
					status: "pessoasRelacionadas"+action.payload,
					message: "",
					loading: false,
					response: newState.response,
					tabActive: newState.tabActive,
					lastQueries: newState.lastQueries,
					type: newState.type
				};

			case SEARCH_BY_TELEFONES_RELACIONADOS:
				//busca nas documentos pesquisados no localize o documento que sera inserido os telefones relacionados
				let posPessoaTelefone = searchDocument(newState.response,action.payload.documento);
				//busca a pessoa relacionado que foi clicada para mostrar os telefones
				let posPessoaRelacionadaTelefones = searchPosPessoa(newState.response[posPessoaTelefone].pessoasRelacionadas, action.payload.documentoRelacionado);

				//adiciona na pessoa relacionada os telefones encontrados
				newState.response[posPessoaTelefone].pessoasRelacionadas[posPessoaRelacionadaTelefones].telefones = action.payload.response;
				
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
				let posPessoaEndereco = searchDocument(newState.response,action.payload.documento);
				let posPessoaRelacionadaEndereco = searchPosPessoa(newState.response[posPessoaEndereco].pessoasRelacionadas, action.payload.documentoRelacionado);

				newState.response[posPessoaEndereco].pessoasRelacionadas[posPessoaRelacionadaEndereco].enderecos = action.payload.response;

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
					status: REQUEST_ERROR,
					message: action.payload.mensagem,
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

			case SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS:
				newState.lastQueries[action.payload.consulta][action.payload.posElemento][action.payload.tipo] = action.payload.response[action.payload.tipo];

				return {
					loading: false,
					status: "lastQueries"+action.payload.tipo+action.payload.posElemento+action.payload.consulta,
					message: "",
					response: state.response,
					tabActive: state.tabActive,
					lastQueries: newState.lastQueries,
					type: state.type
				}



		}

	return state;
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