import { SEARCH_BY_CPF, SEARCH_BY_CNPJ, ICON_LOCALIZE } from "../constants/constantsLocalize";

export default function(state = [], action) {
	console.log("RETORNO", action)

	if(action.payload) {
		let response = {
			data: "",
			label: "",
			tipo: "",
			icon: ICON_LOCALIZE
		}

		console.log("RETORNO", action.payload)
		
		switch(action.type) {
			case SEARCH_BY_CPF:
				response.data = JSON.parse(action.payload.text).PF.DADOS;
				response.label = response.data.CPF;
				response.tipo = "CPF";
				return [...state, response]
				

			case SEARCH_BY_CNPJ:
				response.data = JSON.parse(action.payload.text).PJ.DADOS;
				response.label = response.data.CNPJ;
				response.tipo = "CNPJ";
				return [...state, response]
				
		}
	}

	return state;
}