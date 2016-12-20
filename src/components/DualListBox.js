import React, { Component } from "react";


class DualListBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {value: "localize", label: "Localize"},
                {value: "credito", label: "Crédito"},
                {value: "veiculos", label: "Veículos"},
                {value: "sms", label: "SMS"}
            ],
            optionsSelected: [],
        }
    }

    notInArray(element, elements) {
        
        for(let i=0; i<elements.length; i++) {
            if(elements[i].value == element)
                return false
        }

        return true;
    }

    sendElements() {
        const optionsStageArea = this.state.optionsSelected;
        const options = [];
        const elements = this.refs.dualListSelect;

        for(let i=0; i<elements.length ;i++) {
            if(elements[i].selected == true) {
                if(this.notInArray(elements[i].value, optionsStageArea))
                    optionsStageArea.push({value: elements[i].value, label:elements[i].label});
            } else {
                options.push({value: elements[i].value, label:elements[i].label});
            }
        }

        this.setState({
            options: options,
            optionsSelected: optionsStageArea
        })
    }

    backElements() {
        const optionsStageArea = this.state.options;
        const options = [];
        const elements = this.refs.dualListSelected;

        for(let i=0; i<elements.length ;i++) {
            if(elements[i].selected == true) {
                if(this.notInArray(elements[i].value, optionsStageArea))
                    optionsStageArea.push({value: elements[i].value, label:elements[i].label});
            } else {
                options.push({value: elements[i].value, label:elements[i].label});
            }
        }

        this.setState({
            options: optionsStageArea,
            optionsSelected: options
        })
    }

    sendAll() {
        this.setState({
            options: [],
            optionsSelected: this.state.optionsSelected.concat(this.state.options),
        })
    }

    backAll() {
        this.setState({
            options: this.state.options.concat(this.state.optionsSelected),
            optionsSelected: []
        })
    }

    render() {
        const options = this.state.options;
        const optionsSelected = this.state.optionsSelected;

        return <div>
            <div className="col-md-5">
                <select
                    multiple
                    className="dual-list-select"
                    ref="dualListSelect"
                >
                
                    {options.map((opt,i) => {
                        return <option value={opt.value} key={i}> {opt.label} </option>
                    })}                    

                </select>
            </div>

            <div className="col-md-2" >
                <div
                    className="col-md-12 arrow-select"
                    onClick={this.sendElements.bind(this)}>
                    <i className="glyphicon glyphicon-chevron-right" />
                </div>

                <div
                    className="col-md-12 arrow-select"
                    onClick={this.backElements.bind(this)}>
                    <i className="glyphicon glyphicon-chevron-left" />
                </div>

                <div
                    className="col-md-12 arrow-select"
                    onClick={this.sendAll.bind(this)}>
                    <i className="glyphicon glyphicon-chevron-right" />
                    <i className="glyphicon glyphicon-chevron-right" />
                </div>

                <div
                    className="col-md-12 arrow-select"
                    onClick={this.backAll.bind(this)}>
                    <i className="glyphicon glyphicon-chevron-left" />
                    <i className="glyphicon glyphicon-chevron-left" />
                </div>
            </div>

            <div className="col-md-5">
                <select
                    multiple
                    className="dual-list-select"
                    ref="dualListSelected"
                >

                    {optionsSelected.map((opt,i) => {
                        return <option value={opt.value} key={i}> {opt.label} </option>
                    })}  

                </select>
            </div>
        </div>
    }
}

export default DualListBox;