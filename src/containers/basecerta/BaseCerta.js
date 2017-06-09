import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

//Actions
import { getTicketsBaseCerta } from "../../actions/actionsBaseCerta";

//Components
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import Modal from "../../components/Modal"
import PanelGroup from "../../components/panel/PanelGroup"
import BaseCertaView from "./BaseCertaView"
import NovoEnriquecimento from "./NovoEnriquecimento"
import MyButton from "../../components/button/MyButton"
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms";

//Constants
import { NENHUM_REGISTRO } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_BASECERTA, LOGO_BASECERTA } from "../../constants/constantsCompany";

class BaseCerta extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBuscaAvancada: false,
      IsModalOpen: false
    }
  }

  onClickBuscaAvancada = () => {
    this.setState({
      showBuscaAvancada: !this.state.showBuscaAvancada
    })
  }

  renderForm = () => {
      return (
        <Panel>
          <Form onSubmit={this.onFormSubmit} >
              <Col md={this.state.showBuscaAvancada ? 8 : 10}>
                  <MyFieldGroup
                    id="smsCampanha"
                    label="Campanha"
                    type="text"
                    name="campanha"
                    onChange={this.onChange} />
              </Col>

              {this.state.showBuscaAvancada ?
                <span>
                  <Col md={2}>
                      <MyFieldGroup
                        id="smsDataInicio"
                        label="Data Início"
                        type="date"
                        name="dataInicio"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={2}>
                      <MyFieldGroup
                        id="smsDataFim"
                        label="Data Fim"
                        type="date"
                        name="dataFim"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={2}>
                      <MyFieldGroup
                        id="idCampanha"
                        label="Id"
                        type="text"
                        name="id"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={4}>
                      <MyFieldGroup
                        id="smsCliente"
                        label="Cliente"
                        type="text"
                        name="cliente"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={4}>
                      <MyFieldGroup
                        id="smsUsuario"
                        label="Usuário"
                        type="text"
                        name="usuario"
                        onChange={this.onChange} />
                  </Col>
                </span>
              : ""}

              <Col md={2}>
                  <label htmlFor="">
                    <a href="#" onClick={this.onClickBuscaAvancada} >
                      {!this.state.showBuscaAvancada ? 'Busca avançada' : 'Fechar busca'}
                    </a>
                  </label>
                  <Button style={{width:"100%"}} type="submit" bsStyle="info">Buscar</Button>
              </Col>

          </Form>
        </Panel>
      )
  }

  /*renderForm = () => {
      return (
          <Form onSubmit={this.onFormSubmit} className="my-form">
              <Col md={1}>
                  <MyFieldGroup
                    id="ticket"
                    label="Ticket"
                    type="number"
                    name="ticket" />
              </Col>

              <Col md={2}>
                  <MyFieldGroup
                    id="layout"
                    label="Layout"
                    type="text"
                    name="layout" />
              </Col>

              <Col md={2}>
                  <MyFieldGroup
                    id="clienteLogin"
                    label="Cliente Login"
                    type="text"
                    name="clienteLogin" />
              </Col>

              <Col md={2}>
                  <MyFieldGroup
                    id="nomeGrupo"
                    label="Nome do Grupo"
                    type="text"
                    name="nomeGrupo" />
              </Col>

              <Col md={2}>
                  <MyFieldGroup
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
  }*/

  componentWillMount() {
    this.props.getTicketsBaseCerta();
    //this.props.getLayouts();
  }

  componentDidMount() {
    document.title = COMPANY_PRODUCT_BASECERTA + " > " + COMPANY_NAME_SHORT;
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
        <div style={{marginBottom:15}} />
        <MyButton
            onClickButton={this.openModal}
            params={["Novo enriquecimento"]}
            myButtonText="Novo enriquecimento"
            myButtonClass="pull-right"
        />
        
        <img src={LOGO_BASECERTA} className="logo-produto" />

      </Col>

      {this.renderForm()}

      <div style={{marginBottom:15}} />

      <PanelGroup>
        {this.props.tickets.map(ticket => <BaseCertaView ticket={ticket} key={ticket.id} />)}
      </PanelGroup>
      
      <Modal
          IsModalOpen={this.state.IsModalOpen}
          closeModal={() => this.setState({IsModalOpen: false})}
          title={this.state.modalTitle}
      >

        <NovoEnriquecimento />        

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