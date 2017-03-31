import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Alert, Button, Col, Form, InputGroup, Pagination } from "react-bootstrap";

import { addNewUser, closeMessageError, getGruposCadastro, getUsersCadastro, getUsersByGroupId, getConsultasGrupo, getPermissoesUser, loadingCadastro, updateUser } from "../../actions/actionsCadastro";

import { FieldGroup, SelectGroup } from "../../components/forms/CommonForms";

import { ADD_NEW_USER, MESSAGE_ADD_USER_SUCCESS } from "../../constants/constantsCadastro";
import { LOADING_GIF, NENHUM_REGISTRO } from "../../constants/utils";

import Modal from "../../components/Modal";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

{/*Funções para o Usuario*/}
import ConfigurarPermissoes from "./ConfigurarPermissoes";

{/*Funções para o Grupo*/}
import EditarGrupo from "./EditarGrupo";
import Usuario from "./Usuario";
import AtivarConsultas from "./AtivarConsultas";

const perfilOptions = [
    {value: 14, label: "OPERADOR"},
    {value: 13, label: "GERENTE"}
]

const quantidadeGrupos = 10;

class Cadastro extends Component {
    state = {
        usuario: {
            nome: undefined,
            grupo: undefined,
            razaoSocial: undefined,
            clienteLogin: undefined,
            status: undefined,
            perfilVO: undefined
        },
        showAdvancedSearch: false,
        showModal: false,
        screenToShow: undefined,
        screenTitle: undefined,
        sizeModal: undefined,
        activePage: 1,
        maxUsersShown: 10,
        groupInfo: {
            color: "#CBE6F3",
            id: -1,
            groupName: undefined
        }
    }

    componentWillMount() {
        this.props.loadingCadastro();
        this.props.getGruposCadastro(20);
        this.props.getUsersCadastro();
    }

    addNewUser = (user) => {
        this.closeModal();
        this.props.loadingCadastro();
        this.props.addNewUser(user);
    }

