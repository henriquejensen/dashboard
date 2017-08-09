import React, { Component } from "react";
import { Button, ButtonToolbar, Col, Image } from "react-bootstrap";

import { MyFieldGroup, RadioGroupGeneric, TextAreaGroup, SelectGroup } from "../../components/forms/CommonForms";
import { MESSAGE_FIELD_CELULARES_EMPTY, MESSAGE_FIELD_CONTEUDO_EMPTY, MESSAGE_HELP_CELULARES } from "../../constants/utils";

export default class SMSRapido extends Component {
    state = {
        tipoRota: [
            {info:"Curto", checked:true},
            {info:"Longo", checked:false},
            {info:"Carta", checked:false}
        ],
        nextScreen: false,
        isCelularesEmpty: false,
        isConteudoEmpty: false
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
                        error={this.state.isCelularesEmpty}
                        message={this.state.isCelularesEmpty ? MESSAGE_FIELD_CELULARES_EMPTY : MESSAGE_HELP_CELULARES}
                        value={this.state.celulares}
                        onChange={this.onChange}
                        placeholder="Ex: 5199999999,518888888,517777777" />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        id="conteudoSMS"
                        label="Conteúdo do SMS"
                        name="conteudoSMS"
                        error={this.state.isConteudoEmpty}
                        message={this.state.isConteudoEmpty ? MESSAGE_FIELD_CONTEUDO_EMPTY : ""}
                        value={this.state.conteudoSMS}
                        onChange={this.onChange}
                        placeholder="Conteudo do SMS" />
                </Col>

                <Col md={12}>
                    <MyFieldGroup
                        id="nomeRemetente"
                        type="text"
                        label="Nome Remetente"
                        name="nomeRemetente"
                        placeholder="Nome do remetente" />
                </Col>

                <Col md={6}>
                    <MyFieldGroup
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
                    <Col md={6}>
                        <MyFieldGroup
                            id="validos"
                            type="text"
                            label="Válidos"
                            name="validos"
                            value='45' />
                    </Col>

                    <Col md={6}>
                        <MyFieldGroup
                            id="duplicados"
                            type="text"
                            label="Duplicados"
                            name="duplicados"
                            value="0" />
                    </Col>
                            
                    <Col md={6}>
                        <MyFieldGroup
                            id="invalidos"
                            type="text"
                            label="Inválidos"
                            name="invalidos"
                            value='5' />
                    </Col>

                    <Col md={6}>
                        <MyFieldGroup
                            id="total"
                            type="text"
                            label="total"
                            name="total"
                            value='50' />
                    </Col>

                    <Col md={12}>
                        <MyFieldGroup
                            id="totalCobrado"
                            type="text"
                            label="Total de SMS cobrados"
                            name="totalCobrado"
                            value='45' />
                    </Col>
                </Col>

                <Col md={5}>
                    <div style={{width:"220px", height:"400px", backgroundImage:"url(https://s3.amazonaws.com/front.images/utils/phone.png)", backgroundSize:"cover"}}>
                        <span style={{position:"absolute", top:75, fontSize:9, marginLeft:42, marginRight:55}}>{this.state.conteudoSMS}</span>
                    </div>
                </Col>
            </span>
        )
    }

    nextScreen = () => {
        if(!this.state.celulares || !this.state.conteudoSMS) {
            this.setState({
                isCelularesEmpty: !this.state.celulares ? true : false,
                isConteudoEmpty: !this.state.conteudoSMS ? true : false,
            })
        } else {
            this.setState({
                nextScreen: !this.state.nextScreen,
                isCelularesEmpty: false,
                isConteudoEmpty: false,
            })
        }
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