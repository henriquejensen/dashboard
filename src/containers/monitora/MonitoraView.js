import React from "react"
import { Col } from "react-bootstrap"
import { Link } from "react-router"
import ReactTable from 'react-table'

//Components
import Enderecos from "../../components/endereco/Endereco"
import MyButton from "../../components/button/MyButton"
import Panel from "../../components/panel/Panel"
import Telefones from "../../components/telefone/Telefone"

//Constants
import { NENHUM_REGISTRO } from "../../constants/utils"

const renderCardDocumentos = props => {    
    return (
        <span>
            <Col md={12} className="text-center" style={{marginBottom:15}}>
                <MyButton tooltip="Criar um novo documento"
                    onClickButton={props.openModal}
                    params={[props.carteiras, props.NOVO_DOCUMENTO]}
                    myButtonClass="btn-block color-payement"
                    myButtonText="Novo documento"
                />
            </Col>
            <Col md={12} >
                <Panel title={props.carteiraNome ? `Documentos ` + props.carteiraNome : "Últimos Documentos Atualizados"}>
                    <ReactTable
                        data={props.documentos}
                        noDataText="Nenhum registro encontrado"
                        showPagination={false}
                        pageSize={props.documentos.length}
                        columns={[
                            {
                                Header: 'Status',
                                width: 20,
                                Cell: row => <i style={{borderRadius:5}} className="fa fa-circle-thin" id={row.original.status == "ATIVO" ? "userActivated" : "userDeactivated"} />
                            },
                            {
                                Header: 'Nome',
                                Cell: row => <span>{row.original.nome || row.original.razaoSocial}</span>
                            },
                            {Header: 'Documento', accessor: "documento"},
                            {
                                Header: 'Ações',
                                Cell: element => {
                                    const row = element.original
                                    return (
                                        <div>
                                            <MyButton
                                                tooltip="Visualizar documento"
                                                onClickButton={props.verDocumentoDetalhes}
                                                params={
                                                    [{idCarteira:row.idCarteira, idDocumento:row.id}]
                                                }
                                                myButtonStyle="default"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-eye" />}
                                            />
                                            {'   '}
                                            <MyButton
                                                tooltip="Deletar documento"
                                                onClickButton={props.openModalDeletar}
                                                params={[
                                                    props.removerDocumento,
                                                    props.DELETAR,
                                                    {
                                                        message:`Deseja deletar o documento: ${row.documento}`,
                                                        parameters: {idDocumento:row.id, idCarteira:row.idCarteira, status:"deletado"}
                                                    }
                                                ]}
                                                myButtonStyle="danger"
                                                myButtonClass="mybutton-mini-carteira"
                                                myButtonSize="xsmall"
                                                myButtonText={<i className="fa fa-trash" />}
                                            />
                                        </div>
                                    )
                                }
                            },
                        ]}
                    />
                </Panel>
                <div style={{marginBottom:15}} />
            </Col>

            <Col md={12} className="text-center" style={{marginBottom:15}}>
                <MyButton tooltip="Ver os últimos documentos atualizados"
                    //onClickButton={props.getDocumentos}
                    //params={[0]}
                    myButtonClass="btn-block"
                    myButtonText="Últimos Documentos"
                />
            </Col>
        </span>
    )
}