    updateUser = (user) => {
        this.closeModal();
        this.props.loadingCadastro();
        this.props.updateUser(user);
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    getMoreGroups = () => {
        this.props.loadingCadastro();
        this.props.getGruposCadastro(quantidadeGrupos+this.props.grupos.length);
    }

    onChangeUser = (evt) => {
        let newUser = this.state.usuario;
        newUser[evt.target.name] = evt.target.value;

        this.setState({
            usuario: newUser
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        console.log("SUBMIT FORM", this.state.usuario);
    }

    openModal = (screen, title, size="") => {
        this.setState({
            showModal: true,
            screenToShow: screen,
            screenTitle: title,
            sizeModal: size
        })
    }

    handleSelect = (eventKey) => {
        this.setState({
            activePage: eventKey,
            firsElement: (eventKey-1)*this.state.maxUsersShown,
            lastElement: (eventKey-1)*this.state.maxUsersShown+this.state.maxUsersShown
        });
    }

    renderForm = () => {
        return (
            <Form onSubmit={this.onFormSubmit} className="my-form">
                <Col md={this.state.showAdvancedSearch ? 12: 10}>
                    <FieldGroup
                        id="nome"
                        type="text"
                        name="nome"
                        placeholder="Digite o nome do usuário"
                        value={this.state.usuario.nome}
                        onChange={this.onChangeUser} />
                </Col>
                {this.state.showAdvancedSearch ?
                    <span>
                        <Col md={2}>
                            <FieldGroup
                                id="grupo"
                                type="text"
                                name="grupo"
                                placeholder="Nome grupo"
                                value={this.state.usuario.grupo}
                                onChange={this.onChangeUser} />
                        </Col>
                        <Col md={2}>
                            <FieldGroup
                                id="clienteLogin"
                                type="text"
                                name="clienteLogin"
                                placeholder="Cliente login"
                                value={this.state.usuario.clienteLogin}
                                onChange={this.onChangeUser} />
                        </Col>
                        <Col md={2}>
                            <FieldGroup
                                id="razaoSocial"
                                type="text"
                                name="razaoSocial"
                                placeholder="Razão social"
                                value={this.state.usuario.razaoSocial}
                                onChange={this.onChangeUser} />
                        </Col>
                        <Col md={2}>
                            <SelectGroup
                                id="perfilVO"
                                type="select"
                                name="perfilVO"
                                label={undefined}
                                value={this.state.perfilVO}
                                options={perfilOptions}
                                onChange={this.onChange} />
                        </Col>
                        <Col md={2}>
                            <SelectGroup
                                id="perfilVO"
                                type="select"
                                name="perfilVO"
                                label={undefined}
                                value={this.state.status}
                                options={["ATIVO", "INATIVO"]}
                                onChange={this.onChange} />
                        </Col>
                    </span>
                : ""}
                <Col md={2}>
                    <Button style={{width:"100%"}} bsStyle="info" type="submit">Pesquisar</Button>
                </Col>
                <Col md={12}>
                    {this.state.showAdvancedSearch ? 
                        <a className="pull-right" onClick={() => this.setState({showAdvancedSearch: !this.state.showAdvancedSearch})}>Fechar busca avançada</a>
                    :   <a className="pull-right" onClick={() => this.setState({showAdvancedSearch: !this.state.showAdvancedSearch})}>Busca avançada</a>
                    }
                </Col>
            </Form>
        )
    }

    clickedOnUsersGroup = (groupId, groupName, groupStatus) => {
        this.props.loadingCadastro();

        this.setState({
            groupInfo: {
                color: "#CBE6F3",
                id: groupId,
                groupName: groupName
            }
        });

        this.props.getUsersByGroupId(groupId, groupName, groupStatus);
    }

    showAllUsers = () => {
        this.props.loadingCadastro();
        this.props.getUsersCadastro();

        this.setState({
            firsElement: undefined,
            lastElement: undefined,
            groupInfo: {
                color: "#CBE6F3",
                id: -1,
                groupName: ""
            }
        })
    }

    renderGroupPanel = () => {
        return (
            <Panel title="GRUPOS" qtdTotal={[{qtd:this.props.grupos.length, icon:"fa fa-users"}]}>
                <Table  fields={["ID - Status", "Grupo", "Ações"]}>
                    <tbody>
                        {this.props.grupos.map((group,index) => {
                            return (
                                <tr key={index} style={group.id == this.state.groupInfo.id ? {backgroundColor:this.state.groupInfo.color} : {}}>
                                    <td>
                                        <i
                                            style={{borderRadius:5}}
                                            className="fa fa-circle-thin"
                                            id={group.statusBloqueado == "SIM" ? "userDeactivated" : "userActivated"}
                                            aria-hidden="true">
                                        </i>
                                        {" - " + group.id}  
                                    </td>
                                    <td>{group.descricao}</td>
                                    <td>
                                        <Button bsSize="xsmall" onClick={() => this.openModal(<EditarGrupo cancel={this.closeModal} grupoInfo={group} />, "Editar grupo " + group.descricao, "large")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button bsSize="xsmall" onClick={() => this.openModal(<Usuario cancel={this.closeModal} grupoId={group.id} addNewUser={this.addNewUser} options={perfilOptions} />, "Novo usuário do grupo " + group.descricao)}>
                                            <i className="fa fa-user-plus" />
                                        </Button>
                                        {'   '}
                                        {/*<Button bsSize="xsmall" onClick={() => this.openModal(<AtivarConsultas cancel={this.closeModal} getConsultasGrupo={this.props.getConsultasGrupo} grupoId={group.id} consultas={this.props.consultas}/>, "Ativar consultas")}>
                                            <i className="fa fa-gear" />
                                        </Button>
                                        {'   '}*/}
                                        <Button bsSize="xsmall" onClick={() => this.clickedOnUsersGroup(group.id, group.descricao, group.statusBloqueado)}>
                                            <i className="fa fa-users" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>

                <Button onClick={this.getMoreGroups} block>Carregar mais Grupos </Button>
                    
            </Panel>
        )
    }

    renderUsersPanel = () => {
        const users = this.props.users ? this.props.users : [];
        const totalPages = (users.length/this.state.maxUsersShown);
        return (
            <Panel title={"USUÁRIOS "+this.state.groupInfo.groupName}  qtdTotal={[{qtd:users.length, icon:"fa fa-user"}]}>
                <Table  fields={["ID - Status", "Usuário", "Grupo", "Ações"]}>
                    <tbody>
                        {users.length > 0 ?
                            users.slice(this.state.firsElement, this.state.lastElement).map((user,index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <i
                                                style={{borderRadius:5}}
                                                className="fa fa-circle-thin"
                                                id={user.statusAtivo == "SIM" ? "userActivated" : "userDeactivated"}
                                                aria-hidden="true">
                                            </i>
                                            {" - " + user.id}
                                        </td>
                                        <td>{user.usuario}</td>
                                        <td>{user.grupoUsuarioVO.descricao}</td>
                                        <td>
                                            <Button
                                                bsSize="xsmall"
                                                onClick={() => this.openModal(
                                                    <Usuario
                                                        cancel={this.closeModal}
                                                        usuarioId={user.id}
                                                        grupoId={user.grupoUsuarioVO.id}
                                                        perfilVO={user.perfilVO.id}
                                                        usuario={user.usuario}
                                                        email1={user.email1}
                                                        email2={user.email2}
                                                        statusAtivo={user.statusAtivo}
                                                        statusBoleto={user.statusBoleto}
                                                        tipoLimitacao={user.tipoLimitacao}
                                                        periodoLimitacao={user.periodoLimitacao}
                                                        limiteValorString={user.limiteValor}
                                                        options={perfilOptions}
                                                        obs={user.obs}
                                                        addNewUser={this.updateUser}/>,
                                                    "Editar usuário " + user.usuario)}>
                                                <i className="fa fa-pencil" />
                                            </Button>
                                            {/*
                                                {'   '}
                                                <Button bsSize="xsmall" onClick={() => this.openModal(<ConfigurarPermissoes cancel={this.closeModal} permissoes={this.props.permissoes} getPermissoesUser={this.props.getPermissoesUser} userId={user.id}/>, "Configurar Permissões")}>
                                                    <i className="fa fa-list-alt" />
                                                </Button>
                                            */}
                                        </td>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td colSpan={5} className="text-center">{NENHUM_REGISTRO}</td>
                            </tr> }
                    </tbody>
                </Table>
                {users.length > 10 ?
                    <Col md={12} className="text-center">
                        <Pagination
                            bsSize="medium"
                            items={totalPages}
                            activePage={this.state.activePage}
                            onSelect={this.handleSelect} />
                    </Col>
                : ""}    
            </Panel>
        )
    }

    render() {
        return (
            <Col>
                <Col md={12}>
                    <h3 style={{fontSize:16, color:"#bbb"}}>Formulário de busca</h3>
                </Col>
                {this.renderForm()}

                {this.props.error || this.props.message == ADD_NEW_USER ?
                    <Col md={12} sm={12}> 
                        <Alert bsStyle={this.props.error ? "danger" : "success"} className="text-center" onDismiss={this.props.closeMessageError}>
                            {this.props.error ?
                                this.props.message
                            : MESSAGE_ADD_USER_SUCCESS }
                        </Alert>
                    </Col>
                : ""}

                {this.props.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

                <Col md={6}>
                    <Button bsSize="small" onClick={this.showAllUsers} block>
                        Mostrar todos os usuários
                    </Button>
                    <br/>
                    {this.renderGroupPanel()}
                </Col>

                <Col md={6}>
                    {this.renderUsersPanel()}
                </Col>

                <Modal
                    IsModalOpen={this.state.showModal}
                    closeModal={this.closeModal}
                    title={this.state.screenTitle}
                    size={this.state.sizeModal}
                >
                    {this.state.screenToShow}
                </Modal>

            </Col>
        )
    }
}

function mapStateToProps(state) {
	return {
        grupos: state.cadastro.grupos,
        consultas: state.cadastro.consultas,
        permissoes: state.cadastro.permissoes,
        users: state.cadastro.users,
        loading: state.cadastro.loading,
        error: state.cadastro.error,
        message: state.cadastro.message
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
            addNewUser,
            closeMessageError,
			getGruposCadastro,
            getUsersCadastro,
            getUsersByGroupId,
            getConsultasGrupo,
            getPermissoesUser,
            loadingCadastro,
            updateUser
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);