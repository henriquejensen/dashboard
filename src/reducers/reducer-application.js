import { browserHistory } from "react-router";

import { LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from "../constants/utils";

const getInitialState = {
    error: false,
    msgn: ""
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            browserHistory.push("/dashboard");
            let newState = {
                error: false,
                msgn: ""
            }
            return newState;

        case LOGIN_ERROR:
            let newStateError = {
                error: true,
                msgn: "Dados inválidos"
            }
            return newStateError;
    }

    return state;
}