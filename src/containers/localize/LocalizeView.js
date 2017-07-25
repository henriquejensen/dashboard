import React, {Component} from "react"

import Dados from "../../components/dadosBasicos/Dados"
import DadosPj from "../../components/dadosBasicos/DadosPj"
import CadastroCnpjCnaesSecundarias from "../../components/dadosBasicos/CadastroCnpjCnaesSecundarias"
import Telefones from "../../components/telefone/Telefone"
import Emails from "../../components/email/Email"
import Enderecos from "../../components/endereco/Endereco"
import Socios from "../../components/sociedades/Socios"
import Sociedades from "../../components/sociedades/Sociedades"
import RendaEstimada from "../../components/renda/RendaEstimada"
import RendaEmpregador from "../../components/renda/RendaEmpregador"
import BeneficioINSS from "../../components/renda/BeneficioINSS"
import RendaEntidadeClasseLiberal from "../../components/renda/RendaEntidadeClasseLiberal"
import PessoasRelacionadas from "../../components/relacionados/PessoasRelacionadas"
import Protocolo from "../../components/protocolo/Protocolo"
import PanelGroup from "../../components/panel/PanelGroup"

export default class LocalizeView extends Component {
    render() {
        let tipo = this.props.tipo;
        let data = this.props.data;
        let label = this.props.label;

        return (
            <PanelGroup>
                {tipo == "CPF"
                    ? <Dados dados={data.cadastro}/>
                    : <DadosPj dados={data.cadastro}/>}

                {tipo == "CNPJ"
                    ? <CadastroCnpjCnaesSecundarias
                            cnpjCnaesSecundarias={data.cadastroCnpjCnaesSecundarias}/>
                    : ""}

                <Telefones telefones={data.telefones}/>

                <Enderecos
                    enderecos={data.enderecos}
                    searchEndereco={this.props.searchLocalizeByNomeEndereco}/>

                <Emails emails={data.emails}/> {tipo == "CPF"
                    ? <PessoasRelacionadas
                            documento={data.cadastro.cpf}
                            label={label}
                            searchPessoasRelacionadas={this.props.searchPessoasRelacionadas}
                            searchTelefonesPessoaRelacionada={this.props.searchTelefonesPessoaRelacionada}
                            searchEnderecosPessoaRelacionada={this.props.searchEnderecosPessoaRelacionada}
                            relacionados={this.props.pessoasRelacionadas}
                            searchPerson={this.props.searchLocalize}/>
                    : ""}

                {tipo == "CNPJ"
                    ? <Socios
                            socios={data.quadroSocietario}
                            searchPerson={this.props.searchLocalize}/>
                    : ""}

                <Sociedades
                    participacoes={data.participacoesEmpresas}
                    searchPerson={this.props.searchLocalize}/>
                    
                {tipo == "CPF" ?
                    <RendaEmpregador
                        rendas={data.rendaEmpregador}
                        searchPerson={this.props.searchLocalize}/>
                : ""}

                <Protocolo info={data.cabecalho}/>
            </PanelGroup>
        )
    }
}