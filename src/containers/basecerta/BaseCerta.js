import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getCampanhasSMS } from "../../actions/index";

import Table from "../../components/Table";

class BaseCerta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campanhasSMS: this.props.campanhasSMS
    }
  }

  componentDidMount() {
    document.title = "Assertiva > Base Certa";

    this.props.getCampanhasSMS();
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-body">

                <Table
                  title={"Monitor de Envios"}
                  fields={
                    ["ID", "Grupo", "Campanha", "Cadastro", "Centro de Custo", "Rota", "Status", "Ações"]
                  }
                >
                  <tbody>
                      {this.props.campanhasSMS ? this.props.campanhasSMS.map((datas, index) => {
                        return <tr key={index}>
                          {datas.map((data, i) =>{
                            if(i < 6) {
                              return <td key={i}>
                                {data}
                              </td>
                            } else if(i == 6) {
                              if(data == 0) {
                                return <td key={i} className="text-center"> <i className="glyphicon glyphicon-ok" /></td>
                              } else if(data == 1) {
                                return <td key={i} className="text-center"> <i className="glyphicon glyphicon-remove" /></td>
                              } else {
                                return <td key={i} className="text-center"><i className="glyphicon glyphicon-hourglass" /></td>
                              }
                            } else if( i == 7) {
                              return <td key={i} className="acoes">
                                    <i className="glyphicon glyphicon-th-list" />
                                    <i className="glyphicon glyphicon-share-alt" />
                                  </td>
                            }
                          })}
                        </tr>
                      }) : ""}
                  </tbody>
                </Table>

              </div>
            </div>
          </div>

        </div>
      </div>
   </div>)
  }
}


function mapStateToProps(state) {
  return {
    campanhasSMS: state.campanhasSMS
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCampanhasSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BaseCerta);