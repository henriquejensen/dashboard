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
import Relacionados from "./Relacionados";
import TelefonesRelacionados from "./TelefonesRelacionados";
import EnderecosRelacionados from "./EnderecosRelacionados";
import Protocolo from "./Protocolo";
import BuscaPorRelacionados from "./BuscaPorRelacionados";

import PanelGroup from "../../components/PanelGroup";

export default class LocalizeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.data.tipo == "CPF" ?
                <PanelGroup>
                    <Dados dados={this.props.data.data} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this.props.showPessoasRelacionadas}/>

                    {false ? 
                        <PessoasRelacionadas /> : ""}

                    {this.props.data.data.TELEFONES_MOVEIS ? 
                        <Telefones telefones = {this.props.data.data.TELEFONES_MOVEIS.TELEFONE} relacionados = {() => this.props.pessoasRelacionadas(this.props.data.data.CPF)} /> : ""}

                    {this.props.data.pessoasRelacionadas.length > 0 ?
                        <Relacionados
                            title="TELEFONES RELACIONADOS"
                            documento={this.props.data.data.CPF}
                            relacionados={this.props.data.pessoasRelacionadas}
                            searchLocalize={this.props.searchLocalize}
                            showTelefonesRelacionados={this.props.showTelefonesRelacionados}/>
                    :""}

                    {this.props.data.data.ENDERECOS ?
                        <Enderecos enderecos = {this.props.data.data.ENDERECOS.ENDERECO} showEnderecosRelacionados={() => this.props.showEnderecosRelacionados(this.props.data.data.CPF)}/> : ""}

                    {this.props.data.enderecosRelacionados ? 
                        this.props.data.enderecosRelacionados.map((enderecos,i) => {
                            return <EnderecosRelacionados enderecos={enderecos} key={i} />
                        })
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
                    this.props.data.tipo == "NOME" ?

                    <PanelGroup>
                        <BuscaPorRelacionados relacionados={this.props.data.data.relacionados} />
                    </PanelGroup>
                    
            : <div></div>
        )
    }
}