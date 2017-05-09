import React from 'react';
import { Col } from 'react-bootstrap';

import { NENHUM_REGISTRO } from "../../constants/utils";

const CardToShowMoreInTable = (props) => {
    return (
        <div>
            {props.elements.map((element, index) => {
                return (
                    <Col md={4} key={index}><strong>{element.label}</strong> {": " + (element.value ? element.value : NENHUM_REGISTRO)}</Col>
                )
            })}
            
        </div>
    );
};

export default CardToShowMoreInTable;