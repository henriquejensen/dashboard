import "./MyButton.css"

import React from 'react';
import Tooltip from 'react-tooltip'
import { Button } from "react-bootstrap";

import { NENHUM_REGISTRO } from "../../constants/utils";

const MyButton = (props) => {
    let tooltip = props.tooltip ? props.tooltip : ""
    let labelButton = props.label ? props.label : ""
    let params = props.params // Array com os parametros
    let myButtonClass = props.myButtonClass ? props.myButtonClass : "my-button color-payement"
    let myButtonStyle = props.myButtonStyle
    let myButtonSize = props.myButtonSize
    let myButtonText = props.myButtonText ? props.myButtonText : <i className='fa fa-search'/>
    let type = props.type

    return (
        <span>
            <a data-tip data-for={tooltip}>
                <Button
                    type={type}
                    bsStyle={myButtonStyle}
                    bsSize={myButtonSize}
                    className={myButtonClass}
                    onClick={params ? () => props.onClickButton(...params) : props.onClickButton}>
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