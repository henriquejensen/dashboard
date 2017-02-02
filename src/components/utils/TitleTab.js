import React, { Component } from "react";

import { LOGO_CREDITO, ICON_CREDITO } from "../../constants/constantsCredito";

export default class Titletab extends Component {
    render() {
        return (
            <div>
                <button className="close" onClick={this.props.close}>
                    <i className="fa fa-times close-tab"/>
                </button>
				<img src={this.props.icon} width="25" style={{padding: "0px 3px"}}/>
                {this.props.label}
			</div>
        )
    }
}