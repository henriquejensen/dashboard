import { GET_CONSIGMAIS_LAST_QUERIES, SEARCH_CONSIGMAIS } from "../constants/constantsConsigMais";

export function getLastQueries() {
    return {
        type: GET_CONSIGMAIS_LAST_QUERIES,
        payload: "lastQueries"
    }
}

export function searchConsigMais() {
    return {
        type: SEARCH_CONSIGMAIS,
        payload: "search"
    }
}