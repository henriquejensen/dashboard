import React, { Component } from "react";

export default class PanelGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        }
    }

    render() {
        return (
            <div className="row row-localize">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading text-center" style={{position: "relative"}}>
                            {this.props.qtdTotal ? 
                                this.props.qtdTotal.map((total,i) => {
                                    return <span className="qtd-panel" key={i} style={{right: 10 + i + 10 + "%"}}>
                                            {total.qtd + "  "} <i className={"glyphicon "+ total.icon}/>
                                           </span>
                                }) : ""}
                            
                            <i className={this.state.show ? "glyphicon glyphicon-triangle-top arrow-panel" : "glyphicon glyphicon-triangle-bottom arrow-panel"} onClick={() => this.setState({show:!this.state.show})} />
                            {this.props.title}
                        </div>

                        <div className={this.state.show ? "panel-body" : "display-none "}>
                            
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}