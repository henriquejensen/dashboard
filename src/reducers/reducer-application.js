import { LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT, CHANGE_COLOR_MENU, AUTHENTICATION, LOADING } from "../constants/utils";

const getInitialState = {
    colorMenu: "#7a5ec0",
    loading: false,
    logado: false,
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
            let logout = state;
            logout.logado = false;
            return logout;

        case CHANGE_COLOR_MENU:
            let newStateColor = {
                colorMenu: action.payload,
                loading: false,
                logado: state.logado,
                error: false,
                msgn: state.msgn
            }
            return newStateColor;

    }

    return state;
}