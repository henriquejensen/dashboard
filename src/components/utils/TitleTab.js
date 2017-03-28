import React, { Component } from "react";

import { LOGO_CREDITO, ICON_CREDITO } from "../../constants/constantsCredito";

import { patternCPF, patternCNPJ } from "./functions/patternDocuments";

export default class Titletab extends Component {
    render() {
        return (
            <span>
                <i className="fa fa-times close-tab close" onClick={this.props.close}/>

				<img src={this.props.icon} width="25" style={{padding: "0px 3px"}}/>
                
                {this.props.tipo == "CPF" ?
                    patternCPF(this.props.label)
                    : this.props.tipo == "CNPJ" ?
                        patternCNPJ(this.props.label)
                : this.props.label}
			</span>
        )
    }
}