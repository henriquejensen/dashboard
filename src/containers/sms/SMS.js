import React, {Component} from "react";
import Filtro from "../../components/Filtro";
import Table from "../../components/Table";

export default class SMS extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Assertiva > SMS";
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">

          <div className="col-md-2">
            <div className="panel panel-default">
              <div className="panel-body" id="filtro">

                <Filtro
                  title={"Filtro de campanhas"}
                  titleBtn={"Filtrar"}
                  inputs={
                    [
                      {type: "text", value: "", name: "campanha", placeholder: "Campanha"},
                      {type: "date", value: "", name: "dataInicio", placeholder: ""},
                      {type: "date", value: "", name: "dataFim", placeholder: ""},
                      {type: "text", value: "", name: "usuario", placeholder: "Usuário"},
                    ]}
                />

              </div>
            </div>
          </div>

          <div className="col-md-10">
            <div className="panel panel-default">
              <div className="panel-body">

                <Table
                  title={"Monitor de Envios"}
                  fields={
                    ["ID", "Grupo", "Campanha", "Cadastro", "Centro de Custo", "Rota", "Status", "Ações"]
                  }
                >
                  <tbody>
                      <tr>
                          <td>1077648</td>
                          <td>
                              <strong>Grupo: </strong>ASS_INTERNO_API_SP<br />
                              <strong>Grupo: </strong>API_SP
                          </td>
                          <td>SMS Web Service</td>
                          <td>22/12/16 12:39</td>
                          <td>Padrão</td>
                          <td>
                              Curto<br />
                              Web Service
                          </td>
                          <td className="text-center">
                              <i className="glyphicon glyphicon-ok" />
                          </td>
                          <td className="acoes">
                              <i className="glyphicon glyphicon-th-list" />
                              <i className="glyphicon glyphicon-share-alt" />
                          </td>
                      </tr>

                      <tr>
                          <td>1077648</td>
                          <td>
                              <strong>Grupo: </strong>ASS_INTERNO_API_SP<br />
                              <strong>Grupo: </strong>API_SP
                          </td>
                          <td>SMS Web Service</td>
                          <td>22/12/16 12:39</td>
                          <td>Padrão</td>
                          <td>
                              Curto<br />
                              Web Service
                          </td>
                          <td className="text-center">
                              <i className="glyphicon glyphicon-hourglass" />
                          </td>
                          <td className="acoes">
                              <i className="glyphicon glyphicon-th-list" />
                              <i className="glyphicon glyphicon-share-alt" />
                          </td>
                      </tr>

                      <tr>
                          <td>1077648</td>
                          <td>
                              <strong>Grupo: </strong>ASS_INTERNO_API_SP<br />
                              <strong>Grupo: </strong>API_SP
                          </td>
                          <td>SMS Web Service</td>
                          <td>22/12/16 12:39</td>
                          <td>Padrão</td>
                          <td>
                              Curto<br />
                              Web Service
                          </td>
                          <td className="text-center">
                              <i className="glyphicon glyphicon-remove" />
                          </td>
                          <td className="acoes">
                              <i className="glyphicon glyphicon-th-list" />
                              <i className="glyphicon glyphicon-share-alt" />
                          </td>
                      </tr>

                      <tr>
                          <td>1077648</td>
                          <td>
                              <strong>Grupo: </strong>ASS_INTERNO_API_SP<br />
                              <strong>Grupo: </strong>API_SP
                          </td>
                          <td>SMS Web Service</td>
                          <td>22/12/16 12:39</td>
                          <td>Padrão</td>
                          <td>
                              Curto<br />
                              Web Service
                          </td>
                          <td className="text-center">
                              <i className="glyphicon glyphicon-remove" />
                          </td>
                          <td className="acoes">
                              <i className="glyphicon glyphicon-th-list" />
                              <i className="glyphicon glyphicon-share-alt" />
                          </td>
                      </tr>
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
