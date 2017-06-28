import React, { Component } from "react";
import Notification from "react-notification-system";
import { Alert, Button, Col, Well } from "react-bootstrap";
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

// Components
import MyButton from "../../components/button/MyButton"
import { MyFieldGroup, RadioGroupGeneric, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms";

// Actions
import { closeSMSMessage, loadingSMS, sendSMSRapido } from "../../actions/actionsSMS";

// Constants
import { SUCCESS } from "../../constants/utils"
import { MESSAGE_SUCCESS_SMS, MESSAGE_ERROR_SMS } from "../../constants/constantsSMS"

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
            id: this.props.id,
            numeros: this.props.numeros,
            conteudoSMS: "",
            caracteresRestantes: this.maximoCaracteres,
            limiteCaracteres: this.maximoCaracteres,
            totalSMS: 0
        }

        this._notificationSystem = null;
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
            caracteresRestantes: isCarta ? this.maximoCaracteresCarta - this.state.conteudoSMS.length : this.maximoCaracteres - this.state.conteudoSMS.length,
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
            smsList: this.state.numeros.split(",").map(num => {
                return {
                    numero: num,
                    mensagem: this.state.conteudoSMS,
                    id: this.state.id ? this.state.id : ""
                }
            })
        }

        this.props.loadingSMS()
        this.props.sendSMSRapido(requestMessage)

    }
    
    onChangeConteudoSMS = (evt) => {
        
        let limiteCaracteres = this.state.limiteCaracteres
        let caracteres = evt.target.value.length
        let totalSMS = parseInt(caracteres / limiteCaracteres)

        if(caracteres <= limiteCaracteres) {            
            this.setState({
                conteudoSMS: evt.target.value.slice(0, limiteCaracteres),
                caracteresRestantes: limiteCaracteres - caracteres,
                totalSMS: totalSMS
            })
        }
    }

    renderForm = () => {
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
                    <TextAreaGroup
                        required
                        id="numeros"
                        label="* Celular(es)"
                        name="numeros"
                        value={this.state.numeros}
                        placeholder="Números para envio da mensagem(DDD+Numero). Ex: 119999999,3540404040"
                        message="Limite máximo: 1000 celulares"
                        onChange={this.onChange} />
                </Col>

                <Col md={12}>
                    <TextAreaGroup
                        required
                        id="conteudoSMS"
                        label="* Conteúdo do SMS"
                        name="conteudoSMS"
                        maxLength={this.state.limiteCaracteres}
                        value={this.state.conteudoSMS}
                        placeholder="Escreva o conteúdo do seu SMS"
                        onChange={this.onChangeConteudoSMS} />
                </Col>

                <Col md={12}>
                    <MyFieldGroup
                        id="nome"
                        label="Campanha"
                        name="nome"
                        value={this.state.nome}
                        placeholder="Escreva o nome da campanha"
                         />
                </Col>

                <Col md={12}>
                    <Well bsSize="small" className="text-center">Caracteres Restantes: {this.state.caracteresRestantes} || Total de SMS's: {this.state.totalSMS}</Well>
                </Col>

                <Col md={12}>
                    <MyButton
                        type="submit"
                        myButtonClass="btn-block color-payement"
                        myButtonText="Enviar"
                    />
                </Col>

            </form>
        )
    }

    render() {
        return (
            <span>
                {this.props.message ?
                    <Col md={12} sm={12}> 
                        <Alert
                            bsStyle={this.props.status === SUCCESS ? "success" : "danger"}
                            className="text-center"
                            onDismiss={this.props.closeSMSMessage}>

                            {this.props.message}

                        </Alert>
                    </Col>
                : ""}

                {this.renderForm()}

            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        message: state.sms.message,
        status: state.sms.status
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
        closeSMSMessage,
        loadingSMS,
        sendSMSRapido
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EnviarSMS);