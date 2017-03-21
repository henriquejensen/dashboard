import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form, DropdownButton, MenuItem } from "react-bootstrap";

import { getCampanhasSMS } from "../../actions/index";

import SMSRapido from "./SMSRapido";

import { FieldGroup } from "../../components/forms/CommonForms";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";
import Modal from "../../components/Modal";

import { LOGO_SMS } from "../../constants/utils";

class SMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campanhasSMS: this.props.campanhasSMS,
      IsModalOpen: false
    }
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

  componentDidMount() {
    document.title = "SMS > Assertiva";

    this.props.getCampanhasSMS();
  }

  openModal = (text) => {
    this.setState({
      modalTitle: text,
      IsModalOpen: true
    })
  }

  render() {
    return (
    <section>

      <Col md={12} sm={12} className="text-center">
        <img src={LOGO_SMS} className="logo-produto" />

        <Col style={{position:"absolute", right:15, top:0}}>
          <DropdownButton bsStyle={"primary"} title="Enviar SMS" id={'dropdown-basic-0'} style={{float:"right"}}>
            <MenuItem eventKey="1" onClick={() => this.openModal("SMS Rápido")}>Rápido</MenuItem>
            <MenuItem eventKey="2" onClick={() => this.openModal("SMS por Arquivo")}>Arquivo</MenuItem>
          </DropdownButton>
        </Col>
      </Col>

      {this.renderForm()}
            
      <Col md={12}>
        <Panel title="MONITOR DE ENVIOS" qtdTotal={[{icon:"fa fa-envelope-o", qtd:this.props.campanhasSMS.length}]}>
            <Table
              fields={
                ["ID", "Grupo", "Campanha", "Cadastro", "Centro de Custo", "Rota", "Status", "Ações"]
              }
            >
              <tbody>
                  {this.props.campanhasSMS.length  > 0 ? this.props.campanhasSMS.map((campanha, index) => {
                    return (
                      <tr key={index}>
                        <td>{campanha.id}</td>
                        <td>
                          <strong>Cliente:</strong> {campanha.cliente} <br/>
                          <strong>Grupo:</strong> {campanha.grupo} <br/>
                          <strong>Usuário:</strong> {campanha.usuario}
                        </td>
                        <td>{campanha.campanha}</td>
                        <td>{campanha.cadastro}</td>
                        <td>{campanha.centroCusto}</td>
                        <td>
                          {campanha.rota[0]}<br/>
                          {campanha.rota[1]}
                        </td>
                        <td> <i className={campanha.status == 1 ? "fa fa-check my-ok" : campanha.status == 2 ? "fa fa-times my-warning" : "fa fa-spinner" } /></td>
                        <td className="acoes">
                          <i className="fa fa-list" />
                          <i className="fa fa-share" />
                        </td>
                      </tr>
                    )
                  }) :  <tr ><td colSpan="8" className="text-center">Nenhum registro encontrado</td></tr>}
              </tbody>
            </Table>
        </Panel>
      </Col>

      <Modal
          IsModalOpen={this.state.IsModalOpen}
          closeModal={() => this.setState({IsModalOpen: false})}
          title={this.state.modalTitle}
      >

        <SMSRapido
          cancel={() => this.setState({IsModalOpen: false})}
          sendSMS={console.log("SEND SMS")} />
        
      </Modal>

   </section>)
  }
}


function mapStateToProps(state) {
  return {
    campanhasSMS: state.campanhasSMS
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCampanhasSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SMS);