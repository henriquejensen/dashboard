import React, { Component } from "react";
import { searchLocalize } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Localize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			tabActive: ""
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.onChangeDocumento = this.onChangeDocumento.bind(this);
		this.renderSearch = this.renderSearch.bind(this);
		this.changeTab = this.changeTab.bind(this);
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		this.props.searchLocalize(this.state.documento);
	}

	onChangeDocumento(evt) {
		this.setState({
			documento: evt.target.value,
		})
	}

	changeTab(evt) {
		this.setState({
			tabActive: evt.target.innerHTML
		})
	}

	renderTabs() {
		return this.props.data.map((data, index) => {
				return (
					<li className={data.id == this.state.tabActive ? "active": (index == 0 && this.state.tabActive == "" ? "active" : "")} key={index} data-toggle="tab" onClick={this.changeTab}>
						<a href={"#"+index}>
			    		{data.id}
						</a>
			 		</li>)}
				)		
	}

	renderSearch() {
		return this.props.data.map((data, index) => {
				return (
					<div className={data.id == this.state.tabActive ? "tab-pane active": (index == 0 && this.state.tabActive == "" ? "tab-pane active" : "tab-pane")} id={data.id} key={index}>
						<div className="panel-group"  >
							<div className="panel panel-default">
						  	<div className="panel-heading text-center">Dados</div>
						    <div className="panel-body">
						    	{data.id}
						    	<p>{data.login}</p>
						    	<p><a href={data.html_url} target="_blank">{data.html_url}</a></p>
						    </div>
					  	</div>
					  </div>
					</div>
					)}
				)		
	}

	render() {
		return(
			<div className="container">
				<div className="row text-center">
						<div className="col-md-12">
							{this.props.data.length > 0 ? <img src="http://portal.assertivasolucoes.com.br/app/onway/imagens/logo-localize.png" />: ""}
			      </div>
            <div className="col-md-12">
              <form className="form-inline" onSubmit={this.onLocalizeSubmit}>
              	<select className="form-control">
              		<option value="CPF">CPF</option>
              		<option value="CNPJ">CNPJ</option>
              		<option value="NOME">NOME</option>
              		<option value="ENDERECO">ENDERECO</option>
              	</select>

                <input
                	value={this.state.documento}
                	type="text"
                	className="form-control"
                	placeholder="Buscar"
                	onChange={this.onChangeDocumento}/>

                <button className="btn btn-info" type="submit">
                	<i className="glyphicon glyphicon-search"></i>
                </button>
              </form>
            </div>
				</div>

				<div className="panel-heading text-center">
					<ul className="nav nav-tabs">
						{this.renderTabs()}
					</ul>
				</div>

				<div className="tab-content">
					{this.renderSearch()}
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		data: state.localize
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({ searchLocalize }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(Localize);