import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";
import { Button, Col, Form, FormControl, FormGroup } from "react-bootstrap";

import Table from "../table/Table";
import Modal from "../Modal";
import EnviarSMS from "../forms/EnvioSMS";

import { formatPhone } from "../utils/functions/patternDocuments";
import { MESSAGE_SUCCESS_ADD_NEW_PHONE, MESSAGE_SUCCESS_NUMBER_COPY, MESSAGE_SUCCESS_SMS, NENHUM_REGISTRO, SUCCESS } from "../../constants/utils";

export default class LayoutTelefone extends Component{
    constructor(props) {
        super(props);

        this.state = {
            smShow: false,
            IsModalOpen: false,
            telefone: "",
            celular: ""
        };

        this._notificationSystem = null;
    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: SUCCESS.toLocaleLowerCase()
            });
        }
    }

    sendSMS = (evt) => {
        evt.preventDefault();
        this.closeModal();
        this._addNotification(MESSAGE_SUCCESS_SMS);
    }

    sendNewPhone = (evt) => {
        evt.preventDefault();

        this.state.telefone ?
            this.props.sendNewPhone(this.state.telefone)
        :   this.props.sendNewPhone(this.state.celular)

        this.setState({
            telefone: "",
            celular: ""
        })

        this._addNotification(MESSAGE_SUCCESS_ADD_NEW_PHONE);
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
                <div>
                    <Col md={6}>
                        <Table>
                            <tbody>
                                {this.props.fixos.length > 0 ?
                                    this.props.fixos.map((tel,i) => {
                                        return (
                                            <tr key={i} className={i > 3 ? (this.props.showMoreTel ? "" : "display-none") : ""} >
                                                <td>
                                                    <i className="fa fa-phone" />{" "}
                                                    {formatPhone(tel.telefone)}
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCopy">
                                                        <CopyToClipboard text={tel.telefone} onCopy={() => this._addNotification(MESSAGE_SUCCESS_NUMBER_COPY)}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipMessageVoice">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" />
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCall">
                                                        <i className="fa fa-phone icon-tel icon-tel-phone" />
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipHot">
                                                        <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                                    </a>
                                                </td>

                                                <td>
                                                    <a data-tip data-for="tooltipOperadora">
                                                        {tel.operadora ? tel.operadora.split("-")[0] : ""}
                                                    </a>
                                                </td>
                                            </tr>)
                                    })
                                : <tr><td colSpan={6} className="text-center"><strong>{NENHUM_REGISTRO + " de telefone fixo"}</strong></td></tr>}

                                {this.props.newPhone ?
                                    <tr>
                                        <td>
                                            <Form inline onSubmit={this.sendNewPhone}>
                                                <FormGroup controlId="formInlineName" bsSize="small">
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Digite o novo número"
                                                        name="telefone"
                                                        value={this.state.telefone}
                                                        onChange={this.onChange}/>
                                                </FormGroup>
                                                {' '}
                                                <Button type="submit" bsSize="small" bsStyle="success">
                                                    Enviar
                                                </Button>
                                            </Form>   
                                        </td>
                                    </tr>
                                : ""}

                            </tbody>
                        </Table>
                    </Col>

                    <Col md={6}>
                        <Table>
                            <tbody>
                                {this.props.moveis.length > 0 ?
                                    this.props.moveis.map((tel,i) => {
                                        return (
                                            <tr
                                                key={i}
                                                className={this.props.showMoreTel !== undefined ?
                                                    (i > 3 ? 
                                                        (this.props.showMoreTel ? "" : "display-none")
                                                    : "")
                                                : ""}>
                                                <td>
                                                    <i className="fa fa-mobile" />{" "}
                                                    {formatPhone(tel.telefone)}
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCopy">
                                                        <CopyToClipboard text={tel.telefone} onCopy={() => this._addNotification(MESSAGE_SUCCESS_NUMBER_COPY)}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipSMS">
                                                        <i className="fa fa-comments icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true, numeros: tel.telefone })}/>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipMessageVoice">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" />
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCall">
                                                        <i className="fa fa-mobile icon-tel icon-tel-phone" />
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipHot">
                                                        <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipWhats">
                                                        <img src="../../../public/images/whatsapp.png" width="15"/>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipViber">
                                                        <img src="../../../public/images/viber.png" width="15"/>
                                                    </a>
                                                </td>

                                                <td>
                                                    <a data-tip data-for="tooltipOperadora">
                                                        {tel.operadora ? tel.operadora.split("-")[0] : ""}
                                                    </a>
                                                </td>
                                            </tr>)
                                    })
                                : <tr><td colSpan={9}className="text-center"><strong>{NENHUM_REGISTRO + " de telefone móvel"}</strong></td></tr>}

                               {this.props.newPhone ?
                                    <tr>
                                        <td>
                                            <Form inline>
                                                <FormGroup controlId="formInlineName" bsSize="small">
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Digite o novo número"
                                                        name="celular"
                                                        value={this.state.celular}
                                                        onChange={this.onChange}/>
                                                </FormGroup>
                                                {' '}
                                                <Button type="submit" bsSize="small" bsStyle="success" onClick={this.sendNewPhone}>
                                                    Enviar
                                                </Button>
                                            </Form>                                      
                                        </td>
                                    </tr>
                                : ""}

                            </tbody>
                        </Table>
                    </Col>

                    <Tooltip id="tooltipCopy">
                        <span>Copiar número</span>
                    </Tooltip>

                    <Tooltip id="tooltipOperadora">
                        <span>Operadora</span>
                    </Tooltip>

                    <Tooltip id="tooltipMessageVoice">
                        <span>Enviar mensagem de voz</span>
                    </Tooltip>

                    <Tooltip id="tooltipSMS">
                        <span>Enviar SMS</span>
                    </Tooltip>

                    <Tooltip id="tooltipCall">
                        <span>Ligar</span>
                    </Tooltip>

                    <Tooltip id="tooltipHot">
                        <span>Número importante</span>
                    </Tooltip>

                    <Tooltip id="tooltipWhats">
                        <span>Enviar mensagem pelo Whatsapp</span>
                    </Tooltip>

                    <Tooltip id="tooltipViber">
                        <span>Enviar mensagem pelo Viber</span>
                    </Tooltip>

                    <Modal
                        IsModalOpen={this.state.IsModalOpen}
                        closeModal={this.closeModal}
                        title="Envio de SMS"
                    >
                        <EnviarSMS
                            cancel={this.closeModal} 
                            onSendSMS={this.sendSMS}
                            onChange={this.onChange}
                            numeros={this.state.numeros} />
                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />
                    
                </div>)
    }
}