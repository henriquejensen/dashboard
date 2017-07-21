import React, {Component} from "react"
import moment from "moment"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Button, Col, Form } from "react-bootstrap"

//Actions
import { filterResponstasSMS, getRespostasSMS } from "../../actions/actionsSMS"

//Components
import EnviarSMS from "./EnvioSMS"
import Panel from "../../components/panel/Panel"
import Filtro from "../../components/Filtro"
import Modal from "../../components/Modal"
import Table from "../../components/table/Table"
import CardWithTable from "../../components/card/CardWithTable"
import { DateField, MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"

class Respostas extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showBuscaAvancada: false,
        IsModalOpen: false,
        dataInicio: moment(),
        dataFim: moment(),
        changeData: false
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

      let { id=null, campanha=null, dataInicio, dataFim, cliente=null, usuario=null, changeData } = this.state
      dataInicio = changeData ? moment(this.state.dataInicio).format("YYYY-MM-DD") : null
      dataFim = changeData ? moment(this.state.dataFim).format("YYYY-MM-DD") : null

      this.props.filterResponstasSMS({ id, campanha, dataInicio, dataFim, cliente, usuario })

      this.setState({
        changeData: false
      })
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={this.state.showBuscaAvancada ? 6 : 4}>
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

                <Col md={3}>
                    <MyFieldGroup
                      id="numero"
                      label="Número"
                      type="text"
                      name="numero"
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
                            onChange={(date) => this.setState({dataFim: date, changeData: true})}
                        />
                    </Col>

                    <Col md={4}>
                        <SelectGroup
                          id="limitar"
                          label="Limitar"
                          type="select"
                          name="limitar"
                          options={["10", "20","30", "40","50", "60","70", "80","90","100","200","500","1000","Todos"]}
                          value="20"
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
      const { respostas } = this.props
      return (
        <span>
          {this.renderForm()}

          <div style={{marginBottom:15}} />

          <CardWithTable
              fields={
                  [
                      {id:"dataRecebimento", name:"Recebimento"},
                      {id:"numero", name:"Número", functionToApply:(val, indexRow) => respostas[indexRow].sms.numero},
                      {id:"mensagem", name:"Mensagem"},
                      {id:"acoes", name:"Ações", functionToApply:(val, indexRow) => {
                        return <i
                          className="fa fa-reply icon-tel"
                          onClick={()=>this.setState({ IsModalOpen: true, numeros: [respostas[indexRow].sms.numero]})}
                        />
                      }}
                  ]
              }
              rows={respostas}
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
      filterResponstasSMS,
      getRespostasSMS
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Respostas);