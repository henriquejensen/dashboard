import { GET_CONSIGMAIS_LAST_QUERIES, SEARCH_CONSIGMAIS } from "../constants/constantsConsigMais";

import lastQueries from "./data/lastQueries.json";

const getInitialState = {
    loading: false,
    status: "",
    message: "",
    response: [],
    tabActive: "",
    lastQueries: [],
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case GET_CONSIGMAIS_LAST_QUERIES:
            return {
                loading: false,
                status: "lastQueries",
                message: "",
                response: state.response,
                tabActive: state.tabActive,
                lastQueries: lastQueries.consigmais,
            }
    }
    return state;
}