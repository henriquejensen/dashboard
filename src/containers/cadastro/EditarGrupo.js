import React, { Component } from "react"
import moment from "moment"
import { Checkbox, Tabs, Tab, Col, Button, Form } from "react-bootstrap"

import { DateField, MyFieldGroup, SelectGroup, TextAreaGroup } from "../../components/forms/CommonForms"
import Table from "../../components/table/Table"

const Cliente = (props) => {
    return (
        <span>
            <Col md={6}>
                <MyFieldGroup
                    id="razaoSocial"
                    type="text"
                    label="Razão social"
                    name="razaoSocial"
                    value={props.razaoSocial}
                    placeholder="Nome do cliente" />
            </Col>

            <Col md={6}>
                <MyFieldGroup
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
            <Col md={12} style={{margin:0, padding:0}}>
                <Col md={4}>
                    <MyFieldGroup
                        id="descricao"
                        type="text"
                        label="Nome do grupo"
                        name="descricao"
                        value={props.descricao}
                        onChange={props.onChange} />
                </Col>

                <Col md={4}>
                    <DateField
                        required
                        label="Ínicio do consumo"
                        placeholder="Início do consumo"
                        startDate={props.dataInicioText}
                        onChange={(date) => props.onChangeDataConsumo(date, "dataInicioText")}
                    />
                </Col>

                <Col md={4}>
                    <DateField
                        label="Fim do consumo"
                        placeholder="Fim do consumo"
                        startDate={props.dataFinalText}
                        onChange={(date) => props.onChangeDataConsumo(date, "dataFinalText")}
                    />
                </Col>
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="statusBloqueado"
                    type="select"
                    label="Bloqueado"
                    name="statusBloqueado"
                    value={props.statusBloqueado}
                    options={["SIM", "NÃO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={4}>
                <SelectGroup
                    id="tipo"
                    type="select"
                    label="Tipo"
                    name="tipo"
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
                    options={["SIM", "NÃO"]}
                    onChange={props.onChange} />
            </Col>

            <Col md={12}>
                <MyFieldGroup
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
            <Col md={props.statusAccessTime == "SIM" ? 4 : 12}>
                <SelectGroup
                    id="statusAccessTime"
                    type="select"
                    label="Bloquear por horário?"
                    name="statusAccessTime"
                    value={props.statusAccessTime}
                    options={["SIM", "NÃO"]}
                    onChange={props.onChange} />
            </Col>

            {props.statusAccessTime == "SIM" ?
                <span>
                    <Col md={4}>
                        <MyFieldGroup
                            id="horaIniAccessTime"
                            required
                            type="time"
                            label="Acessar das 00:00"
                            name="horaIniAccessTime"
                            value={props.horaIniAccessTime}
                            onChange={props.onChange} />
                    </Col>

                    <Col md={4}>
                        <MyFieldGroup
                            id="horaFimAccessTime"
                            required
                            type="time"
                            label="Acessar até às 00:00"
                            name="horaFimAccessTime"
                            value={props.horaFimAccessTime}
                            onChange={props.onChange} />
                    </Col>

                    <Col md={12} className="text-center" style={{padding:0}}>
                        <p>Selecionar os dias de acesso: </p>
                        <Checkbox name="accessTimeDom" checked={props.accessTimeDom === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            DOM
                        </Checkbox>

                        <Checkbox name="accessTimeSeg" checked={props.accessTimeSeg === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            SEG
                        </Checkbox>
                    
                        <Checkbox name="accessTimeTer" checked={props.accessTimeTer === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            TER
                        </Checkbox>
                    
                    
                        <Checkbox name="accessTimeQua" checked={props.accessTimeQua === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            QUA
                        </Checkbox>
                    
                    
                        <Checkbox name="accessTimeQui" checked={props.accessTimeQui === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            QUI
                        </Checkbox>
                    
                    
                        <Checkbox name="accessTimeSex" checked={props.accessTimeSex === "SIM"} onChange={props.onChangeLimiteHorario} inline >
                            SEX
                        </Checkbox>
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
                <MyFieldGroup
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
                                    <MyFieldGroup
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
    constructor(props) {
        super(props)

        this.dataInicio = this.props.grupoInfo.dataInicioText ?
                this.props.grupoInfo.dataInicioText.split("/").reverse().join("-") : undefined
        this.dataFinal = this.props.grupoInfo.dataFinalText ?
                this.props.grupoInfo.dataFinalText.split("/").reverse().join("-") : undefined

        this.state = {
            ...this.props.grupoInfo,
            dataInicioText: moment(this.dataInicio),
            dataFinalText: moment(this.dataFinal),
        }
    }
    
    onFormSubmit = (evt) => {
        evt.preventDefault();

        let grupo = {
            ...this.state,
            dataInicio: moment(this.state.dataInicioText).format("YYYY-MM-DD"),
            dataFinal: this.changeDataConsumo ? moment(this.state.dataFinalText).format("YYYY-MM-DD") : null
        }

        this.props.editGroup({ ...grupo })
        this.props.cancel()
    }

    onChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    onChangeLimiteHorario = (evt) => {
        const name = evt.target.name
        this.setState({
            [name]: this.state[name] === "SIM" ? "NÃO" : "SIM" 
        })
    }

    onChangeDataConsumo = (date, name) => {
        this.setState({
            [name]: date,
            changeDataConsumo: true
        })
    }
    
    render() {
        const grupo = this.state
        const editar = [
            {
                label: "Cliente",
                form: <Cliente
                        onChange={this.onChange}
                        razaoSocial={grupo.pessoaVO.razaoSocial}
                        login={grupo.pessoaVO.descricao}
                    />
            },
            {
                label: "Dados Básicos",
                form: <DadosBasicos
                        onChange={this.onChange}
                        onChangeDataConsumo={this.onChangeDataConsumo}
                        descricao={grupo.descricao}
                        dataInicioText={grupo.dataInicioText}
                        dataFinalText={grupo.dataFinalText}
                        statusBloqueado={grupo.statusBloqueado}
                        status={grupo.tipo}
                        webService={grupo.wsStatus}
                        ips={grupo.ipAcesso}
                    />
            },  
            {
                label: "Horário",
                form: <Horario
                        onChange={this.onChange}
                        onChangeLimiteHorario={this.onChangeLimiteHorario}
                        statusAccessTime={grupo.statusAccessTime}
                        horaIniAccessTime={grupo.horaIniAccessTime}
                        horaFimAccessTime={grupo.horaFimAccessTime}
                        accessTimeDom={grupo.accessTimeDom}
                        accessTimeSeg={grupo.accessTimeSeg}
                        accessTimeTer={grupo.accessTimeTer}
                        accessTimeQua={grupo.accessTimeQua}
                        accessTimeQui={grupo.accessTimeQui}
                        accessTimeSex={grupo.accessTimeSex}
                        accessTimeSab={grupo.accessTimeSab} />
            },
            {
                label: "Limitação total",
                form: <LimitacaoTotal
                        onChange={this.onChange}
                        limite={grupo.limiteValor}
                        periodoLimitacao={grupo.periodoLimitacao}
                        tipoLimitacao={grupo.tipoLimitacao}
                        />
            },
            {
                label: "Limitação por produto",
                form: <LimitacaoProduto
                        onChange={this.onChange}
                        produtos={[
                            {label:"Localize", quantidade:grupo.localizeLimiteValor, tipoLimitacao:grupo.localizeTipoLimitacao, periodoLimitacao:grupo.localizePeriodoLimitacao},
                            {label:"SMS", quantidade:grupo.smsLimiteValor, tipoLimitacao:grupo.smsTipoLimitacao, periodoLimitacao:grupo.smsPeriodoLimitacao},
                            {label:"Crédito", quantidade:grupo.creditoLimiteValor, tipoLimitacao:grupo.creditoTipoLimitacao, periodoLimitacao:grupo.creditoPeriodoLimitacao},
                            {label:"Foco Fiscal", quantidade:grupo.focofiscalLimiteValor, tipoLimitacao:grupo.focofiscalTipoLimitacao, periodoLimitacao:grupo.focofiscalPeriodoLimitacao},
                            {label:"Base Certa", quantidade:grupo.bcLimiteValor, tipoLimitacao:grupo.bcTipoLimitacao, periodoLimitacao:grupo.bcPeriodoLimitacao},
                            {label:"Venda+", quantidade:grupo.vendaMaisLimiteValor, tipoLimitacao:grupo.vendaMaisTipoLimitacao, periodoLimitacao:grupo.vendaMaisPeriodoLimitacao},
                            {label:"Consig+", quantidade:grupo.consigLimiteValor, tipoLimitacao:grupo.consigTipoLimitacao, periodoLimitacao:grupo.consigPeriodoLimitacao},
                            {label:"Veículos", quantidade:grupo.veiculosLimiteValor, tipoLimitacao:grupo.veiculosTipoLimitacao, periodoLimitacao:grupo.veiculosPeriodoLimitacao}
                        ]}
                    />
            },
            {
                label: "Observações",
                form: <Observacoes
                        onChange={this.onChange}
                        obs={grupo.obs}
                     />
            }
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
                        <Button onClick={this.props.cancel}>Cancelar</Button>
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