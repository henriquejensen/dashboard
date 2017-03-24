import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

import { getTicketsVendaMais } from "../../actions/actionsVendaMais";

import { FieldGroup, SelectGroup } from "../../components/forms/CommonForms";
import Panel from "../../components/panel/Panel";

import Modal from "../../components/Modal";

import { LOGO_VENDAMAIS, NENHUM_REGISTRO } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_VENDAMAIS } from "../../constants/constantsCompany";

class VendaMais extends Component {
  state = {
    IsModalOpen: false
  }

  renderForm = () => {
      return (
          <Form onSubmit={this.onFormSubmit} className="my-form">
              <Col md={2}>
                  <FieldGroup
                    id="ticket"
                    label="Ticket"
                    type="number"
                    name="ticket" />
              </Col>

              <Col md={3}>
                  <FieldGroup
                    id="nome"
                    label="Nome"
                    type="text"
                    name="nome" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="cliente"
                    label="Cliente"
                    type="text"
                    name="cliente" />
              </Col>

              <Col md={2}>
                  <FieldGroup
                    id="solicitante"
                    label="Solicitante"
                    type="text"
                    name="solicitante" />
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

  componentWillMount() {
    this.props.getTicketsVendaMais();
  }

  componentDidMount() {
    document.title = COMPANY_PRODUCT_VENDAMAIS + " > " + COMPANY_NAME_SHORT;
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
        <img src={LOGO_VENDAMAIS} className="logo-produto" />

        <Col md={2} style={{position:"absolute", right:24, top:0}}>
          <DropdownButton bsStyle={"primary"} title="Criar Ticket" id={'dropdown-basic-0'} style={{float:"right"}}>
            <MenuItem eventKey="1" onClick={() => this.openModal("Cadastro de um novo ticket")}>Cadastro de ticket</MenuItem>
            <MenuItem eventKey="2" onClick={() => this.openModal("Solicitação especial")}>Solicitação especial</MenuItem>
          </DropdownButton>
        </Col>

      </Col>

      {this.renderForm()}
            
      <Col md={12}>
        {this.props.tickets.length > 0 ? 
          this.props.tickets.map((ticket,index) => {
            return (
              <Panel title={"Ticket: "+ticket.ticket} key={index} qtdTotal={[{icon:"fa fa-ticket", qtd:ticket.quantidade}]}>
                <Col md={6}>
                  <strong>Nome: </strong>{ticket.nome}
                </Col>
                <Col md={3}>
                  <strong>Envio: </strong>{ticket.postagem}
                </Col>
                <Col md={3}>
                  <strong>Entrega: </strong>{ticket.entrega}
                </Col>

                <Col md={6}>
                  <strong>Descrição: </strong>{ticket.descricao}
                </Col>

                <Col md={6}>
                  <strong>Solicitante: </strong>{ticket.solicitante}
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
    tickets: state.vendamais.tickets
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTicketsVendaMais }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(VendaMais);