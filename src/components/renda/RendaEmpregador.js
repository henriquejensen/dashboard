import React,  { Component } from "react";
import { Col } from "react-bootstrap";
import Notification from "react-notification-system";

import Panel from "../panel/Panel";
import Table from "../table/Table";
import Modal from "../Modal";
import EnviarRenda from "../forms/EnviarRenda";
import MyButton from "../button/MyButton";
import CardToShowMoreInTable from "../table/CardToShowMoreInTable";

import { formatDate, formatCurrency } from "../utils/functions/patternDocuments";

import { NENHUM_REGISTRO, TOOLTIP_SEARCH_BY_DOCUMENT, TOOLTIP_SEE_MORE_INFO } from "../../constants/utils";

const title = "RENDA EMPREGADOR";

export default class RendaEmpregador extends Component {
    constructor() {
        super();

        this.state = {
            IsModalOpen: false,
            showMoreInfo: {}
        }

        this._notificationSystem = null;
    }



    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    closeModal = () => {
        this.setState({
            IsModalOpen: false
        })
    }

    sendNewIncome = (newIncome) => {
        console.log("NEW INCOME", newIncome);

        this._addNotification("Obrigado pelo envio. Seu pedido de inserção será analisado");

        this.setState({
            IsModalOpen: false
        })
    }

    handleShowMoreInfo = (indexArray) => {
        let showMoreInfo = this.state.showMoreInfo;
        let newShowMoreInfo = Object.assign({}, this.state.showMoreInfo);
        newShowMoreInfo[indexArray] = this.state.showMoreInfo[indexArray] ? !this.state.showMoreInfo[indexArray] : true;
        this.setState({
            showMoreInfo: newShowMoreInfo          
        })
    }

    render() {
        let rendas = this.props.rendas ? this.props.rendas : [];
        let handleSearchPerson = this.props.searchPerson;
        let handleShowMoreInfo = this.handleShowMoreInfo;
        let isCpfOrCnpj = "CNPJ";
        let IsModalOpen = this.state.IsModalOpen;
        let fields = ["Empregador", "Setor", "Data Referência", "#"];
        let showMoreInfo = this.state.showMoreInfo;
        return (
            <span>
                {rendas.length > 0 ?
                    <Panel title={title} qtdTotal={[{icon:"fa fa-money", qtd:rendas.length}]}>
                        <Col md={12} sm={12}>            
                            <Table fields={fields}>
                                {rendas.map((renda, index) => {
                                    let indexArray = index + renda.documentoEmpregador;
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <MyButton
                                                        tooltip={TOOLTIP_SEARCH_BY_DOCUMENT}
                                                        onClickButton={handleSearchPerson}
                                                        params={[renda.documentoEmpregador, isCpfOrCnpj]}
                                                        label={renda.empregador}
                                                    />
                                                </td>
                                                <td>{renda.setorEmpregador}</td>
                                                <td>{formatDate(renda.rendaDataRef)}</td>
                                                <td>
                                                    <MyButton
                                                        tooltip={TOOLTIP_SEE_MORE_INFO}
                                                        onClickButton={handleShowMoreInfo}
                                                        params={[indexArray]}
                                                        myButtonStyle="default"
                                                        myButtonClass="my-btn-more-details"
                                                        myButtonText={showMoreInfo[indexArray] ? "Menos informações" : "Mais informações"}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                {showMoreInfo[indexArray] ?
                                                    <td colSpan={4}>
                                                        <CardToShowMoreInTable
                                                            elements={
                                                                [
                                                                    {label:"Setor empregador", value:renda.setorEmpregador},
                                                                    {label:"Faixa de Renda", value:renda.faixaRenda},
                                                                    {label:"Renda estimada", value:renda.rendaEstimada},
                                                                    {label:"CBO código", value:renda.cboCodigo},
                                                                    {label:"CBO Descrição", value:renda.cboDescricao},
                                                                    {label:"CBO Setor", value:renda.cboSetor},
                                                                    {label:"CBO Sinônimos", value:renda.cboSinonimos}                                                                    
                                                                ]
                                                            }
                                                        />
                                                    </td>
                                                : ""}
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </Table>
                            
                            <a className="moreInfo" onClick={() => this.setState({IsModalOpen:!IsModalOpen})}>
                                {IsModalOpen ?
                                    "Cancelar"
                                : "Adicionar um nova renda"}
                            </a>

                        </Col>
                    </Panel>
                :
                    <Panel title={title}>
                        <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                    </Panel>
                }
                    <Modal
                        IsModalOpen={IsModalOpen}
                        closeModal={this.closeModal}
                        title="Inserção de um novo endereço"
                    >

                        <EnviarRenda send={this.sendNewIncome} />

                    </Modal>

                    <Notification ref={n => this._notificationSystem = n} />
            </span>
        )
    }
}