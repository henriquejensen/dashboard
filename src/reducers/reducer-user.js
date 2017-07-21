import { browserHistory } from "react-router"

//Cosntants
import * as constantsUser from "../constants/constantsUser"
import {
        AUTHENTICATION,
        EDIT_USER_PROFILE_SUCCESS,
        GET_USER_PHOTO,
        INFO_SUCCESS,
        SUCCESS,
        ERROR,
        ERR_CONNECTION_REFUSED,
        ERROR_503,
        FOTO_URL,
        REQUEST_ERROR,
        USER_CLIENT,
        USER_CONSULTS,
        USER_NAME,
        USER_PHOTO,
        USER_EMAIL2,
        USER_LOGIN,
        USER_PHONE,
        USER_PERFIL,
        USER_PERFIL_ORDEM,
        USER_PRODUCTS
} from "../constants/utils"

//Data
import notifications from "./data/notifications.json"

let user = {
    mapProdutos: localStorage.getItem(USER_PRODUCTS) ? localStorage.getItem(USER_PRODUCTS).split(",") : null,
    usuarioNome: localStorage.getItem(USER_NAME),
    usuarioEmail2: localStorage.getItem(USER_EMAIL2),
    usuarioTelefone: localStorage.getItem(USER_PHONE),
    usuarioLogin: localStorage.getItem(USER_LOGIN),
    usuarioFoto: localStorage.getItem(USER_PHOTO),
    perfilDescricao: localStorage.getItem(USER_PERFIL),
    perfilOrdem: localStorage.getItem(USER_PERFIL_ORDEM),
    pessoaDescricao: localStorage.getItem(USER_CLIENT),
    consultasAtivas: JSON.parse(localStorage.getItem(USER_CONSULTS)),
    ip: localStorage.getItem("ip"),
    status: null,
    message: null,
    loading: false
}

export default function (state = user, action) {
    switch(action.type){
        case constantsUser.USER_EDIT_INFO: {
            let { erro } = action.payload.response
            let  { usuario, usuarioEmail, usuarioTelefone, usuarioImagem, usuarioImagemPreview } = action.payload.parameters
            localStorage.setItem(USER_PHOTO, FOTO_URL + state.usuarioId + ".jpg")
            return {
                ...state,
                usuarioNome: usuario && !erro ? usuario : state.usuarioNome,
                usuarioFoto: usuarioImagemPreview && !erro ? usuarioImagemPreview : state.usuarioFoto,
                usuarioEmail2: usuarioEmail && !erro ? usuarioEmail : state.email2,
                usuarioTelefone : usuarioTelefone && !erro ? usuarioTelefone  : state.telefone,
                status: erro ? ERROR : SUCCESS,
                message: erro ? erro.mensagem : EDIT_USER_PROFILE_SUCCESS,
                loading: false
            }
        }

        case constantsUser.USER_CLOSE_MESSAGE: {
            return {
                ...state,
                status: "",
                message: "",
                loading: false
            }
        }

        case constantsUser.LOADING_USER_SCREEN: {
            return {
                ...state,
                status: "",
                message: "",
                loading: true
            }
        }

        case constantsUser.USER_EDIT_DASHBOARD: {
            return {
                ...state,
                gadgets: action.payload.gadgets,
                charts: action.payload.charts,
                status: null,
                message: null,
                loading: false
            }
        }

        case constantsUser.IP_USER: {
            localStorage.setItem("ip", action.payload)
            return {
                ...state,
                ip: action.payload
            }
        }

        case GET_USER_PHOTO: {
            var imageUrl = action.payload
            return {
                ...state,
                usuarioFoto: imageUrl !== ERROR ? imageUrl : state.usuarioFoto,
            }
        }

        case INFO_SUCCESS: {
            let { response } = action.payload.response
            let {
                consultasAtivas={},
                mapProdutos=[],
                usuarioLogin,
                usuarioNome="",
                usuarioEmail2="",
                usuarioTelefone="",
                usuarioFoto="",
                usuarioId,
                perfilDescricao,
                pessoaDescricao,
                perfilOrdem
            } = response

            if(consultasAtivas["8"]) {
                consultasAtivas["8"].NOVOENRIQUECIMENTO = {
                    labelFront: "Novo Enriquecimento",
                    link: "/basecerta/novoenriquecimento"
                }
                consultasAtivas["8"].MONITORBASECERTA = {
                    labelFront: "Monitor Base Certa",
                    link: "/basecerta"
                }
            }
            if(consultasAtivas["9"]) {
                consultasAtivas["9"].ENVIARSMS = {
                    labelFront: "Enviar SMS",
                    link: "/sms/enviorapido"
                }
                consultasAtivas["9"].MONITORENVIOS = {
                    labelFront: "Monitor de envios",
                    link: "/sms"
                }
                consultasAtivas["9"].RESPOSTAS = {
                    labelFront: "Respostas",
                    link: "/sms/respostas"
                }
            }
            if(consultasAtivas["3"]) {
                consultasAtivas["3"].PLACA = {
                    labelFront: "PLACA"
                }
                consultasAtivas["3"].CHASSI = {
                    labelFront: "CHASSI"
                }
                consultasAtivas["3"].NUMEROMOTOR = {
                    labelFront: "Nº MOTOR"
                }
            }

            localStorage.setItem(USER_CONSULTS, JSON.stringify(consultasAtivas))
            localStorage.setItem(USER_PRODUCTS, mapProdutos)
            localStorage.setItem(USER_LOGIN, usuarioLogin)
            localStorage.setItem(USER_NAME, usuarioNome)
            localStorage.setItem(USER_EMAIL2, usuarioEmail2)
            localStorage.setItem(USER_PHONE, usuarioTelefone)
            localStorage.setItem(USER_PHOTO, usuarioFoto ? FOTO_URL + usuarioId + ".jpg" : "https://s3-us-west-2.amazonaws.com/front.assertiva/public/images/avatar.gif")
            localStorage.setItem(USER_PERFIL, perfilDescricao)
            localStorage.setItem(USER_PERFIL_ORDEM, perfilOrdem)
            localStorage.setItem(USER_CLIENT, pessoaDescricao)
            
            return {
                ...state,
                ...response,
                usuarioFoto: usuarioFoto ? FOTO_URL + usuarioId + ".jpg" : state.usuarioFoto,
                status: null,
                message: null,
                loading: false
            }
        }

        case ERR_CONNECTION_REFUSED: {
            return {
                ...state,
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                loading: false
            }
        }

        case REQUEST_ERROR: {
            return {
                ...state,
                message: REQUEST_ERROR,
                loading: false,
                status: ERROR,
            }
        }

        default:
            return state
    }
} 