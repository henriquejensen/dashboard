import * as constantsMonitora from "../constants/constantsMonitora"
import {
		CHANGE_LOCALIZE_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
		ERR_CONNECTION_REFUSED_MESSAGE,
        ERROR_503,
        ERROR_500_MESSAGE,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../constants/utils"

const getInitialState = {
    carteiras: [],
    documentos: [],
    documentosDetalhes: [],
    loading: true
}

export default function(state=getInitialState, action) {
    try {
        switch(action.type) {
            case constantsMonitora.LOADING_MONITORA: {
                return {
                    ...state,
                    loading: true,
                    error: false
                }       
            }

            case constantsMonitora.NOVA_CARTEIRA_MONITORA: {
                const { carteiras } = action.payload.response
                return {
                    ...state,
                    carteiras: carteiras,
                    loading: false
                }       
            }

            case constantsMonitora.GET_CARTEIRAS_MONITORA: {
                const { carteiras } = action.payload.response
                return {
                    ...state,
                    carteiras: carteiras,
                    carteira: null,
                    id: null,
                    loading: false
                }
            }

            case constantsMonitora.VISUALIZAR_DOCUMENTOS_CARTEIRA_MONITORA: {
                const { documentoPf, documentoPj } = action.payload.response
                const documentos = documentoPf && documentoPf.length > 0 ? documentoPf : documentoPj

                return {
                    ...state,
                    showDocumentosDetalhes: true,
                    documentosDetalhes: documentos,
                    loading: false
                }
            }

            case constantsMonitora.SHOW_DOCUMENTOS_DETALHES: {
                return {
                    ...state,
                    showDocumentosDetalhes: false,
                }
            }
            
            case constantsMonitora.GET_DOCUMENTOS_CARTEIRA_MONITORA: {
                const { documentosPf, documentosPj } = action.payload.response
                const documentos = documentosPf && documentosPf.length > 0 ? documentosPf : documentosPj
                const { carteiraNome, idCarteira } = action.payload.parameters ? action.payload.parameters : {}

                return {
                    ...state,
                    documentos: documentos,
                    carteiraNome: carteiraNome || null,
                    id: idCarteira || null,
                    loading: false
                }
            }

            case constantsMonitora.GET_DOCUMENTOS_DETALHES_MONITORA: {
                return state
            }

            case constantsMonitora.CLOSE_MESSAGE_MONITORA: {
                return {
                    ...state,
                    error: false,
                    message: "",
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