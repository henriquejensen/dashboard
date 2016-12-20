import React, {Component} from "react";


export default class SMS extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("");
    document.title = "Assertiva > SMS";
  }

  render() {
    return (
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="col-md-12">
              <h2>Monitor de Envios</h2>

              <div className="btn btn-info enriquecimento-basecerta" type="submit">
                Envio de SMS
              </div>
            </div>
          </div>
      </div>
    </div>
   </div>)
  }
}
