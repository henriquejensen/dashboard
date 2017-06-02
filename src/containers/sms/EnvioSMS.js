import React, { Component } from "react";
import { Col, Button, Well } from "react-bootstrap";
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

// Components
import { FieldGroup, RadioGroupGeneric, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms";

// Actions
import { sendSMSRapido } from "../../actions/actionsSMS";

export class EnviarSMS extends Component {

    constructor(props) {
        super(props)

        this.maximoCaracteres = 160
        this.maximoCaracteresCarta = 864

        this.state = {
            tipoRotaSMS: [
                {checked: true, info:"Curto"},
                {checked: false, info:"Flash"},
                {checked: false, info:"Longo"},
                {checked: false, info:"Carta"}
            ],
            rota: 1, // 1 curto 2 longo
            numeros: Array.isArray(this.props.numeros) ? this.props.numeros : [this.props.numeros],
            caracteresRestantes: this.maximoCaracteres,
            limiteCaracteres: this.maximoCaracteres,
            totalSMS: 0
        }
    }

    onChangeRadio = (indexRadioClicked, name) => {
        let tipoRotaSMS = this.state.tipoRotaSMS.concat()
        let isCarta = this.state.tipoRotaSMS[indexRadioClicked].info === "Carta" ? true : false
        let isLongo = this.state.tipoRotaSMS[indexRadioClicked].info === "Longo" ? true : false

        tipoRotaSMS.map((tipo, index) => {
            indexRadioClicked === index ? tipo.checked = true : tipo.checked = false
            return tipo
        })

        this.setState({
            tipoRotaSMS,
            limiteCaracteres: isCarta ? this.maximoCaracteresCarta : this.maximoCaracteres,
            caracteresRestantes: isCarta ? this.maximoCaracteresCarta - this.state.caracteresRestantes : this.state.caracteresRestantes,
            rota: isLongo ? 2 : 1
        })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onSendSMS = (evt) => {
        evt.preventDefault()
        
        let requestMessage = {
            nome: this.state.nome,
            rota: this.state.rota,
            smsList: this.state.numeros.map(num => {
                return {
                    numero: num,
                    mensagem: this.state.conteudoSMS
                }
            })
        }

        this.props.sendSMSRapido(requestMessage)
        // chamada da funcao do componente que solicitou o EnvioSMS
        this.props.onSendSMS ? this.props.onSendSMS() : ""
    }
    
    onChangeConteudoSMS = (evt) => {
        let limiteCaracteres = this.state.limiteCaracteres
        let caracteres = evt.target.value.length
        let totalSMS = parseInt(caracteres / limiteCaracteres)

        if(caracteres <= limiteCaracteres) {
            this.setState({
                [evt.target.name]: evt.target.value.slice(0,limiteCaracteres),
                caracteresRestantes: limiteCaracteres - caracteres,
                totalSMS: totalSMS
            })
        } else {
            this.setState({
                [evt.target.name]: this.state[evt.target.name].slice(0,limiteCaracteres)
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.onSendSMS}>
                <RadioGroupGeneric
                    id="tipoRotaSMS"
                    label="Tipo de Rota:"
                    colRadio={2}
                    colLabel={3}
                    style={{marginTop:0}}
                    onChange={this.onChangeRadio}
                    datas={this.state.tipoRotaSMS}
                />

                <Col md={12}>
                    <FieldGroup
                        id="numeros"
                        label="* Celular(es)"
                        type="text"
                        name="numeros"
                        value={this.state.numeros}
                        placeholder="Números para envio da mensagem"
                        message="Limite máximo: 1000"
                        onChange={this.onChange} />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        required
                        id="conteudoSMS"
                        label="* Conteúdo do SMS"
                        name="conteudoSMS"
                        value={this.state.conteudoSMS}
                        placeholder="Escreva o conteúdo do seu SMS"
                        onChange={this.onChangeConteudoSMS} />
                </Col>

                <Col md={12}>
                    <FieldGroup
                        id="nome"
                        label="Campanha"
                        name="nome"
                        value={this.state.nome}
                        placeholder="Escreva o nome da campanha"
                        onChange={this.onChange} />
                </Col>

                <Col md={6}>
                    <SelectGroup
                        id="centroCusto"
                        type="select"
                        name="centroCusto"
                        label="* Centro de Custo"
                        options={this.props.optionsCentroCusto ? this.props.optionsCentroCusto : ["Padrão"]}
                        onChange={this.onChange} />
                </Col>

                <Col md={6}>
                    <FieldGroup
                        id="remetente"
                        label="Nome Remetente"
                        name="remetente"
                        value={this.state.remetente}
                        placeholder="Escreva o nome do remetente"
                        onChange={this.onChange} />
                </Col>

                <Col md={12}>
                    <Well bsSize="small" className="text-center">Caracteres Restantes: {this.state.caracteresRestantes} || Total de SMS's: {this.state.totalSMS}</Well>
                </Col>
                
                <Col md={6}>
                    <Button onClick={this.props.cancel} >Cancelar</Button>
                </Col>
                <Col md={6}>
                    <Button type="submit" className="pull-right" bsStyle="primary">Enviar</Button>
                </Col>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendSMSRapido }, dispatch)
}


export default connect(null, mapDispatchToProps)(EnviarSMS);