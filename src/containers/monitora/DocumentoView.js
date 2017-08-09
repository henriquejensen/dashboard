import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table } from 'antd'

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

        this.columns = [
            {
                title: 'Ações',
                dataIndex: 'acoes',
                key: 'acoes'
            },
           {
                title: 'Cheques Sem Fundo',
                dataIndex: 'chequesSemFundo',
                key: 'chequesSemFundo'
            },
           {
                title: 'Débitos',
                dataIndex: 'debitos',
                key: 'debitos'
            }
        ]
        this.state = {}
    }

    componentWillMount() {
        this.props.verDocumentoDetalhes
    }

    render() {
        const { documentos } = this.props
        return (
            <div>
                <Table columns={this.columns} dataSource={documentos} />
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