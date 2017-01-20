import React, { Component } from "react";

export default class Gadgets extends Component {
    constructor(props) {
        super(props);
    }

    activateGadget(index) {
        const options = [];

        this.props.options.forEach((opt, i) => {
            if(i == index) {
                opt.active = !opt.active;
            }
            options.push(opt);
        })

        this.props.saveOptions(options);
    }

    render() {
        return <div className="text-center">
            <h4 className="col-md-12 text-left">
                Selecione os gadgets a serem mostrados:
            </h4>

            {this.props.options.map((opt, i) => {
                return <div className="col-md-2 col-xs-6" key={i}>
                    <div onClick={this.activateGadget.bind(this, i)} className={opt.active ? "gadget-active" : ""}>
                        <img src={opt.img} className="gadgets-img"/>
                        {opt.name}
                    </div>
                </div>
            })}               

        </div>
    }
}