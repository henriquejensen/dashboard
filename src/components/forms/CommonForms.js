import React from "react";
import { Form, FormGroup, Col, FormControl, Label, ControlLabel, Button, Radio, Checkbox, HelpBlock } from "react-bootstrap";

export const FieldGroup = (props) => {
    return (
        <FormGroup controlId={props.id} style={{marginLeft:0, marginRight:0}}>
            {props.label ? <ControlLabel>{props.label}</ControlLabel> : ""}
            <FormControl
                required={props.required}
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
            {props.label ? <Col md={12}><ControlLabel>{props.label}</ControlLabel></Col> : ""}
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
            {props.label ? <ControlLabel>{props.label}</ControlLabel> : ""}
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
    let options = props.options; //obrigatorio - array com os checkboxs que serao renderizados
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