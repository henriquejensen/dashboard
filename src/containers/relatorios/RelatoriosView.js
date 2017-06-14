import React from 'react';
import { Link } from "react-router"

//Components
import CardWithTable from "../../components/card/CardWithTable";

const RelatoriosView = props => {
    return (
        <span>
            <CardWithTable title="LISTA DE RELATÓRIOS"
                fields={
                    [
                        {id:"tipo", name:"Tipo"},
                        {id:"descricao", name:"Descrição"},
                        {id:"id", name:"Extrair", functionToApply: (val, indexRow) => {
                            if(props.relatorios[indexRow].tipo === "R12")
                                return <Link to="/consumo">Consultar</Link>
                            return <a href="#" className="no-print" onClick={() => props.showModal(indexRow)}>Extrair</a>
                        }}
                    ]
                }
                rows={props.relatorios}
            />
        </span>
    )
}

export default RelatoriosView;