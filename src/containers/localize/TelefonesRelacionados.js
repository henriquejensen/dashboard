import React,  { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from "../../components/Panel";

export default class TelefonesRelacionados extends Component {
    constructor(props) {
        super(props)
    }

    copiarNumero() {
        console.log("Copiando...")
    }

    renderTelefones(label, telefones) {
        return telefones.map((tel, i) => {
            return <div className="col-md-6" key={i}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>{label}</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="col-md-3">
                                    {tel}
                                </div>

                                <div className="col-md-2" style={{cursor:"pointer"}}>
                                    <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                    <span >Copiar</span>
                                    </CopyToClipboard>&nbsp;
                                </div>

                                <div className="col-md-2">
                                    <img src="http://logok.org/wp-content/uploads/2015/06/Claro-logo-logotype-1024x768.png" width="25"/>
                                </div>

                                <div className="col-md-1">
                                    <i className="glyphicon glyphicon-comment icon-tel icon-tel-msg"/>
                                </div>
                                <div className="col-md-1">
                                    <i className="glyphicon glyphicon-phone-alt icon-tel icon-tel-phone" />
                                </div>
                                <div className="col-md-1">
                                    <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        })
    }

    render() {        
        return (
              <Panel title="TELEFONES RELACIONADOS" qtdTotal={[{qtd:this.props.telefone.fixos.length,icon:"glyphicon-phone-alt"}, {qtd:this.props.telefone.moveis.length,icon:"glyphicon-phone"}]}>
                <div className="col-md-2">
                    <strong>Relação:</strong> {this.props.telefone.relacao}
                </div>
                <div className="col-md-10">
                    <strong>Nome:</strong> {this.props.telefone.nome}
                </div>

                {this.renderTelefones("Fixos", this.props.telefone.fixos)}

                {this.renderTelefones("Móveis", this.props.telefone.moveis)}  
                
            </Panel>
        )
    }
}