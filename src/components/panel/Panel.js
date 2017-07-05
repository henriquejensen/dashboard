import "./Panel.css"

import React, { Component } from "react";
import Tooltip from 'react-tooltip';

export default class Panel extends Component {

    state = {
        show: this.props.showPanel == false ? false : true
    }

    render() {
        let footer = this.props.footer;
        let titleColor = this.props.titleColor
        return (
            <div className="panel panel-default">
                {this.props.title ? 
                    <div
                        className={titleColor ? "panel-heading my-panel-heading-inner" : "panel-heading my-panel-heading"} 
                        onClick={() => this.setState({show:!this.state.show})}
                    >
                        {/*this.props.qtdTotal ? 
                            this.props.qtdTotal.map((total,i) => {
                                return <span className="qtd-panel" key={i} style={{right: 39 - i*3 + 10 + "%"}}>
                                        {total.qtd + "  "} <i className={"glyphicon "+ total.icon}/>
                                    </span>
                            }) : ""*/}
                        
                        <a data-tip data-for="arrowPanel">
                            <i className={this.state.show ? "noPrint glyphicon glyphicon-triangle-top arrow-panel" : "noPrint glyphicon glyphicon-triangle-bottom arrow-panel"} onClick={() => this.setState({show:!this.state.show})} />
                        </a>
                        
                        <Tooltip
                            id="arrowPanel"
                        >
                            <span>Esconder/Mostrar Informações</span>
                        </Tooltip>

                        {this.props.title}
                    </div>
                : ""}

                <div className={this.state.show ? "panel-body" : "display-none"}>
                    {this.props.children}
                </div>

                {footer ? 
                    <div className={this.state.show ? "panel-footer" : "display-none"}>{footer}</div>
                : ""}
            </div>
        )
    }
}