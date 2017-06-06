import React, {Component} from "react";
import Notification from "react-notification-system";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form } from "react-bootstrap";

// Actions
import { getCampanhasSMS } from "../../actions/actionsSMS";

// Components
import MonitorEnviosView from "./MonitorEnviosView"
import PanelGroup from "../../components/panel/PanelGroup"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import { FieldGroup } from "../../components/forms/CommonForms"

// Constants
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_SMS } from "../../constants/constantsCompany";
import { MESSAGE_SUCCESS_SMS, NENHUM_REGISTRO, SUCCESS } from "../../constants/utils";

class MonitorEnvios extends Component {
    constructor(props) {
      super(props);

      this.state = {
        campanhasSMS: this.props.campanhasSMS,
        showBuscaAvancada: false
      }
    }

    componentWillMount() {
      this.props.getCampanhasSMS();
    }

    componentDidMount() {
      document.title = COMPANY_PRODUCT_SMS + " > " + COMPANY_NAME_SHORT;
    }

    onClickBuscaAvancada = (evt) => {
      evt.preventDefault()

      this.setState({
        showBuscaAvancada: !this.state.showBuscaAvancada
      })
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
      <section>
        {this.renderForm()}

        <div style={{marginBottom:15}} />

        <PanelGroup>
          {this.props.campanhas.length > 0 ? 
            this.props.campanhas.map((campanha,index) => {
              return (
                <MonitorEnviosView
                  campanha={campanha}
                  key={index} />
              )
            })
          : ""}
        </PanelGroup>
    </section>)
    }
}


function mapStateToProps(state) {
  console.log("ACTIONS", state)
  return {
    campanhas: state.sms.response
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCampanhasSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MonitorEnvios);