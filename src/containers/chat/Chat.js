import React, { Component } from "react";
import { connect } from "react-redux";

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <span className="glyphicon glyphicon-comment"></span> Chat
                            </div>
                            <div className="panel-body chat-panel-body">
                                <ul className="chat">
                                    {this.props.user.mensagens.mensagens.map((msgn, index) =>{
                                        if(msgn[0] == 1) {
                                             return  <li className="left clearfix" key={index}>
                                                        <span className="chat-img pull-left">
                                                            <img src={this.props.user.mensagens.friend_url} alt="User Avatar" width="40"/>
                                                        </span>
                                                        <div className="chat-body clearfix">
                                                            <div className="header">
                                                                <strong className="primary-font">{this.props.user.mensagens.friend}</strong>
                                                            </div>
                                                            <p>
                                                                {msgn}
                                                            </p>
                                                        </div>
                                                    </li>
                                          } else {
                                              return <li className="right clearfix" key={index}>
                                                        <span className="chat-img pull-right">
                                                            <img src={this.props.user.avatar_url} alt="User Avatar" width="40" />
                                                        </span>
                                                        <div className="chat-body clearfix">
                                                            <div className="header">
                                                                <strong className="pull-right primary-font">{this.props.user.nome}</strong>
                                                            </div>
                                                            <p>
                                                                {msgn}
                                                            </p>
                                                        </div>
                                                    </li>
                                          }
                                        
                                    })}
                                    
                                </ul>
                            </div>
                            <div className="panel-footer">
                                <div className="input-group">
                                    <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." />
                                    <span className="input-group-btn">
                                        <button className="btn btn-warning btn-sm" id="btn-chat">
                                            Enviar
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Chat);