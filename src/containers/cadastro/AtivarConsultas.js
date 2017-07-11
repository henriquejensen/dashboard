import React, { Component } from "react";
import { Col, Button, ButtonToolbar, ButtonGroup, Form, Checkbox } from "react-bootstrap";

import Table from "../../components/table/Table";

class AtivarConsultas extends Component {
    state = {
        descricaoConsultas: this.props.consultas,
        checkedBox: []
    }

    componentWillMount() {
        this.props.getConsultasGrupo(this.props.grupoId);
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();
    }

    onChangeAtivado = (pos, status) => {
        let newDescription = this.state.descricaoConsultas.concat();
        newDescription[pos].ativado = status;

        this.setState({
            descricaoConsultas: newDescription
        })
    }

    onChangeAll = (status) => {
        let newDescription = this.state.descricaoConsultas.concat();
    
        for(let pos in newDescription) {
            newDescription.ativado = status;
        }

        this.setState({
            descricaoConsultas: newDescription
        })
    }

    checkedBoxAdd = (pos) => {
        let listChecked = this.state.checkedBox.concat();
        let findPos = -1;

        for(let i in listChecked) {
            if(listChecked[i] == pos) {
                findPos = i;
            }
        }

        if(findPos >= 0) {
            listChecked.splice(findPos,1);
        } else {
            listChecked.push(pos);
        }

        this.setState({
            checkedBox: listChecked
        })
    }

    checkedBoxAddAll = (status) => {
        let newDescriptionStatus = this.state.descricaoConsultas.concat();

        for(let i in this.state.checkedBox) {
            newDescriptionStatus[this.state.checkedBox[i]].ativado = status;
        }

        this.setState({
            descricaoConsultas: newDescriptionStatus
        })
    }

    render() {
        return (
            <Col md={12}>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={() => this.checkedBoxAddAll(true)} bsSize="xsmall" id="userActivated">ON</Button>
                        <Button onClick={() => this.checkedBoxAddAll(false)} bsSize="xsmall" id="userDeactivated">OFF</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Table fields={["", "Descrição", "Ativado"]}>
                        <tbody>
                            {this.state.descricaoConsultas.map((consulta, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Checkbox name={index} onClick={(evt) => this.checkedBoxAdd(evt.target.name)} />
                                        </td>
                                        <td>{consulta.descricao}</td>
                                        <td>
                                            <ButtonToolbar>
                                                <ButtonGroup>
                                                    <Button onClick={() => this.onChangeAtivado(index, true)} bsSize="xsmall" id={consulta.ativado ? "userActivated" : ""}>ON</Button>
                                                    <Button onClick={() => this.onChangeAtivado(index, false)} bsSize="xsmall" id={consulta.ativado ? "" : "userDeactivated"}>OFF</Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Col md={6}>
                        <Button
                            type="submit"
                            onClick={this.props.cancel}>Cancelar</Button>
                    </Col>
                    <Col md={6}>
                        <Button
                            className="pull-right"
                            type="submit"
                            bsStyle="info">Salvar</Button>
                    </Col>
                </Form>
            </Col>
        )
    }
}

export default AtivarConsultas;