import { SEARCH_BY_CPF, SEARCH_BY_CNPJ, ICON_LOCALIZE, SEARCH_BY_TELEFONES_RELECIONADOS, SEARCH_BY_ENDERECOS_RELECIONADOS, SEARCH_BY_EMAILS_RELECIONADOS } from "../constants/constantsLocalize";

const telefonesRelacionados = [
	{relacao: "MÃE", nome: "MARIA DA SILVA", fixos: ["12345656", "98765423"], moveis: ["989876787"]},
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

export default function(state = [], action) {
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

		console.log("RETORNO", action.payload);
		
		switch(action.type) {
			case SEARCH_BY_CPF:
				response.data = JSON.parse(action.payload.text).PF.DADOS;
				response.label = response.data.CPF;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return [...state, response];
				

			case SEARCH_BY_CNPJ:
				response.data = JSON.parse(action.payload.text).PJ.DADOS;
				response.label = response.data.CNPJ;
				response.tipo = "CNPJ";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return [...state, response];

			case SEARCH_BY_TELEFONES_RELECIONADOS:
				let newTel = state.slice();
				newTel[searchPessoa(state,action.payload)].telefonesRelacionados = telefonesRelacionados;
				return newTel;

			case SEARCH_BY_ENDERECOS_RELECIONADOS:
				let newEnd = state.slice();
				newEnd[searchPessoa(state,action.payload)].enderecosRelacionados = enderecosRelacionados;
				return newEnd;

			case SEARCH_BY_EMAILS_RELECIONADOS:
				let newEmail = state.slice();
				newEmail[searchPessoa(state,action.payload)].emailsRelacionados = emailsRelacionados;
				return newEmail;
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