import React, { Component } from "react";

import Dados from "./Dados";
import PessoasRelacionadas from "./PessoasRelacionadas";
import Telefones from "./Telefones";
import Enderecos from "./Enderecos";
import Ocupacoes from "./Ocupacoes";
import Sociedades from "./Sociedades";
import Veiculos from "./Veiculos";
import DadosPj from "./DadosPj";
import Socios from "./Socios";

export default class LocalizeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.tipo == "CPF" ?
                <div>
                    <Dados dados={this.props.data} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this.props.showPessoasRelacionadas}/>

                    {this.props.pessoasRelacionadas ? 
                        <PessoasRelacionadas /> : ""}

                    {this.props.data.TELEFONES_MOVEIS ? 
                        <Telefones telefones = {this.props.data.TELEFONES_MOVEIS.TELEFONE} /> : ""}

                    {this.props.data.ENDERECOS ?
                        <Enderecos enderecos = {this.props.data.ENDERECOS.ENDERECO}/> : ""}

                    {this.props.data.OCUPACOES ?
                        <Ocupacoes ocupacao = {this.props.data.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize} /> : ""}

                    {this.props.data.SOCIEDADES ?
                        <Sociedades sociedades = {this.props.data.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

                    {this.props.data.VEICULOS ?
                        <Veiculos veiculos =  {this.props.data.VEICULOS}/> : ""}
                </div>

            : this.props.tipo == "CNPJ" ?
                    <div>
                        <DadosPj dados={this.props.data} searchLocalize={this.props.searchLocalize} />
                        <Telefones telefones = {this.props.data.TELEFONES_MOVEIS.TELEFONE} />

                        {this.props.data.ENDERECOS ?
                            <Enderecos enderecos = {this.props.data.ENDERECOS.ENDERECO}/> : ""}

                        {this.props.data.SOCIOS ?
                            <Socios socios = {this.props.data.SOCIOS.SOCIEDADES} buscaCPF={this.props.searchLocalize}/> : "" }
                    
                    </div>
            : <div></div>
        )
    }
}