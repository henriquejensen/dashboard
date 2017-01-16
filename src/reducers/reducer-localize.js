import {
		LOADING,
		SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		SEARCH_BY_PARAMS,
		ICON_LOCALIZE,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_EMAILS_RELACIONADOS,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL } from "../constants/constantsLocalize";
import { REQUEST_ERROR, ERR_CONNECTION_REFUSED, CHANGE_TAB, CLOSE_TAB } from "../constants/utils";
import model from "./data/modelLocalize.json";
import pessoasRelacionadas from "./data/pessoasRelacionadas.json";
import relacionados from "./data/relacionados.json";


const telefonesRelacionados = [
	{documento: 5366214700, fixos: ["12345656", "98765423"], moveis: ["989876787"]},
	{documento: 26675175807, fixos: ["55545656", "22265423"], moveis: ["456876787","997069496"]},
]

const enderecosRelacionados = [
	{documento: 5366214700, enderecos: [{BAIRRO:"BONFIM", CEP:1307070, CIDADE:"CAMPINAS", LOGRADOURO:"GOVENADOR PEDRO DE TOLEDO", NUMERO:12, SCORE:2, TIPO_LOGRADOURO:"AV", UF:"SP"}]},
	{documento: 26675175807, enderecos: [{BAIRRO:"CAMBUI", CEP:1307070, CIDADE:"CAMPINAS", LOGRADOURO:"ANDRADE NEVES", NUMERO:12, SCORE:2, TIPO_LOGRADOURO:"AV", UF:"SP"}]},
]

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false,
	tabActive: ""
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

		switch(action.type) {
			case LOADING:
				return {
					status: "loading",
					message: "",
					loading: true,
					response: state.response,
					tabActive: state.tabActive
				}
			case SEE_LOCALIZE_MODEL:
				response.data = model.PF.DADOS;
				response.label = model.PF.DADOS.CPF;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "model",
					message: "",
					loading: false,
					response: [response],
					tabActive: model.PF.DADOS.CPF
				}

			case CLOSE_LOCALIZE_MODEL:
				return initialState;

			case CHANGE_TAB:
				return {
					status: "tabchanged",
					message: "",
					loading: false,
					response: state.response,
					tabActive: action.payload
				}

			case CLOSE_TAB:
				let newResponse = state.response.concat();
				newResponse.pop(action.payload);

				return {
					status: "tabclosed",
					message: "",
					loading: false,
					response: newResponse,
					tabActive: ""
				}
				
			case SEARCH_BY_CPF:
				response.data = action.payload;
				response.label = response.data.CPF;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: state.status == "model" ? [response] : [...state.response, response],
					tabActive: response.data.CPF
				};

			case SEARCH_BY_CNPJ:
				response.data = action.payload;
				response.label = response.data.CNPJ;
				response.tipo = "CNPJ";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: state.status == "model" ? [response] : [...state.response, response],
					tabActive: response.data.CNPJ
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
					response: state.status == "model" ? [response] : [...state.response, response],
					tabActive: cont
				};

			case SEARCH_BY_PESSOAS_RELACIONADOS:
				if(action.payload.tipo == "telefone") {
					state.response[searchPessoa(state.response,action.payload.documento)].pessoasRelacionadas.pessoasTelefones = pessoasRelacionadas.pessoasRelacionadas;
				} else if(action.payload.tipo == "endereco") {
					state.response[searchPessoa(state.response,action.payload.documento)].pessoasRelacionadas.pessoasEnderecos = pessoasRelacionadas.pessoasRelacionadas;
				}
				
				return {
					status: "pessoas "+action.payload.tipo,
					message: "",
					loading: false,
					response: state.response,
					tabActive: state.tabActive
				};

			case SEARCH_BY_TELEFONES_RELACIONADOS:
				//busca nas documentos pesquisados no localize o documento que sera inserido os telefones relacionados
				let posPessoaTelefone = searchPessoa(state.response,action.payload.documento);

				//busca a pessoa relacionado que foi clicada para mostrar os telefones
				let posPessoaRelacionadaTelefones = searchPosPessoa(state.response[posPessoaTelefone].pessoasRelacionadas.pessoasTelefones, action.payload.documentoRelacionado);

				//adciona na pessoa relacionada os telefones encontrados
				state.response[posPessoaTelefone].pessoasRelacionadas.pessoasTelefones[posPessoaRelacionadaTelefones].telefones = searchTelefonesRelacionados(telefonesRelacionados, action.payload.documentoRelacionado);
				
				return {
					status: "telefones",
					message: "",
					loading: false,
					response: state.response,
					tabActive: state.tabActive
				};

			case SEARCH_BY_ENDERECOS_RELACIONADOS:
				let posPessoaEndereco = searchPessoa(state.response,action.payload.documento);
				let posPessoaRelacionadaEndereco = searchPosPessoa(state.response[posPessoaEndereco].pessoasRelacionadas.pessoasEnderecos, action.payload.documentoRelacionado)
				state.response[posPessoaEndereco].pessoasRelacionadas.pessoasEnderecos[posPessoaRelacionadaEndereco].enderecos = searchEnderecosRelacionados(enderecosRelacionados, action.payload.documentoRelacionado);
				return {
					status: "enderecos",
					message: "",
					loading: false,
					response: state.response,
					tabActive: state.tabActive
				};

			case REQUEST_ERROR:
				return {
					status: "error request",
					message: action.payload.ERRORS.ERROR.content,
					loading: false,
					response: state.response,
					tabActive: state.tabActive
				};

			case ERR_CONNECTION_REFUSED:
				return {
					status: "error connection",
					message: "Serviço temporariamente indisponível, tente novamente mais tarde",
					loading: false,
					response: state.response,
					tabActive: state.tabActive
				};
		}
	}

	return state;
}

//Busca no array de pessoas pesquisadas o documento passado
function searchPessoa(list, doc) {
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].data.CPF) {
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