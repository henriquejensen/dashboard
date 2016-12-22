import React, {Component} from "react";


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

          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-body" id="filtro">
                <h4>Filtro</h4>

                <input
                  type="text"
                  name="campanha"
                  placeholder="Campanha"/>

                <input
                  type="date"
                  name="data"
                  placeholder="Data Início"/>

                <input
                  type="date"
                  name="data"
                  placeholder="Data Fim"/>

                <input
                  type="text"
                  name="nome"
                  placeholder="Usuário"/>

              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="panel panel-default">
              <div className="panel-body">
                <h4>Monitor de Envios</h4>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Grupo</th>
                      <th>Campanha</th>
                      <th>Cadastro</th>
                      <th>Centro de Custo</th>
                      <th>Rota</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
   </div>)
  }
}
