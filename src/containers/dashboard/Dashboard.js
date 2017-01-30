import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import { connect } from "react-redux";
import { Col, Media } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router";

import { searchLocalize } from "../../actions/index";

import Panel from "../../components/panel/Panel";

import Clock from "./Clock";
import Calendar from "./Calendar";
import Weather from "./Weather";
import LastNews from "./LastNews";
import CardWithTable from "../../components/utils/CardWithTable";
import CardInfo from "../../components/utils/CardInfo";
import CardWithGraph from "../../components/utils/CardWithGraph";

const style = {
	alignTable: {
		verticalAlign: "middle"
	}
}

class Dashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			tabActive: ""
		}

		this.renderInfo = this.renderInfo.bind(this);
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
								<Line
									data={this.props.data.localize}
									options={{
										responsive:true,
									}}/>
							</div>
						</div>
					} else if(opt.label == "Crédito"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#2" ? "tab-pane active" : "tab-pane"} id="#2" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.credito} options={{responsive:true}}/>
							</div>
						</div>
					} else if(opt.label == "Veículos"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#3" ? "tab-pane active" : "tab-pane"} id="#3" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.veiculos} options={{responsive:true}}/>
							</div>
						</div>
					} else if(opt.label == "SMS"){
						return <div className={this.state.tabActive =="" && index == 0 ? "tab-pane active" : this.state.tabActive == "#4" ? "tab-pane active" : "tab-pane"} id="#4" key={index}>
							<div className="col-md-12">
								<Line data={this.props.data.sms} options={{responsive:true}}/>
							</div>
						</div>
					}
				})}
			</div>
	}

	panelChart(){
		return (
			<div>
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

			</div>
		)
	}

	renderInfo() {
		return (
			<div></div>
		)
	}

	render() {
		return (
			<div>
				<Col md={8}>
					<CardWithTable title="GRÁFICOS DE USO">
						<tbody>
							{this.panelChart()}
						</tbody>
					</CardWithTable>

					<CardWithGraph
						title="INFORMAÇÕES DE ACESSO E SEGURANÇA"
						info = {this.props.user.produto.acessoSeguranca}
					/>

					<CardWithGraph
						title="TOTAL DE CONSULTAS"
						info = {this.props.user.produto.totalConsultas}

					/>

					<CardInfo
						title="INFORMAÇÕES DO LOCALIZE"
						info = {this.props.user.produto.localize}
					/>

					<CardInfo
						title="INFORMAÇÕES DO CRÉDITO"
						info = {this.props.user.produto.credito}
					/>						

				</Col>

				<Col md={4}>
					<CardWithTable title="ÚLTIMAS CONSULTAS">
						<tbody>
							{this.props.user.ultimasConsultas ?
								this.props.user.ultimasConsultas.map((consulta,index) =>{
									return (
										<tr key={index}>
											<td style={style.alignTable}>
												<img src={consulta.logo} width={30} />
											</td>
											<td style={style.alignTable}>{consulta.tipoDocumento}</td>
											<td style={style.alignTable}>{consulta.documento}</td>
											<td>
												<Link to={"/"+consulta.produto} data-tip data-for='tooltipConsultar'>
													<div className="mapa-button" onClick={() => this.props.searchLocalize(consulta.documento, consulta.tipo)}>
														<i className='fa fa-search'/>
													</div>
												</Link>
											</td>
										</tr>
									)
								})
							: 
								<div className="text-center">Nenhum dado encontrado</div>}
						</tbody>
					</CardWithTable>

					<CardWithTable
						title="ÚLTIMOS ACESSOS"
						fields={this.props.user.ultimosAcessos ? ["Horário", "IP de Acesso"] : []}>
						<tbody>
							{this.props.user.ultimosAcessos ?
								this.props.user.ultimosAcessos.map((acesso,index) =>{
									return (
										<tr key={index}>
											<td>{acesso.dataHora}</td>
											<td>{acesso.ip}</td>
										</tr>
									)
								})
							: 
								<div className="text-center">Nenhum dado encontrado</div>}
						</tbody>
					</CardWithTable>

					<CardWithTable title="PRODUTOS MAIS UTILIZADOS">
						<tbody>
							{this.props.user.produtosMaisUtilizados ?
								this.props.user.produtosMaisUtilizados.map((produto,index) =>{
									return (
										<tr key={index}>
											<td style={style.alignTable}>
												<img src={produto.logo} width={30} />
											</td>
											<td style={style.alignTable}>
												<Link to={"/"+produto.produto+"/"+produto.tipoDocumento.toLowerCase()} >
													{produto.produto + " consulta por " + produto.tipoDocumento} 
												</Link>
											</td>
										</tr>
									)
								})
							: 
								<div className="text-center">Nenhum dado encontrado</div>}
						</tbody>
					</CardWithTable>

					<CardWithTable title="ÚLTIMAS NOTÍCIAS">
						<Col sm={12}>
							<Media>
								<Media.Left>
									<img width={64} height={64} src="http://www.pd4pic.com/images/newspaper-news-journal-headline-article-paper.png" alt="Image"/>
								</Media.Left>
								<Media.Body>
									<a href="http://assertivasolucoes.com.br/quem-somos" target="_blank">
										<Media.Heading>USE O ASSERTIVA LOCALIZE PARA VALIDAR DADOS DE PESSOAS</Media.Heading>
										<p>Além de ser uma ótima forma de localizar pessoas e empresas de todo o Brasil, o Assertiva Localize...</p>
									</a>
								</Media.Body>
							</Media>
						</Col>
						<Col sm={12}>
							<Media>
								<Media.Left>
									<img width={64} height={64} src="http://www.pd4pic.com/images/newspaper-news-journal-headline-article-paper.png" alt="Image"/>
								</Media.Left>
								<Media.Body>
									<a href="http://assertivasolucoes.com.br/quem-somos" target="_blank">
										<Media.Heading>PERDEU A 1ª VIA DO SEU BOLETO DA ASSERTIVA?</Media.Heading>
										<p>Caso você tenha perdido a primeira via do seu boleto de pagamento da Assertiva, não se preocupe...</p>
									</a>
								</Media.Body>
							</Media>
						</Col>
						<Col sm={12}>
							<Media>
								<Media.Left>
									<img width={64} height={64} src="http://www.pd4pic.com/images/newspaper-news-journal-headline-article-paper.png" alt="Image"/>
								</Media.Left>
								<Media.Body>
									<a href="http://assertivasolucoes.com.br/quem-somos" target="_blank">
										<Media.Heading>Media Heading</Media.Heading>
										<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque</p>
									</a>
								</Media.Body>
							</Media>
						</Col>
					</CardWithTable>
				</Col>
				
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			searchLocalize,
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);