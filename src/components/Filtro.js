import React, { Component } from "react";

export default class Filtro extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-12">
                <h4>{this.props.title}</h4>

                {this.props.inputs.map((input, index) => {
                    return <input
                        key={index}
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        placeholder={input.placeholder}/>
                })}

                <button className="btn btn-info btn-block">{this.props.titleBtn}</button>
            </div>
        )
    }
}