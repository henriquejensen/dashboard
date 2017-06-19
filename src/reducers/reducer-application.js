import {
    ERROR_401_UNAUTHORIZED,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOG_OUT,
    CHANGE_COLOR_MENU,
    AUTHENTICATION,
    LOADING,
    REQUEST_CHANGE_PASSWORD,
    RESET_CHANGE_PASSWORD,
    CLOSE_MESSAGE_CHANGE_PASSWORD,
    USER_CHANGED_PASSWORD
} from "../constants/utils";

const getInitialState = {
    colorMenu: "#673ab7",
    loading: false,
    logado: localStorage.getItem("token") ? true : false,
    error: false,
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS: {
            localStorage.setItem(AUTHENTICATION, action.payload.response);
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
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: state.status,
                msgn: LOG_OUT
            }
        }

        case REQUEST_CHANGE_PASSWORD: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: USER_CHANGED_PASSWORD,
                msgn: action.payload.email
            }
        }

        case RESET_CHANGE_PASSWORD: {
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                status: USER_CHANGED_PASSWORD,
                msgn: action.payload.email
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
            localStorage.removeItem(AUTHENTICATION);
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: true,
                msgn: action.payload
            }
        }

        default:
            return state

    }
}