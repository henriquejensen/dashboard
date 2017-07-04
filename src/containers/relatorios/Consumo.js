import React, { Component } from 'react'
import { Link } from "react-router"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Col, Form } from "react-bootstrap"

//Actions
import { filterRelatorioR12, loadingRelatorio } from "../../actions/actionsRelatorios"
import { reverConsultaLocalize } from "../../actions/index"

// Components
import Panel from "../../components/panel/Panel"
import CardWithTable from "../../components/card/CardWithTable"
import MyButton from "../../components/button/MyButton"
import { MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { LOADING_GIF } from "../../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_LOCALIZE_LABEL} from "../../constants/constantsCompany"
import { TITLE_CONSUME } from "../../constants/utils"

class Consumo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pessoaDescricao : null,    
            pessoaNome : null,
            grupo : null,
            usuario : null,
            campanha : null,
            resultado : null,
            dataIni : null,
            dataFim : null,
            idPessoaPai : null,
            idPessoa : null,
            idGrupo : null,
            idUsuario : null,
            delimitador : null,
            tipoRelatorio : null
        }
    }

	componentDidMount() {
		document.title = TITLE_CONSUME + " > " + COMPANY_NAME_SHORT
	}

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onClickReverConsulta = (produto, entrada) => {
        /*switch (produto) {
            case COMPANY_PRODUCT_LOCALIZE_LABEL:
                this.props.reverConsultaLocalize(entrada)
                break
        }*/
        return (
            <Link to={`/${produto}`}>Rever</Link>
        )
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        let filters = { ...this.state, idRelatorio:12 }

        this.props.loadingRelatorio()
        this.props.filterRelatorioR12(filters)
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={3}>
                    <MyFieldGroup
                      id="usuario"
                      label="Usuario"
                      type="text"
                      name="usuario"
                      onChange={this.onChange} />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="pessoaDescricao"
                        label="Razão social"
                        type="text"
                        name="pessoaDescricao"
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="dataIni"
                        label="Data Início"
                        type="date"
                        name="dataIni"
                        required
                        onChange={this.onChange} />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="dataFim"
                        label="Data Fim"
                        type="date"
                        name="dataFim"
                        required
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                        id="pessoaNome"
                        label="Cliente Login"
                        type="text"
                        name="pessoaNome"
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={3}>
                    <MyFieldGroup
                        id="grupo"
                        label="Nome do grupo"
                        type="text"
                        name="grupo"
                        onChange={this.onChange}
                    />
                </Col>
                <Col md={3}>
                    <SelectGroup
                        id="resultado"
                        type="select"
                        name="resultado"
                        label="Resultado"
                        options={["TODOS"]}
                        onChange={this.onChange}
                    />
                </Col>

                <Col md={3} >
                    <label htmlFor="">
                        &nbsp;
                    </label>
                    <MyButton
                        myButtonStyle="info"
                        myButtonText="Filtrar"
                        type="submit"
                        myButtonClass="btn-block pull-right"
                    />
                </Col>

            </Form>
          </Panel>
        )
    }

    render() {
        let loading = this.props.loading
        console.log("R12", this.props.relatoriosR12)
        return (
            <div>
                {this.renderForm()}

                {loading ? <LoadingScreen /> : ""}

                <div style={{marginBottom:15}} />

                <CardWithTable title="RESULTADOS DA PESQUISA"
                    fields={
                        [
                            {id:"data", name:"Data"},
                            {id:"usuario", name:"Usuario"},
                            {id:"produto", name:"Consulta"},
                            {id:"dado", name:"Entrada", functionToApply:(val) => {return <span>{val.substring(0,15)}</span>}},
                            {id:"resultado", name:"Status"},
                            {id:"via", name:"Rever", functionToApply:(val, indexRow) => {
                                if(val == "API")
                                    return this.onClickReverConsulta(this.props.relatoriosR12[indexRow].produto,val)

                                return <span></span>
                            }}
                        ]
                    }
                    rows={this.props.relatoriosR12}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        relatoriosR12: state.relatorios.relatoriosR12,
        loading: state.relatorios.loading
    }
}

function mapDispatchProps(dispatch) {
    return bindActionCreators({
        filterRelatorioR12,
        loadingRelatorio,
        reverConsultaLocalize
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(Consumo)