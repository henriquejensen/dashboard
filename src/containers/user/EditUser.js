import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Notification from "react-notification-system";

import { userEditInfo, userDashboard } from "../../actions/index";

import InfoUser from "./InfoUser";
import ImagesUser from "./ImagesUser";
import DashboardUser from "./DashboardUser";

class EditUser extends Component {
    constructor(props) {
        super(props);

        this._notificationSystem = null;

        this.userEditInfo = this.userEditInfo.bind(this);
        this.userDashboard = this.userDashboard.bind(this);
    }

	componentDidMount() {
		document.title = "Editar Usuário > Assertiva";
	}

    userEditInfo(nome, email, telefone) {
        this._addNotification("Informações do usuário atualizadas com sucesso");
        this.props.userEditInfo(nome, email, telefone);
    }

    userDashboard(gadgets, chart) {
        this._addNotification("Informações do dashboard atualizadas com sucesso");
        this.props.userDashboard(gadgets, chart);
    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: 'success'
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div>
                    <InfoUser user={this.props.user} userEditInfo={this.userEditInfo} />
                    <ImagesUser user={this.props.user} userEditInfo={this.userEditInfo} />
                </div>
                
                <DashboardUser user={this.props.user} userDashboard={this.userDashboard} />

                <Notification ref={n => this._notificationSystem = n} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("STATE", state)
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispacth) {
    return bindActionCreators({ userEditInfo, userDashboard }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);