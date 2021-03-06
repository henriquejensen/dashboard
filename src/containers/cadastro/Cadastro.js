import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Alert, Button, ButtonGroup, Col, Form, InputGroup, Pagination } from "react-bootstrap"

import { addNewUser, addNewGroup, closeMessageError, editGroup, getGruposCadastro, getUsersCadastro, getUsersByGroupId, getConsultasGrupo, getPermissoesUser, loadingCadastro, updateUser } from "../../actions/actionsCadastro"

import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"

import { ADD_NEW_USER, MESSAGE_ADD_USER_SUCCESS } from "../../constants/constantsCadastro"
import { LOADING_GIF, NENHUM_REGISTRO } from "../../constants/utils"

import Modal from "../../components/Modal"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";

{/*Funções para o Usuario*/}
import ConfigurarPermissoes from "./ConfigurarPermissoes"

{/*Funções para o Grupo*/}
import EditarGrupo from "./EditarGrupo"
import Usuario from "./Usuario"
import AtivarConsultas from "./AtivarConsultas"

const perfilOptions = [
    {value: 14, label: "OPERADOR"},
    {value: 13, label: "GERENTE"}
]

const quantidadeGrupos = 10

class Cadastro extends Component {
    state = {
        usuario: {
            usuario: null,
            grupo: null,
            statusAtivo: null,
            perfilVO: null
        },
        showAdvancedSearch: false,
        showModal: false,
        screenToShow: null,
        screenTitle: null,
        sizeModal: null,
        activePage: 1,
        maxUsersShown: 10,
        groupInfo: {
            color: "#CBE6F3",
            id: -1,
            groupName: null
        },
        newGroup: {
            accessTimeDom: "NÃO",
            accessTimeQua: "NÃO",
            accessTimeQui: "NÃO",
            accessTimeSab: "NÃO",
            accessTimeSeg: "NÃO",
            accessTimeSex: "NÃO",
            accessTimeTer: "NÃO",
            bcLimiteValor: 0,
            bcPeriodoLimitacao: "AVULSO",
            bcTipoLimitacao: "INATIVO",
            consigLimiteValor: 0,
            consigPeriodoLimitacao: "AVULSO",
            consigTipoLimitacao: "INATIVO",
            creditoLimiteValor: 0,
            creditoPeriodoLimitacao: "AVULSO",
            creditoTipoLimitacao: "INATIVO",
            dataInicio: "30/06/2017",
            descricao: "",
            focofiscalLimiteValor: 0,
            focofiscalPeriodoLimitacao: "AVULSO",
            focofiscalTipoLimitacao: "INATIVO",
            id: null,
            localizeLimiteValor: 0,
            localizePeriodoLimitacao: "AVULSO",
            localizeTipoLimitacao: "INATIVO",
            periodoLimitacao: "AVULSO",
            pessoaVO: {id: null, descricao: null, razaoSocial: null},
            smsLimiteValor: 0,
            smsPeriodoLimitacao: "AVULSO",
            smsTipoLimitacao: "INATIVO",
            statusAccessTime: "NÃO",
            statusBloqueado: "NÃO",
            tipo: "CLIENTE",
            tipoLimitacao: "INATIVO",
            veiculosLimiteValor: 0,
            veiculosPeriodoLimitacao: "AVULSO",
            veiculosTipoLimitacao: "INATIVO",
            vendaMaisLimiteContagem: 0,
            vendaMaisLimiteExportacao: 0,
            vendaMaisTipoContagem: "SIM",
            vendaMaisTipoExportacao: "SIM",
        }
    }

