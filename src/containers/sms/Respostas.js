import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form } from "react-bootstrap";

//Actions
import { getRespostasSMS } from "../../actions/actionsSMS";

//Components
import Panel from "../../components/panel/Panel"
import Filtro from "../../components/Filtro";
import Table from "../../components/table/Table";
import CardWithTable from "../../components/card/CardWithTable"
import { FieldGroup } from "../../components/forms/CommonForms"

class Respostas extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showBuscaAvancada: false
      }
    }

    componentWillMount() {
      this.props.getRespostasSMS();
    }

    renderForm = () => {
      return (
        <Panel>
          <Form onSubmit={this.onFormSubmit} className="my-form">
              <Col md={this.state.showBuscaAvancada ? 8 : 10}>
                  <FieldGroup
                    id="smsCampanha"
                    label="Campanha"
                    type="text"
                    name="campanha" />
              </Col>

              {this.state.showBuscaAvancada ?
                <span>
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
                        id="idCampanha"
                        label="Id"
                        type="text"
                        name="id" />
                  </Col>

                  <Col md={4}>
                      <FieldGroup
                        id="smsCliente"
                        label="Cliente"
                        type="text"
                        name="cliente" />
                  </Col>

                  <Col md={4}>
                      <FieldGroup
                        id="smsUsuario"
                        label="Usuário"
                        type="text"
                        name="usuario" />
                  </Col>
                </span>
              : ""}

              <Col md={2}>
                  <label htmlFor="">
                    <a href="#" onClick={this.onClickBuscaAvancada} >
                      {!this.state.showBuscaAvancada ? 'Busca avançada' : 'Fechar busca'}
                    </a>
                  </label>
                  <Button style={{width:"100%"}} bsStyle="info">Buscar</Button>
              </Col>
          </Form>
        </Panel>
      )
    }

    render() {
      return (
        <span>
          {this.renderForm()}

          <CardWithTable
              fields={
                  [
                      {id:"idExterno", name:"Id Externo"},
                      {id:"recebimento", name:"Data do Envio"},
                      {id:"numero", name:"Número"},
                      {id:"mensagem", name:"Mensagem"}
                  ]
              }
              rows={this.props.respostas}
          />
        </span>


      )
    }
}


function mapStateToProps(state) {
  return {
    respostas: state.sms.response
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRespostasSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Respostas);