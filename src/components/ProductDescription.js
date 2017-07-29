import React, { Component } from "react";
import Panel from "./panel/Panel";
import { Col } from "react-bootstrap";

export class LocalizeDescription extends Component {
    render() {
        return (
            <Panel title="DETALHES DA CONSULTA" showPanel={false}>
                <Col md={6}>
                    <strong>Pessoa Jurídica:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Síntese cadastral</li>
                        <li>Participações em empresas</li>
                        <li>Alerta de documentos e cheques roubados, furtados ou extraviados</li>
                        <li>Informações de cheques</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </Col>

                <Col md={6}>
                    <strong>Pessoa Física:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Sintese cadastral</li>
                        <li>Participação dos sócios</li>
                        <li>Cheques sem fundos e sustados motivo 21</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Recuperação judicial e falências</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </Col>
            </Panel>
        )
    }
}

export class CreditoDescription extends Component {
    render() {
        return (
            <Panel title="DETALHES DA CONSULTA" showPanel={false}>
                <div className="col-md-6">
                    <strong>Pessoa Jurídica:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Síntese cadastral</li>
                        <li>Participações em empresas</li>
                        <li>Alerta de documentos e cheques roubados, furtados ou extraviados</li>
                        <li>Informações de cheques</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <strong>Pessoa Física:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Sintese cadastral</li>
                        <li>Participação dos sócios</li>
                        <li>Cheques sem fundos e sustados motivo 21</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Recuperação judicial e falências</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>
            </Panel>
        )
    }
}

export class CreditoMaisDescription extends Component {
    render() {
        return (
            <Panel title="DETALHES DA CONSULTA" showPanel={false}>
                <div className="col-md-6">
                    <strong>Pessoa Jurídica:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Síntese cadastral</li>
                        <li>Participações em empresas</li>
                        <li>Alerta de documentos e cheques roubados, furtados ou extraviados</li>
                        <li>Informações de cheques</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <strong>Pessoa Física:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Sintese cadastral</li>
                        <li>Participação dos sócios</li>
                        <li>Cheques sem fundos e sustados motivo 21</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Recuperação judicial e falências</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>
            </Panel>
        )
    }
}

export class FocoFiscalDescription extends Component {
    render() {
        return (
            <Panel  title="DETALHES DA CONSULTA" showPanel={false}>
                <div className="col-md-6">
                    <strong>Pessoa Jurídica:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Síntese cadastral</li>
                        <li>Participações em empresas</li>
                        <li>Alerta de documentos e cheques roubados, furtados ou extraviados</li>
                        <li>Informações de cheques</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <strong>Pessoa Física:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Sintese cadastral</li>
                        <li>Participação dos sócios</li>
                        <li>Cheques sem fundos e sustados motivo 21</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Recuperação judicial e falências</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>
            </Panel>
        )
    }
}

export class VeiculoslDescription extends Component {
    render() {
        return (
            <Panel  title="DETALHES DA CONSULTA" showPanel={false}>
                <div className="col-md-6">
                    <strong>Pessoa Jurídica:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Síntese cadastral</li>
                        <li>Participações em empresas</li>
                        <li>Alerta de documentos e cheques roubados, furtados ou extraviados</li>
                        <li>Informações de cheques</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <strong>Pessoa Física:</strong>
                    <ul style={{padding:"5px 25px", listStyle:"disc"}}>
                        <li>Sintese cadastral</li>
                        <li>Participação dos sócios</li>
                        <li>Cheques sem fundos e sustados motivo 21</li>
                        <li>Registros de débitos informados pelos clientes do sistema</li>
                        <li>Recuperação judicial e falências</li>
                        <li>Títulos protestados (Nacional)</li>
                        <li>Ações cíveis</li>
                        <li>Consultas anteriores</li>
                    </ul>
                </div>
            </Panel>
        )
    }
}