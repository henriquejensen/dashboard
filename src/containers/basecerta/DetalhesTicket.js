import React, { Component } from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Col} from "react-bootstrap"

//Components
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";
import CardWithTable from "../../components/card/CardWithTable"

class DetalhesTicket extends Component {
    render() {
        let ticket = this.props.ticket
        return (
            ticket === undefined ?
                <LoadingScreen />
            :
                <CardWithTable title={`RELATÓRIO - TICKET ${ticket.id}`}
                    mdLength={6}
                    elements={
                        [
                            {label: "QUANTIDADE CPF ENTRADA", value:ticket.relatorio.cpf ? ticket.relatorio.cpf.entrada ? ticket.relatorio.cpf.entrada : undefined : undefined},
                            {label: "QUANTIDADE CPF SAÍDA", value:ticket.relatorio.cpf ? ticket.relatorio.cpf.saida ? ticket.relatorio.cpf.saida : undefined : undefined},
                            {label: "QUANTIDADE CNPJ ENTRADA", value:ticket.relatorio.cnpj ? ticket.relatorio.cnpj.entrada ? ticket.relatorio.cnpj.entrada : undefined : undefined},
                            {label: "QUANTIDADE CNPJ SAÍDA", value:ticket.relatorio.cnpj ? ticket.relatorio.cnpj.saida ? ticket.relatorio.cnpj.saida : undefined : undefined},
                            {label: "INVÁLIDOS", value:ticket.relatorio.invalidos ? ticket.relatorio.invalidos : undefined},
                            {label: "TOTAL ENTRADA/SAÍDA", value:ticket.relatorio.total ? ticket.relatorio.total.entrada ? `${ticket.relatorio.total.entrada}/${ticket.relatorio.total.saida}` : undefined : undefined},
                        ]
                    }
                />
        )
    }
}

export default DetalhesTicket;