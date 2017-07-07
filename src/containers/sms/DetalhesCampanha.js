import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Button, Col, Form} from "react-bootstrap"

//Components
import CardWithTable from "../../components/card/CardWithTable"
import MyButton from "../../components/button/MyButton"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms";

//Actions
import {getDetalhesCampanha, filterDetalhesCampanha, loadingSMS} from "../../actions/actionsSMS"

//Constants
import { STATUS_SMS } from "../../constants/constantsSMS"

class DetalhesCampanha extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showBuscaAvancada: false
      }
    }

    componentWillMount() {
        this.props.loadingSMS()
        this.props.getDetalhesCampanha(this.props.id)
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        let { numero, status } = this.state

        console.log("STATUS", status)

        this.props.loadingSMS()
        this.props.filterDetalhesCampanha({ numero, status, id:this.props.id })
    }

    onClickBuscaAvancada = (evt) => {
      evt.preventDefault()

      this.setState({
        showBuscaAvancada: !this.state.showBuscaAvancada
      })
    }

    renderStatus = (color, status) => {
        return (
            <span>
                <a data-tip data-for={status}>
                    <i className="fa fa-circle" aria-hidden="true" style={{color:color}} ></i>
                </a>

                <Tooltip id={status}>
                    <span>{status}</span>
                </Tooltip>
            </span>
        )
    }

    render() {
        let campanha = this.props.campanha
        let loading = this.props.loading
        let values = Object.keys(STATUS_SMS)
        let status = values.map(val => {return{label:STATUS_SMS[val].label, value:val}})
        return (
            <span>
                <Form onSubmit={this.onFormSubmit} >
                    <Col md={5}>
                        <MyFieldGroup
                            bsSize="small"
                            id="numero"
                            label="Número"
                            type="text"
                            name="numero"
                            onChange={this.onChange} />
                    </Col>

                    <Col md={5}>
                        <SelectGroup
                            id="status"
                            label="Status"
                            type="select"
                            name="status"
                            options={status}
                            value="20"
                            onChange={this.onChange} />
                    </Col>

                    <Col md={2}>
                        <label htmlFor="">
                            &nbsp;
                        </label>
                        <Button style={{width:"100%"}} type="submit" bsSize="small" bsStyle="info">Buscar</Button>
                    </Col>
                </Form>

                {!loading ?
                    <CardWithTable
                        fields={
                            [
                                {id:"dataEnvio", name:"Envio"},
                                {id:"numero", name:"Número"},
                                {id:"mensagem", name:"Mensagem"},
                                {id:"status", name:"Status", functionToApply:(val, indexRow) => {
                                    let status = STATUS_SMS[campanha[indexRow].status].label
                                    let color = STATUS_SMS[campanha[indexRow].status].color
                                    return this.renderStatus(color, status)
                                }},
                            ]
                        }
                        rows={campanha}
                    />
                :
                    <LoadingScreen />
                }
            </span>
        )
    }
}

function mapStateToProps(state) {
  return {
    campanha: state.sms.campanhaDetalhes,
    loading: state.sms.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
        filterDetalhesCampanha,
        getDetalhesCampanha,
        loadingSMS
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesCampanha);