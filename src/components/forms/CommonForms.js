import React from "react"
import DatePicker from 'react-datepicker'
import { Form, FormGroup, Col, FormControl, Label, ControlLabel, Button, Radio, Checkbox, HelpBlock } from "react-bootstrap"

import 'react-datepicker/dist/react-datepicker.css'

export const MyFieldGroup = (props) => {
    let { id, bsSize, label, required, type, error, name, accept, value, placeholder, onChange, message, inputStyle } = props
    inputStyle ? inputStyle : {borderColor:"red"}
    return (
        <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}} bsSize={bsSize} >
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                required={required}
                type={type}
                style={error ? inputStyle : {}}
                name={name}
                accept={accept}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <HelpBlock>{message}</HelpBlock>
        </FormGroup>
    )
}

export const SelectGroup = (props) => {
    let id = props.id; //opcional - id utilizado pelo formgroup para identificacao
    let label = props.label; //opcional - label que identifica os checkbox
    let name = props.name; //opcional - nome de uma checkbox
    let type = props.type ? props.type : "select";
    let onChange = props.onChange; //opcional/obrigatorio - modifica a selecao do checkbox
    let options = props.options; //opcional - array com os checkboxs que serao renderizados
    let value = props.value; //opcional/obrigatorio - valores (true/false ou SIM) que deixam o checkbox selecionado
    return (
        <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}}>
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <FormControl
                name={name}
                componentClass={type}
                onChange={onChange}
            >
                {options.map((opt, index) => {
                    return <option key={index} selected={value == opt} value={opt.value ? opt.value : opt}>{opt.label ? opt.label : opt}</option>
                })}
            </FormControl>
        </FormGroup>
    )
}

export const RadioGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            {props.label ? <Col md={12}><ControlLabel>{props.label}</ControlLabel></Col> : ""}
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
            {props.label ? <Col md={props.colLabel}><ControlLabel>{props.label}</ControlLabel></Col> : ""}
            {props.datas.map((data,index) => {
                return (
                    <Col md={props.colRadio} key={index}>
                        <Radio
                            onClick={(evt) => props.onChange(index, evt.target.name)}
                            name={props.id}
                            checked={data.checked}
                            style={props.style}
                        >
                            {data.info}
                        </Radio>
                    </Col>
                )
            })}
        </FormGroup>
    )
}

export const TextAreaGroup = (props) => {
    let rows = props.rows || "2"
    let cols = props.cols || "20"
    return (
        <FormGroup controlId={props.id}>
            {props.label ? <ControlLabel>{props.label}</ControlLabel> : ""}
                <textarea
                    maxLength={props.maxLength}
                    required={props.required}
                    className="form-control"
                    placeholder={props.placeholder}
                    style={props.error ? {borderColor:"red"} : {}}
                    name={props.name}
                    onChange={props.onChange}
                    rows={rows}
                    cols={cols}
                >
                    {props.value}
                </textarea>

            <HelpBlock>{props.message}</HelpBlock>
        </FormGroup>
    )
}

export const CheckboxGroup = (props) => {
    let id = props.id; //opcional - id utilizado pelo formgroup para identificacao
    let center = props.center; //opcional - centraliza os elementos do checkbox
    let label = props.label; //opcional - label que identifica os checkbox
    let options = props.options; //opcional - array com os checkboxs que serao renderizados
    let inline = props.inline; //opcional - quando se deseja que todos os checkbox fiquem na mesma linha
    let values = props.values; //opcional/obrigatorio - valores (true/false ou SIM) que deixam o checkbox selecionado
    let checked = props.checked; //opcional - utilizado para deixar um simples checkbox ativado
    let text = props.text; //opcional/obrigatorio - texto de um simples checkbox
    let name = props.name; //opcional - nome de uma checkbox
    let onChange = props.onChange; //opcional/obrigatorio - modifica a selecao do checkbox
    return (
        <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}} className={center ? "text-center": ""}>
            {label ? <ControlLabel>{label}<br/></ControlLabel> : ""}
            {options ? 
                options.map((opt,index) => {
                    return (
                        <Checkbox
                            inline={inline}
                            checked={values[index] || values[index] == "SIM"} >
                            {opt}
                        </Checkbox>
                    )
                })
            :
                <Checkbox inline={inline} checked={checked} name={name} onChange={() => onChange(name)}>
                    {text}
                </Checkbox>
            }

        </FormGroup>
    )
}

export const MyCheckboxGroup = (props) => {
    let id = props.id; //opcional - id utilizado pelo formgroup para identificacao
    let center = props.center; //opcional - centraliza os elementos do checkbox
    let label = props.label; //opcional - label que identifica os checkbox
    let options = props.options ? props.options : []; //obrigatorio - array com os checkboxs que serao renderizados
    let onChange = props.onChange; //opcional/obrigatorio - modifica a selecao do checkbox
    return (
        <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}} className={center ? "text-center": ""}>
            {label ? <ControlLabel>{label}<br/></ControlLabel> : ""}
                {options.map((opt,index) => {
                    return (
                        <Checkbox
                            key={index}
                            inline={opt.inline}
                            checked={opt.checked}
                            name={opt.name}
                            onChange={() => onChange(opt.name,index)}>
                            {opt.text}
                        </Checkbox>
                    )
                })}

        </FormGroup>
    )
}

export const DateField = (props) => {
    const { id, bsSize, label, required, placeholder, onChange, startDate } = props
    return (
        <FormGroup controlId={id} style={{marginLeft:0, marginRight:0}} bsSize={bsSize} >
            {label ? <ControlLabel>{label}</ControlLabel> : ""}
            <DatePicker
                required
                className="form-control"
                placeholderText={placeholder}
                selected={startDate}
                dateFormat="DD/MM/YYYY"
                locale="pt-br"
                onChange={onChange}
            />
        </FormGroup>
        
    )
}