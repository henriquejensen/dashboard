import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Nav, NavItem, NavDropdown, MenuItem, Navbar, Header, Collapse} from "react-bootstrap"

import { logoTopo } from "../constants/imagensAssertiva";
import { logOut } from "../actions/index";


class MenuSuperior extends Component {

  render() {
      return (
		<Navbar style={{backgroundColor:"#5B3494", borderRadius: 0}} inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<img src="../../public/assertiva/assertiva-top-index-inverse.png" alt="Logo da Assertiva" style={{padding: 2}} />
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav pullRight>
					<NavDropdown title="Relatórios" id="basic-nav-dropdown">
						<MenuItem>
							<Link to="/relatorios/consultas">Consultas</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/relatorios/vendamais">Venda+</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/relatorios/basecerta">Base Certa</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/relatorios/sms">SMS</Link>
						</MenuItem>
						<MenuItem divider />
						<MenuItem>
							<Link to="/relatorios">Relatórios</Link>
						</MenuItem>
					</NavDropdown>
					<NavDropdown title={this.props.user.nome} id="basic-nav-dropdown">
						<MenuItem>
							<Link to="/editar">Ajuda</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Atualizar dados</Link>
						</MenuItem>
						<MenuItem>
							<Link to="/editar">Contato</Link>
						</MenuItem>
						<MenuItem divider />
						<MenuItem>
							<Link to="/login" onClick={this.props.logOut}>Sair</Link>
						</MenuItem>
					</NavDropdown>
					<img src={this.props.user.avatar_url} alt="Assertiva" style={{width:"30", position:"absolute", right:4, top:8}} />
				</Nav>
			</Navbar.Collapse>
		</Navbar>
      )
  }
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logOut
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuSuperior);
