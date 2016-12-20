import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { userEditInfo } from "../../actions/index";

import InfoUser from "./InfoUser";
import DashboardUser from "./DashboardUser";

class EditUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <InfoUser user={this.props.user} userEditInfo={this.props.userEditInfo} />
                <DashboardUser user={this.props.user} />
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
    return bindActionCreators({ userEditInfo }, dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);