import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Notification from "react-notification-system"

//Actions
import { userEditInfo, userDashboard } from "../../actions/index"
import { requestChangePassword, closeChangePasswordMessage } from "../../actions/actionsCommon"

//Components
import InfoUser from "./InfoUser"
import ImagesUser from "./ImagesUser"
import DashboardUser from "./DashboardUser"

//Constants
import { COMPANY_NAME_SHORT } from "../../constants/constantsCompany"
import { EDIT_USER_PROFILE, EDIT_USER_PROFILE_SUCCESS, SUCCESS } from "../../constants/utils"

class EditUser extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = EDIT_USER_PROFILE + " > " + COMPANY_NAME_SHORT;
    }

    userEditInfo = ({ usuarioNome, usuarioEmail, usuarioTelefone, usuarioImagem, usuarioImagemPreview }) => {
        this._addNotification(EDIT_USER_PROFILE_SUCCESS);
        this.props.userEditInfo(usuarioNome, usuarioEmail, usuarioTelefone, usuarioImagem, usuarioImagemPreview);
    }

    userDashboard = (gadgets, chart) => {
        this._addNotification("Informações do dashboard atualizadas com sucesso");
        this.props.userDashboard(gadgets, chart);
    }

    _addNotification(message) {
        if (this._notificationSystem) {
                this._notificationSystem.addNotification({
                message: message,
                level: SUCCESS.toLocaleLowerCase()
            });
        }
    }

    render() {
        return (
            <div>
                <InfoUser
                    {...this.props}
                    userEditInfo={this.userEditInfo}
                />

                <Notification ref={n => this._notificationSystem = n} />
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
    return bindActionCreators({
        userEditInfo,
        userDashboard,
        requestChangePassword,
        closeChangePasswordMessage
    }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);