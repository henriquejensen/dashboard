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
import { REQUEST_ERROR, ERR_CONNECTION_REFUSED } from "../constants/utils";
import model from "./data/modelLocalize.json";
import pessoasRelacionadas from "./data/pessoasRelacionadas.json";
import relacionados from "./data/relacionados.json";


const telefonesRelacionados = [
	{documento: 5366214700, fixos: ["12345656", "98765423"], moveis: ["989876787"]},
	{documento: 26675175807, fixos: ["55545656", "22265423"], moveis: ["456876787","997069496"]},
]

const enderecosRelacionados = [
	{relacao: "MÃE", nome: "MARIA DA SILVA", enderecos: [{BAIRRO:"VILA", CEP:1307070, CIDADE:"CAMPINAS", LOGRADOURO:"MENA DOIS", NUMERO:12, SCORE:2, TIPO_LOGRADOURO:"R", UF:"SP"}]},
	{relacao: "TIO", nome: "JOSE DA SILVA", enderecos: [{BAIRRO:"MATAO", CEP:1307070, CIDADE:"ARACA", LOGRADOURO:"MENA UM", NUMERO:12, SCORE:2, TIPO_LOGRADOURO:"R", UF:"AC"}]},
]

const emailsRelacionados = [
	{relacao: "MÃE", nome: "MARIA DA SILVA", emails: ["teste@teste.com.br","novo@yahoo.com.br"]},
	{relacao: "TIO", nome: "JOSE DA SILVA", emails: ["tio@teste.com.br"]},
]

const initialState = {
	status: "",
	message: "",
	response: [],
	loading: false,
}

let cont = 1;

export default function(state = initialState, action) {
	if(action.payload) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: "",
			produto: "",
			pessoasRelacionadas: [],
			enderecosRelacionados: [],
			emailsRelacionados: [],
		}

		switch(action.type) {
			case LOADING:
				return {
					status: "loading",
					message: "",
					loading: true,
					response: state.response
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
					response: [response]
				}

			case CLOSE_LOCALIZE_MODEL:
				return initialState;
				
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
					response: state.status == "model" ? [response] : [...state.response, response]
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
					response: state.status == "model" ? [response] : [...state.response, response]
				};

			case SEARCH_BY_PARAMS:
				response.data = relacionados;
				response.label = cont++;
				response.tipo = action.payload.tipo;
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "success",
					message: "",
					loading: false,
					response: state.status == "model" ? [response] : [...state.response, response]
				};

			case SEARCH_BY_PESSOAS_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].pessoasRelacionadas = pessoasRelacionadas.pessoasRelacionadas;
				return {
					status: "pessoas",
					message: "",
					loading: false,
					response: state.response
				};

			case SEARCH_BY_TELEFONES_RELACIONADOS:
				//busca nas pesquisas realizadas o documento que sera inserido os telefones relacionados
				let posBuscas = searchPessoa(state.response,action.payload.documento);
				let posPessoas = searchPosPessoa(state.response[posBuscas].pessoasRelacionadas, action.payload.documentoTelefone)
				state.response[posBuscas].pessoasRelacionadas[posPessoas].telefones = searchTelefonesRelacionados(telefonesRelacionados, action.payload.documentoTelefone);
				return {
					status: "telefones "+posPessoas,
					message: "",
					loading: false,
					response: state.response
				};

			case SEARCH_BY_ENDERECOS_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].enderecosRelacionados = enderecosRelacionados;
				return {
					status: "enderecos",
					message: "",
					loading: false,
					response: state.response
				};

			case SEARCH_BY_EMAILS_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].emailsRelacionados = emailsRelacionados;
				return {
					status: "emails",
					message: "",
					loading: false,
					response: state.response
				};

			case REQUEST_ERROR:
				return {
					status: "error request",
					message: action.payload.ERRORS.ERROR.content,
					loading: false,
					response: state.response
				};

			case ERR_CONNECTION_REFUSED:
				return {
					status: "error connection",
					message: "Serviço temporariamente indisponível, tente novamente mais tarde",
					loading: false,
					response: state.response
				};
		}
	}

	return state;
}

//Busca no array de pessoas pesquisadas o documento passado
function searchPessoa(list, doc) {
	console.log("1", list, doc)
	for(let i=0; i<list.length; i++) {
		if(doc == list[i].data.CPF) {
			return i;
		}
	}

	return -1;
}

function searchPosPessoa(listPeople, doc) {
	console.log("2", listPeople, doc)
	for(let i=0; i<listPeople.length; i++) {
		if(doc == listPeople[i].documento) {
			return i;
		}
	}
}

//funcao recebe a lista das pessoas pesquisadas, a lista de telefones de todos os telefones e o documento que esta solicitando os telefones
// retorna um objeto dos telefones fixos e moveis da lista de telefones
function searchTelefonesRelacionados(listPhones, doc) {
	console.log("3", listPhones, doc)
	for(let j=0; j<listPhones.length; j++) {
		if(doc == listPhones[j].documento) {
			return {
				fixos: listPhones[j].fixos,
				moveis: listPhones[j].moveis
			}
		}
	}
}