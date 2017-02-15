import React, { Component } from "react";

import Dados from "./Dados";
import Telefones from "./Telefones";
import Enderecos from "./Enderecos";
import Emails from "./Emails";
import Renda from "./Renda";
import BeneficiosINSS from "./BeneficiosINSS";
import Sociedades from "./Sociedades";
import Veiculos from "./Veiculos";
import DadosPj from "./DadosPj";
import Socios from "./Socios";
import Protocolo from "./Protocolo";
import BuscaPorRelacionados from "./BuscaPorRelacionados";

import Relacionados from "../../components/relacionados/Relacionados";
import PanelGroup from "../../components/PanelGroup";

export default class LocalizeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.data.tipo == "CPF" ?
                <PanelGroup>
                    <Dados dados={this.props.data.data} searchLocalize={this.props.searchLocalize}/>

                    {false ? 
                        <PessoasRelacionadas /> : ""}

                    {this.props.data.data.TELEFONES_MOVEIS ? 
                        <Telefones telefones = {this.props.data.data.TELEFONES_MOVEIS.TELEFONE} relacionados = {() => this.props.pessoasRelacionadas(this.props.data.data.CPF, "telefone")} /> : ""}

                    {this.props.data.pessoasRelacionadas.pessoasTelefones.length > 0 ?
                        <Relacionados
                            title="TELEFONES RELACIONADOS"
                            tipo="telefone"
                            documento={this.props.data.data.CPF}
                            relacionados={this.props.data.pessoasRelacionadas.pessoasTelefones}
                            searchLocalize={this.props.searchLocalize}
                            searchRelacionados={this.props.showRelacionados}/>
                    :""}

                    {this.props.data.data.ENDERECOS ?
                        <Enderecos enderecos = {this.props.data.data.ENDERECOS.ENDERECO}  relacionados = {() => this.props.pessoasRelacionadas(this.props.data.data.CPF, "endereco")}/> : ""}

                    {this.props.data.pessoasRelacionadas.pessoasEnderecos.length > 0 ?                        
                        <Relacionados
                            title="ENDEREÇOS RELACIONADOS"
                            tipo="endereco"
                            documento={this.props.data.data.CPF}
                            relacionados={this.props.data.pessoasRelacionadas.pessoasEnderecos}
                            searchLocalize={this.props.searchLocalize}
                            searchRelacionados={this.props.showRelacionados}/>
                    :""}
                    
                    {this.props.data.data.EMAILS ?
                        <Emails emails = {[this.props.data.data.EMAILS.EMAIL1, this.props.data.data.EMAILS.EMAIL2, this.props.data.data.EMAILS.EMAIL3, this.props.data.data.EMAILS.EMAIL4]} /> : ""}

                    {this.props.data.data.OCUPACOES ? 
                        <Renda renda = {this.props.data.data.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize}/> :""}

                    {this.props.data.data.VALOR_BENEFICIO ? 
                        <BeneficiosINSS beneficio = {this.props.data.data.VALOR_BENEFICIO}/> :""}

                    {this.props.data.data.SOCIEDADES ?
                        <Sociedades sociedades = {this.props.data.data.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

                    {this.props.data.data.VEICULOS ?
                        <Veiculos veiculos =  {this.props.data.data.VEICULOS}/> : ""}

                    {this.props.data.data.PROTOCOLO ? 
                        <Protocolo protocolo={this.props.data.data.PROTOCOLO} /> :""}

                </PanelGroup>

            : this.props.data.tipo == "CNPJ" ?
                    <PanelGroup>
                        <DadosPj dados={this.props.data.data} searchLocalize={this.props.searchLocalize} />
                        <Telefones telefones = {this.props.data.data.TELEFONES_MOVEIS.TELEFONE} />

                        {this.props.data.data.ENDERECOS ?
                            <Enderecos enderecos = {this.props.data.data.ENDERECOS.ENDERECO}/> : ""}

                        {this.props.data.data.SOCIOS ?
                            <Socios socios = {this.props.data.data.SOCIOS.SOCIEDADES} buscaCPF={this.props.searchLocalize}/> : "" }

                        {this.props.data.data.PROTOCOLO ? 
                            <Protocolo protocolo={this.props.data.data.PROTOCOLO} /> :""}
                    
                    </PanelGroup>
            : this.props.data.tipo == "TELEFONE" ||
                this.props.data.tipo == "ENDERECO" ||
                    this.props.data.tipo == "NOME" ||
                        this.props.data.tipo == "EMAIL" ?

                    <PanelGroup>
                        <BuscaPorRelacionados relacionados={this.props.data.data.relacionados} />
                    </PanelGroup>
                    
            : <div></div>
        )
    }
}