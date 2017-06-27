import React, { Component } from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Col} from "react-bootstrap"

//Components
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";
import CardWithTable from "../../components/card/CardWithTable"

class DetalhesTicket extends Component {
    render() {
        let { ticket } = this.props
        let { cpfEnviados, cpfEntregues, cnpjEnviados, cnpjEntregues, documentosInvalidosEnviados, documentosEntregues, documentosEnviados } = ticket
        return (
            ticket === undefined ?
                <LoadingScreen />
            :
                <Col md={12}>
                    <CardWithTable title={`RELATÓRIO - TICKET ${ticket.id}`}
                        mdLength={6}
                        elements={
                            [
                                {label: "QUANTIDADE CPF ENTRADA", value:`${cpfEnviados}`},
                                {label: "QUANTIDADE CPF SAÍDA", value:`${cpfEntregues}`},
                                {label: "QUANTIDADE CNPJ ENTRADA", value:`${cnpjEnviados}`},
                                {label: "QUANTIDADE CNPJ SAÍDA", value:`${cnpjEntregues}`},
                                {label: "INVÁLIDOS", value:`${documentosInvalidosEnviados}`},
                                {label: "TOTAL ENTRADA/SAÍDA", value:`${documentosEnviados}/${documentosEntregues}`},
                            ]
                        }
                    />
                </Col>
        )
    }
}

export default DetalhesTicket;