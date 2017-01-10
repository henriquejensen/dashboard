import { SEARCH_BY_CPF,
		SEARCH_BY_CNPJ,
		ICON_LOCALIZE,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_EMAILS_RELACIONADOS,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL } from "../constants/constantsLocalize";
import { REQUEST_ERROR, ERR_CONNECTION_REFUSED } from "../constants/utils";
import model from "./data/modelLocalize.json";

const telefonesRelacionados = [
	{relacao: "MÃE",
	nome: "MARIA DA SILVA", fixos: ["12345656", "98765423"], moveis: ["989876787"]},
	{relacao: "TIO", nome: "JOSÉ DA SILVA", fixos: ["55545656", "22265423"], moveis: ["456876787","997069496"]},
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
}

export default function(state = initialState, action) {
	if(action.payload) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: "",
			produto: "",
			telefonesRelacionados: [],
			enderecosRelacionados: [],
			emailsRelacionados: []
		}
		
		switch(action.type) {
			case SEE_LOCALIZE_MODEL:
				response.data = model.PF.DADOS;
				response.label = model.PF.DADOS.CPF;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return {
					status: "model",
					message: "",
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
					response: state.status == "model" ? [response] : [...state.response, response]
				};

			case SEARCH_BY_TELEFONES_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].telefonesRelacionados = telefonesRelacionados;
				return {
					status: "telefones",
					message: "",
					response: state.response
				};

			case SEARCH_BY_ENDERECOS_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].enderecosRelacionados = enderecosRelacionados;
				return {
					status: "enderecos",
					message: "",
					response: state.response
				};

			case SEARCH_BY_EMAILS_RELACIONADOS:
				state.response[searchPessoa(state.response,action.payload)].emailsRelacionados = emailsRelacionados;
				return {
					status: "emails",
					message: "",
					response: state.response
				};

			case REQUEST_ERROR:
				return {
					status: "error",
					message: action.payload.ERRORS.ERROR.content,
					response: state.response
				};

			case ERR_CONNECTION_REFUSED:
				return {
					status: "error",
					message: "Serviço temporariamente indisponível, tente novamente mais tarde",
					response: state.response
				};
		}
	}

	return state;
}

function searchPessoa(list, doc) {
	console.log(list, doc)

	for(let i=0; i<list.length; i++) {
		if(doc == list[i].data.CPF) {
			return i;
		}
	}

	return -1;
}