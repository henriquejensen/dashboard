import React, { Component } from "react";

import Panel from "../panel/Panel";
import Table from "../table/Table";

export default class Socre extends Component {
    render() {
        return (
          <Panel title="SCORE">
            <a name="score"></a>
            <div className="col-md-12">
              <Table
                  fields={
                      ["Classificação", "Score"]
                  }
              >
                <tbody>
                    <tr>
                        <td>{this.props.scores.scores}</td>
                        <td>{this.props.scores.resumo}</td>
                    </tr>
                </tbody>
              </Table>
            </div>
          </Panel>
        )
    }
}