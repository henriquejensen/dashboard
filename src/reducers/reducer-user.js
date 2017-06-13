import { browserHistory } from "react-router";

import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { 
        ICON_LOCALIZE,
        ICON_CREDITO,
        GET_NOTIFICATIONS,
        INFO_ERROR,
        INFO_SUCCESS
} from "../constants/utils";

import notifications from "./data/notifications.json";

const user = {
    usuarioImagem: "http://i1.wp.com/www.bombeiros.pt/classificados/oc-content/themes/osclasswizards/images/default.gif",
}

export default function (state = user, action) {
    switch(action.type){
        case USER_EDIT_INFO: {
            let  { usuarioNome, usuarioEmail, usuarioTelefone, usuarioImagem, usuarioImagemPreview } = action.payload
            return {
                ...state,
                usuarioImagem: usuarioImagemPreview ? usuarioImagemPreview : state.usuarioImagem,
                usuarioNome: usuarioNome ? usuarioNome : state.usuarioNome,
                usuarioEmail: usuarioEmail ? usuarioEmail : state.usuarioEmail,
                usuarioTelefone : usuarioTelefone  ? usuarioTelefone  : state.usuarioTelefone
            }
        }

        case USER_EDIT_DASHBOARD: {
            let newState = Object.assign({}, state);
            newState.gadgets = action.payload.gadgets;
            newState.charts = action.payload.charts;
            return newState;
        }

        case INFO_SUCCESS: {
            let response = action.payload.response.response;
            let newState = Object.assign({}, state, response);
            return newState;
        }
        
        case INFO_ERROR:
            localStorage.removeItem("token");
            browserHistory.push("/");
            return state;

    }
    return state;
} 