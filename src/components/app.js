import "./app.css"

//612895

import React, { Component } from "react"
import Tooltip from 'react-tooltip'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { browserHistory } from "react-router"
import { Col } from "react-bootstrap"

import Header from "./header"
import Sidebar from "./sidebar"
import Login from "./Login"

//Actions
import { setAuthFromCookie } from "../actions/actionsCommon"

//Constants
import {
    AUTHENTICATION,
    ERROR_401_UNAUTHORIZED,
    LOG_OUT,
    TOOLTIP_SEARCH_BY_ADDRESS,
    TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE,
    TOOLTIP_SEARCH_BY_DOCUMENT,
    TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE,
    TOOLTIP_SEARCH_BY_PHONE,
    TOOLTIP_SEARCH_BY_PHONE_MESSAGE,
    TOOLTIP_SEE_MORE_INFO,
    TOOLTIP_SEE_MORE_INFO_MESSAGE,
    TOOLTIP_SEE_PRODUCT_MODEL,
    TOOLTIP_SEE_PRODUCT_MODEL_MESSAGE,
    TOOLTIP_SEE_PRODUCT_DETAILS,
    TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE
} from "../constants/utils"
import { COMPANY_LOGO, COMPANY_NAME_SHORT } from "../constants/constantsCompany"

class App extends Component {
  state = {
    active: screen.width > 768 ? true : false
  }

	onMenuClicked = () => {
    this.setState({
      active: !this.state.active
    })
  }

  setFeedBack() {
    let feedScript = document.createElement("script")
    feedScript.setAttribute("src", "https://assertiva.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/cr2ot2/b/c/7ebd7d8b8f8cafb14c7b0966803e5701/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=pt-BR&collectorId=0bcba5a0")
      
    document.head.appendChild(feedScript)

    jQuery.ajax({
          url: "https://assertiva.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/cr2ot2/b/c/3d70dff4c40bd20e976d5936642e2171/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector-embededjs.js?locale=pt-BR&collectorId=0bcba5a0",
          type: "get",
          cache: true,
          dataType: "script"
      })
  }

  setChat() {
    let chatScript = document.createElement("script")

    chatScript.setAttribute("src", window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var e=this.createElement("script");n&&(this.domain=n),e.id="js-iframe-async",e.src="https://assets.zendesk.com/embeddable_framework/main.js",this.t=+new Date,this.zendeskHost="assertivasolucoessuporte.zendesk.com",this.zEQueue=a,this.body.appendChild(e)},o.write('<body onload="document._l();">'),o.close()}())
  }

  render() {
      const {logado, message, status} = this.props
      const active = this.state.active

      if(!logado) {
        let authCookie = getUserSessionCookie()
        if(message == LOG_OUT) {
          location.replace("/")
        }
        else if(status === ERROR_401_UNAUTHORIZED)
          return <Login />
        else if(authCookie)
          this.props.setAuthFromCookie(authCookie)
        else
          return <Login />
      }

      if(logado) {
        this.setFeedBack()
        this.setChat()
      }

      return (        
        <div>
            <div className="sidebar noPrint" id={active ? {} : "menu-closed"}>
              <Sidebar onMenuClicked={this.onMenuClicked} activedMenu={active}/>
            </div>

            <Col md={12} className="text-center" id="logo-company-print">
              <img src={COMPANY_LOGO} alt={"Logo da "+COMPANY_NAME_SHORT} />
            </Col>

            <div className="main" id={active ? "menu-opened" : {}}>
              <Header onMenuClicked={this.onMenuClicked} className="noPrint" />
              <div className="my-container">
                {this.props.children}
              </div>  
            </div>


            <Tooltip id={TOOLTIP_SEARCH_BY_DOCUMENT}>
                <span>{TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE}</span>
            </Tooltip>

            <Tooltip id={TOOLTIP_SEE_PRODUCT_MODEL}>
                <span>{TOOLTIP_SEE_PRODUCT_MODEL_MESSAGE}</span>
            </Tooltip>

            <Tooltip id={TOOLTIP_SEARCH_BY_PHONE}>
                <span>{TOOLTIP_SEARCH_BY_PHONE_MESSAGE}</span>
            </Tooltip>

            <Tooltip id={TOOLTIP_SEARCH_BY_ADDRESS}>
                <span>{TOOLTIP_SEARCH_BY_ADDRESS_MESSAGE}</span>
            </Tooltip>

            <Tooltip id={TOOLTIP_SEE_MORE_INFO}>
                <span>{TOOLTIP_SEE_MORE_INFO_MESSAGE}</span>
            </Tooltip>

            <Tooltip id={TOOLTIP_SEE_PRODUCT_DETAILS}>
                <span>{TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE}</span>
            </Tooltip>

            <Tooltip id="tooltipDataNascimento">
              <span>Data de nascimento</span>
            </Tooltip>

        </div>
      )
  }
}

function getUserSessionCookie() {
  try {
    const expression = `${AUTHENTICATION}=.(.*?).;`
    let authorization = document.cookie.match(expression)
    return authorization ? authorization[1].toString() : null
  } catch(e) {
    console.log("Falha na sessão cookie")
  }
}

function mapStateToProps(state) {
	return {
    status: state.auth.status,
		logado: state.auth.logado,
    message: state.auth.msgn
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      setAuthFromCookie
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
