import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col } from "react-bootstrap";
import {Pie} from 'react-chartjs-2';

import Panel from "../../components/panel/Panel";

const style = {
    card: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#73879C',
        textAlign: 'center'
    },
    text: {
        textAlign: 'center'
    }
    
}

const quantidadeElementos = 4;
const tamanhoCard = 3;

export default class CardInfo extends Component {
    constructor() {
        super();

        this.state = {
            showMore: false
        }

        this.renderInfo = this.renderInfo.bind(this);
    }

    renderInfo(infoToRender) {
        return (
            infoToRender.map((info,index) => {
                return (
                    <Col md={tamanhoCard} sm={tamanhoCard} key={index}>
                        <h2 style={style.card}>{info.quantidade}</h2>
                        <p style={style.text}>{info.label}</p>
                    </Col>
                )

            })
        )
    }

    render() {
        return (
                <Panel title={this.props.title ? this.props.title : ""}>
                    {this.renderInfo(this.props.info.slice(0,quantidadeElementos))}

                    {this.state.showMore ?
                        this.renderInfo(this.props.info.slice(quantidadeElementos,this.props.info.length))
                    : ""}

                    <div className="col-md-12 moreInfo" onClick={() => this.setState({showMore:!this.state.showMore})}>
                        <a data-tip data-for="moreInfo">
                            <i className={this.state.showMore ? "fa fa-minus pull-right moreInfo" : "fa fa-plus pull-right moreInfo"} />
                        </a>
                    </div>

                </Panel>)
    }
}