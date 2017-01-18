import React, { Component } from "react";
import Form from "../../components/forms/Form";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

export default class Relatorios extends Component {
    render(){
        return (
            <div className="col-md-12">
                <Panel title="LISTA DE RELATÓRIOS" qtdTotal={[{icon:"fa fa-file-o", qtd:6}]}>
                    <Table fields={
                        ["Tipo", "Descrição", "Extrair", "Sobre"]
                    }>
                    <tbody>
                        <tr>
                            <td>R6</td>
                            <td>Consultas de Localize, Crédito, Veículos e Foco Fiscal</td>
                            <td>Extrair</td>
                            <td>Veja mais</td>
                        </tr>
                         <tr>
                            <td>R7</td>
                            <td>Envio de SMS</td>
                            <td>Extrair</td>
                            <td>Veja mais</td>
                        </tr>
                        <tr>
                            <td>R8</td>
                            <td>Consumo do Base Certa</td>
                            <td>Extrair</td>
                            <td>Veja mais</td>
                        </tr>
                         <tr>
                            <td>R9</td>
                            <td>Consumo total de todos os produtos</td>
                            <td>Extrair</td>
                            <td>Veja mais</td>
                        </tr>
                        <tr>
                            <td>R12</td>
                            <td>Consultas de Localize, Crédito e Veículos em tela</td>
                            <td>Consulta</td>
                            <td></td>
                        </tr>
                         <tr>
                            <td>R17</td>
                            <td>Consumo de Venda+</td>
                            <td>Extrair</td>
                            <td></td>
                        </tr>
                    </tbody>
                    </Table>
                </Panel>
            </div>
        )
    }
}