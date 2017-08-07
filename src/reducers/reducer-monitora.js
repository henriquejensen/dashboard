import * as constantsMonitora from "../constants/constantsMonitora"
import {
		CHANGE_LOCALIZE_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
		ERR_CONNECTION_REFUSED_MESSAGE,
		ERROR_503,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../constants/utils"

const getInitialState = {
    carteiras: [],
    documentos: []
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case constantsMonitora.NOVA_CARTEIRA_MONITORA: {
            const { carteiras } = action.payload.response
            return {
                ...state,
                carteiras: carteiras,
            }       
        }

        case constantsMonitora.GET_CARTEIRAS_MONITORA: {
            const { carteiras } = action.payload.response
            return {
                ...state,
                carteiras: carteiras,
                carteira: null,
                id: null
            }
        }
        
        case constantsMonitora.GET_DOCUMENTOS_MONITORA: {
            return {
                ...state,
                /*documentos: [
                    {
                        idCarteira: 1,
                        id: 1,
                        codigoTipo: 1,
                        documento: "28918913842",
                        cep: "",
                        nome: "",
                        status: "INATIVO"
                    },
                    {
                        idCarteira: 1,
                        id: 2,
                        codigoTipo: 1,
                        documento: "12345678910",
                        cep: "",
                        nome: "",
                        status: "ATIVO"
                    }
                ],*/
                documentos:[],
                carteiraNome: null,
                id: null
            }
        }

        case constantsMonitora.GET_DOCUMENTOS_CARTEIRA_MONITORA: {
            const { documentosPf, documentosPj } = action.payload.response
            const documentos = documentosPf && documentosPf.length > 0 || documentosPj
            const { carteiraNome, idCarteira } = action.payload.parameters
            return {
                ...state,
                documentos: documentos,
                carteiraNome: carteiraNome,
                id: idCarteira
            }
        }

        case constantsMonitora.NOVO_DOCUMENTO_MONITORA: {
            const { idCarteira, documento, cep } = action.payload.parameters
            return {
                ...state,
                documentos: [
                    ...state.documentos,
                    {
                        idCarteira: idCarteira,
                        id: 2,
                        codigoTipo: 1,
                        documento: documento,
                        cep: cep,
                        nome: "",
                        status: "ATIVO"
                    }
                ],
                id: idCarteira,
            }
        }
    }

    return state
}