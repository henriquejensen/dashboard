import { browserHistory } from "react-router";

import { USER_EDIT_INFO, USER_EDIT_DASHBOARD } from "../constants/constantsUser";
import { 
        ICON_LOCALIZE,
        ICON_CREDITO,
        GET_NOTIFICATIONS,
        INFO_ERROR,
        INFO_SUCCESS
} from "../constants/utils";

import notifications from "./data/notifications.json";

const user = {
    email: "henriquejensen@hotmail.com",
    telefone: "11996997909",
    avatar_url: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/supportmale-512.png",
    background_url: "http://retrapack.com.br/wp-content/uploads/2015/01/839274-landscape-sunset.jpg",
    firm_url: "http://www.goodrickes.co.za/images/icon2.png",
    empresa: "",
    perfil: "",
    produto: {
        localize: [
            {quantidade: 1000, label: "Total consultas"},
            {quantidade: 600, label: "CPF"},
            {quantidade: 300, label: "CNPJ"},
            {quantidade: 50, label: "Nome"},
            {quantidade: 30, label: "Endereço"},
            {quantidade: 15, label: "Telefone"},
            {quantidade: 5, label: "Email"},
        ],
        credito: [
            {quantidade: 500, label: "Total consultas"},
            {quantidade: 150, label: "CPF"},
            {quantidade: 300, label: "CNPJ"},
            {quantidade: 50, label: "Cheque"},
            {quantidade: 200, label: "Consulta Simples"},
            {quantidade: 250, label: "Consulta Completa"},
            {quantidade: 0, label: "Consulta Express"},
            {quantidade: 50, label: "Consulta Intermediária"},
            {quantidade: 0, label: "Intermediária Plus/Pessoal Plus"},
        ],
        totalConsultas: [
            {quantidade: 1200, label: "Total"},
            {
                descricao: "Distribuição por Produto",
                labels: [
                    'Localize',
                    'Crédito',
                    'FocoFiscal'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                    hoverBackgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                }]
            },
            {
                descricao: "Distribuição por tipo de busca",
                labels: [
                    'CPF',
                    'CNPJ',
                    'Outros'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                    hoverBackgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                }]
            }
        ],
        acessoSeguranca: [
            {quantidade: 1200, label: "Usuários"},
            {
                descricao: "Status dos usuários",
                labels: [
                    'Ativo',
                    'Inativo',
                    'Bloqueado'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                    hoverBackgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4',
                    ],
                }]
            },
            {
                descricao: "Tentativas de acesso",
                labels: [
                    'Erro',
                    'Hora',
                    'Sucesso',
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                    hoverBackgroundColor: [
                    '#5E147F',
                    '#BF63E7',
                    '#E3BDF4'
                    ],
                }]
            },
            {quantidade: 4, label: "Grupos"},
        ],
    },
    gadgets: [
        {img: "https://www.wlu.edu/images/alumni/icons/calendar.png", name: "Calendário", active: false},
        {img: "http://blog.weecomments.com/wp-content/uploads/2016/05/clock-flat.png", name: "Relógio", active: false},
        {img: "http://img.tuttoandroid.net/wp-content/uploads/2015/05/Wemple-Weather-icon.png", name: "Previsão do tempo", active: false},
        {img: "https://blog.agilebits.com/wp-content/uploads/2014/11/news-icon.png", name: "Últimas notícias", active: false},
        {img: "http://www.free-icons-download.net/images/nice-pie-chart-icon-32287.png", name: "Relógio", active: false},
        {img: "http://download.seaicons.com/icons/graphicloads/100-flat/256/currency-icon.png", name: "Dados econômicos", active: false}
    ],
    charts: {
        optionsSelected: [
            {value: "localize", label: "Localize"},
            {value: "credito", label: "Crédito"},
            {value: "veiculos", label: "Veículos"},
            {value: "sms", label: "SMS"}
        ],
        options: [],
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
    },
    ultimasConsultas: [
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CPF", tipo: "pf", documento: 22430907836},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CNPJ", tipo: "pj", documento: 15724796000100},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CPF", tipo: "pf", documento: 11111111100},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CPF", tipo: "pf", documento: 11111111100},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CPF", tipo: "pf", documento: 11111111100},
    ],
    ultimosAcessos: [
        {dataHora: "29/01/2017 10:30", ip: "177.103.153.183, 54.239.182.121"},
        {dataHora: "29/01/2017 14:00", ip: "177.103.153.183, 54.239.182.121"},
        {dataHora: "29/01/2017 17:05", ip: "177.103.153.183, 54.239.182.121"},
        {dataHora: "30/01/2017 09:20", ip: "177.103.153.183, 54.239.182.121"},
        {dataHora: "30/01/2017 10:30", ip: "177.103.153.183, 54.239.182.121"}
    ],
    produtosMaisUtilizados: [
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CPF"},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "CNPJ"},
        {produto: "credito", logo: ICON_CREDITO, tipoDocumento: "COMPLETA"},
        {produto: "credito", logo: ICON_CREDITO, tipoDocumento: "INTERMEDIARIA"},
        {produto: "localize", logo: ICON_LOCALIZE, tipoDocumento: "NOME"},
    ],
    notifications: []
}

export default function (state = user, action) {
    switch(action.type){
        case USER_EDIT_INFO: {
            let newState = Object.assign({}, state);
            newState.nome = action.payload.nome;
            newState.telefone = action.payload.telefone;
            newState.email = action.payload.email;
            return newState;
        }

        case USER_EDIT_DASHBOARD: {
            let newState = Object.assign({}, state);
            newState.gadgets = action.payload.gadgets;
            newState.charts = action.payload.charts;
            return newState;
        }

        case INFO_SUCCESS: {
            let response = action.payload.response.response;
            let newState = Object.assign({}, state);
            newState.notifications = notifications.notifications;
            newState.grupoDescricao = response.grupoDescricao;
            newState.grupoId = response.grupoId;
            newState.mapParametros = response.mapParametros;
            newState.mapProdutos = response.mapProdutos;
            newState.perfilDescricao = response.perfilDescricao;
            newState.perfilOrdem = response.perfilOrdem;
            newState.pessoaDescricao = response.pessoaDescricao;
            newState.pessoaId = response.pessoaId;
            newState.pessoaStatus = response.pessoaStatus;
            newState.pessoaStatusWs = response.pessoaStatusWs;
            newState.usuarioId = response.usuarioId;
            newState.usuarioNome = response.usuarioNome;
            return newState;
        }
        
        case INFO_ERROR:
            localStorage.removeItem("token");
            browserHistory.push("/");
            return state;

    }
    return state;
} 