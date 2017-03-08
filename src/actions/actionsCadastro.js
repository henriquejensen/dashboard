import { GET_USERS_CADASTRO, GET_GROUPS_CADASTRO, LOADING_CADASTRO } from "../constants/constantsCadastro";

export function loadingCadastro() {
    return {
        type: LOADING_CADASTRO,
        payload: "loading"
    }
}

export function getGruposCadastro() {
    return {
        type: GET_GROUPS_CADASTRO,
        payload: "getGrupos"
    }
}

export function getUsersCadastro() {
    return {
        type: GET_USERS_CADASTRO,
        payload: "getUsers"
    }
}