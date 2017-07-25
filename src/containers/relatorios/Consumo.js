import React, { Component } from 'react'
import moment from "moment"
import { Link } from "react-router"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Col, Form } from "react-bootstrap"

//Actions
import { filterRelatorioR12, loadingRelatorio, reverConsulta } from "../../actions/actionsRelatorios"

// Components
import Panel from "../../components/panel/Panel"
import CardWithTable from "../../components/card/CardWithTable"
import MyButton from "../../components/button/MyButton"
import { DateField, MyFieldGroup, SelectGroup } from "../../components/forms/CommonForms"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { LOADING_GIF } from "../../constants/utils"
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_LOCALIZE_LABEL} from "../../constants/constantsCompany"
import { TITLE_CONSUME } from "../../constants/utils"

class Consumo extends Component {
    constructor(props) {
        super(props)

        this.quantityElementsPattern = 30

        this.state = {
            pessoaDescricao : null,    
            pessoaNome : null,
            grupo : null,
            usuario : null,
            campanha : null,
            resultado : null,
            dataIni : moment(),
            dataFim : moment(),
            idPessoaPai : null,
            idPessoa : null,
            idGrupo : null,
            idUsuario : null,
            delimitador : null,
            tipoRelatorio : null,
            quantityShown: this.quantityElementsPattern
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

    onClickReverConsulta = ({protocolo, produto, modulo, idProduto}) => {
        let prod = produto.replace(/\+/g,"MAIS") // VENDA+ -> VENDAMAIS
        prod = prod.replace(/[^a-zA-Z]/g,"") // BASE CERTA -> BASECERTA
        return (
            <Link
                to={`/${prod.toLowerCase()}`}
                onClick={() => this.props.reverConsulta({protocolo, modulo, idProduto})}
            >
                Rever
            </Link>
        )
    }

    onFormSubmit = (evt) => {
        evt.preventDefault()

        let filters = {
            ...this.state,
            idRelatorio:12,
            dataIni: moment(this.state.dataIni).format("YYYY-MM-DD"),
            dataFim: moment(this.state.dataFim).format("YYYY-MM-DD")
        }

        this.props.loadingRelatorio()
        this.props.filterRelatorioR12(filters)
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={12} style={{margin:0, padding:0}}>
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
                        <DateField
                            required
                            label="Ínicio do consumo*"
                            placeholder="Data inicial"
                            startDate={this.state.dataIni}
                            onChange={(date) => this.setState({dataIni: date})}
                        />
                    </Col>

                    <Col md={3}>
                        <DateField
                            required
                            label="Fim do consumo*"
                            placeholder="Data final"
                            startDate={this.state.dataFim}
                            onChange={(date) => this.setState({dataFim: date})}
                        />
                    </Col>
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
        return (
            <div>
                {this.renderForm()}

                {loading ? <LoadingScreen /> : ""}

                <div style={{marginBottom:15}} />

                <CardWithTable title="RESULTADOS DA PESQUISA"
                    mdLength={12}
                    elements={
                        [
                            {label: "Quantidade de registros", value:this.props.relatoriosR12.length}
                        ]
                    } 

                    fields={
                        [
                            {id:"data", name:"Data"},
                            {id:"usuario", name:"Usuario"},
                            {id:"produto", name:"Consulta"},
                            {id:"dado", name:"Entrada", functionToApply:(val) => {return <span>{val ? val.substring(0,15) : val}</span>}},
                            {id:"resultado", name:"Status"},
                            {id:"via", name:"Rever", functionToApply:(via, indexRow) => {
                                if(via === "NEW_API" && this.props.relatoriosR12[indexRow])
                                    return this.onClickReverConsulta({
                                        produto: this.props.relatoriosR12[indexRow].produto,
                                        protocolo: this.props.relatoriosR12[indexRow].protocolo,
                                        modulo: this.props.relatoriosR12[indexRow].modulo,
                                        idProduto: this.props.relatoriosR12[indexRow].idProduto
                                    })

                                return <span></span>
                            }}
                        ]
                    }
                    rows={this.props.relatoriosR12.slice(0,this.state.quantityShown)}
                />

                {this.props.relatoriosR12.length > 0 && this.state.quantityShown <= this.props.relatoriosR12.length ?
                    <MyButton
                        myButtonStyle="default"
                        onClickButton={() => this.setState({quantityShown: this.state.quantityShown + this.quantityElementsPattern})}
                        myButtonText="Mostrar mais registros"
                        myButtonClass="btn-block text-center"
                    />
                : ""}
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
        reverConsulta
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(Consumo)