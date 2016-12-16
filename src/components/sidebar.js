import React, { Component } from "react";


export default class Sidebar extends Component {
  render() {
      return (
        <nav className="navbar navbar-default sidebar" role="navigation">
            <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home<span  className="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Usuarios <span className="caret"></span><span  className="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></a>
                  <ul className="dropdown-menu forAnimate" role="menu">
                    <li><a href="{{URL::to('createusuario')}}">Crear</a></li>
                    <li><a href="#">Modificar</a></li>
                    <li><a href="#">Reportar</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Informes</a></li>
                  </ul>
                </li>
                <li ><a href="#">Libros<span className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></a></li>
                <li ><a href="#">Tags<span className="pull-right hidden-xs showopacity glyphicon glyphicon-tags"></span></a></li>
              </ul>
            </div>
          </div>
        </nav>
      )
  }
}
