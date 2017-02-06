import React, { Component } from "react";
import Tooltip from 'react-tooltip'
import { Col } from "react-bootstrap";
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

export default class CardInfo extends Component {

    state = {
        showMore: false
    }

    render() {
        return (
                <Panel title={this.props.title ? this.props.title : <div>outro</div>}>
                    {this.props.info.slice(0,4).map((info,index) => {
                        return (
                            <Col md={3} sm={3} key={index}>
                                <h2 style={style.card}>{info.quantidade}</h2>
                                <p style={style.text}>{info.label}</p>
                            </Col>
                        )

                    })}

                    {this.state.showMore ?
                        this.props.info.slice(4,this.props.info.length).map((info,index) => {
                            return (
                                <Col md={3} sm={3} key={index}>
                                    <h2 style={style.card}>{info.quantidade}</h2>
                                    <p style={style.text}>{info.label}</p>
                                </Col>
                            )
                        })
                    : ""}

                    <div className="col-md-12 moreInfo" onClick={() => this.setState({showMore:!this.state.showMore})}>
                        <a data-tip data-for="moreInfo">
                            <i className={this.state.showMore ? "fa fa-minus pull-right moreInfo" : "fa fa-plus pull-right moreInfo"} />
                        </a>
                    </div>

                </Panel>)
    }
}