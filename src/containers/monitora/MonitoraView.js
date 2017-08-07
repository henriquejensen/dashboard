import React from "react"
import { Col } from "react-bootstrap"

//Components
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/MyTable"

//Constants
import { NENHUM_REGISTRO } from "../../constants/utils"

const renderCardDocumentos = props => {
    return (
        <Col md={4} style={{padding:0}}>
            <Col md={12} className="text-center" style={{marginBottom:15}}>
                <MyButton tooltip="Criar um novo documento"
                    onClickButton={props.openModal}
                    params={[props.carteiras, props.NOVO_DOCUMENTO]}
                    myButtonClass="btn-block color-payement"
                    myButtonText="Novo documento"
                />
            </Col>
            <Col md={12} >
                <Panel title={`Documentos ` + (props.carteiraNome ? props.carteiraNome : "")}>
                    {props.documentos.length > 0 ?
                        <Table
                            fields={[
                                {id:"status", name:"Status", functionToApply:(val) => {
                                    return <i style={{borderRadius:5}} className="fa fa-circle-thin" id={val == "ATIVO" ? "userActivated" : "userDeactivated"}
                                />}},
                                {id:"documento", name:"Documento"},
                                {id:"id", name:"Ações", functionToApply:(idDocumento, index) => {
                                    return (
                                        <div>
                                            <MyButton
                                                tooltip="Visualizar documento"
                                                myButtonStyle="default"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-eye" />}
                                            />
                                            {'   '}
                                            <MyButton
                                                tooltip="Deletar documento"
                                                onClickButton={props.openModalDeletar}
                                                params={[props.removerDocumento, [idDocumento, props.documentos[index].documento]]}
                                                myButtonStyle="danger"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-trash" />}
                                            />
                                        </div>
                                    )
                                }}
                            ]}
                            elements={props.documentos}
                        />
                    :
                        <div className="text-center">{NENHUM_REGISTRO}</div>
                    }
                </Panel>
            </Col>
        </Col>
    )
}

const renderCardCarteira = props => {
    return (
        <Col md={8} style={{padding:0}}>
            <Col md={12} className="text-center" style={{marginBottom:15}}>
                <MyButton  tooltip="Criar uma nova carteira"
                    onClickButton={props.openModal}
                    params={[{}, props.NOVA_CARTEIRA]}
                    myButtonStyle="info"
                    myButtonClass="btn-block"
                    myButtonText="Nova Carteira"
                />
            </Col>
            <Col md={12}>
                <Panel title="Carteiras">
                    {props.carteiras.length > 0 ?
                        <Table
                            fields={[
                                {id:"status", name:"Status", functionToApply:(val) => {
                                    return <i style={{borderRadius:5}} className="fa fa-circle-thin" id={val == "ATIVO" ? "userActivated" : "userDeactivated"}
                                />}},
                                {id:"frequenciaConsulta", name:"Freq. (dias)"},
                                {id:"nome", name:"Nome"},
                                {id:"quantidadeDocumentos", name:"Qtd"},
                                {id:"id", name:"Ações", functionToApply:(val, index) => {
                                    const tipo = props.carteiras[index].tipoConsultaPf ? "CPF" : "CNPJ"
                                    return (
                                        <div>
                                            <MyButton tooltip="Editar Carteira"
                                                onClickButton={props.openModal}
                                                params={[props.carteiras[index], props.NOVA_CARTEIRA]}
                                                myButtonStyle="default"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-pencil" />}
                                            />
                                            {'   '}
                                            <MyButton tooltip="Visualizar documentos"
                                                onClickButton={props.getDocumentosCarteira}
                                                params={[val, props.carteiras[index].nome, tipo]}
                                                myButtonStyle="default"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-eye" />}
                                            />
                                            {'   '}
                                            <MyButton tooltip="Inserir um novo documento"
                                                onClickButton={props.openModal}
                                                params={[props.carteiras[index].id, props.NOVO_DOCUMENTO]}
                                                myButtonStyle="default"
                                                myButtonClass="color-payement"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-plus" />}
                                            />
                                            {'   '}
                                            <MyButton tooltip="Deletar carteira"
                                                onClickButton={props.openModalDeletar}
                                                params={[
                                                    props.removerCarteira,
                                                    props.DELETAR,
                                                    {
                                                        message:`Deseja deletar a carteira: ${props.carteiras[index].nome}`,
                                                        parameters: val
                                                    }
                                                ]}
                                                myButtonStyle="danger"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-trash" />}
                                            />
                                        </div>
                                    )
                                }}
                            ]}
                            elements={props.carteiras}
                        />
                    :
                        <div className="text-center">{NENHUM_REGISTRO}</div>
                    }
                </Panel>
            </Col>
        </Col>
    )
}

const MonitoraView = props => {
    return (
        <span>
            {renderCardCarteira(props)}
            {renderCardDocumentos(props)}
        </span>
    )
        
}

export default MonitoraView