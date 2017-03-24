import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

import { getTicketsBaseCerta } from "../../actions/actionsBaseCerta";

import { FieldGroup, SelectGroup } from "../../components/forms/CommonForms";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";
import Modal from "../../components/Modal";

import { LOGO_BASECERTA, NENHUM_REGISTRO } from "../../constants/utils";
import { COMPANY_NAME_SHORT } from "../../constants/constantsCompany";

class BaseCerta extends Component {

  state = {
    IsModalOpen: false
  }

  renderForm = () => {
      return (
          <Form onSubmit={this.onFormSubmit} className="my-form">
              <Col md={1}>
                  <FieldGroup
                    id="ticket"
                    label="Ticket"
                    type="number"
                    name="ticket" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="layout"
                    label="Layout"
                    type="text"
                    name="layout" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="clienteLogin"
                    label="Cliente Login"
                    type="text"
                    name="clienteLogin" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="nomeGrupo"
                    label="Nome do Grupo"
                    type="text"
                    name="nomeGrupo" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="usuario"
                    label="Usuário"
                    type="text"
                    name="usuario" />
              </Col>

              <Col md={1}>
                  <SelectGroup
                    id="limitar"
                    label="Usuário"
                    type="select"
                    name="usuario"
                    options={["10", "20","30", "40","50", "60","70", "80","90","Todos"]}
                    value="50"
                    onChange={this.onChange} />
              </Col>

              <Col md={2}>
                  <label htmlFor="">.</label>
                  <Button style={{width:"100%"}} bsStyle="info">Buscar</Button>
              </Col>
          </Form>
      )
  }

  componentDidMount() {
    document.title = "Base Certa > "+COMPANY_NAME_SHORT;

    this.props.getTicketsBaseCerta();
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
        <img src={LOGO_BASECERTA} className="logo-produto" />

        <Col md={2} style={{position:"absolute", right:24, top:0}}>
          <DropdownButton bsStyle={"primary"} title="Criar enriquecimento" id={'dropdown-basic-0'} style={{float:"right"}}>
            <MenuItem eventKey="1" onClick={() => this.openModal("Novo enriquecimento")}>Novo enriquecimento</MenuItem>
            <MenuItem eventKey="2" onClick={() => this.openModal("Solicitação especial")}>Solicitação especial</MenuItem>
          </DropdownButton>
        </Col>
      </Col>

      {this.renderForm()}

      <Col md={12}>
        {this.props.tickets.length > 0 ? 
          this.props.tickets.map((ticket,index) => {
            return (
              <Panel title={"Ticket: "+ticket.ticket} key={index} >
                <Col md={6}>
                  <strong>Solicitante: </strong>{ticket.solicitante}
                </Col>
                <Col md={3}>
                  <strong>Layout: </strong>{ticket.layout}
                </Col>
                <Col md={3}>
                  <strong>Arquivo: </strong>{ticket.arquivo}
                </Col>

                <Col md={6}>
                  <strong>Início: </strong>{ticket.inicio}
                </Col>

                <Col md={6}>
                  <strong>Fim: </strong>{ticket.fim}
                </Col>

                <Col md={6}>
                  <ProgressBar now={ticket.status} label={`${ticket.status}%`} active bsStyle={ticket.status == 100 ? "success" : "warning"} />
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
          closeModal={() => this.setState({IsModalOpen: false})}
          title={this.state.modalTitle}
      >

      </Modal>

   </section>)
  }
}


function mapStateToProps(state) {
  return {
    tickets: state.basecerta.tickets
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTicketsBaseCerta }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BaseCerta);