import {
		URL_SEARCH_CPF,
		URL_SEARCH_CNPJ,
		URL_SEARCH_TELEFONE,
		URL_SEARCH_EMAIL,
		URL_SEARCH_NOME_ENDERECO,
		URL_SEARCH_PESSOAS_RELACIONADAS,
		URL_SEARCH_ULTIMAS_CONSULTAS_LOCALIZE,
		SEARCH_BY_DOCUMENT,
		SEARCH_BY_TELEFONE,
		SEARCH_BY_EMAIL,
		SEARCH_BY_NOME_ENDERECO,
		SEARCH_BY_PESSOAS_RELACIONADOS,
		SEARCH_BY_TELEFONES_RELACIONADOS,
		SEARCH_BY_ENDERECOS_RELACIONADOS,
		SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS,
		SEARCH_BY_ENDERECOS_TELEFONES_RESULTADOS_BUSCA,
		SEE_LOCALIZE_MODEL,
		CLOSE_LOCALIZE_MODEL,
		LOADING_LOCALIZE,
		CLOSE_TAB_LOCALIZE,
		CHANGE_TAB_LOCALIZE,
		CLOSE_MESSAGE_ERROR_LOCALIZE,
		GET_LOCALIZE_LAST_QUERIES
} from "../constants/constantsLocalize"
import * as localize from "../constants/constantsLocalize"
import {
	URL_CREDITO_SEARCH_COMPLETA,
	URL_CREDITO_SEARCH_COMPLETA_PJ
} from "../constants/constantsCredito"
import * as constantsUser from "../constants/constantsUser"

import { apiContentType, api, apiFileUpload, apiPut } from "../api/Api"

export function getLastQueries(consulta, tipo) {
	let url = URL_SEARCH_ULTIMAS_CONSULTAS_LOCALIZE
	let data = {consulta}
	let search = GET_LOCALIZE_LAST_QUERIES

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {tipo:tipo})
	}
}

export function closeMessageErrorLocalize() {
	return {
		type: CLOSE_MESSAGE_ERROR_LOCALIZE,
		payload: "close"
	}
}

export function changeTab(index) {
	return {
		type: CHANGE_TAB_LOCALIZE,
		payload: index
	}
}

export function closeModel() {
	return {
		type: CLOSE_LOCALIZE_MODEL,
		payload: "closeModel"
	}
}

export function closeTab(index) {
	return {
		type: CLOSE_TAB_LOCALIZE,
		payload: index
	}
}

export function loadingLocalize() {
	return {
		type: LOADING_LOCALIZE,
		payload: "loading"
	}
}

export function reverConsultaLocalize(entrada) {
	return {
		type: localize.REVER_CONSULTA_LOCALIZE,
		payload: entrada
	}
}

export function userEditInfo({ usuarioNome, usuarioEmail2, usuarioTelefone, usuarioFoto, usuarioImagemPreview }) {
	let url = constantsUser.URL_EDIT_USER
	let data = {
		"usuario.nome":usuarioNome || "",
		"usuario.email2":usuarioEmail2 || "",
		"usuario.telefone":usuarioTelefone || ""
	}
	let search = constantsUser.USER_EDIT_INFO
	let parameters = { usuarioNome, usuarioEmail2, usuarioTelefone, usuarioFoto, usuarioImagemPreview }

    return (dispatch) => {
        apiFileUpload(dispatch, url, {name:"foto", file:usuarioFoto}, data, search, parameters)
    }
}

export function userDashboard(gadgets, charts) {
	return {
		type: constantsUser.USER_EDIT_DASHBOARD,
		payload: dashboardPreferences
	}
}

export function closeMessageUser() {
	return {
		type: constantsUser.USER_CLOSE_MESSAGE
	}
}

export function loadingUserScreen() {
	return {
		type: constantsUser.LOADING_USER_SCREEN
	}
}

export function searchTelefonesPessoaRelacionada(doc, documento, isCpfOrCnpj) {
	let url = isCpfOrCnpj == "CPF" ? URL_SEARCH_CPF : URL_SEARCH_CNPJ
	let data = isCpfOrCnpj == "CPF" ? {cpf:documento} : {cnpj:documento}
	let search = SEARCH_BY_TELEFONES_RELACIONADOS

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {documento: doc, documentoRelacionado:documento})
	}
}

