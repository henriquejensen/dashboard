import React, {Component} from "react"
import moment from "moment"
import Notification from "react-notification-system"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Button, Col, Form } from "react-bootstrap"

// Actions
import { filterCampanhasSMS, getCampanhasSMS, loadingSMS } from "../../actions/actionsSMS"

// Components
import MonitorEnviosView from "./MonitorEnviosView"
import PanelGroup from "../../components/panel/PanelGroup"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import TitleProduct from "../../components/utils/TitleProduct"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"
import { DateField, MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"

// Constants
import { MESSAGE_SUCCESS_SMS, NENHUM_REGISTRO, SUCCESS } from "../../constants/utils"
import {
    COMPANY_NAME_SHORT,
    COMPANY_PRODUCT_SMS,
    COMPANY_PRODUCT_SMS_COLOR,
    COMPANY_PRODUCT_SMS_LABEL,
    ICON_SMS
} from "../../constants/constantsCompany"

class MonitorEnvios extends Component {
    constructor(props) {
      super(props)

      this.consultasAtivas = this.props.consultasAtivas[COMPANY_PRODUCT_SMS_LABEL]
      this.state = {
        showBuscaAvancada: false,
        dataInicio: moment(),
        dataFim: moment(),
        changeData: false
      }
    }

    componentDidMount() {
      document.title = COMPANY_PRODUCT_SMS + " > " + COMPANY_NAME_SHORT;
      this.props.loadingSMS()
      this.props.getCampanhasSMS()
    }

    onClickBuscaAvancada = () => {
      this.setState({
        showBuscaAvancada: !this.state.showBuscaAvancada
      })
    }

    onChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    onFormSubmit = (evt) => {
      evt.preventDefault()

      let { id=null, campanha=null, dataInicio, dataFim, cliente=null, usuario=null, limitar=null, changeData } = this.state
      dataInicio = changeData ? moment(this.state.dataInicio).format("YYYY-MM-DD") : null
      dataFim = changeData ? moment(this.state.dataFim).format("YYYY-MM-DD") : null

      this.props.loadingSMS()
      this.props.filterCampanhasSMS({ id, campanha, dataInicio, dataFim, cliente, usuario, limitar })

      this.setState({
        changeData: false
      })
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={4}>
                    <MyFieldGroup
                      id="idCampanha"
                      label="Id"
                      type="text"
                      name="id"
                      onChange={this.onChange} />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                      id="smsCampanha"
                      label="Campanha"
                      type="text"
                      name="campanha"
                      onChange={this.onChange} />
                </Col>

                {this.state.showBuscaAvancada ?
                  <Col md={3}>
                      <MyFieldGroup
                        id="smsUsuario"
                        label="Usuário"
                        type="text"
                        name="usuario"
                        onChange={this.onChange} />
                  </Col>
                : ""}

                <Col md={this.state.showBuscaAvancada ? 2 : 3}>
                    <SelectGroup
                      id="limitar"
                      label="Limitar"
                      type="select"
                      name="limitar"
                      options={["10", "20","30", "40","50", "60","70", "80","90","100","200","500","1000","Todos"]}
                      value="20"
                      onChange={this.onChange} />
                </Col>

                {this.state.showBuscaAvancada ?
                  <span>
                    <Col md={3}>
                        <DateField
                            label="Data Início"
                            placeholder="Data inicial"
                            startDate={this.state.dataInicio}
                            onChange={(date) => this.setState({dataInicio: date, changeData: true})}
                        />
                    </Col>

                    <Col md={3}>
                        <DateField
                            label="Data Fim"
                            placeholder="Data final"
                            startDate={this.state.dataFim}
                            onChange={(date) => this.setState({dataFim: date, changeData:true})}
                        />
                    </Col>

                    <Col md={4}>
                        <MyFieldGroup
                          id="smsCliente"
                          label="Cliente"
                          type="text"
                          name="cliente"
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
        <div>
          <TitleProduct
              icon={ICON_SMS}
              title={this.consultasAtivas.produtoDescricao}
              color={COMPANY_PRODUCT_SMS_COLOR}
          />

          {this.renderForm()}

          {this.props.loading ? <LoadingScreen /> : ""}

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
            :
            <Panel>
              <Col md={12} className="text-center">{NENHUM_REGISTRO}</Col>
            </Panel>
          }
          </PanelGroup>
        </div>
      )
    }
}

function mapStateToProps(state) {
  return {
    campanhas: state.sms.campanhas,
    loading: state.sms.loading,
    consultasAtivas: state.user.consultasAtivas
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      filterCampanhasSMS,
      getCampanhasSMS,
      loadingSMS
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MonitorEnvios);