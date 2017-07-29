import React, { Component } from "react";
import Notification from "react-notification-system";
import { Alert, Button, Col, Well } from "react-bootstrap";
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

// Components
import MyButton from "../../components/button/MyButton"
import TitleProduct from "../../components/utils/TitleProduct"
import { MyFieldGroup, RadioGroupGeneric, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms";

// Actions
import { closeSMSMessage, loadingSMS, sendSMSRapido } from "../../actions/actionsSMS";

// Constants
import { SUCCESS } from "../../constants/utils"
import { MESSAGE_SUCCESS_SMS, MESSAGE_ERROR_SMS } from "../../constants/constantsSMS"
import {
    COMPANY_NAME_SHORT,
    COMPANY_PRODUCT_SMS,
    COMPANY_PRODUCT_SMS_COLOR,
    COMPANY_PRODUCT_SMS_LABEL,
    ICON_SMS
} from "../../constants/constantsCompany"

export class EnviarSMS extends Component {
    constructor(props) {
        super(props)

        this.consultasAtivas = this.props.consultasAtivas[COMPANY_PRODUCT_SMS_LABEL]
        this.maximoCaracteres = 160
        this.maximoCaracteresCarta = 864

        this.tipoRotaCurto = [
            {checked: true, info:"Curto"},
            {checked: false, info:"Flash"}
        ]
        this.tipoRotaLongo = [
            {checked: false, info:"Longo"},
            {checked: false, info:"Carta"}
        ]
        this.tipoRota = []
        this.consultasAtivas.SMSUNIT ? this.tipoRota.push(...this.tipoRotaCurto) : ""
        this.consultasAtivas.SMSLONGCODE ? this.tipoRota.push(...this.tipoRotaLongo) : ""
        this.state = {
            tipoRotaSMS: [
                ...this.tipoRota
            ],
            nome: null,
            rota: "1", // 1 curto 2 longo
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
        let isCarta = tipoRotaSMS[indexRadioClicked].info === "Carta" ? true : false
        let isLongo = tipoRotaSMS[indexRadioClicked].info === "Longo" ? true : false
        let isFlash = tipoRotaSMS[indexRadioClicked].info === "Flash" ? true : false
        let caracteresRestantes = isCarta ? 
            ((this.maximoCaracteresCarta - this.state.conteudoSMS.length) <= 0 ? 0 : this.maximoCaracteresCarta - this.state.conteudoSMS.length) :
            ((this.maximoCaracteres - this.state.conteudoSMS.length) <= 0 ? 0 : this.maximoCaracteres - this.state.conteudoSMS.length)

        tipoRotaSMS.map((tipo, index) => {
            indexRadioClicked === index ? tipo.checked = true : tipo.checked = false
            return tipo
        })

        this.setState({
            tipoRotaSMS,
            limiteCaracteres: isCarta ? this.maximoCaracteresCarta : this.maximoCaracteres,
            caracteresRestantes: caracteresRestantes,
            rota: isLongo ? 2 : isFlash ? 4 : isCarta ? 3 : 1
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
        let totalSMS = Math.ceil(caracteres / this.maximoCaracteres)
        let conteudoSMS = evt.target.value.slice(0, limiteCaracteres)

        if(caracteres <= limiteCaracteres) {            
            this.setState({
                conteudoSMS: conteudoSMS,
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

                <TitleProduct
                    icon={ICON_SMS}
                    title={this.consultasAtivas.produtoDescricao}
                    color={COMPANY_PRODUCT_SMS_COLOR}
                />

                {this.consultasAtivas.SMSLONGCODE || this.consultasAtivas.SMSUNIT ?
                    this.renderForm()
                :
                    <Col md={12} sm={12}> 
                        <Alert
                            bsStyle="info"
                            className="text-center"
                            role="alert"
                        >
                            <p>Quer conhecer mais sobre o produto <strong>SMS</strong>? </p>
                            <p>Entre em contato com os nossos representantes</p>
                        </Alert>
                    </Col>
                }

            </span>
        )
    }
}

function mapStateToProps(state) {
    return {
        message: state.sms.message,
        status: state.sms.status,
        consultasAtivas: state.user.consultasAtivas
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