export function searchEnderecosPessoaRelacionada(doc, documento, isCpfOrCnpj) {
	let url = isCpfOrCnpj == "CPF" ? URL_SEARCH_CPF : URL_SEARCH_CNPJ
	let data = isCpfOrCnpj == "CPF" ? {cpf:documento} : {cnpj:documento}
	let search = SEARCH_BY_ENDERECOS_RELACIONADOS

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {documento: doc, documentoRelacionado:documento})
	}
}

export function searchLocalizeByEmail(email) {
	let url = URL_SEARCH_EMAIL
	let data = {email}
	let search = SEARCH_BY_EMAIL

	return (dispatch) => {
		apiContentType(dispatch, url, data, search)
	}
}

export function searchLocalizeByTelefone(telefone) {
	let url = URL_SEARCH_TELEFONE
	let data = {telefone}
	let search = SEARCH_BY_TELEFONE

	return (dispatch) => {
		apiContentType(dispatch, url, data, search)
	}
}

export function searchPessoasRelacionadas(cpf, label) {
	let url = URL_SEARCH_PESSOAS_RELACIONADAS
	let data = {cpf}
	let search = SEARCH_BY_PESSOAS_RELACIONADOS

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {label: label})
	}
}

/** Consulta pode ser CPF/CNPJ, tipo é endereco ou telefone, posElemento é a posicao no array do elemento clicado, documento é
 * o documento da pessoa a ser buscada
 */
export function searchEnderecosTelefonesUltimasConsultas(tipo, consulta, posElemento, documento) {
	let data = {cpf:documento}
	let url = URL_SEARCH_CPF
	let search = SEARCH_BY_ENDERECOS_TELEFONES_ULTIMAS_CONSULTAS

	if(consulta == "CNPJ") {
		data = {cnpj:documento}
		url = URL_SEARCH_CNPJ
	}

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {tipo: tipo, consulta:consulta, posElemento:posElemento})
	}
} 

/** Consulta pode ser CPF/CNPJ, tipo é endereco ou telefone, posElemento é a posicao no array do elemento clicado, documento é
 * o documento da pessoa a ser buscada
 */
export function searchEnderecosTelefonesResultadosBusca(searchByCpfOuCnpj, indexLabel, indexArrayElements, isEnderecoOuTelefone, documento) {

	let data = {cpf:documento}
	let url = URL_SEARCH_CPF
	let search = SEARCH_BY_ENDERECOS_TELEFONES_RESULTADOS_BUSCA

	if(searchByCpfOuCnpj == "CNPJ") {
		data = {cnpj:documento}
		url = URL_SEARCH_CNPJ
	}

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {searchByCpfOuCnpj: searchByCpfOuCnpj, indexLabel:indexLabel, indexArrayElements:indexArrayElements, isEnderecoOuTelefone:isEnderecoOuTelefone})
	}
}

export function searchLocalize(documento, tipo, search) {
	documento = documento.toString()
	documento = documento.replace(/[^0-9]/g,"")
	let data = tipo == "CPF" ? {cpf:documento} : {cnpj:documento}
	let url = tipo == "CPF" ? URL_SEARCH_CPF : URL_SEARCH_CNPJ
	search = search ? search : SEARCH_BY_DOCUMENT

	return (dispatch) => {
		apiContentType(dispatch, url, data, search, {tipo: tipo, documento: documento})
	}
}

export function searchLocalizeByNomeEndereco(inputLocalize, tipo, labelToTab) {
	let url = URL_SEARCH_NOME_ENDERECO
	let data = inputLocalize
	let search = SEARCH_BY_NOME_ENDERECO
	return (dispatch) => {
		api(dispatch, url, data, search, {tipo: tipo, label: labelToTab})
	}
}

export function seeModel() {
	return {
		type: SEE_LOCALIZE_MODEL,
		payload: "model"
	}
}

export function setUserIp(ip) {
	return {
		type: constantsUser.IP_USER,
		payload: ip
	}
}