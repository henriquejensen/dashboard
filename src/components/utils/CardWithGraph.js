import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col, Row } from "react-bootstrap";
import {Pie} from 'react-chartjs-2';

import Panel from "../../components/Panel";
import Table from "../../components/Table";

const style = {
    card: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#73879C',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center'
    },
    graph: {
        padding: "10px"
    },
    graphText: {
        marginLeft: "33px"
    }
}

const quantidadeElementos = 3;
const tamanhoCard = 4;

export default class CardWithGraph extends Component {
    constructor(props) {
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
                    info.datasets !== undefined ?
                        <td key={index}>
                            <Pie
                                height={80}
                                data={info}
                                options={{
                                    legend:{
                                        position: "right",
                                        usePointStyle: false
                                    }
                                }}/>
                            <p style={style.graphText}>{info.descricao}</p>
                        </td>
                    : 
                        <td key={index}>
                            <h2 style={style.card}>{info.quantidade}</h2>
                            <p style={style.text}>{info.label}</p>
                        </td>
                )
            })
        )
    }

    render() {
        return (
                <Panel title={this.props.title ? this.props.title : <div>outro</div>}>
                    <Table>
                        {/*Renderiza os elementos visiveis na tela do dashboard*/}
                        <tbody>
                            <tr>
                                {this.renderInfo(this.props.info.slice(0,quantidadeElementos))}
                            </tr>
                        </tbody>

                        {/*Renderiza os elementos visíveis somente quando o usuário clica em ver mais*/}
                        {this.state.showMore ?
                            <tbody>
                                <tr>
                                    {this.renderInfo(this.props.info.slice(quantidadeElementos,this.props.info.length))}
                                </tr>
                            </tbody>
                        : ""}
                    </Table>

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