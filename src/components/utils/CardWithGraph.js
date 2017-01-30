import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Row } from "react-bootstrap";
import {Pie} from 'react-chartjs-2';

import Panel from "../../components/Panel";

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

const quantidadeElementos = 3;
const tamanhoCard = 4;

export default class CardInfo extends Component {

    state = {
        showMore: false
    }

    render() {
        return (
                <Panel title={this.props.title ? this.props.title : <div>outro</div>}>
                    <Row>
                        {this.props.info.slice(0,quantidadeElementos).map((info,index) => {
                            return (
                                    <Col md={tamanhoCard} sm={tamanhoCard} key={index}>
                                        {info.datasets !== undefined ?
                                            <div>
                                                <Pie
                                                    data={info}
                                                    options={{
                                                        responsive:true,
                                                        legend:{
                                                            position: "right",
                                                            usePointStyle: false
                                                        }
                                                    }}/>
                                                <p style={style.text}>{info.descricao}</p>
                                            </div>
                                        : 
                                            <div>
                                                <h2 style={style.card}>{info.quantidade}</h2>
                                                <p style={style.text}>{info.label}</p>
                                            </div>}
                                    </Col>
                            )
                        })}
                    </Row>

                    <Row>
                        {this.state.showMore ?
                            this.props.info.slice(quantidadeElementos,this.props.info.length).map((info,index) => {
                                return (
                                    <Col md={tamanhoCard} sm={tamanhoCard} key={index}>
                                        {info.datasets !== undefined ?
                                            <div>
                                                <Pie
                                                    data={info}
                                                    options={{
                                                        responsive:true,
                                                        legend:{
                                                            position: "right",
                                                            usePointStyle: false
                                                        }
                                                    }}/>
                                                <p style={style.text}>{info.descricao}</p>
                                            </div>
                                        : 
                                            <div>
                                                <h2 style={style.card}>{info.quantidade}</h2>
                                                <p style={style.text}>{info.label}</p>
                                            </div>}
                                        
                                    </Col>
                                )
                            })
                        : ""}
                    </Row>

                    {this.props.info.length > quantidadeElementos ? (
                        <div className="col-md-12 moreInfo" onClick={() => this.setState({showMore:!this.state.showMore})}>
                            <a data-tip data-for="moreInfo">
                                <i className={this.state.showMore ? "fa fa-minus pull-right moreInfo" : "fa fa-plus pull-right moreInfo"} />
                            </a>
                        </div>)
                    : ""}

                </Panel>)
    }
}