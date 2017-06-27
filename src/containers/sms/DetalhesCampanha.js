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
import {getDetalhesCampanha, filterDetalhesCampanha} from "../../actions/actionsSMS"

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
        return (
            campanha === undefined ?
                <LoadingScreen />
            :
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
                            <MyFieldGroup
                                bsSize="small"
                                id="status"
                                label="Status"
                                type="text"
                                name="status"
                                onChange={this.onChange} />
                        </Col>

                        <Col md={2}>
                            <label htmlFor="">
                                &nbsp;
                            </label>
                            <Button style={{width:"100%"}} type="submit" bsSize="small" bsStyle="info">Buscar</Button>
                        </Col>
                    </Form>

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
                </span>
        )
    }
}

function mapStateToProps(state) {
  return {
    campanha: state.sms.campanhaDetalhes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
        filterDetalhesCampanha,
        getDetalhesCampanha
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesCampanha);