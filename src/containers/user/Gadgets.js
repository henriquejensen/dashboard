import React, { Component } from "react";

export default class Gadgets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {img: "https://www.wlu.edu/images/alumni/icons/calendar.png", name: "Calendário", active: false},
                {img: "http://blog.weecomments.com/wp-content/uploads/2016/05/clock-flat.png", name: "Relógio", active: false},
                {img: "http://img.tuttoandroid.net/wp-content/uploads/2015/05/Wemple-Weather-icon.png", name: "Previsão do tempo", active: false},
                {img: "https://blog.agilebits.com/wp-content/uploads/2014/11/news-icon.png", name: "Últimas notícias", active: false},
                {img: "http://www.free-icons-download.net/images/nice-pie-chart-icon-32287.png", name: "Relógio", active: false},
                {img: "http://download.seaicons.com/icons/graphicloads/100-flat/256/currency-icon.png", name: "Dados econômicos", active: false}
            ]
        }
    }

    activateGadget(index) {
        const options = [];

        this.state.options.forEach((opt, i) => {
            if(i == index) {
                opt.active = !opt.active;
            }
            options.push(opt);
        })

        this.setState({
            options: options
        })
    }

    render() {
        return <div className="text-center">
            <h4 className="col-md-12 text-left">
                Selecione os gadgets a serem mostrados:
            </h4>

            {this.state.options.map((opt, i) => {
                return <div className="col-md-2" key={i}>
                    <div onClick={this.activateGadget.bind(this, i)} className={opt.active ? "gadget-active" : ""}>
                        <img src={opt.img} className="gadgets-img"/>
                        {opt.name}
                    </div>
                </div>
            })}               

        </div>
    }
}