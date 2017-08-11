import {
    AUTHENTICATION,
    LOG_OUT,
    CHANGE_COLOR_MENU,
    CLOSE_MESSAGE_CHANGE_PASSWORD,
    SUCCESS,
    ERROR,
    ERR_CONNECTION_REFUSED,
    ERR_CONNECTION_REFUSED_MESSAGE,
    REQUEST_ERROR,
    REQUEST_CHANGE_PASSWORD,
    RESET_CHANGE_PASSWORD,
    SET_COOKIE_SESSION,
    USER_CHANGED_PASSWORD,
    USER_RESET_PASSWORD,
    USER_RESET_PASSWORD_MESSAGE,
    USER_CHANGED_PASSWORD_MESSAGE,
    USER_CLIENT,
    USER_CONSULTS,
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
    try {
        switch(action.type) {
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

            default:
                return state

        }
    } catch (e) {
		const { error, status } = action.payload
		return {
			...state,
			loading: false,
			error: true,
			status: ERR_CONNECTION_REFUSED,
			message: error || ERR_CONNECTION_REFUSED_MESSAGE,
		}
    }
}