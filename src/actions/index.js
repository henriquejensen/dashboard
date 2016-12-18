import axios from "axios";

import { URL_SEARCH, SEARCH_BY_CPF } from "../constants/constantsLocalize";

export function searchLocalize(document) {
	const request = axios.get(URL_SEARCH+document);
	
	return {
		type: SEARCH_BY_CPF,
		payload: request
	}
}