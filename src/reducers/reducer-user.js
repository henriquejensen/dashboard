import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";

const user = {
    nome: "HENRIQUE.TEIXEIRA",
    telefone: "11996997909",
    avatar_url: "http://static.wixstatic.com/media/9409b2_30ca0934a4ab4b45a719215245c1c01b.jpg_srz_600_600_85_22_0.50_1.20_0.00_jpg_srz",
    firm_url: "http://www.goodrickes.co.za/images/icon2.png",
    email: "",
    empresa: "ASSERTIVA",
    perfil: "ADM",
    gadgets: [
        {img: "https://www.wlu.edu/images/alumni/icons/calendar.png", name: "Calendário", active: false},
        {img: "http://blog.weecomments.com/wp-content/uploads/2016/05/clock-flat.png", name: "Relógio", active: false},
        {img: "http://img.tuttoandroid.net/wp-content/uploads/2015/05/Wemple-Weather-icon.png", name: "Previsão do tempo", active: false},
        {img: "https://blog.agilebits.com/wp-content/uploads/2014/11/news-icon.png", name: "Últimas notícias", active: false},
        {img: "http://www.free-icons-download.net/images/nice-pie-chart-icon-32287.png", name: "Relógio", active: false},
        {img: "http://download.seaicons.com/icons/graphicloads/100-flat/256/currency-icon.png", name: "Dados econômicos", active: false}
    ],
    charts: {
        options: [
            {value: "localize", label: "Localize"},
            {value: "credito", label: "Crédito"},
            {value: "veiculos", label: "Veículos"},
            {value: "sms", label: "SMS"}
        ],
        optionsSelected: [],
    },
    mensagens: {
        friend: "Jessica",
        friend_url: "http://www.clker.com/cliparts/b/1/f/a/1195445301811339265dagobert83_female_user_icon.svg.med.png",
        mensagens: [
            [1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales."],
            [2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales."],
            [1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales."],
            [2, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales."]
        ]
    }
}

export default function (state = null, action) {
    switch(action.type){
        case USER_EDIT_INFO:
            user.nome = action.payload.nome;
            user.telefone = action.payload.telefone;
            user.avatar_url = action.payload.avatar_url;
            user.firm_url = action.payload.firm_url;
            return user;

        case USER_EDIT_DASHBOARD:
            user.gadgets = action.payload.gadgets;
            user.charts = action.payload.charts;
            return user;
    }
    return user;
} 