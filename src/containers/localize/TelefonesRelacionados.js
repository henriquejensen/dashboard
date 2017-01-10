import React,  { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class TelefonesRelacionados extends Component {
    constructor(props) {
        super(props)
    }

    copiarNumero() {
        console.log("Copiando...")
    }

    renderTelefones(label, telefones) {
        return (
            <div className="col-md-6" >
                <Table>
                    <tbody>
                        {telefones.map((tel, i) => {
                            return <tr key={i}>
                                    <td>
                                        <div className="col-md-3">
                                            <i className={"fa fa-"+label} /> {tel}
                                        </div>

                                        <a data-tip data-for="tooltipCopy">
                                            <div className="col-md-1">
                                            <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                                <i className="fa fa-clipboard icon-tel" />
                                            </CopyToClipboard>
                                            </div>
                                        </a>

                                        <a data-tip data-for="tooltipSMS">
                                            <div className="col-md-1">
                                            <i className="fa fa-comments icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                            </div>
                                        </a>

                                        <a data-tip data-for="tooltipCall">
                                            <div className="col-md-1">
                                            <i className="fa fa-mobile icon-tel icon-tel-phone" />
                                            </div>
                                        </a>

                                        <a data-tip data-for="tooltipHot">
                                            <div className="col-md-1">
                                            <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                            </div>
                                        </a>

                                        <a data-tip data-for="tooltipWhats">
                                            <div className="col-md-1">
                                                <img src="https://whatsapp.com/favicon.png" width="15"/>
                                            </div>
                                        </a>

                                        <a data-tip data-for="tooltipOperadora">
                                            <div className="col-md-3">
                                                <img src="http://2.bp.blogspot.com/-2iz4nnxuSu8/TyHGVjiLdDI/AAAAAAAABbw/wJWY-ugjozI/s1600/logotipo+oi.jpg" width="20" className="like-button"/>
                                            </div>
                                        </a>
                                    </td>
                                </tr>
                        })}                        
                    </tbody>
                </Table>
            </div> )
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

                {this.renderTelefones("phone", this.props.telefone.fixos)}

                {this.renderTelefones("mobile", this.props.telefone.moveis)}  
                
            </Panel>
        )
    }
}