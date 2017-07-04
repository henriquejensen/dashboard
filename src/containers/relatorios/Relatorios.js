import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Col } from "react-bootstrap"

//Actions
import { filterRelatorio, getRelatorios, loadingRelatorio } from "../../actions/actionsRelatorios"

//Constants
import Modal from "../../components/Modal"
import { LOADING_GIF } from "../../constants/utils"
import { COMPANY_NAME_SHORT } from "../../constants/constantsCompany"
import { TITLE_REPORTS } from "../../constants/utils"

//Components
import RelatoriosView from "./RelatoriosView"
import Filtro from "./Filtro"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

class Relatorios extends Component {
    constructor(props) {
        super(props)

        this.state = {
            IsModalOpen: false
        }
    }

	componentDidMount() {
		document.title = TITLE_REPORTS + " > " + COMPANY_NAME_SHORT
        this.props.getRelatorios()
	}

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    filterRelatorio = (filters) => {
        this.closeModal()
        this.props.loadingRelatorio()
        this.props.filterRelatorio(filters)
    }

    showModal = (relatorioId) => {
        this.setState({
            IsModalOpen: true,
            relatorioId: relatorioId
        })
    }

    render() {
        let relatorio = this.props.relatorios[this.state.relatorioId]
        let loading = this.props.loading
        return (
            <Col md={12}>

                {loading ? <LoadingScreen /> : ""}

                <RelatoriosView
                    relatorios={this.props.relatorios}
                    showModal={this.showModal}
                />

                <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.closeModal}
                    size="lg"
                    title="Extrair as informações"
                >
                    <Filtro relatorio={relatorio} filterRelatorio={this.filterRelatorio} />
                    
                </Modal>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {
        relatorios: state.relatorios.relatorios,
        loading: state.relatorios.loading
    }
}

function mapDispatchProps(dispatch) {
    return bindActionCreators({
        filterRelatorio,
        getRelatorios,
        loadingRelatorio
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchProps)(Relatorios)