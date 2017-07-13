import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Alert, Col } from "react-bootstrap"

//Actions
import { closeMessageUser, loadingUserScreen, userEditInfo, userDashboard } from "../../actions/index"
import { requestChangePassword, closeChangePasswordMessage } from "../../actions/actionsCommon"

//Components
import InfoUser from "./InfoUser"
import ImagesUser from "./ImagesUser"
import DashboardUser from "./DashboardUser"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen"

//Constants
import { COMPANY_NAME_SHORT } from "../../constants/constantsCompany"
import { EDIT_USER_PROFILE, EDIT_USER_PROFILE_SUCCESS, SUCCESS } from "../../constants/utils"

class EditUser extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = EDIT_USER_PROFILE + " > " + COMPANY_NAME_SHORT
    }

    userEditInfo = ({ usuarioNome, usuarioEmail2, usuarioTelefone, usuarioFoto, usuarioImagemPreview }) => {
        this.props.loadingUserScreen()
        this.props.userEditInfo({ usuarioNome, usuarioEmail2, usuarioTelefone, usuarioFoto, usuarioImagemPreview })
    }

    render() {
        const {status, message, loading} = this.props
        return (
            <div>
                {loading ? <LoadingScreen /> : ""}

                {status ?
                    <Col md={12}>
                        <Alert
                            bsStyle={status === SUCCESS ? "success" : "danger"}
                            className="text-center"
                            onDismiss={this.props.closeMessageUser}
                        >
                            {message}
                        </Alert>
                    </Col>
                : ""}

                <InfoUser
                    {...this.props}
                    userEditInfo={this.userEditInfo}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        status: state.user.status,
        message: state.user.message,
        loading: state.user.loading
    }
}

function mapDispatchToProps(dispacth) {
    return bindActionCreators({
        closeMessageUser,
        closeChangePasswordMessage,
        loadingUserScreen,
        userEditInfo,
        userDashboard,
        requestChangePassword,
    }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);