import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'

//Components
import Panel from "../../components/panel/Panel"
import TitleProduct from "../../components/utils/TitleProduct"

export class DocumentoView extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        let { documentos=[] } = this.props
        return (
            <div>
                <ReactTable
                    data={documentos}
                    noDataText="Nenhum registro encontrado"
                    showPagination={false}
                    pageSize={documentos.length}
                    columns={[
                        {Header: 'Nome', accessor: "nome"},
                        {Header: 'Ações', accessor: "acoes"},
                        {Header: 'Cheques S/ Fundo', accessor: "chequesSemFundo"},
                        {Header: 'Débitos', accessor: "debitos"},
                        {Header: 'Gasto', accessor: "gastoEstimado"},
                        {Header: 'Limite Sugerido', accessor: "limiteSugerido"},
                        {Header: 'Participação empresas', accessor: "participacaoEmpresas"},
                        {Header: 'Protestos', accessor: "protestos"},
                        {Header: 'Renda', accessor: "rendaPresumida"},
                        {Header: 'Score 3 meses', accessor: "score3Meses"},
                        {Header: 'Score 12 meses', accessor: "score12Meses"},
                        {Header: 'Telefones', accessor: "telefones"},
                        {Header: 'Endereços', accessor: "enderecos"},
                    ]}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("STAT", state.monitora)
    return {
        documentos: state.monitora
    }
}

export default connect(mapStateToProps, null)(DocumentoView)