import React, { Component } from "react";

class Localize extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="container">
				<div className="row">
			        <div className="col-md-6">
			    		<h2>Custom search field</h2>
			            <div id="custom-search-input">
			                <div className="input-group col-md-12">
			                    <input type="text" className="form-control input-lg" placeholder="Buscar" />
			                    <span className="input-group-btn">
			                        <button className="btn btn-info btn-lg" type="button">
			                            <i className="glyphicon glyphicon-search"></i>
			                        </button>
			                    </span>
			                </div>
			            </div>
			        </div>
				</div>
			</div>
		)
	}
}

export default Localize;