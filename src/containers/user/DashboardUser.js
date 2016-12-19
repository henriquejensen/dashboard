import React, { Component} from "react";

import Gadgets from "./Gadgets";
import DualListBox from '../../components/DualListBox';

export default class DashboardUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="row">
                <div className="col-md-12">
                   <div className="panel panel-default">
                        <div className="panel-heading text-center">
                            PREFERÊNCIAS DASHBOARD
                        </div>
                        <div className="panel-body">
                            <div>
                                <Gadgets />
                            </div>

                            <div>
                                <h4 className="col-md-12">Gráficos de uso diário</h4>

                                <DualListBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
}