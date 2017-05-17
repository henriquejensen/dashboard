export const todosProdutos = {
    LOCALIZE: {
        label: "Localize",
        id: "localize",
        color: "#673ab7",
        colorLight: "#D1BCF7",
        link: "/localize",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-localize.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-localize-negative.png",
        alt: "Icone Localize",
        subItems: [
            {label: "CPF", id: "cpf", link: "/localize/cpf"},
            {label: "CNPJ", id: "cnpj", link: "/localize/cnpj"},
            {label: "Telefone", id: "telefone", link: "/localize/telefone"},
            {label: "Nome", id: "nome", link: "/localize/nome"},
            {label: "Endereço", id: "endereco", link: "/localize/endereco"},
            {label: "Email", id: "email", link: "/localize/email"}
        ]
    },
    CREDITO: {
        label: "Crédito",
        id: "credito",
        color: "#ff9800",
        colorLight: "#E6C088",
        link: "/credito",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito-negative.png",
        alt: "Icone Crédito",
        subItems: [
            {label: "Consulta Completa", id: "completa", link: "/credito/completa"},
            {label: "Consulta Intermediária", id: "intermediaria", link: "/credito/intermediaria"},
            {label: "Intermediária Plus/Pessoal Plus", id: "intermediariaPlus", link: "/credito/intermediariaPlus"},
            {label: "Consulta Simples", id: "simples", link: "/credito/simples"},
            {label: "Consulta Cheque", id: "cheque", link: "/credito/cheque"},
            {label: "Consulta Express", id: "express", link: "/credito/express"}
        ]
    },
    BASECERTA: {
        label: "Base Certa",
        id: "basecerta",
        color: "#f44336",
        colorLight: "#673ab7",
        link: "/basecerta",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-basecerta.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-basecerta-negative.png",
        alt: "Icone Base Certa",
        subItems: []
    },
    SMS: {
        label: "SMS",
        id: "sms",
        color: "#4caf50",
        colorLight: "#7BBB7E",
        link: "/sms",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-sms.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-sms-negative.png",
        alt: "Icone SMS",
        subItems: [
            {label: "Monitor de envios", id: "envioSMS", link: "/sms"},
            {label: "Centro de Custo", id: "centroCusto", link: "/sms/centrocusto"},
            {label: "Respostas", id: "respostas", link: "/sms/respostas"},
            {label: "Relatório", id: "relatorio", link: "/sms"}
        ]
    },
    VENDAMAIS: {
        label: "Venda+",
        id: "vendamais",
        color: "#2196F3",
        colorLight: "#2196F3",
        link: "/vendamais",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-vendamais.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-vendamais-negative.png",
        alt: "Icone Venda+",
        subItems: []
    },
    FOCOFISCAL: {
        label: "Foco Fiscal",
        id: "focofiscal",
        link: "/focofiscal",
        color: "#e91e63",
        colorLight: "#F59AB9",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-focofiscal.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-focofiscal-negative.png",
        alt: "Icone Foco Fiscal",
        subItems: [
            {label: "Receita PF", id: "pf", link: "/focofiscal/receitaPf"},
            {label: "Receita PJ", id: "pj", link: "/focofiscal/receitaPj"},
            {label: "Receita PJ Sintegra", id: "sintegra", link: "/focofiscal/receitaSintegra"},
            {label: "Sintegra Unificada", id: "unificada", link: "/focofiscal/sintegraUnificada"},
            {label: "Simples Nacional", id: "simples", link: "/focofiscal/simplesNacional"}
            ]
    },
    VEICULOS: {
        label: "Veículos",
        id: "veiculos",
        color: "#607d8b",
        colorLight: "#8CC6E2",
        link: "/veiculos",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-veiculos.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-veiculos-negative.png",
        alt: "Icone Veiculos",
        subItems: [
            {label: "Agregados", id: "agregados", link: "/veiculos"},
            {label: "BDV Estadual", id: "bdv", link: "/veiculos"},
            {label: "Decodificador", id: "decodificador", link: "/veiculos"},
            {label: "Localização", id: "localizacao", link: "/veiculos"},
            {label: "Proprietários", id: "proprietarios", link: "/veiculos"},
            {label: "Leilão", id: "leilao", link: "/veiculos"},
            {label: "Sinistro", id: "sinistro", link: "/veiculos"}
        ]
    },
    CONSIGMAIS: {
        label: "Consig+",
        id: "consigmais",
        link: "/consigmais",
        color: "#ff5722",
        colorLight: "#673ab7",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-consigmais.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-consigmais-negative.png",
        alt: "Icone Consig+",
        subItems: []
    }
}