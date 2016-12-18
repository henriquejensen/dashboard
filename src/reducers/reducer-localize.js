import { SEARCH_BY_CPF } from "../constants/constantsLocalize";

export default function(state = [], action) {
	switch(action.type) {
		case SEARCH_BY_CPF:
			return [...state, action.payload.data]
	}

	return state;
}