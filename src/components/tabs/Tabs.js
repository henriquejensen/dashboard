import React, { Component } from "react";

export default class Tabs extends Component {
    render() {
        return (
            <ul className="nav nav-tabs">
                {this.props.tabs.map((tab, index) => {
                    return (
                        <li className={this.props.tabActive == tab.label ? "active": (index == 0 && this.props.tabActive == "" ? "active" : "")} key={index}>
                            {this.props.tabs.length > 1 ? <i className="fa fa-times close-tab" onClick={() => this.props.onClose(index)}/> : ""}
                            <a href={"#"+index} onClick={() => this.props.onChangeTab(tab.label)}>
                                <img src={tab.icon} width="25" style={{padding: "0px 3px"}}/>{tab.tipo + ": " + tab.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}