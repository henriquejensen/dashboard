import React, { Component } from "react";
import { Tabs, Tab, Col, Button, Form } from "react-bootstrap";

import { FieldGroup, SelectGroup, TextAreaGroup, CheckboxGroup } from "../../components/forms/CommonForms";
import Table from "../../components/table/Table";

const Cliente = (props) => {
    return (
        <span>
            <Col md={6}>
                <FieldGroup
                    id="razaoSocial"
                    type="text"
                    label="Razão social"
                    name="razaoSocial"
                    value={props.razaoSocial}
                    placeholder="Nome do cliente" />
            </Col>

            <Col md={6}>
                <FieldGroup
                    id="inputUser"
                    type="text"
                    label="Cliente Login"
                    name="login"
                    value={props.login}
                    placeholder="Cliente login" />
            </Col>
        </span>
    )
}

const DadosBasicos = (props) => {
    return (
        <span>
            <Col md={4}>
                <FieldGroup
                    id="nomeGrupo"
                    type="text"
                    label="Nome do grupo"
                    name="nomeGrupo"
                    value={props.nomeGrupo}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="inicioConsumo"
                    type="date"
                    label="Início do consumo"
                    name="inicioConsumo"
                    value={props.inicioConsumo}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <FieldGroup
                    id="fimConsumo"
                    type="date"
                    label="Fim do consumo"
                    name="fimConsumo"
                    value={props.fimConsumo}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="bloqueado"
                    type="select"
                    label="Bloqueado"
                    name="bloqueado"
                    value={props.bloqueado}
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipoGrupo"
                    type="select"
                    label="Status ativo"
                    name="tipoGrupo"
                    value={props.status}
                    options={["CLIENTE", "FUNCIONARIO", "TESTE", "OUTROS"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="acessoWS"
                    type="select"
                    label="Acesso a WebService"
                    name="acessoWS"
                    value={props.webService}
                    options={["SIM", "NAO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={12}>
                <FieldGroup
                    id="ipAcesso"
                    type="text"
                    label="Ip's de acesso"
                    name="ipAcesso"
                    value={props.ips}
                    placeholder="0.0.0.0, 0.0.0.0, 0.0.0.0"
                    onChange={props.onChange} />
            </Col>
        </span>
    )
}

const Horario = (props) => {
    return (
        <span>
            <Col md={props.bloquearHorario == "SIM" ? 4 : 12}>
                <SelectGroup
                    id="bloquearHorario"
                    type="select"
                    label="Bloquear por horário?"
                    name="bloquearHorario"
                    value={props.bloquearHorario}
                    options={["SIM", "NÃO"]}
                    onChange={props.onChange} />
            </Col>

            {props.bloquearHorario == "SIM" ?
                <span>
                    <Col md={4}>
                        <FieldGroup
                            id="acessarDas"
                            type="time"
                            label="Acessar das 00:00"
                            name="acessarDas"
                            value={props.horarioInicio}
                            onChange={props.onChange} />
                    </Col>

                    <Col md={4}>
                        <FieldGroup
                            id="acessarAte"
                            type="time"
                            label="Acessar até às 00:00"
                            name="acessarAte"
                            value={props.horarioFim}
                            onChange={props.onChange} />
                    </Col>

                    <Col md={12}>
                        <CheckboxGroup
                            id="diasAcesso"
                            label="Selecionar os dias que poderá acessar"
                            center={true}
                            inline={true}
                            values={props.dias}
                            options={["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]}
                            onChange={props.onChange} />
                    </Col>
                </span>
            : ""}

        </span>
    )
}

const LimitacaoTotal = (props) => {
    return (
        <span>
            <Col md={4}>
                <FieldGroup
                    id="limite"
                    type="number"
                    label="Limite de quantidade"
                    name="limite"
                    value={props.limite}
                    placeholder="0"
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipoLimitacao"
                    type="select"
                    label="Tipo da limitação"
                    name="tipoLimitacao"
                    value={props.tipoLimitacao}
                    options={["INATIVO", "CONSUMO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="periodoLimitacao"
                    type="select"
                    label="Período da limitação"
                    name="periodoLimitacao"
                    value={props.periodoLimitacao}
                    options={["AVULSO", "MENSAL"]}
                    onChange={props.onChange} />
            </Col>
            <Col md={12}>
                Total do consumo deste Mês : 0
            </Col>
            <Col md={12}>
                Total do consumo desde o início : 0
            </Col>
            <Col md={12}>
                A limitação e o consumo acima é referente apenas aos produtos de LOCALIZE, CRÉDITO, VEÍCULO, FOCO FISCAL e CONSIG+
            </Col><br/>
        </span>
    )
}

const LimitacaoProduto = (props) => {
    return (
            <Table>
                <tbody>
                    {props.produtos.map((produto,index) => {
                        return (
                            <tr key={index}>
                                <td><h3>{produto.label}</h3></td>
                                <td>
                                    <FieldGroup
                                        id="produtoQuantidade"
                                        type="number"
                                        label="Quantidade"
                                        name="produtoQuantidade"
                                        value={produto.quantidade}
                                        onChange={props.onChange} />
                                </td>

                                <td>
                                    <SelectGroup
                                        id="tipoLimitacaoProduto"
                                        type="select"
                                        label="Tipo da limitação"
                                        name="tipoLimitacaoProduto"
                                        value={produto.tipoLimitacao}
                                        options={["INATIVO", "CONSUMO"]}
                                        onChange={props.onChange} />
                                </td>

                                <td>
                                    <SelectGroup
                                        id="periodoLimitacaoProduto"
                                        type="select"
                                        label="Período da limitação"
                                        name="periodoLimitacaoProduto"
                                        value={produto.periodoLimitacao}
                                        options={["AVULSO", "MENSAL"]}
                                        onChange={props.onChange} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

    )
}

const Observacoes = (props) => {
    return (
        <Col md={12}>
            <TextAreaGroup
                id="observacoes"
                label="Observações"
                placeholder="Escreva alguma observação sobre o usuário"
                name="observacoes"
                value={props.obs}
                onChange={props.onChange} />
        </Col>
    )
}

export default class EditarGrupo extends Component {
    onFormSubmit = (evt) => {
        evt.preventDefault();

        console.log(this.state);
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    
    render() {
        const grupo = this.props.grupoInfo;
        const editar = [
            {label: "Cliente", form: <Cliente onChange={this.onChange} razaoSocial={grupo.pessoaVO.razaoSocial} login={grupo.pessoaVO.descricao} />},
            {label: "Dados Básicos", form: <DadosBasicos onChange={this.onChange} nomeGrupo={grupo.descricao} inicioConsumo={grupo.dataInicio} fimConsumo={grupo.dataFinal} bloqueado={grupo.statusBloqueado} status={grupo.statusAtivo} webService={grupo.wsStatus}
            ips={grupo.ipAcesso}/>},
            {
                label: "Horário",
                form: <Horario
                        onChange={this.onChange}
                        bloquearHorario={grupo.statusAccessTime}
                        horarioInicio={grupo.dataInicio}
                        horarioFim={grupo.dataFinal}
                        dias={[grupo.accessTimeSeg, grupo.accessTimeTer, grupo.accessTimeQua, grupo.accessTimeQui, grupo.accessTimeSex, grupo.accessTimeSab, grupo.accessTimeDom]} />
            },
            {label: "Limitação total", form: <LimitacaoTotal onChange={this.onChange} limite={grupo.limiteValor} periodoLimitacao={grupo.periodoLimitacao} tipoLimitacao={grupo.tipoLimitacao} />},
            {label: "Limitação por produto", form: <LimitacaoProduto onChange={this.onChange} produtos={[
                {label:"Localize", quantidade:grupo.localizeLimiteValor, tipoLimitacao:grupo.localizeTipoLimitacao, periodoLimitacao:grupo.localizePeriodoLimitacao},
                {label:"SMS", quantidade:grupo.smsLimiteValor, tipoLimitacao:grupo.smsTipoLimitacao, periodoLimitacao:grupo.smsPeriodoLimitacao},
                {label:"Crédito", quantidade:grupo.creditoLimiteValor, tipoLimitacao:grupo.creditoTipoLimitacao, periodoLimitacao:grupo.creditoPeriodoLimitacao},
                {label:"Foco Fiscal", quantidade:grupo.focofiscalLimiteValor, tipoLimitacao:grupo.focofiscalTipoLimitacao, periodoLimitacao:grupo.focofiscalPeriodoLimitacao},
                {label:"Base Certa", quantidade:grupo.bcLimiteValor, tipoLimitacao:grupo.bcTipoLimitacao, periodoLimitacao:grupo.bcPeriodoLimitacao},
                {label:"Venda+", quantidade:grupo.vendaMaisLimiteValor, tipoLimitacao:grupo.vendaMaisTipoLimitacao, periodoLimitacao:grupo.vendaMaisPeriodoLimitacao},
                {label:"Consig+", quantidade:grupo.consigLimiteValor, tipoLimitacao:grupo.consigTipoLimitacao, periodoLimitacao:grupo.consigPeriodoLimitacao},
                {label:"Veículos", quantidade:grupo.veiculosLimiteValor, tipoLimitacao:grupo.veiculosTipoLimitacao, periodoLimitacao:grupo.veiculosPeriodoLimitacao}
            ]} />},
            {label: "Observações", form: <Observacoes onChange={this.onChange} obs={grupo.obs} />}
        ]

        return (
            <Col md={12}>
                <Form horizontal onSubmit={this.onFormSubmit}>
                    <Tabs
                        defaultActiveKey={1}
                        id="uncontrolled-tab-example">

                        {editar.map((item,index) => {
                            return (
                                <Tab eventKey={index} title={item.label} key={index}>
                                    {item.form}
                                </Tab>
                            )
                        })}

                    </Tabs>

                    <Col md={6}>
                        <Button
                            type="submit"
                            onClick={this.props.cancel}>Cancelar</Button>
                    </Col>
                    <Col md={6}>
                        <Button
                            className="pull-right"
                            type="submit"
                            bsStyle="info">Salvar</Button>
                    </Col>
                </Form>
            </Col>
        )
    }
 }