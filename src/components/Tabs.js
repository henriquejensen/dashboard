import React, { Component } from "react";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
    }

    onChangeTab(tab) {
        this.props.onChangeTab(tab)
    }

    render() {
        return (
            <ul className="nav nav-tabs">
                {this.props.tabs.map((tab, index) => {
                    return (
                        <li className={this.props.tabActive == tab.label ? "active": (index == 0 && this.props.tabActive == "" ? "active" : "")} key={index} onClick={() => this.onChangeTab(tab.label)}>
                            <a href={"#"+index}>
                                <img src={"../../public/assertiva/"+tab.icon} width="20" style={{padding: "0px 3px"}}/>{tab.tipo + ": " + tab.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}