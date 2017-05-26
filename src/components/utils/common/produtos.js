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
            {label: "CPF", id: "cpf"},
            {label: "CNPJ", id: "cnpj"},
            {label: "Telefone", id: "telefone"},
            {label: "Nome", id: "nome"},
            {label: "Endereço", id: "endereco"},
            {label: "Email", id: "email"},
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
            {label: "Consulta Completa", id: "completa"},
            {label: "Consulta Intermediária", id: "intermediaria"},
            {label: "Intermediária Plus", id: "intermediariaPlus"},
            {label: "Consulta Simples", id: "simples"},
            {label: "Consulta Cheque", id: "cheque"},
            {label: "Consulta Express", id: "express"},
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
            {label: "PLACA", id: "placa"},
            {label: "CHASSI", id: "chassi"},
            {label: "Nº MOTOR", id: "numeroMotor"},
            {label: "CPF", id: "cpf"},
            {label: "CNPJ", id: "cnpj"},
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

/**    
 *  AGREGADO VEICULAR                            "agregados": false,
    BIN FEDERAL                                  "binFederal": false,
    BIN FEDERAL + ROUBO E FURTO                  "binRF": false,
    BIN ESTADUAL                                 "binEstadual": false,
    BIN JUDICIAL RENAJUD                         "binRenajud": false,
    CONSULTA CRLV - DOCUMENTO                    "crlv": true,
    DECODIFICADOR DE CHASSI                      "decodificadorChassi": false,
    DECODIFICADOR DE CHASSI - FIPE E MOLICAR     "decodificador2": false,
    DECODIFICADOR UNION                          "decodificadorUnion": false,
    GRAVAME - DETALHES DO FINANCIAMENTO          "gravame": false,
    HISTÓRICO DE PROPRIETÁRIOS ANTERIORES        "proprietariosAnteriores": false,
    INDICIO DE SINISTRO                          "indicioSinistro": false,
    LEILAO 2                                     "leilao2": false,
    LOCALIZADOR DE CHASSI E MOTOR                "localizaVeiculo": false,
    LOCALIZADOR DE PLACA                         "localizaPlaca": false,
    LOCALIZADOR DE MOTOR                         "motor": true,
    PRECIFICADOR                                 "precificador": false,
    RENAVAM                                      "renavam": false,
    SINISTRO IRRECUPERÁVEL PT                    "pt": false,
    VEICULOS OFERTADOS A LEILÃO                  "leilao": false */