import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form } from "react-bootstrap";

//Actions
import { filterResponseSMS, getRespostasSMS } from "../../actions/actionsSMS";

//Components
import EnviarSMS from "./EnvioSMS"
import Panel from "../../components/panel/Panel"
import Filtro from "../../components/Filtro";
import Modal from "../../components/Modal";
import Table from "../../components/table/Table";
import CardWithTable from "../../components/card/CardWithTable"
import { MyFieldGroup } from "../../components/forms/CommonForms"

class Respostas extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showBuscaAvancada: false,
        IsModalOpen: false
      }
    }

    componentWillMount() {
      this.props.getRespostasSMS();
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


      let request = {}
      this.state.id ? request["id"] = this.state.id : "",
      this.state.campanha ? request["campanha"] = this.state.campanha : "",
      this.state.dataInicio ? request["dataInicio"] = this.state.dataInicio : "",
      this.state.dataFim ? request["dataFim"] = this.state.dataFim : "",
      this.state.cliente ? request["cliente"] = this.state.cliente : "",
      this.state.usuario ? request["usuario"] = this.state.usuario : "",

      this.props.filterResponseSMS(request)
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit} className="my-form">
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

    render() {
      return (
        <span>
          {this.renderForm()}

          <div style={{marginBottom:15}} />

          <CardWithTable
              fields={
                  [
                      {id:"dataEnvio", name:"Envio"},
                      {id:"numero", name:"Número"},
                      {id:"mensagem", name:"Mensagem"},
                      {id:"acoes", name:"Ações", functionToApply:(val, indexRow) => {
                        return <i
                          className="fa fa-reply icon-tel"
                          onClick={()=>this.setState({ IsModalOpen: true, numeros: [this.props.respostas[indexRow].numero]})}
                        />
                      }}
                  ]
              }
              rows={this.props.respostas}
          />

          <Modal
              IsModalOpen={this.state.IsModalOpen}
              closeModal={this.closeModal}
              title="Envio de SMS"
          >
              <EnviarSMS
                cancel={this.closeModal}
                numeros={this.state.numeros}
              />
          </Modal>
        </span>


      )
    }
}


function mapStateToProps(state) {
  return {
    respostas: state.sms.respostas
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      filterResponseSMS,
      getRespostasSMS
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Respostas);