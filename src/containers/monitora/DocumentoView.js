import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import {
    verDocumentoDetalhes
} from "../../actions/actionsMonitora"

//Components
import Panel from "../../components/panel/Panel"
import TitleProduct from "../../components/utils/TitleProduct"

export class DocumentoView extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentWillMount() {
        this.props.verDocumentoDetalhes
    }

    render() {
        return (
            <div>
                Teste
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    documentos: state.monitora.documentosDetalhes
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
    verDocumentoDetalhes
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DocumentoView)