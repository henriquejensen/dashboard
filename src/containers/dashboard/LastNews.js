import React, { Component } from "react";
import { Link } from "react-router";

export default class LastNews extends Component {
  render() {
    return (
    <div className="col-md-4">
        <div className="row">
            <div className="panel panel-default" id="lastnews">
                <div className="panel-body" style={{backgroundColor:"#44484c"}}>
                    <h3 style={{fontWeight:"bold", color:"white", textAlign:"center", margin:"0"}}>Notícias</h3>

                    <Link to="/" params={{text: "Estudos reportaram uma nova pesquisa para que todos"}} style={{color:"inherit"}}>
                        <div className="noticia-container">
                            <div style={{ paddingRight:"15px"}}>
                                <img src="http://seattlefreepress.org/wp-content/uploads/2015/11/In-the-news-icon.png" />
                            </div>
                            <div style={{fontSize:"11px", color:"white"}}>Estudos reportaram uma nova pesquisa para que todos...</div>
                        </div>
                    </Link>

                    <Link to="/" params={{text: "Estudos reportaram uma nova pesquisa para que todos"}} style={{color:"inherit"}}>
                        <div className="noticia-container">
                            <div style={{ paddingRight:"15px"}}>
                                <img src="https://s3.amazonaws.com/optimisemedia/wp-content/uploads/2015/04/Icon-OptimisePM-WoB-220px.png" />
                            </div>
                            <div style={{fontSize:"11px", color:"white"}}>Estudos reportaram uma nova pesquisa para que todos...</div>
                        </div>
                    </Link>

                    <Link to="/" params={{text: "Estudos reportaram uma nova pesquisa para que todos"}} style={{color:"inherit"}}>
                        <div className="noticia-container">
                            <div style={{ paddingRight:"15px"}}>
                                <img src="http://www.genomesavant.com/p/assets/img/store.png" />
                            </div>
                            <div style={{fontSize:"11px", color:"white"}}>Estudos reportaram uma nova pesquisa para que todos...</div>
                        </div>
                    </Link>

                    <Link to="/" params={{text: "Estudos reportaram uma nova pesquisa para que todos"}} style={{color:"inherit"}}>
                        <div className="noticia-container">
                            <div style={{ paddingRight:"15px"}}>
                                <img src="http://download.seaicons.com/icons/designbolts/free-multimedia/1024/iPhone-icon.png" />
                            </div>
                            <div style={{fontSize:"11px", color:"white"}}>Estudos reportaram uma nova pesquisa para que todos...</div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    </div>
    )
  }
}