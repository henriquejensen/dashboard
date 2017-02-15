import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../../components/Panel";
import Table from "../../components/Table";

export default class CardWithTable extends Component {
  render() {
    return (
            <Panel title={this.props.title ? this.props.title : ""}>
                <Table fields={this.props.fields ? this.props.fields : ""}>
                    {this.props.children}
                </Table>

                {this.props.tooltips ?
                    this.props.tooltips.map((tooltip,index) => {
                        return (
                            <Tooltip id={this.props.tooltip.idTooltip} key={index}>
                                <span>{this.props.tooltip.textTooltip}</span>
                            </Tooltip>
                        )
                    })
                : ""}

            </Panel>)
  }
}