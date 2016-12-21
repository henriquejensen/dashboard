import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { userEditInfo, userDashboard } from "../../actions/index";

import InfoUser from "./InfoUser";
import ImagesUser from "./ImagesUser";
import DashboardUser from "./DashboardUser";

class EditUser extends Component {
    constructor(props) {
        super(props);
    }

	componentDidMount() {
		document.title = "Assertiva > Editar Usuário";
	}

    render() {
        return (
            <div className="container">
                <div>
                    <InfoUser user={this.props.user} userEditInfo={this.props.userEditInfo} />
                    <ImagesUser user={this.props.user} userEditInfo={this.props.userEditInfo} />
                </div>
                
                <DashboardUser user={this.props.user} userDashboard={this.props.userDashboard} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispacth) {
    return bindActionCreators({ userEditInfo, userDashboard }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);