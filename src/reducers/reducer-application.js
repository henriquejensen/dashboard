import { browserHistory } from "react-router";

import { LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from "../constants/utils";

const getInitialState = {
    colorMenu: "#7a5ec0",
    error: false,
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            browserHistory.push("/");
            let newState = {
                colorMenu: state.colorMenu,
                error: false,
                msgn: "",
            }
            return newState;

        case LOGIN_ERROR:
            let newStateError = {
                colorMenu: state.colorMenu,
                error: true,
                msgn: "Dados inválidos"
            }
            return newStateError;

        case "CHANGE_COLOR_MENU":
            let newStateColor = {
                colorMenu: action.payload,
                error: false,
                msgn: state.msgn
            }
            return newStateColor;
    }

    return state;
}