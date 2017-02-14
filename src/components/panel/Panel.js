import React, { Component } from "react";
import Tooltip from 'react-tooltip';

export default class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.showPanel == false ? false : true
        }
    }

    render() {
        return (
            <div className="row-localize">
                    <div className="panel panel-default">
                        {this.props.title ? <div className="panel-heading" style={{position: "relative"}}>
                            {this.props.qtdTotal ? 
                                this.props.qtdTotal.map((total,i) => {
                                    return <span className="qtd-panel" key={i} style={{right: 39 - i*3 + 10 + "%"}}>
                                            {total.qtd + "  "} <i className={"glyphicon "+ total.icon}/>
                                           </span>
                                }) : ""}
                            
                            <a data-tip data-for="arrowPanel">
                                <i className={this.state.show ? "glyphicon glyphicon-triangle-top arrow-panel" : "glyphicon glyphicon-triangle-bottom arrow-panel"} onClick={() => this.setState({show:!this.state.show})} />
                            </a>
                            
                            <Tooltip
                                id="arrowPanel"
                            >
                                <span>Esconder/Mostrar Informações</span>
                            </Tooltip>

                            {this.props.title}
                        </div> : ""}

                        <div className={this.state.show ? "panel-body" : "display-none "}>
                            
                            {this.props.children}
                        </div>
                    </div>
            </div>
        )
    }
}