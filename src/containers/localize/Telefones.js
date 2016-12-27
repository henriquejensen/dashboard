import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import Panel from "../../components/Panel";

export default class Telefones extends Component{
  constructor(props) {
	   super(props);

     this.state = {
          smShow: false,
          lgShow: false,
          copiar: false,
          showMoreTel: false
      };
  }

  copiarNumero() {
    console.log("Copiando...")
    this.setState({
      copiar: !this.state.copiar
    })
  }

  render() {
    let lgClose = () => this.setState({ lgShow: false });
    let celulares = [];
    return (
              <Panel title="TELEFONES" qtdTotal={[{qtd:this.props.telefones.length,icon:"glyphicon-phone-alt"}]}>
                <div className="col-md-6">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Fixos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.telefones.map((tel,i) => {
                        tel = tel.toString().replace("(","").replace(")","").replace(" ","").replace("-","");
                        if(tel != "") {
                          if(tel.length < 11) {
                              return <tr key={i} className={i > 4 ? (this.state.showMoreTel ? "" : "display-none") : ""} >
                                <td>
                                  <div className="col-md-3">
                                    {tel[0]}{tel[1]} {tel.substring(2)}
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
                                    <i className="glyphicon glyphicon-comment icon-tel icon-tel-msg" onClick={()=>this.setState({ lgShow: true })}/>
                                  </div>
                                  <div className="col-md-1">
                                    <i className="glyphicon glyphicon-phone-alt icon-tel icon-tel-phone" />
                                  </div>
                                  <div className="col-md-1">
                                    <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                  </div>
                                </td>
                              </tr>
                            } else {
                              celulares.push(tel);
                            }
                          }
                      })}
                    </tbody>
                  </table>
                </div>

                {celulares.length > 0 ?
                  <div className="col-md-6" xs={6}>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Celulares</th>
                        </tr>
                      </thead>
                      <tbody>
                        {celulares.map((tel,i) => {
                            tel = tel.toString();
                            return <tr key={i} className={i > 4 ? (this.state.showMoreTel ? "" : "display-none") : ""}>
                                <td>
                                  <div className="col-md-3" style={{paddingRight: 0}}>
                                    {tel[0]}{tel[1]} {tel.substring(2)}
                                  </div>

                                  <div className="col-md-2" style={{cursor:"pointer"}}>
                                    <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                      <span >Copiar</span>
                                    </CopyToClipboard>&nbsp;
                                  </div>

                                    <div className="col-md-2">
                                        <img src="http://2.bp.blogspot.com/-2iz4nnxuSu8/TyHGVjiLdDI/AAAAAAAABbw/wJWY-ugjozI/s1600/logotipo+oi.jpg" width="20" className="like-button"/>
                                    </div>

                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-comment icon-tel icon-tel-msg" onClick={()=>this.setState({ lgShow: true })}/>
                                    </div>
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-phone-alt icon-tel icon-tel-phone" />
                                    </div>
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                    </div>
                                    <div className="col-md-1">
                                        <img src="https://whatsapp.com/favicon.png" width="15"/>
                                    </div>
                                </td>
                            </tr>
                        })}
                      </tbody>
                    </table>
                  </div>: "" }

                  

                  
                  <div className="col-md-12">
                    {celulares.length > 4 || this.props.telefones.length - celulares.length > 4 ?
                    <i className="glyphicon glyphicon-plus pull-right moreInfo" onClick={() => this.setState({showMoreTel:!this.state.showMoreTel})}/>: ""}
                    
                    <i className="glyphicon glyphicon-user pull-right relacionados" />
                  </div>
                  
              </Panel>)
  }
}