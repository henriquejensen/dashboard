import React, { Component } from "react";
import { Col, Form, FormControl, Button, InputGroup } from "react-bootstrap";

import Modal from "../../components/Modal";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

import EditarUsuario from "./EditarUsuario";
import NovoUsuario from "./NovoUsuario";

const groups = [
    {status: true, group: "GRUPO_ADM"},
    {status: true, group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: false, group: "GRUPO_EMPRESA"},
    {status: true, group: "GRUPO_GERENTES"},
    {status: false, group: "GRUPO_TERCEIRIZADO"},
    {status: true, group: "GRUPO_RESTRITO"}
];

const users = [
    {status: true, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: true, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: false, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: false, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: true, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: true, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: false, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: false, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"},
    {status: true, user: "GRUPO_ADM", group: "GRUPO_USUARIOS_LOCALIZE"}
]

class Cadastro extends Component {
    constructor() {
        super();

        this.state = {
            usuario: {
                nome: "",
                grupo: ""
            },
            showAdvancedSearch: false,
            showModal: false,
            screenToShow: "",
            screenTitle: ""
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
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

    openModal = (screen, title) => {
        this.setState({
            showModal: true,
            screenToShow: screen,
            screenTitle: title
        })
    }

    renderForm = () => {
        return (
            <Form onSubmit={this.onFormSubmit} className="my-form">
                <Col md={this.state.showAdvancedSearch ? 12: 10}>
                    <FormControl
                        type="text"
                        placeholder="Digite o nome do usuário"
                        name="nome"
                        value={this.state.usuario.nome}
                        onChange={this.onChangeUser}
                    />
                </Col>
                {this.state.showAdvancedSearch ?
                    <span>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                    </span>
                : ""}
                <Col md={2}>
                    <Button style={{width:"100%"}} bsStyle="info">Pesquisar</Button>
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

    renderGroupPanel = () => {
        return (
            <Panel title="GRUPOS" qtdTotal={[{qtd:groups.length, icon:"fa fa-users"}]}>
                <Table
                    fields={
                        ["","Status", "Grupo", "Ações"]
                    }
                >
                    <tbody>
                        {groups.map((group,index) => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>
                                        <i
                                            className="fa fa-circle-thin"
                                            id={group.status ? "userActivated" : "userDeactivated"}
                                            aria-hidden="true">
                                        </i>   
                                    </td>
                                    <td>{group.group}</td>
                                    <td>
                                        <Button onClick={() => this.openModal(<EditarUsuario/>, "Editar grupo")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<NovoUsuario cancel={this.closeModal} usuario={{boleto:"NAO", dossie:"NAO"}}/>, "Novo usuário do grupo " + group.group)}>
                                            <i className="fa fa-user-plus" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<EditarUsuario/>, "Ativar consultas")}>
                                            <i className="fa fa-gear" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>
                    
            </Panel>
        )
    }

    renderUsersPanel = () => {
        return (
            <Panel title="USUÁRIOS" qtdTotal={[{qtd:users.length, icon:"fa fa-user"}]}>
                <Table
                    fields={
                        ["","Status", "Usuário", "Grupo", "Ações"]
                    }
                >
                    <tbody>
                        {users.map((user,index) => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>
                                        <i
                                            className="fa fa-circle-thin"
                                            id={user.status ? "userActivated" : "userDeactivated"}
                                            aria-hidden="true">
                                        </i>   
                                    </td>
                                    <td>{user.user}</td>
                                    <td>{user.group}</td>
                                    <td>
                                        <Button onClick={() => this.openModal(<EditarUsuario/>, "Editar usuário")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<EditarUsuario/>, "Permissões")}>
                                            <i className="fa fa-list-alt" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>                    
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

                <Col md={5}>
                    {this.renderGroupPanel()}
                </Col>

                <Col md={7}>
                    {this.renderUsersPanel()}
                </Col>

                <Modal
                    IsModalOpen={this.state.showModal}
                    closeModal={this.closeModal}
                    title={this.state.screenTitle}
                >
                    {this.state.screenToShow}
                </Modal>

            </Col>
        )
    }
}

export default Cadastro;