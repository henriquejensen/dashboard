import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/MyTable";

import { NENHUM_REGISTRO } from "../../constants/utils";

import { formatCurrency } from "../utils/functions/patternDocuments";

const title = "RECUPERAÇÕES, FALÊNCIAS E AÇÕES JUDICIAIS";

export default class Acoes extends Component {

    state = {
      rows: this.props.acoes ? this.props.acoes.acoes ? this.props.acoes.acoes : [] : []
    }

    handleSortElements = (sortColumn, sortDirection='ASC') => {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        }
 
        const rows = sortDirection === 'NONE' ? this.state.rows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    }

    render() {
      let indexOfProps = this.props.index;
      let acoes = this.props.acoes ? this.props.acoes : {};
      let fields= [
          {id:"dataAcao", name:"Data", sortable:true},
          {id:"vara", name:"Cód. Vara"},
          {id:"cidade", name:"Cidade-UF"}
      ];
      let rows = this.state.rows;
      return (
          <div>
              <a name={"Recuperações, Falências e Ações Judiciais"+indexOfProps}></a>
              <a name={"Recuperação e Falências"+indexOfProps}></a>
              <a name={"Ações"+indexOfProps}></a>
              <a name={"Ações Judiciais"+indexOfProps}></a>
              {acoes.acoes && rows.length > 0 ?
                <Panel title={title} qtdTotal={[{icon:"fa fa-line-chart", qtd:acoes.quantidadeAcoes}]}>
                  <Col md={12}>
                    <Table fields={fields} handleSortElements={this.handleSortElements}>
                      <tbody>
                        {rows.map((acao, index) => {
                          return (
                            <tr key={index}>
                              <td>{acao.dataAcao}</td>
                              <td>{acao.vara}</td>
                              <td>{acao.cidade + " - " + acao.uf}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Panel>
                :
                <Panel title={title}>
                    <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
                </Panel>}
            </div>
        )
    }
}