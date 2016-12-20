import React, { Component } from "react";


class DualListBox extends Component {
    constructor(props) {
        super(props);
    }

    notInArray(element, elements) {
        
        for(let i=0; i<elements.length; i++) {
            if(elements[i].value == element)
                return false
        }

        return true;
    }

    sendElements() {
        const optionsStageArea = this.props.elements.optionsSelected;
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

        this.props.saveOptions(options, optionsStageArea);
    }

    backElements() {
        const optionsStageArea = this.props.elements.options;
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

        this.props.saveOptions(optionsStageArea, options);
    }

    sendAll() {
        this.props.saveOptions([], this.props.elements.optionsSelected.concat(this.props.elements.options));
    }

    backAll() {
        this.props.saveOptions(this.props.elements.options.concat(this.props.elements.optionsSelected), []);
    }

    render() {
        const options = this.props.elements.options;
        const optionsSelected = this.props.elements.optionsSelected;

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