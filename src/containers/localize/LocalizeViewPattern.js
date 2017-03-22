import React, { Component } from "react";

import Dados from "../../components/dadosBasicos/Dados";
import DadosPj from "../../components/dadosBasicos/DadosPj";
import CadastroCnpjCnaesSecundarias from "../../components/dadosBasicos/CadastroCnpjCnaesSecundarias";
import Telefones from "../../components/telefone/Telefone";
import Emails from "../../components/email/Email";
import Enderecos from "../../components/endereco/Endereco";
import Socios from "../../components/sociedades/Socios";
import Sociedades from "../../components/sociedades/Sociedades";
import RendaEstimada from "../../components/renda/RendaEstimada";
import RendaEmpregador from "../../components/renda/RendaEmpregador";
import BeneficioINSS from "../../components/renda/BeneficioINSS";
import RendaEntidadeClasseLiberal from "../../components/renda/RendaEntidadeClasseLiberal";
import Relacionados from "../../components/relacionados/Relacionados";
import Veiculos from "../../components/veiculos/Veiculos";

import Protocolo from "../../components/protocolo/Protocolo";

import PanelGroup from "../../components/panel/PanelGroup";

export default class LocalizeView extends Component {
    render() {
        return (
            <PanelGroup>
                {this.props.tipo == "CPF" ?
                    <Dados dados={this.props.data.cadastro} />
                : <DadosPj dados={this.props.data.cadastro} />}

                {this.props.tipo == "CNPJ" ?
                    <CadastroCnpjCnaesSecundarias cnpjCnaesSecundarias={this.props.data.cadastroCnpjCnaesSecundarias} />
                : ""}

                <Telefones telefones={this.props.data.telefones} />

                <Enderecos enderecos={this.props.data.enderecos} />

                <Emails emails={this.props.data.emails} />

                {this.props.tipo == "CPF" ?
                    <Relacionados
                        documento={this.props.data.cadastro.cpf}
                        searchPessoasRelacionadas={this.props.searchPessoasRelacionadas}
                        searchTelefonesPessoaRelacionada={this.props.searchTelefonesPessoaRelacionada}
                        searchEnderecosPessoaRelacionada={this.props.searchEnderecosPessoaRelacionada}
                        relacionados={this.props.pessoasRelacionadas}
                        searchPerson={this.props.searchLocalize}
                    />
                : ""}

                {this.props.tipo == "CNPJ" ?
                    <Socios socios={this.props.data.quadroSocietario} searchPerson={this.props.searchLocalize} />
                : ""}

                <Sociedades participacoes={this.props.data.participacoesEmpresas} searchPerson={this.props.searchLocalize}/>      

                {this.props.tipo == "CPF" ?
                    <span>
                        <RendaEmpregador rendas={this.props.data.rendaEmpregador} searchPerson={this.props.searchLocalize}/>

                        <RendaEstimada rendaEstimada={this.props.data.rendaEstimada} />
                        
                        <BeneficioINSS beneficios={this.props.data.rendaBeneficioAssistencial} />

                        <RendaEntidadeClasseLiberal renda={this.props.data.rendaEntidadeClasseLiberal} />
                    </span>
                : ""}

                {/*<Veiculos veiculos={this.props.data.veiculos} />*/}

                <Protocolo info={this.props.data.cabecalho} />
            </PanelGroup>
        )
    }
}