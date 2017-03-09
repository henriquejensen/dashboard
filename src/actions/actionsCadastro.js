import { GET_USERS_CADASTRO, GET_PERMISSOES_USER, GET_GROUPS_CADASTRO, GET_CONSULTAS_GRUPO, LOADING_CADASTRO } from "../constants/constantsCadastro";

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

export function getConsultasGrupo(grupoId) {
    return {
        type: GET_CONSULTAS_GRUPO,
        payload: grupoId
    }
}

export function getPermissoesUser(userId) {
    return {
        type: GET_PERMISSOES_USER,
        payload: userId
    }
}