import React, { Component} from "react";

import Gadgets from "./Gadgets";
import DualListBox from '../../components/DualListBox';

export default class DashboardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gadgets: this.props.user.gadgets,
            charts: this.props.user.charts
        }

        this.saveGadgets = this.saveGadgets.bind(this);
        this.saveCharts = this.saveCharts.bind(this);
        this.sendDashboardUser = this.sendDashboardUser.bind(this);
    }

    sendDashboardUser() {
        this.props.userDashboard(this.state.gadgets, this.state.charts);
    }

    saveGadgets(gadgets) {
        this.setState({
            gadgets: gadgets
        })
    }

    saveCharts(opt, optSelected) {
        const charts = {
            options: opt,
            optionsSelected: optSelected
        };

        this.setState({
            charts: charts
        })
    }

    render() {
        return <div>
                <div className="col-md-7">
                   <div className="panel panel-default">
                        <div className="panel-heading text-center">
                            PREFERÊNCIAS DASHBOARD
                        </div>
                        <div className="panel-body">
                            <div>
                                <Gadgets options={this.state.gadgets} saveOptions={this.saveGadgets} />
                            </div>

                            <div>
                                <h4 className="col-md-12">Gráficos de uso diário</h4>

                                <DualListBox elements={this.state.charts} saveOptions={this.saveCharts}/>
                            </div>

                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <button className="btn btn-primary pull-right" type="submit" onClick={this.sendDashboardUser}>Atualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
}