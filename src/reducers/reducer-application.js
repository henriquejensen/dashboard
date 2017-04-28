import { ERROR_401_UNAUTHORIZED, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT, CHANGE_COLOR_MENU, AUTHENTICATION, LOADING } from "../constants/utils";

const getInitialState = {
    colorMenu: "#673ab7",
    loading: false,
    logado: localStorage.getItem("token") ? true : false,
    error: false,
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem(AUTHENTICATION, action.payload.response);
            let newState = {
                colorMenu: state.colorMenu,
                loading: false,
                logado: true,
                error: false,
                msgn: "logado",
            }
            return newState;

        case LOGIN_ERROR:
            let newStateError = {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: true,
                msgn: action.payload.erro.mensagem
            }
            return newStateError;

        case LOADING:
            return {
                colorMenu: state.colorMenu,
                loading: true,
                logado: state.logado,
                error: false,
                msgn: state.msgn
            }

        case LOG_OUT:
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: false,
                msgn: LOG_OUT
            }

        case CHANGE_COLOR_MENU:
            return {
                colorMenu: action.payload,
                loading: false,
                logado: state.logado,
                error: false,
                msgn: state.msgn
            }

        case ERROR_401_UNAUTHORIZED:
            localStorage.removeItem(AUTHENTICATION);
            return {
                colorMenu: state.colorMenu,
                loading: false,
                logado: false,
                error: true,
                msgn: action.payload
            }

    }

    return state;
}