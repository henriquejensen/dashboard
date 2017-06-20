import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

//Actions
import { requestChangePassword, closeChangePasswordMessage } from "../../actions/actionsCommon"

//Components
import ChangePassword from "../../components/ChangePassword"


class ChangePasswordController extends Component {
    render() {
        return (
            <ChangePassword
                {...this.props}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        cliente: state.user.pessoaDescricao,
        usuario: state.user.usuarioNome,
        status: state.auth.status,
        message: state.auth.msgn
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			requestChangePassword,
            closeChangePasswordMessage
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordController)