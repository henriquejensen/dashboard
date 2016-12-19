import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoUser from "./InfoUser";
import DashboardUser from "./DashboardUser";

class EditUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <InfoUser user={this.props.user} />
                <DashboardUser user={this.props.user} />
                {this.props.user.nome}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(EditUser);