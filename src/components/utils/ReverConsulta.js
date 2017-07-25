import React from 'react'
import { Alert, Col } from "react-bootstrap"

import Panel from "../panel/Panel"

import { MESSAGE_REVER_CONSULTA } from "../../constants/utils"

const ReverConsultaMessage = () => {
    return (
        <Panel>
            <Alert bsStyle="warning" className="text-center" style={{marginBottom:0}}>
                {MESSAGE_REVER_CONSULTA}
            </Alert>
        </Panel>
    );
};

export default ReverConsultaMessage