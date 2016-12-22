import React, { Component } from "react";

export default class Filtro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-12">
                <h4>{this.props.title}</h4>

                {this.props.inputs.map((input) => {
                    return <input
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        placeholder={input.placeholder}/>
                })}

                <button className="btn btn-primary btn-block">{this.props.titleBtn}</button>
            </div>
        )
    }
}