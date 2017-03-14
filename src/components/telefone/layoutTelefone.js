import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";
import { Form, FormControl, FormGroup, Button } from "react-bootstrap";

import Table from "../Table";
import Modal from "../Modal";

import { formatPhone } from "../utils/functions/patternDocuments";
import { NENHUM_REGISTRO } from "../../constants/utils";

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

        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendNewPhone = this.sendNewPhone.bind(this);

    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    sendNewPhone(evt) {
        evt.preventDefault();

        this.state.telefone ?
            this.props.sendNewPhone(this.state.telefone)
        :   this.props.sendNewPhone(this.state.celular)

        this.setState({
            telefone: "",
            celular: ""
        })

        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");
    }

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        return (
                <div>
                    <div className="col-md-6">
                        <Table>
                            <tbody>
                                {this.props.fixos.length > 0 ?
                                    this.props.fixos.map((tel,i) => {
                                        return (
                                            <tr key={i} className={i > 3 ? (this.props.showMoreTel ? "" : "display-none") : ""} >
                                                <td>
                                                    <i className="fa fa-phone" />
                                                    {formatPhone(tel.telefone)}
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCopy">
                                                        <CopyToClipboard text={tel.telefone} onCopy={() => this._addNotification("Número copiado com sucesso")}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipMessageVoice">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
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
                                                        <img src="http://logok.org/wp-content/uploads/2015/06/Claro-logo-logotype-1024x768.png" width="25"/>
                                                    </a>
                                                </td>
                                            </tr>)
                                    })
                                : NENHUM_REGISTRO + " de telefone fixo"}

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
                    </div>

                    <div className="col-md-6">
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
                                                    <i className="fa fa-mobile" />
                                                    {formatPhone(tel.telefone)}
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipCopy">
                                                        <CopyToClipboard text={tel.telefone} onCopy={() => this._addNotification("Número copiado com sucesso")}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipSMS">
                                                        <i className="fa fa-comments icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                                    </a>
                                                </td>

                                                <td className="noPrint">
                                                    <a data-tip data-for="tooltipMessageVoice">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
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
                                                        <img src="http://2.bp.blogspot.com/-2iz4nnxuSu8/TyHGVjiLdDI/AAAAAAAABbw/wJWY-ugjozI/s1600/logotipo+oi.jpg" width="20" className="like-button"/>
                                                    </a>
                                                </td>
                                            </tr>)
                                    })
                                : NENHUM_REGISTRO + " de telefone móvel"}

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
                    </div>

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
                        title="SMS Rápido"
                    >
                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />
                    
                </div>)
    }
}