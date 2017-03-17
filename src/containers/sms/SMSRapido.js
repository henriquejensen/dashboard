import React, { Component } from "react";
import { Col, Button, ButtonToolbar } from "react-bootstrap";

import { FieldGroup, RadioGroupGeneric, TextAreaGroup, SelectGroup } from "../../components/forms/CommonForms";

export default class SMSRapido extends Component {
    state = {
        tipoRota: [
            {info:"Curto", checked:true},
            {info:"Longo", checked:false},
            {info:"Carta", checked:false}
        ],
        nextScreen: false
    }

    onChangeRota = (id, name) => {
        let newState = this.state.tipoRota.concat();

        for(let i=0; i<newState.length; i++){
            if(id != i)
                newState[i].checked = false;
            else
                newState[id].checked = !newState[id].checked;
        }

        this.setState({
            tipoRota: newState
        })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    renderConfigurar = () => {
        return (
            <span>
                <Col md={12}>
                    <RadioGroupGeneric
                        id="tipoRota"
                        label="Tipo de Rota"
                        colRadio={4}
                        onChange={this.onChangeRota}
                        datas={this.state.tipoRota} />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        id="celulares"
                        type="textarea"
                        label="Celular(es)"
                        name="celulares"
                        placeholder="Ex: 5199999999,518888888,517777777" />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        id="conteudoSMS"
                        type="textarea"
                        label="Conteúdo do SMS"
                        name="conteudoSMS"
                        placeholder="Conteudo do SMS" />
                </Col>

                <Col md={12}>
                    <FieldGroup
                        id="nomeRemetente"
                        type="text"
                        label="Nome Remetente"
                        name="nomeRemetente"
                        placeholder="Nome do remetente" />
                </Col>

                <Col md={6}>
                    <FieldGroup
                        id="campanha"
                        type="text"
                        label="Campanha"
                        name="campanha"
                        placeholder="Campanha do SMS" />
                </Col>

                <Col md={6}>
                    <SelectGroup
                        id="centroCusto"
                        type="select"
                        label="Centro de Custo"
                        name="centroCusto"
                        onChange={this.onChange}
                        options={["Padrão"]}
                        placeholder="Nome do remetente" />
                </Col>
            </span>
        )
    }

    renderConfirmar = () => {
        return (
            <span>
                <Col md={7}>
                    <Col md={2}>
                        <FieldGroup
                            id="validos"
                            type="text"
                            label="Válidos"
                            name="validos"
                            value='45' />
                    </Col>

                    <Col md={2}>
                        <FieldGroup
                            id="duplicados"
                            type="text"
                            label="Duplicados"
                            name="duplicados"
                            value="0" />
                    </Col>
                            
                    <Col md={2}>
                        <FieldGroup
                            id="invalidos"
                            type="text"
                            label="Inválidos"
                            name="invalidos"
                            value='5' />
                    </Col>

                    <Col md={2}>
                        <FieldGroup
                            id="total"
                            type="text"
                            label="total"
                            name="total"
                            value='50' />
                    </Col>
                </Col>

                <Col md={5}>
                    <div style={{background:"url(https://s3-us-west-2.amazonaws.com/front.assertiva/public/images/phone.png)"}}></div>
                </Col>
            </span>
        )
    }

    nextScreen = () => {
        this.setState({
            nextScreen: !this.state.nextScreen
        })
    }
    
    render() {
        return (
            <section>
                {this.state.nextScreen ?
                    this.renderConfirmar()
                : this.renderConfigurar()}

                <Col md={12}>
                    <ButtonToolbar>
                        <Button
                            className="pull-right"
                            bsStyle="primary"
                            onClick={!this.state.nextScreen ? this.nextScreen : this.props.sendSMS}>
                            {this.state.nextScreen ? "Enviar" : "Próximo"}
                        </Button>
                        <Button
                            className="pull-right"
                            onClick={this.state.nextScreen ? this.nextScreen : this.props.cancel}>
                            {this.state.nextScreen ? "Voltar" : "Cancelar"}
                        </Button>
                    </ButtonToolbar>
                </Col>
            </section>
        )
    }
}