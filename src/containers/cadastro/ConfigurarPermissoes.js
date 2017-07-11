import React, { Component } from "react";
import { Tabs, Tab, Col, Button, Form, Checkbox } from "react-bootstrap";

const Horario = (props) => {
    return (
        <span>
            {props.values.map((val,index) => {
                return (
                    <Col md={12} key={index}>
                        <Checkbox name={props.name} checked={val.status} onClick={(evt) => props.onChange(evt,index)}>
                            {val.label}
                        </Checkbox>
                    </Col>
                )
            })}
        </span>
    )
}

class ConfigurarPermissoes extends Component {
    state = {
        bloqueioRelatorios: this.props.permissoes.bloqueioRelatorios ? this.props.permissoes.bloqueioRelatorios : [],
        bloqueioAcessos: this.props.permissoes.bloqueioAcessos ? this.props.permissoes.bloqueioAcessos : []
    }

    componentWillMount() {
        this.props.getPermissoesUser(this.props.userId);
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();
    }

    onChange = (evt, pos) => {
        let newState = this.state[evt.target.name];
        newState[pos].status = !newState[pos].status;

        this.setState({
            [evt.target.name]: newState
        })
    }

    render() {
        const relatorios = "Bloqueio de relatórios";
        const acessos = "Bloqueio de acessos";
        const editar = [
            {label: relatorios, form: <Horario onChange={this.onChange} name="bloqueioRelatorios" values={this.state.bloqueioRelatorios} />},
            {label: acessos, form: <Horario onChange={this.onChange} name="bloqueioAcessos" values={this.state.bloqueioAcessos} />}
        ]

        return (
            <Col md={12}>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Tabs
                        defaultActiveKey={0}
                        id="uncontrolled-tab-example">

                        {editar.map((item,index) => {
                            return (
                                <Tab eventKey={index} title={item.label} key={index}>
                                    {item.form}
                                </Tab>
                            )
                        })}

                    </Tabs>

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

export default ConfigurarPermissoes;