    componentWillMount() {
        this.props.loadingCadastro()
        this.props.getGruposCadastro(20)
        this.props.getUsersCadastro()
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

    getMoreGroups = (grupos) => {
        this.props.loadingCadastro();
        this.props.getGruposCadastro(quantidadeGrupos+grupos.length);
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
        this.props.loadingCadastro();

        this.props.getUsersByGroupId(this.state.usuario);
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
                    <MyFieldGroup
                        id="usuario"
                        type="text"
                        name="usuario"
                        placeholder="Digite o nome do usuário"
                        value={this.state.usuario.usuario}
                        onChange={this.onChangeUser} />
                </Col>
                {this.state.showAdvancedSearch ?
                    <span>
                        <Col md={4}>
                            <MyFieldGroup
                                id="grupo"
                                type="text"
                                name="grupo"
                                placeholder="Nome grupo do usuário"
                                value={this.state.usuario.grupo}
                                onChange={this.onChangeUser} />
                        </Col>
                        <Col md={3}>
                            <SelectGroup
                                id="perfilVO"
                                type="select"
                                name="perfilVO"
                                value={this.state.usuario.perfilVO}
                                options={perfilOptions}
                                onChange={this.onChangeUser} />
                        </Col>
                        <Col md={3}>
                            <SelectGroup
                                id="statusAtivo"
                                type="select"
                                name="statusAtivo"
                                value={this.state.usuario.statusAtivo}
                                options={[{value:"SIM", label:"ATIVO"}, {value:"NÃO", label:"INATIVO"}]}
                                onChange={this.onChangeUser} />
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

    clickedOnUsersGroup = (groupId, groupName) => {
        this.props.loadingCadastro();

        this.setState({
            groupInfo: {
                color: "#CBE6F3",
                id: groupId,
                groupName: groupName
            }
        });

        this.props.getUsersByGroupId({ groupId });
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
        const grupos = this.props.grupos ? this.props.grupos : [];
        return (
            <Panel title="GRUPOS" qtdTotal={[{qtd:grupos.length, icon:"fa fa-users"}]}>
                <Table  fields={["ID - Status", "Grupo", "Ações"]}>
                    <tbody>
                        {grupos.map((group,index) => {
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
                                        <Button
                                            bsSize="xsmall"
                                            onClick={() => this.openModal(
                                                <EditarGrupo
                                                    editGroup={this.props.editGroup}
                                                    cancel={this.closeModal}
                                                    grupoInfo={group}
                                                />, "Editar grupo " + group.descricao, "large")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button
                                            bsSize="xsmall"
                                            onClick={() => this.openModal(
                                                <Usuario
                                                    cancel={this.closeModal}
                                                    grupo={group}
                                                    addNewUser={this.addNewUser}
                                                    options={perfilOptions}
                                                />, "Novo usuário do grupo " + group.descricao)}>
                                            <i className="fa fa-user-plus" />
                                        </Button>
                                        {'   '}
                                        <Button bsSize="xsmall" onClick={() => this.openModal(<AtivarConsultas cancel={this.closeModal} getConsultasGrupo={this.props.getConsultasGrupo} grupoId={group.id} consultas={this.props.consultas}/>, "Ativar consultas")}>
                                            <i className="fa fa-gear" />
                                        </Button>
                                        {'   '}
                                        <Button bsSize="xsmall" onClick={() => this.clickedOnUsersGroup(group.id, group.descricao)}>
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

                <Button onClick={() => this.getMoreGroups(grupos)} block>Carregar mais Grupos </Button>
                    
            </Panel>
        )
    }

    renderUsersPanel = () => {
        const users = this.props.users ? this.props.users : []
        const totalPages = (users.length/this.state.maxUsersShown)
        const groupName = this.state.groupInfo.groupName || ""
        return (
            <Panel title={"USUÁRIOS "+ groupName}  qtdTotal={[{qtd:users.length, icon:"fa fa-user"}]}>
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
                                                        grupo={user.grupoUsuarioVO}
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

                {this.props.loading  ? <LoadingScreen /> : ""}

                <Col md={6}>
                    <ButtonGroup block>
                        <Button
                            bsStyle="info"
                            bsSize="small"
                            onClick={() => this.openModal(
                                <EditarGrupo
                                    editGroup={this.props.addNewGroup}
                                    cancel={this.closeModal}
                                    grupoInfo={{
                                        ...this.state.newGroup,
                                        pessoaVO: {
                                            id: this.props.pessoaVO.id,
                                        }
                                    }}
                                />, "Novo grupo", "large")}>
                            Criar um novo grupo
                        </Button>
                        <Button
                            bsSize="small"
                            className="pull-right"
                            onClick={this.showAllUsers}>
                            Mostrar todos os usuários
                        </Button>
                    </ButtonGroup>

                    <div style={{marginBottom:15}} />

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
        pessoaVO: {
            descricao: state.user.pessoaDescricao,
            id: state.user.pessoaId,
            razaoSocial: ""
        },
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
            addNewGroup,
            closeMessageError,
            editGroup,
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