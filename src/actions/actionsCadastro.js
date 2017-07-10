import ajax from "superagent";
import * as cadastro from "../constants/constantsCadastro";

import { api, apiWithKeySession, apiGet, apiPut, apiGetWithKeySession } from "../api/Api";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function addNewUser(usuario) {
	let url = cadastro.URL_ADD_NEW_USER
		/*+"?usuario.grupoUsuarioVO.id="+usuario.grupoUsuarioVO.id
		+"&usuario.perfilVO.id="+usuario.perfilVO.id
		+"&usuario.usuario="+usuario.usuario
		+"&usuario.email1="+usuario.email1
		+"&usuario.email2"+usuario.email2
		+"&usuario.statusAtivo="+usuario.statusAtivo
		+"&usuario.tipoLimitacao="+usuario.tipoLimitacao
		+"&usuario.periodoLimitacao"+usuario.periodoLimitacao
		+"&usuario.limiteValorString="+parseInt(usuario.limiteValorString)
		+"&usuario.obs="+usuario.obs*/

	let search = cadastro.ADD_NEW_USER
	let data = usuario

	return (dispatch) => {
		apiWithKeySession(dispatch, url, data, search)
	}
}

export function addNewGroup(grupo) {
	let url = cadastro.URL_ADD_NEW_GRUPO
	let search = cadastro.GET_GROUPS_CADASTRO
	let data = grupo

	return (dispatch) => {
		api(dispatch, url, data, search)
	}
}

export function updateUser(usuario, tipo) {
	let url = cadastro.URL_UPDATE_USER
		+"?usuario.id="+usuario.id
		+"&usuario.grupoUsuarioVO.id="+usuario.grupoUsuarioVO.id
		+"&usuario.perfilVO.id="+usuario.perfilVO.id
		+"&usuario.usuario="+usuario.usuario
		+"&usuario.email1="+usuario.email1
		+"&usuario.email2"+usuario.email2
		+"&usuario.statusAtivo="+usuario.statusAtivo
		+"&usuario.tipoLimitacao="+usuario.tipoLimitacao
		+"&usuario.periodoLimitacao"+usuario.periodoLimitacao
		+"&usuario.limiteValorString="+parseInt(usuario.limiteValorString)
		+"&usuario.obs="+usuario.obs;

	return (dispatch) => {
		ajax.put(url)
			.set({keySession: localStorage.getItem("authorization")})
			.end(function(error, response) {
				if (response.body) {
					if (response.status == 200 && !response.body.erro) {
						dispatch({type: cadastro.ADD_NEW_USER, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function closeMessageError() {
    return {
        type: cadastro.CLOSE_MESSAGE_ERROR,
        payload: "closemessage"
    }
}

export function editGroup(grupo) {
	let url = cadastro.URL_UPDATE_GRUPO
	let search = cadastro.GET_GROUPS_CADASTRO
	let data = grupo

	return (dispatch) => {
		apiPut(dispatch, url, data, search)
	}

}

export function loadingCadastro() {
    return {
        type: cadastro.LOADING_CADASTRO,
        payload: "loading"
    }
}

export function getGruposCadastro(maxResult) {
	let url = cadastro.URL_GET_GRUPOS_CADASTRO

	let search = cadastro.GET_GROUPS_CADASTRO
	let data = `?maxResult=${maxResult}`

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}

export function getUsersCadastro() {
	let url = cadastro.URL_GET_USERS_CADASTRO

	let search = cadastro.GET_USERS_CADASTRO
	let data = ""

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}

export function getConsultasGrupo(grupoId) {
    return {
        type: cadastro.GET_CONSULTAS_GRUPO,
        payload: grupoId
    }
}

export function getPermissoesUser(userId) {
	let url = cadastro.URL_GET_GROUP_PERMISSIONS

	let search = cadastro.GET_PERMISSOES_USER
	let data = userId

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}

export function getUsersByGroupId({ groupId=null, usuario=null, grupo=null, statusAtivo=null, perfilVO=null }) {
	let url = cadastro.URL_GET_USERS_BY_GROUP_ID

	let search = cadastro.GET_USERS_BY_GROUP_ID
	let data = "?"
	data = data + ( groupId ? `usuario.grupoUsuarioVO.id=${groupId}` : "" )
	data = data + ( usuario ? `&usuario.usuario=${usuario}` : "" )
	data = data + ( grupo ? `&usuario.grupoUsuarioVO.descricao=${grupo}` : "" )
	data = data + ( perfilVO ? `&usuario.perfilVO.id=${perfilVO}` : "" )
	data = data + ( statusAtivo ? `&usuario.statusAtivo=${statusAtivo}` : "" )

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}
