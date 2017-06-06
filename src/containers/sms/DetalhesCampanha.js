import React, { Component } from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {Col} from "react-bootstrap"

//Components
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";
import CardWithTable from "../../components/card/CardWithTable"

//Actions
import {getDetalhesCampanha} from "../../actions/actionsSMS"

class DetalhesCampanha extends Component {
    componentWillMount() {
        this.props.getDetalhesCampanha(this.props.id)
    }

    render() {
        let campanha = this.props.campanha
        return (
            campanha === undefined ?
                <LoadingScreen />
            :
                <CardWithTable
                    fields={
                        [
                            {id:"idExterno", name:"Id Externo"},
                            {id:"dataEnvio", name:"Data do Envio"},
                            {id:"numero", name:"Número"},
                            {id:"mensagem", name:"Mensagem"},
                            {id:"remetente", name:"Remetente"},
                            {id:"status", name:"Status"}
                        ]
                    }
                    rows={campanha}
                />
        )
    }
}

function mapStateToProps(state) {
  return {
    campanha: state.sms.campanhaDetalhes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDetalhesCampanha }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesCampanha);