import { SEARCH_BY_CPF, SEARCH_BY_CNPJ, ICON_LOCALIZE } from "../constants/constantsLocalize";

export default function(state = [], action) {
	if(action.payload) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: "",
			produto: "",
		}

		console.log("RETORNO", action.payload)
		
		switch(action.type) {
			case SEARCH_BY_CPF:
				response.data = JSON.parse(action.payload.text).PF.DADOS;
				response.label = response.data.CPF;
				response.tipo = "CPF";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return [...state, response]
				

			case SEARCH_BY_CNPJ:
				response.data = JSON.parse(action.payload.text).PJ.DADOS;
				response.label = response.data.CNPJ;
				response.tipo = "CNPJ";
				response.icon = ICON_LOCALIZE;
				response.produto = "localize";
				return [...state, response]
				
		}
	}

	return state;
}