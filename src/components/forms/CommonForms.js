import React from "react";
import { Form, FormGroup, Col, FormControl, Label, ControlLabel, Button, Radio, Checkbox, HelpBlock } from "react-bootstrap";

export const FieldGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                type={props.type}
                style={props.error ? {borderColor:"red"} : {}}
                name={props.name}
                value={props.value ? props.value : undefined}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            <HelpBlock>{props.message}</HelpBlock>
        </FormGroup>
    )
}

export const SelectGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                name={props.name}
                componentClass={props.type}
                onChange={props.onChange}
            >
                {props.options.map((opt, index) => {
                    return <option key={index} selected={props.value == opt} value={opt}>{opt}</option>
                })}
            </FormControl>
        </FormGroup>
    )
}

export const RadioGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            <Col md={12}><ControlLabel>{props.label}</ControlLabel></Col>
            <Col md={6}>
                <Radio onClick={() => props.onChangeRadio(props.id,"SIM")} checked={props.fieldChecked == "SIM" ? true : false}>
                    SIM
                </Radio>
            </Col>
            <Col md={6} >
                <Radio inline onClick={() => props.onChangeRadio(props.id,"NAO")} checked={props.fieldChecked == "NAO" ? true : false}>
                    NAO
                </Radio>
            </Col>
        </FormGroup>
    )
}

export const RadioGroupGeneric = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            <Col md={12}><ControlLabel>{props.label}</ControlLabel></Col>
            {props.datas.map((data,index) => {
                return (
                    <Col md={props.colRadio} key={index}>
                        <Radio onClick={(evt) => props.onChange(index, evt.target.name)} name={props.id} checked={data.checked}>
                            {data.info}
                        </Radio>
                    </Col>
                )
            })}
        </FormGroup>
    )
}

export const TextAreaGroup = (props) => {
    return (
        <FormGroup controlId={props.id}>
            <ControlLabel>{props.label}</ControlLabel>
            <FormControl
                style={props.error ? {borderColor:"red"} : {}}
                componentClass="textarea"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange} />
            <HelpBlock>{props.message}</HelpBlock>
        </FormGroup>
    )
}

export const CheckboxGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}} className={props.center ? "text-center": ""}>
            <ControlLabel>{props.label}</ControlLabel><br/>
            <Checkbox inline={props.inline} checked={props.checked}>
                {props.text}
            </Checkbox>

        </FormGroup>
    )
}