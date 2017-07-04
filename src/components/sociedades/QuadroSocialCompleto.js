import React, { Component } from 'react'
import { Col } from "react-bootstrap"

//Components
import Panel from "../panel/Panel"
import Table from "../table/MyTable"
import MyButton from "../button/MyButton"
import Enderecos from "../../components/endereco/Endereco"

//Constants
import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, TOOLTIP_SEE_MORE_INFO_MESSAGE, TOOLTIP_SEE_LESS_INFO_MESSAGE } from "../../constants/utils"

const title = "QUADRO SOCIAL MAIS COMPLETO"

class QuadroSocialCompleto extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showMoreInfo: {},
            rows: this.props.quadroSocialCompleto ? this.props.quadroSocialCompleto : []
        }
    }

    render() {
        let rows = this.state.rows
        let handleSearchPerson = this.props.searchPerson
        let isCpfOrCnpj = "CNPJ"
        let handleShowMoreInfo = this.handleShowMoreInfo
        let fields = [
                {id:"cpf", name:"Documento"},
                {id:"nome", name:"Nome"},
                {id:"dataEntrada", name:"Data Entrada"},
                {id:"percentual", name:"Porcentagem"},
                {id:"vinculo", name:"Vínculo"},
        ]
        let fieldsRestricoes = [
                {id:"descricao", name:"Descrição"},
                {id:"mensagem", name:"Mensagem"},
                {id:"valor", name:"Valor"},
                {id:"ultimaOcorrencia", name:"Última Ocorrência"},
        ]
        let showMoreInfo = this.state.showMoreInfo
        return (
            <Panel title={title} >
                <Table fields={fields} >
                    {rows.map((pessoa, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        {pessoa.cpf}
                                    </td>
                                    <td>
                                        {pessoa.nome}
                                    </td>
                                    <td>
                                        {pessoa.dataEntrada}
                                    </td>
                                    <td>
                                        {pessoa.percentual}
                                    </td>
                                    <td>
                                        {pessoa.vinculo}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={fields.length}>
                                        <Panel title="Restrições" >
                                            <Table fields={fieldsRestricoes} elements={pessoa.restricoes} />
                                        </Panel>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={fields.length}>
                                        <Enderecos enderecos={[pessoa.endereco]} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </Table>
            </Panel>
        )
    }
}

export default QuadroSocialCompleto;