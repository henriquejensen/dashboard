import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getCentroCustoSMS } from "../../actions/index";

import Table from "../../components/Table";

class CentroCusto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      centroCustoSMS: this.props.centroCustoSMS
    }
  }

  componentDidMount() {
    document.title = "Assertiva > Centro de Custo";

    this.props.getCentroCustoSMS();
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
                  title={"Centro de Custo"}
                  fields={
                    ["ID", "Descrição", "Status", "Ações"]
                  }
                >
                  <tbody>
                      {this.props.centroCustoSMS.lenght > 0 ? this.props.centroCustoSMS.map((datas, index) => {
                        return <tr key={index}>
                          {datas.map((data, i) =>{
                              return <td key={i}>
                                {data}
                              </td>
                          })}
                        </tr>
                      }) : <tr ><td colSpan="4" className="text-center">Nenhum registro encontrado</td></tr>}
                  </tbody>
                </Table>

                <div className="col-md-12">
                    Mostrando 0 até 0 de 0 registros
                </div>

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
    centroCustoSMS: state.centroCustoSMS
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCentroCustoSMS }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CentroCusto);