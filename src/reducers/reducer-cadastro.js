import { GET_USERS_CADASTRO, GET_GROUPS_CADASTRO, LOADING_CADASTRO } from "../constants/constantsCadastro";

import groups from "./data/cadastro/grupos.json";
import users from "./data/cadastro/users.json";

const getInitialState = {
    grupos: [],
    users: [],
    loading: false,
    error: false,
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOADING_CADASTRO:
            return {
                grupos: state.grupos,
                users: state.users,
                loading: true,
                error: false,
                msgn: "loading",
            }

        case GET_GROUPS_CADASTRO:
            return {
                grupos: groups.grupos,
                users: state.users,
                loading: false,
                error: false,
                msgn: "groups",
            }

        case GET_USERS_CADASTRO:
            return {
                grupos: state.grupos,
                users: users.usuarios,
                loading: false,
                error: false,
                msgn: "users",
            }
    }

    return state;
}