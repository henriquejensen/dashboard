import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Telefones extends Component{
  constructor(props) {
	   super(props);

     this.state = {
          smShow: false,
          lgShow: false,
          copiar: false
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
        <div className="row row-localize">
          <div className="col-md-12">
            <div className="panel panel-default">
                <div className="panel-heading text-center">
                    TELEFONES
                </div>

                <div className="panel-body">
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
                                    return <tr key={i}>
                                      <td>
                                        <div className="col-md-4">
                                          {tel[0]}{tel[1]} {tel.substring(2)}
                                        </div>

                                        <div className="col-md-2" style={{cursor:"pointer"}}>
                                          <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                            <span >Copiar</span>
                                          </CopyToClipboard>&nbsp;
                                        </div>

                                        <div className="col-md-2">
                                            <img src="http://a2.mzstatic.com/us/r30/Purple2/v4/fe/87/df/fe87df70-1406-5b6e-b962-d7f7318a3cbb/icon175x175.png" width="20" className="like-button"/>
                                        </div>

                                          <div className="col-md-2">
                                            <i className="glyphicon glyphicon-comment" className="sms2-button" style={{color:"#009fee"}} onClick={()=>this.setState({ lgShow: true })}/>
                                          </div>
                                          <div className="col-md-2">
                                            <i className="glyphicon glyphicon-earphone" className="call2-button" style={{color:"black"}}/>
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
                                  return <tr key={i}>
                                      <td>
                                        <div className="col-md-4" style={{paddingRight: 0}}>
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

                                          <div className="col-md-2">
                                            <i className="glyphicon glyphicon-comment" className="sms2-button" style={{color:"#009fee"}} onClick={()=>this.setState({ lgShow: true })}/>
                                          </div>
                                          <div className="col-md-2">
                                            <i className="glyphicon glyphicon-search" className="call2-button" style={{color:"black"}}/>
                                          </div>
                                      </td>
                                  </tr>
                              })}
                            </tbody>
                          </table>
                        </div> : "" }
                </div>
            </div>
          </div>
      </div>)
  }
}