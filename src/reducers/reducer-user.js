import { browserHistory } from "react-router"

//Cosntants
import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser"
import {
        AUTHENTICATION,
        INFO_SUCCESS,
        USER_CLIENT,
        USER_NAME,
        USER_PERFIL,
        USER_PRODUCTS
} from "../constants/utils"

//Data
import notifications from "./data/notifications.json"

let user = {
    usuario: {
        avatar: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/images/avatar.gif",
    },
    mapProdutos: localStorage.getItem(USER_PRODUCTS) ? localStorage.getItem(USER_PRODUCTS).split(",") : null,
    usuarioNome: localStorage.getItem(USER_NAME),
    perfilDescricao: localStorage.getItem(USER_PERFIL),
    pessoaDescricao: localStorage.getItem(USER_CLIENT),
}

export default function (state = user, action) {
    switch(action.type){
        case USER_EDIT_INFO: {
            let  { usuario, usuarioEmail, usuarioTelefone, usuarioImagem, usuarioImagemPreview } = action.payload.parameters
            return {
                ...state,
                usuario: {
                    avatar: usuarioImagemPreview ? usuarioImagemPreview : state.usuario.avatar,
                    usuario: usuario ? usuario : state.usuario.usuario,
                    email2: usuarioEmail ? usuarioEmail : state.usuario.email2,
                    telefone : usuarioTelefone  ? usuarioTelefone  : state.usuario.telefone
                }
            }
        }

        case USER_EDIT_DASHBOARD: {
            return {
                ...state,
                gadgets: action.payload.gadgets,
                charts: action.payload.charts
            }
        }

        case INFO_SUCCESS: {
            let { response } = action.payload.response
            localStorage.setItem(USER_PRODUCTS, response.mapProdutos)
            localStorage.setItem(USER_NAME, response.usuarioNome)
            localStorage.setItem(USER_PERFIL, response.perfilDescricao)
            localStorage.setItem(USER_CLIENT, response.pessoaDescricao)
            
            return {
                ...state,
                ...response
            }
        }

        default:
            return state
    }
} 