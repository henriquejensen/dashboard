import React, { Component } from "react";
import Tooltip from 'react-tooltip';
import { Col, FormGroup, Row, Alert } from "react-bootstrap";

import { SelectGroup } from "../../components/forms/CommonForms";
import MyButton from "../button/MyButton";

import {
    ERR_CONNECTION_REFUSED,
    REQUEST_ERROR,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEE_PRODUCT_MODEL_MESSAGE,
    TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE,
    RECHECK_MESSAGE
} from "../../constants/utils";
import { COMPANY_PRODUCT_LOCALIZE_URL_SEE_DETAILS } from "../../constants/constantsCompany";

export default class Form extends Component {

	renderButton = (tooltip, params, myButtonClass, myButtonStyle, myButtonText, onClickButton, type) => {
		return (
			<FormGroup>
				<MyButton
					tooltip={tooltip}
					params={params}
					myButtonClass={myButtonClass}
					myButtonStyle={myButtonStyle}
					myButtonText={myButtonText}
					type={type}
					onClickButton={onClickButton}					
				/>
			</FormGroup>
		)
	}

    render() {
		return (
            <Row className="noPrint my-container-form-product">
                <Col md={12} sm={12} className="text-center">
                    <img src={this.props.logo} />
                </Col>
                
                <span id="input-fields">
                    <form onSubmit={this.props.onformSubmit}>
                        {this.props.options ? 
                            <Col md={2}>
                                <select
                                    className="form-control"
                                    onChange={this.props.onChange}
                                    value={this.props.type}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {this.props.options.map((opt,i) => {
                                        return <option value={opt.id.toUpperCase()} key={i}>{opt.label}</option>
                                    })}
                                </select>
                            </Col>
                        : ""}

                        {this.props.children}

                        <Col md={1}>
                            {this.renderButton(TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, "", "my-btn-form input-search", "", "", "", "submit")}
                        </Col>
                            
                        <Col md={1}>
                            {this.renderButton(TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, "", "my-btn-form input-search", "default", <i className="fa fa-list-ul" aria-hidden="true"></i>, this.props.seeModelo, "")}
                        </Col>

                        <Col md={1}>
                            {this.renderButton(TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE, "" , "my-btn-form input-search", "warning", <i className="fa fa-question" aria-hidden="true"></i>, () => window.open(COMPANY_PRODUCT_LOCALIZE_URL_SEE_DETAILS,"_blank"), "")}
                        </Col>

                        {this.props.buscaAvancada != undefined ?
                            <span className="busca-avancada" onClick={this.props.hiddenBuscaAvancada}>{!this.props.buscaAvancada ? 'Busca avançada' : 'Fechar busca'}</span>
                        : ""}

                        {this.props.moreInfoToShow}

                    </form>
                </span>

                {this.props.status == REQUEST_ERROR || this.props.status == ERR_CONNECTION_REFUSED ?
                    <Col md={12} sm={12}> 
                        <Alert bsStyle="danger" className="text-center" onDismiss={this.props.closeMessageError}>
                            {this.props.message}
                        </Alert>
                    </Col>
                : ""}

				{this.props.showLogo ?
                    <Col md={12} sm={12}>
                        <Alert bsStyle="warning" className="text-center">
                            {RECHECK_MESSAGE}
                        </Alert>
                    </Col>
				: ""}
            </Row>
        )
    }
}