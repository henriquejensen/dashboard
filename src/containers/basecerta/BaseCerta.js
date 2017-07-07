import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Alert, Button, Col, Form, DropdownButton, MenuItem, ProgressBar } from "react-bootstrap";

//Actions
import {
  closeMessageErrorBaseCerta,
  filterBaseCerta,
  getDocumentoSaidaBaseCerta,
  getDocumentoEntradaBaseCerta,
  getTicketsBaseCerta,
  loadingBaseCerta
} from "../../actions/actionsBaseCerta";

//Components
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import Modal from "../../components/Modal"
import PanelGroup from "../../components/panel/PanelGroup"
import BaseCertaView from "./BaseCertaView"
import NovoEnriquecimento from "./NovoEnriquecimento"
import MyButton from "../../components/button/MyButton"
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { NENHUM_REGISTRO, ADVANCED_SEARCH } from "../../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_BASECERTA } from "../../constants/constantsCompany"

class BaseCerta extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBuscaAvancada: false,
      IsModalOpen: false
    }
  }

  componentWillMount() {
    let ticket = location.search.split("=")[1]
    this.props.loadingBaseCerta()
    this.props.getTicketsBaseCerta(ticket)
  }

  componentDidMount() {
    document.title = COMPANY_PRODUCT_BASECERTA + " > " + COMPANY_NAME_SHORT;
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  } 

  onClickBuscaAvancada = () => {
    this.setState({
      showBuscaAvancada: !this.state.showBuscaAvancada
    })
  }

  onFormSubmit = (evt) => {
    evt.preventDefault()
    
    let { ticket, layout, clienteLogin, nomeArquivo, usuario, limitar } = this.state

    let inputFilter = { ticket, layout, clienteLogin, nomeArquivo, usuario, limitar }

    this.props.loadingBaseCerta()
    this.props.filterBaseCerta(inputFilter)
  }

  renderForm = () => {
      return (
        <Panel>
          <Form onSubmit={this.onFormSubmit} >
              <Col md={this.state.showBuscaAvancada ? 4 : 8}>
                  <MyFieldGroup
                    id="ticket"
                    label="Ticket"
                    type="text"
                    name="ticket"
                    onChange={this.onChange} />
              </Col>

              {this.state.showBuscaAvancada ?
                <span>
                  <Col md={4}>
                      <MyFieldGroup
                        id="layout"
                        label="Layout"
                        type="text"
                        name="layout"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={4}>
                      <MyFieldGroup
                        id="clienteLogin"
                        label="Cliente Login"
                        type="text"
                        name="clienteLogin"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={4}>
                      <MyFieldGroup
                        id="nomeArquivo"
                        label="Nome do Arquivo"
                        type="text"
                        name="nomeArquivo"
                        onChange={this.onChange} />
                  </Col>

                  <Col md={4}>
                      <MyFieldGroup
                        id="usuario"
                        label="Usuário"
                        type="text"
                        name="usuario"
                        onChange={this.onChange} />
                  </Col>
                </span>
              : ""}

              <Col md={2}>
                  <SelectGroup
                    id="limitar"
                    label="Limitar"
                    type="select"
                    name="limitar"
                    options={["10", "20","30", "40","50", "60","70", "80","90","Todos"]}
                    value="20"
                    onChange={this.onChange} />
              </Col>

              <Col md={2}>
                  <label htmlFor="">
                    <a href="#" onClick={this.onClickBuscaAvancada} >
                      {!this.state.showBuscaAvancada ? ADVANCED_SEARCH : 'Fechar busca'}
                    </a>
                  </label>
                  <Button style={{width:"100%"}} type="submit" bsStyle="info">Buscar</Button>
              </Col>
          </Form>
          
          {this.props.status ?
              <Col md={12} sm={12}> 
                  <Alert bsStyle="success" className="text-center" onDismiss={this.props.closeMessageErrorBaseCerta}>
                      {this.props.message}
                  </Alert>
              </Col>
          :""}
        </Panel>
      )
  }

  openModal = (text) => {
    this.setState({
      modalTitle: text,
      IsModalOpen: true
    })
  }

  render() {
    let loading = this.props.loading
    let tickets = this.props.tickets || []

    if(tickets.length > 0 && tickets.find(ticket => ticket.porcentagem < 100)) {
      setTimeout(() => this.props.getTicketsBaseCerta(), 10000)
    }

    return (
      <div>
        <Col md={12} sm={12} className="text-center">
          <MyButton
              onClickButton={this.openModal}
              params={["Novo enriquecimento"]}
              myButtonText="Novo enriquecimento"
              myButtonClass="pull-right color-payement"
          />
        </Col>

        {this.renderForm()}

        {loading ? <LoadingScreen /> : ""}

        <div style={{marginBottom:15}} />

        <PanelGroup>
          {tickets.length > 0 ?
            tickets.map(ticket => 
              <BaseCertaView
                ticket={ticket}
                key={ticket.id}
                getDocumentoSaidaBaseCerta={this.props.getDocumentoSaidaBaseCerta}
                getDocumentoEntradaBaseCerta={this.props.getDocumentoEntradaBaseCerta}
              />)
            :
            <Panel>
              <Col md={12} className="text-center">{NENHUM_REGISTRO}</Col>
            </Panel>
          }
        </PanelGroup>
        
        <Modal
            IsModalOpen={this.state.IsModalOpen}
            closeModal={() => this.setState({IsModalOpen: false})}
            title={this.state.modalTitle}
        >

          <NovoEnriquecimento closeNovoEnriquecimento={() => this.setState({IsModalOpen: false})} />        

        </Modal>

      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    tickets: state.basecerta.tickets,
    message: state.basecerta.message,
    status: state.basecerta.status,
    loading: state.basecerta.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      closeMessageErrorBaseCerta,
      filterBaseCerta,
      getDocumentoSaidaBaseCerta,
      getDocumentoEntradaBaseCerta,
      getTicketsBaseCerta,
      loadingBaseCerta
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseCerta);