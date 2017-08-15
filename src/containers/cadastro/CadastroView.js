import React, { Component } from "react"
import { Col, Button, Pagination } from "react-bootstrap"

//Components
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import EditarGrupo from "./EditarGrupo"
import Usuario from "./Usuario"
import AtivarConsultas from "./AtivarConsultas"

import { NENHUM_REGISTRO } from "../../constants/utils"

const renderGroupPanel = props => {
    const grupos = props.grupos ? props.grupos : [];
    return (
        <Panel title="GRUPOS" qtdTotal={[{qtd:grupos.length, icon:"fa fa-users"}]}>
            <Table  fields={["ID - Status", "Grupo", "Ações"]}>
                <tbody>
                    {grupos.map((group,index) => {
                        return (
                            <tr key={index} style={group.id == props.groupInfo.id ? {backgroundColor:props.groupInfo.color} : {}}>
                                <td>
                                    <i
                                        style={{borderRadius:5}}
                                        className="fa fa-circle-thin"
                                        id={group.statusBloqueado == "SIM" ? "userDeactivated" : "userActivated"}
                                        aria-hidden="true" />
                                    {" - " + group.id}  
                                </td>
                                <td>{group.descricao}</td>
                                <td>
                                    <Button
                                        bsSize="xsmall"
                                        onClick={() => props.openModal(
                                            <EditarGrupo
                                                editGroup={props.editGroup}
                                                cancel={props.closeModal}
                                                grupoInfo={group}
                                            />, "Editar grupo " + group.descricao, "large")}>
                                        <i className="fa fa-pencil" />
                                    </Button>
                                    {'   '}
                                    <Button
                                        bsSize="xsmall"
                                        onClick={() => props.openModal(
                                            <Usuario
                                                cancel={props.closeModal}
                                                grupo={group}
                                                addNewUser={props.addNewUser}
                                                options={perfilOptions}
                                            />, "Novo usuário do grupo " + group.descricao)}>
                                        <i className="fa fa-user-plus" />
                                    </Button>
                                    {'   '}
                                    <Button bsSize="xsmall" onClick={() => props.openModal(<AtivarConsultas cancel={props.closeModal} getConsultasGrupo={props.getConsultasGrupo} grupoId={group.id} consultas={props.consultas}/>, "Ativar consultas")}>
                                        <i className="fa fa-gear" />
                                    </Button>
                                    {'   '}
                                    <Button bsSize="xsmall" onClick={() => props.clickedOnUsersGroup(group.id, group.descricao)}>
                                        <i className="fa fa-users" />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Button onClick={() => props.getMoreGroups(grupos)} block>Carregar mais Grupos </Button>
                
        </Panel>
    )
}

const renderUsersPanel = props => {
    const users = props.users ? props.users : []
    const totalPages = (users.length/ props.maxUsersShown)
    const groupName = props.groupInfo.groupName || ""
    return (
        <Panel title={"USUÁRIOS "+ groupName}  qtdTotal={[{qtd:users.length, icon:"fa fa-user"}]}>
            <Table  fields={["ID - Status", "Usuário", "Grupo", "Ações"]}>
                <tbody>
                    {users.length > 0 ?
                        users.slice(props.firsElement, props.lastElement).map((user,index) => {
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
                                            onClick={() => props.openModal(
                                                <Usuario
                                                    cancel={props.closeModal}
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
                                                    addNewUser={props.updateUser}/>,
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
                        activePage={props.activePage}
                        onSelect={props.handleSelect} />
                </Col>
            : ""}    
        </Panel>
    )
}

const Cadastroview = props => {
    return (
        <span>
            <Col md={6}>
                {renderGroupPanel(props)}
            </Col>
            <Col md={6}>
                {renderUsersPanel(props)}
            </Col>
        </span>
    )
}

export default Cadastroview