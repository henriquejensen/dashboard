import {
    AUTHENTICATION,
    ERROR_401_UNAUTHORIZED,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT,
    CHANGE_COLOR_MENU,
    CLOSE_MESSAGE_CHANGE_PASSWORD,
    LOADING,
    SUCCESS,
    ERROR,
    REQUEST_ERROR,
    REQUEST_CHANGE_PASSWORD,
    RESET_CHANGE_PASSWORD,
    SET_COOKIE_SESSION,
    USER_CHANGED_PASSWORD,
    USER_RESET_PASSWORD,
    USER_RESET_PASSWORD_MESSAGE,
    USER_CHANGED_PASSWORD_MESSAGE,
    USER_CLIENT,
    USER_EMAIL2,
    USER_LOGIN,
    USER_PHONE,
    USER_PHOTO,
    USER_NAME,
    USER_PERFIL,
    USER_PERFIL_ORDEM,
    USER_PRODUCTS
} from "../constants/utils"
import { GET_LAYOUTS_BASECERTA } from "../constants/constantsBaseCerta"

const getInitialState = {
    colorMenu: "#673ab7",
    loading: false,
    logado: localStorage.getItem(AUTHENTICATION) ? true : false,
    error: false,
    status: "",
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS: {
            let { response } = action.payload.response
            localStorage.setItem(AUTHENTICATION, response)
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: true,
                error: false,
                status: state.status,
                msgn: "logado",
            }
        }

        case LOGIN_ERROR: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: true,
                status: state.status,
                msgn: action.payload.erro.mensagem
            }
        }

        case LOADING: {
            return {
                colorMenu: state.colorMenu,
                loading: true,
                logado: state.logado,
                error: false,
                status: state.status,
                msgn: state.msgn
            }
        }        

        case LOG_OUT: {
            removeInfoLocalStorage()
            return {
                colorMenu: "",
                loading: false,
                logado: false,
                error: false,
                status: "",
                msgn: LOG_OUT
            }
        }

        case REQUEST_CHANGE_PASSWORD: {
            let { response } = action.payload.response
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: SUCCESS,
                msgn: USER_CHANGED_PASSWORD_MESSAGE + " " + response
            }
        }

        case RESET_CHANGE_PASSWORD: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: SUCCESS,
                msgn: USER_RESET_PASSWORD_MESSAGE
            }
        }

        case SET_COOKIE_SESSION: {
            const { CEBB1F3CE2C566A6, CEBB1F3CE2C566A62 } = action.payload.response
            const host = location.host.replace(/.*?(?=\.)/, "")
            document.cookie = `CEBB1F3CE2C566A6=${CEBB1F3CE2C566A6};domain=${host}`
            document.cookie = `CEBB1F3CE2C566A62=${CEBB1F3CE2C566A62};domain=${host}`
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: state.logado,
                error: false,
                status: state.status,
                msgn: "",
            }
        }

        case CLOSE_MESSAGE_CHANGE_PASSWORD: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: "",
                msgn: ""
            }
        }
        
        case CHANGE_COLOR_MENU: {
            return {
                colorMenu: action.payload,
                loading: false,
                logado: state.logado,
                error: false,
                status: state.status,
                msgn: state.msgn
            }
        }

        case ERROR_401_UNAUTHORIZED: {
            removeInfoLocalStorage()
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: true,
                status: ERROR_401_UNAUTHORIZED,
                msgn: action.payload
            }
        }

        case REQUEST_ERROR: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: true,
                error: false,
                status: ERROR,
                msgn: action.payload.mensagem
            }
        }

        default:
            return state

    }
}

function removeInfoLocalStorage() {
    localStorage.removeItem(AUTHENTICATION)
    localStorage.removeItem(GET_LAYOUTS_BASECERTA)
    localStorage.removeItem(USER_PRODUCTS)
    localStorage.removeItem(USER_NAME)
    localStorage.removeItem(USER_PERFIL)
    localStorage.removeItem(USER_PERFIL_ORDEM)
    localStorage.removeItem(USER_CLIENT)
    localStorage.removeItem(USER_LOGIN)
    localStorage.removeItem(USER_EMAIL2)
    localStorage.removeItem(USER_PHONE)
    localStorage.removeItem(USER_PHOTO)

    cleanCookie()
}

function cleanCookie() {
    const host = location.host.replace(/.*?(?=\.)/, "")
    document.cookie = `${AUTHENTICATION}=;domain=${host}`
    document.cookie = `CEBB1F3CE2C566A6=;domain=${host}`
    document.cookie = `CEBB1F3CE2C566A62=;domain=${host}`
}