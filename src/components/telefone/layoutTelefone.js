import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";
import Notification from "react-notification-system";

import SMSRapido from "../../containers/sms/SMSRapido";

import Table from "../Table";
import Modal from "../Modal";

export default class Telefones extends Component{
    constructor(props) {
        super(props);

        this.state = {
            smShow: false,
            IsModalOpen: false,
            showMoreTel: false
        };

        this._notificationSystem = null;

    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    closeModal() {
        this.setState({
            IsModalOpen: false
        })
    }

    render() {
        return (
                <div>
                    <div className="col-md-6 col-xs-12">
                        <Table>
                            <tbody>
                                {this.props.fixos.map((tel,i) => {
                                    tel = tel.toString().replace("(","").replace(")","").replace(" ","").replace("-","");
                                    if(tel != "") {
                                        return (
                                        <tr key={i} className={i > 3 ? (this.state.showMoreTel ? "" : "display-none") : ""} >
                                            <td>
                                                <div className="col-md-3 col-sm-3">
                                                    <i className="fa fa-phone" /> {tel[0]}{tel[1]} {tel.substring(2)}
                                                </div>

                                                <a data-tip data-for="tooltipCopy">
                                                    <div className="col-md-1 col-sm-1">
                                                        <CopyToClipboard text={tel} onCopy={() => this._addNotification("Número copiado com sucesso")}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipMessageVoice">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipCall">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="fa fa-phone icon-tel icon-tel-phone" />
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipHot">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipOperadora">
                                                    <div className="col-md-3 col-sm-3">
                                                        <img src="http://logok.org/wp-content/uploads/2015/06/Claro-logo-logotype-1024x768.png" width="25"/>
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>)
                                    }
                                })}
                            </tbody>
                        </Table>
                    </div>

                    <div className="col-md-6 col-sm-12">
                        <Table>
                            <tbody>
                                {this.props.moveis.map((tel,i) => {
                                    tel = tel.toString();
                                    return (
                                        <tr key={i} className={i > 3 ? (this.state.showMoreTel ? "" : "display-none") : ""}>
                                            <td>
                                                <div className="col-md-3 col-sm-3" style={{paddingRight: 0}}>
                                                    <i className="fa fa-mobile" /> {tel[0]}{tel[1]} {tel.substring(2)}
                                                </div>

                                                <a data-tip data-for="tooltipCopy">
                                                    <div className="col-md-1 col-sm-1">
                                                        <CopyToClipboard text={tel} onCopy={() => this._addNotification("Número copiado com sucesso")}>
                                                            <i className="fa fa-clipboard icon-tel" />
                                                        </CopyToClipboard>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipSMS">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="fa fa-comments icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipMessageVoice">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="fa fa-microphone icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipCall">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="fa fa-mobile icon-tel icon-tel-phone" />
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipHot">
                                                    <div className="col-md-1 col-sm-1">
                                                        <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipWhats">
                                                    <div className="col-md-1 col-sm-1">
                                                        <img src="../../../public/images/whatsapp.png" width="15"/>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipViber">
                                                    <div className="col-md-1 col-sm-1">
                                                        <img src="../../../public/images/viber.png" width="15"/>
                                                    </div>
                                                </a>

                                                <a data-tip data-for="tooltipOperadora">
                                                    <div className="col-md-2">
                                                        <img src="http://2.bp.blogspot.com/-2iz4nnxuSu8/TyHGVjiLdDI/AAAAAAAABbw/wJWY-ugjozI/s1600/logotipo+oi.jpg" width="20" className="like-button"/>
                                                    </div>
                                                </a>
                                            </td>
                                        </tr>)
                                })}
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
                        closeModal={this.closeModal.bind(this)}
                    >
                        <SMSRapido />
                        <button onClick={this.closeModal.bind(this)}>close</button>
                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />
                    
                </div>)
    }
}