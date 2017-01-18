import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import { connect } from "react-redux";

import Panel from "../../components/panel/Panel";

import Clock from "./Clock";
import Calendar from "./Calendar";
import Weather from "./Weather";
import LastNews from "./LastNews";

class Dashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			tabActive: ""
		}
	}

	componentDidMount() {
		document.title = "Assertiva";
	}

	changeTab(tab){
		this.setState({
			tabActive: tab
		})
	}

	renderCharts() {
		return	<div className="tab-content">
				{this.props.user.charts.optionsSelected.map((opt, index) => {
					if(opt.label == "Localize"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#1" ? "tab-pane active" : "tab-pane"} id="#1" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.localize} />
							</div>
						</div>
					} else if(opt.label == "Crédito"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#2" ? "tab-pane active" : "tab-pane"} id="#2" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.credito} />
							</div>
						</div>
					} else if(opt.label == "Veículos"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#3" ? "tab-pane active" : "tab-pane"} id="#3" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.veiculos} />
							</div>
						</div>
					} else if(opt.label == "SMS"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#4" ? "tab-pane active" : "tab-pane"} id="#4" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.sms} />
							</div>
						</div>
					}
				})}
			</div>
	}

	panelChart(){
		return (
			<Panel>
				<ul className="nav nav-tabs">
					{this.props.user.charts.optionsSelected.map((opt, index) => {
						if(opt.label == "Localize"){
							return <li className={this.state.tabActive =="" && index == 0 ? "active" : this.state.tabActive == "#1" ? "active" : ""} onClick={() => this.changeTab("#1")} key={index}>
									<a href={"#1"}>
									{opt.label}
									</a>
								</li>
						} else if(opt.label == "Crédito"){
							return <li className={this.state.tabActive =="" && index == 0 ? "active" : this.state.tabActive == "#2" ? "active" : ""} onClick={() => this.changeTab("#2")} key={index}>
									<a href={"#2"} onClick={() => this.changeTab("#2")}>
									{opt.label}
									</a>
								</li>
						} else if(opt.label == "Veículos"){
							return <li className={this.state.tabActive =="" && index == 0 ? "active" : this.state.tabActive == "#3" ? "active" : ""} onClick={() => this.changeTab("#3")} key={index}>
									<a href={"#3"} onClick={() => this.changeTab("#3")}>
									{opt.label}
									</a>
								</li>
						} else if(opt.label == "SMS"){
							return <li className={this.state.tabActive =="" && index == 0 ? "active" : this.state.tabActive == "#4" ? "active" : ""} onClick={() => this.changeTab("#4")} key={index}>
									<a href={"#4"} onClick={() => this.changeTab("#4")}>
									{opt.label}
									</a>
								</li>
						}
					})}
				</ul>
			
				{this.renderCharts()}
			</Panel>
		)
	}

	render() {
		return (
			<div>
				{this.props.user.charts.optionsSelected.length > 0 ?
					<div className="col-md-8">
						{this.panelChart()}
					</div> : "" }
				
				{this.props.user.gadgets.map((gdt) => {
					if(gdt.name == "Calendário" && gdt.active)
						return <Calendar />
					if(gdt.name == "Relógio" && gdt.active)
						return <Clock />
					if(gdt.name == "Previsão do tempo" && gdt.active)
						return <Weather />
					if(gdt.name == "Últimas notícias" && gdt.active)
						return <LastNews />
				})}
				
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		data: state.chartData,
	}
}

export default connect(mapStateToProps)(Dashboard);