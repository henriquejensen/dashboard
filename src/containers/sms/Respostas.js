import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getRespostasSMS } from "../../actions/index";

import Filtro from "../../components/Filtro";
import Table from "../../components/Table";

class Respostas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      respostasSMS: this.props.respostasSMS
    }
  }

  componentDidMount() {
    document.title = "Assertiva > SMS > Respostas";

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
                  title={"Filtro de respostas"}
                  titleBtn={"Filtrar"}
                  inputs={
                    [
                      {type: "text", value: "", name: "campanha", placeholder: "Campanha"},
                      {type: "date", value: "", name: "dataRecebimento", placeholder: ""},
                      {type: "number", value: "", name: "numero", placeholder: "Número"}
                    ]}
                />

              </div>
            </div>
          </div>

          <div className="col-md-10">
            <div className="panel panel-default">
              <div className="panel-body">

                <Table
                  title={"Monitor de Respostas"}
                  fields={
                    ["Numero", "Data do Recebimento", "Rota", "Mensagem Enviada", "Mensagem Recebida", "Ações"]
                  }
                >

                </Table>

              </div>
            </div>
          </div>

        </div>
      </div>
   </div>)
  }
}

export default Respostas;