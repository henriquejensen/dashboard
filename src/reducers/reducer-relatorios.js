import * as constants from "../constants/constantsRelatorios";

const getInitialState = {
    relatorios: [],
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case constants.GET_RELATORIOS: {
            return {
                relatorios: [
                    {id:120, tipo:"R6", descricao:"Consultas de Localize, Crédito, Veículos e Foco Fiscal"},
                    {id:110, tipo:"R7", descricao:"Envio de SMS"},
                    {id:90, tipo:"R8", descricao:"Consumo do Base Certa"},
                    {id:95, tipo:"R9", descricao:"Consumo total de todos os produtos"},
                    {id:85, tipo:"R12", descricao:"Consultas de Localize, Crédito e Veículos em tela"}
                ]
            }
        }
    }

    return state;
}