const renderCardCarteira = props => {
    return (
        <span>
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
                    <ReactTable
                        data={props.carteiras}
                        noDataText="Nenhum registro encontrado"
                        showPagination={false}
                        pageSize={props.carteiras.length}
                        columns={[
                            {
                                Header: 'Status',
                                width: 20,
                                Cell: row => <i style={{borderRadius:5}} className="fa fa-circle-thin" id={row.original.status == "ATIVO" ? "userActivated" : "userDeactivated"} />
                            },
                            {Header: 'Freq. (dias)', accessor: "frequenciaConsulta"},
                            {Header: 'Nome', accessor: "nome"},
                            {Header: 'Qtd', accessor: "quantidadeDocumentos"},
                            {Header: 'Ações', Cell: element => {
                                const row = element.original
                                const tipo = row.tipoConsultaPf ? "CPF" : "CNPJ"
                                
                                return (
                                    <div>
                                        <MyButton tooltip="Editar Carteira"
                                            onClickButton={props.openModal}
                                            params={[row, props.NOVA_CARTEIRA]}
                                            myButtonStyle="default"
                                            myButtonClass="mybutton-mini-carteira"
                                            myButtonSize="xsmall"
                                            myButtonText={<i className="fa fa-pencil" />}
                                        />
                                        {'   '}
                                        <MyButton tooltip="Visualizar documentos"
                                            onClickButton={props.getDocumentos}
                                            params={[row.id, row.nome, tipo]}
                                            myButtonStyle="default"
                                            myButtonClass="mybutton-mini-carteira"
                                            myButtonSize="xsmall"
                                            myButtonText={<i className="fa fa-eye" />}
                                        />
                                        {'   '}
                                        <MyButton tooltip="Inserir um novo documento"
                                            onClickButton={props.openModal}
                                            params={[row.id, props.NOVO_DOCUMENTO]}
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
                                                    message:`Deseja deletar a carteira: ${row.nome}`,
                                                    parameters: row.id
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
                    />
                </Panel>
            </Col>
        </span>
    )
}

const renderDocumentosDetails = props => {
    let nome = props.documentosDetalhes[0] || {}
    nome = nome.nome || nome.razaoSocial
    return (
        <span>
            <Col md={12} sm={12} style={{padding:0, marginBottom:15}}>
                <span style={{fontSize:16}}><strong>Consultas realizadas:</strong> {nome} </span>

                <MyButton  tooltip="Voltar para a tela principal"
                    onClickButton={props.voltarTelaPrincipal}
                    myButtonSize="sm"
                    myButtonStyle="default"
                    myButtonClass="pull-right"
                    myButtonText="Voltar"
                />
            </Col>

            <Col md={12} style={{padding:0}}> 
                <Panel >
                    <ReactTable
                        data={props.documentosDetalhes}
                        noDataText="Nenhum registro encontrado"
                        showPagination={false}
                        pageSize={props.documentosDetalhes.length}
                        SubComponent={row => {
                            return (
                                <div>
                                    <Col md={12} style={{marginBottom:15}}>
                                        <Telefones telefones={{fixos:row.original.telefones}} />
                                    </Col>
                                    <Col md={12}>
                                        <Enderecos enderecos={row.original.enderecos} />
                                    </Col>
                                </div>
                            )
                        }}
                        columns={[
                            {Header: 'Ações', accessor: "acoes", minWidth:15},
                            {Header: 'Cheques S/ Fundo', accessor: "chequesSemFundo", minWidth:15},
                            {Header: 'Débitos', accessor: "debitos", minWidth:15},
                            {Header: 'Gasto', accessor: "gastoEstimado", minWidth:15},
                            {Header: 'Limite Sugerido', accessor: "limiteSugerido", minWidth:15},
                            {Header: 'Participação empresas', accessor: "participacaoEmpresas", minWidth:15},
                            {Header: 'Protestos', accessor: "protestos", minWidth:15},
                            {Header: 'Renda', accessor: "rendaPresumida", minWidth:15},
                            {Header: 'Score 3 meses', accessor: "score3Meses", minWidth:15},
                            {Header: 'Score 12 meses', accessor: "score12Meses", minWidth:15}
                        ]}
                    />
                </Panel>
            </Col>
        </span>
    )
}

const MonitoraView = props => {
    if(props.showDocumentosDetalhes) {
        return (
            <Col md={12} style={{padding:0}}>
                {renderDocumentosDetails(props)}
            </Col>
        )
    }
    return (
        <span>
            <Col md={6} style={{padding:0}}>
                {renderCardCarteira(props)}
            </Col>

            <Col md={6} style={{padding:0}}>
                {renderCardDocumentos(props)}
            </Col>
        </span>
    )
        
}

export default MonitoraView