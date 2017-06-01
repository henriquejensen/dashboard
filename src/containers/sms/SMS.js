import React, {Component} from "react";
import Notification from "react-notification-system";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

import { getCampanhasSMS } from "../../actions/actionsSMS";

import SMSRapido from "./SMSRapido";

import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_SMS } from "../../constants/constantsCompany";

import { FieldGroup } from "../../components/forms/CommonForms";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";
import Modal from "../../components/Modal";

import { MESSAGE_SUCCESS_SMS, NENHUM_REGISTRO, SUCCESS } from "../../constants/utils";
import { LOGO_SMS } from "../../constants/constantsCompany";

class SMS extends Component {
    constructor(props) {
      super(props);

      this.state = {
        campanhasSMS: this.props.campanhasSMS,
        IsModalOpen: false
      }

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

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    renderForm = () => {
        return (
            <Form onSubmit={this.onFormSubmit} className="my-form">
                <Col md={2}>
                    <FieldGroup
                      id="smsCampanha"
                      label="Campanha"
                      type="text"
                      name="campanha" />
                </Col>

                <Col md={2}>
                    <FieldGroup
                      id="smsDataInicio"
                      label="Data Início"
                      type="date"
                      name="dataInicio" />
                </Col>

                <Col md={2}>
                    <FieldGroup
                      id="smsDataFim"
                      label="Data Fim"
                      type="date"
                      name="dataFim" />
                </Col>

                <Col md={2}>
                    <FieldGroup
                      id="smsCliente"
                      label="Cliente"
                      type="text"
                      name="cliente" />
                </Col>

                <Col md={2}>
                    <FieldGroup
                      id="smsUsuario"
                      label="Usuário"
                      type="text"
                      name="usuario" />
                </Col>

                <Col md={2}>
                    <label htmlFor="">.</label>
                    <Button style={{width:"100%"}} bsStyle="info">Buscar</Button>
                </Col>
            </Form>
        )
    }

    componentWillMount() {
      this.props.getCampanhasSMS();
    }

    componentDidMount() {
      document.title = COMPANY_PRODUCT_SMS + " > " + COMPANY_NAME_SHORT;
    }

    openModal = (text) => {
      this.setState({
        modalTitle: text,
        IsModalOpen: true
      })
    }

    sendSMS = () => {
        this.closeModal();
        this._addNotification(MESSAGE_SUCCESS_SMS);
    }

    render() {
      return (
      <section>

        <Col md={12} sm={12} className="text-center">
          <img src={LOGO_SMS} className="logo-produto" />

          <Col md={2} style={{position:"absolute", right:24, top:0}}>
            <DropdownButton bsStyle={"primary"} title="Enviar SMS" id={'dropdown-basic-0'} style={{float:"right"}}>
              <MenuItem eventKey="1" onClick={() => this.openModal("SMS Rápido")}>Rápido</MenuItem>
              <MenuItem eventKey="2" onClick={() => this.openModal("SMS por Arquivo")}>Arquivo</MenuItem>
            </DropdownButton>
          </Col>
        </Col>

        {this.renderForm()}

        <Col md={12}>
          {this.props.campanhas.length > 0 ? 
            this.props.campanhas.map((campanha,index) => {
              return (
                <Panel title={"Ticket: "+campanha.id} key={index} >
                  <Col md={4}>
                    <strong>Campanha: </strong>{campanha.campanha}
                  </Col>
                  <Col md={3}>
                    <strong>Cadastro: </strong>{campanha.cadastro}
                  </Col>
                  <Col md={3}>
                    <strong>Centro de Custo: </strong>{campanha.centroCusto}
                  </Col>

                  <Col md={4}>
                    <strong>Cliente: </strong>{campanha.cliente}
                  </Col>
                  <Col md={4}>
                    <strong>Grupo: </strong>{campanha.grupo}
                  </Col>
                  <Col md={4}>
                    <strong>Usuário: </strong>{campanha.usuario}
                  </Col>

                  <Col md={12}>
                    <strong>Rota: </strong>{campanha.rota}
                  </Col>

                  <Col md={6}>
                    <ProgressBar now={campanha.status} label={`${campanha.status}%`} active bsStyle={campanha.status == 100 ? "success" : "warning"} />
                  </Col>
                </Panel>
              )
            })
          :
                <Panel title="Ticket">
                  <Col md={12} className="text-center">{NENHUM_REGISTRO}</Col>
                </Panel>}
        </Col>

        <Modal
            IsModalOpen={this.state.IsModalOpen}
            closeModal={this.closeModal}
            title={this.state.modalTitle}
        >

          <SMSRapido
            cancel={this.closeModal}
            sendSMS={this.sendSMS} />
          
        </Modal>

        <Notification ref={n => this._notificationSystem = n} />

    </section>)
    }
}


function mapStateToProps(state) {
  return {
    campanhas: state.campanhasSMS
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCampanhasSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SMS);