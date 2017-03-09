import { GET_USERS_CADASTRO, GET_USERS_BY_GROUP_ID, GET_PERMISSOES_USER, GET_GROUPS_CADASTRO, GET_CONSULTAS_GRUPO, LOADING_CADASTRO } from "../constants/constantsCadastro";

import groups from "./data/cadastro/grupos.json";
import users from "./data/cadastro/users.json";
import consultas from "./data/cadastro/consultas.json";
import permissoesUser from "./data/cadastro/permissoesUser.json";

const getInitialState = {
    grupos: [],
    users: [],
    consultas: [],
    permissoes: [],
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
                consultas: state.consultas,
                permissoes: state.permissoes,
                loading: true,
                error: false,
                msgn: "loading",
            }

        case GET_GROUPS_CADASTRO:
            return {
                grupos: groups.grupos,
                users: state.users,
                consultas: state.consultas,
                permissoes: state.permissoes,
                loading: false,
                error: false,
                msgn: "groups",
            }

        case GET_USERS_CADASTRO:
            return {
                grupos: state.grupos,
                users: users.usuarios,
                consultas: state.consultas,
                permissoes: state.permissoes,
                loading: false,
                error: false,
                msgn: "users",
            }

        case GET_USERS_BY_GROUP_ID:
            return {
                grupos: state.grupos,
                users: getUsersByGroupId(users.usuarios, action.payload),
                consultas: state.consultas,
                permissoes: state.permissoes,
                loading: false,
                error: false,
                msgn: "usersGroup",
            }
            
        case GET_CONSULTAS_GRUPO:
            let responseConsultas = getConsultaByIdGrupo(consultas.consultas, action.payload);
            return {
                grupos: state.grupos,
                users: state.users,
                consultas: responseConsultas.consultas,
                permissoes: state.permissoes,
                loading: false,
                error: false,
                msgn: "users",
            }

        case GET_PERMISSOES_USER:
            let responsePermissoes = getPermissoesByIdUser(permissoesUser.permissoes, action.payload);
            return {
                grupos: state.grupos,
                users: state.users,
                consultas: state.consultas,
                permissoes: responsePermissoes.permissoes,
                loading: false,
                error: false,
                msgn: "users",
            }
    }

    return state;
}

function getUsersByGroupId(users, groupId) {
    let arrayUsers = [];
    for(let i in users) {
        if(users[i].grupoUsuarioVO.id == groupId) {
            arrayUsers.push(users[i]);
        }
    }

    return arrayUsers;
}

function getPermissoesByIdUser(permissoesList, id) {
    for(let i in permissoesList) {
        if(permissoesList[i].userId == id)
            return permissoesList[i];
    }

    return [];
}


function getConsultaByIdGrupo(consultaList, id) {
    for(let i in consultaList) {
        if(consultaList[i].grupoId == id)
            return consultaList[i];
    }

    return [];
}