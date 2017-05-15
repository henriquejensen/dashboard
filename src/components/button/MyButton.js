import React from 'react';
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import { NENHUM_REGISTRO } from "../../constants/utils";

const MyButton = (props) => {
    let tooltip = props.tooltip ? props.tooltip : "";
    let labelButton = props.label ? props.label : "";
    let params = props.params;
    let myButtonClass = props.myButtonClass ? props.myButtonClass : "mapa-button";
    let myButtonStyle = props.myButtonStyle ? props.myButtonStyle : "info";
    let myButtonText = props.myButtonText ? props.myButtonText : <i className='fa fa-search'/>;

    return (
        <span>
            <a data-tip data-for={tooltip}>
                <Button bsStyle={myButtonStyle} className={myButtonClass} onClick={params ? () => props.onClickButton(...params) : props.onClickButton}>
                    {myButtonText}
                </Button>
            </a>
            {' '}
            {labelButton}

            <Tooltip id={tooltip}>
                <span>{tooltip}</span>
            </Tooltip>
        </span>
    );
};

export default MyButton;