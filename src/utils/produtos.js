import * as constants from "../constants/constantsCompany"

const produtos = {
    1: {
        label: constants.COMPANY_PRODUCT_LOCALIZE,
        id: 1,
        color: constants.COMPANY_PRODUCT_LOCALIZE_COLOR,
        colorLight: constants.COMPANY_PRODUCT_LOCALIZE_COLOR_LIGHT,
        link: constants.URL_LOCALIZE,
        image: constants.ICON_LOCALIZE,
        imageNegative: constants.ICON_LOCALIZE_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_LOCALIZE}`,
        consultas: [
            {modulo:"SEARCHPF", link:constants.URL_LOCALIZE},
            {modulo:"SEARCHPJ", link:constants.URL_LOCALIZE},
            {modulo:"SEARCH-ADDRESS-OR-NAME", link:constants.URL_LOCALIZE},
            {modulo:"SEARCHEMAIL", link:constants.URL_LOCALIZE},
            {modulo:"SEARCHPHONE", link:constants.URL_LOCALIZE}
        ]
    },
    2: {
        label: constants.COMPANY_PRODUCT_CREDITO,
        id: 2,
        color: constants.COMPANY_PRODUCT_CREDITO_COLOR,
        colorLight: constants.COMPANY_PRODUCT_CREDITO_COLOR_LIGHT,
        link: constants.URL_CREDITO,
        image: constants.ICON_CREDITO,
        imageNegative: constants.ICON_CREDITO_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_CREDITO}`,
        consultas: [
            {modulo:"SEGAM", modulo2:"PACC", link:constants.URL_CREDITO},
            {modulo:"SEARCHCREDITOINTERMEDIARIAPF", modulo2:"SEARCHCREDITOINTERMEDIARIAPJ", link:constants.URL_CREDITO},
            {modulo:"SEARCHINTERMEDIARIAPLUSPF", modulo2:"SEARCHINTERMEDIARIAPLUSPJ", link:constants.URL_CREDITO},
            {modulo:"SEARCHCDLSIMPLES", link:constants.URL_CREDITO},
            {modulo:"Cheque PF", modulo2:"Cheque PJ", link:constants.URL_CREDITO},
            {modulo:"SEARCHCREDITOEXPRESSPF", modulo2:"SEARCHCREDITOEXPRESSPJ", link:constants.URL_CREDITO},
        ]
    },
    7: {
        label: constants.COMPANY_PRODUCT_CREDITOMIX,
        id: 7,
        color: constants.COMPANY_PRODUCT_CREDITOMIX_COLOR,
        colorLight: constants.COMPANY_PRODUCT_CREDITOMIX_COLOR_LIGHT,
        link: constants.URL_CREDITOMIX,
        image: constants.ICON_CREDITOMIX,
        imageNegative: constants.ICON_CREDITOMIX_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_CREDITOMIX}`,
        consultas: [
            {modulo:"SPCBRPF", link:constants.URL_CREDITOMIX},
            {modulo2:"SPCBRPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXMASTERPF", modulo2:"SEARCHCREDITOMIXMASTERPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXPREMIUMPF", modulo2:"SEARCHCREDITOMIXPREMIUMPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXGOLDPF", modulo2:"SEARCHCREDITOMIXGOLDPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXMAXPF", modulo2:"SEARCHCREDITOMIXMAXPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXCOMPLETAPF", modulo2:"SEARCHCREDITOMIXCOMPLETAPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXINTERMEDIARIAPF", modulo2:"SEARCHCREDITOMIXINTERMEDIARIAPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXINTERMEDIARIAPLUSPF", modulo2:"SEARCHCREDITOMIXINTERMEDIARIAPLUSPJ", link:constants.URL_CREDITOMIX},
            {modulo:"SEARCHCREDITOMIXSINTETICAPF", modulo2:"SEARCHCREDITOMIXSINTETICAPJ", link:constants.URL_CREDITOMIX},
        ],
        options: {
            /*cheque: [
                {id: "agenciaChequeInicial", label: "Agência"},
                {id: "bancoChequeInicial", label: "Banco"},
                {id: "cepConsumidor", label: "CEP consumidor"},
                {id: "cepOrigem", label: "CEP Origem"},
                {id: "chequesDetalhados", label: "Cheques Detalhados"},
                {id: "cmc71ChequeInicial", label: "CMC 71"},
                {id: "cmc72ChequeInicial", label: "CMC 72"},
                {id: "cmc73ChequeInicial", label: "CMC 73"},
                {id: "codigoEstacaoConsultante", label: "Código Estação Consultante"},
                {id: "codigoProduto", label: "Código Produto"},
                {id: "digitoChequeInicial", label: "Dígito Cheque"},
                {id: "digitoContaCorrenteChequeInicial", label: "Dígito Conta Corrente"},
                {id: "documentoConsumidor", label: "Docuemnto Consumidor"},
                {id: "numeroChequeInicial", label: "Núemro Cheque"},
                {id: "quantidadeCheque", label: "Quantidade Cheque"},
                {id: "telefoneConsultar", label: "Telefone"},
                {id: "tipoConsumidor", label: "Tipo Consumidor"},
                {id: "utilizaCm7", label: "Utiliza CM7"}
            ],*/
            CPF: [
                {id: "alertaIdentidade", label: "Alerta de Identidade"},
                {id: "spcObito", label: "Alerta de Óbito"},
                {id: "acao", label: "Ação"},
                {id: "gastoEstimadoPF", label: "Gasto Estimado PF"},
                {id: "indiceRelacionamentoMercadoPF", label: "Índice Relacionamento Mercado PF"},
                {id: "limiteCreditoSugerido", label: "Limite de Crédito Sugerido"},
                {id: "participacaoEmpresa", label: "Participações em Empresas"},
                {id: "pendenciaFinanceira", label: "Pendências Financeiras Serasa"},
                {id: "rendaPresumidaSpc", label: "Renda Presumida SPC"},
                {id: "spcScore12Meses", label: "SPC Score 12 Meses"},
                {id: "spcScore3Meses", label: "SPC Score 3 Meses"},
                {id: "statusReceitaFederalOnline", label: "Status Receita Federal Online"},
                {id: "telefoneVinculadoConsumidor", label: "Telefones Vinculados"}
            ],
            CNPJ: [
                {id: "acao", label: "Ação"},
                {id: "participacaoEmpresa", label: "Participações em Empresas"},
                {id: "pendenciaFinanceira", label: "Pendências Financeiras Serasa"},
                {id: "spcScore12Meses", label: "SPC Score 12 Meses"},
                {id: "spcScore3Meses", label: "SPC Score 3 Meses"},
                {id: "statusReceitaFederalOnline", label: "Status Receita Federal Online"},
                {id: "telefoneVinculadoConsumidor", label: "Telefones Vinculados"},
                {id: "riscoCreditoPj", label: "Risco Crédito PJ"},
                {id: "socio", label: "Sócio"},
                {id: "quadroSocialMaisCompletoPj", label: "Quadro Social Mais Completo PJ"},
                {id: "faturamentoPresumido", label: "Faturamento Presumido"},
                {id: "gastoEstimadoPj", label: "Gasto Estimado PJ"},
                {id: "limiteCreditoPj", label: "Limite de Crédito"}
            ]
        }
    },
    8: {
        label: constants.COMPANY_PRODUCT_BASECERTA,
        id: 8,
        color: constants.COMPANY_PRODUCT_BASECERTA_COLOR,
        colorLight: constants.COMPANY_PRODUCT_BASECERTA_COLOR_LIGHT,
        link: constants.URL_BASECERTA,
        image: constants.ICON_BASECERTA,
        imageNegative: constants.ICON_BASECERTA_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_BASECERTA}`,
        consultas: [
            {modulo: "NOVOENRIQUECIMENTO", link: `${constants.URL_BASECERTA}/novoenriquecimento`},
            {modulo: "MONITORBASECERTA", link: `${constants.URL_BASECERTA}`}
        ]
    },
    9: {
        label: constants.COMPANY_PRODUCT_SMS,
        id: 9,
        color: constants.COMPANY_PRODUCT_SMS_COLOR,
        colorLight: constants.COMPANY_PRODUCT_SMS_COLOR_LIGHT,
        link: constants.URL_SMS,
        image: constants.ICON_SMS,
        imageNegative: constants.ICON_SMS_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_SMS}`,
        consultas: [
            {modulo: "ENVIARSMS", link: `${constants.URL_SMS}/enviorapido`},
            {modulo: "MONITORENVIOS", link: `${constants.URL_SMS}`},
            //{label: "Centro de Custo", id: "centroCusto", link: "/sms/centrocusto"},
            {modulo: "RESPOSTAS", link: `${constants.URL_SMS}/respostas`},
            //{label: "Relatório", id: "relatorio", link: "/sms"}
        ]
    },
    4: {
        label: constants.COMPANY_PRODUCT_FOCOFISCAL,
        id: 4,
        link: constants.URL_FOCOFISCAL,
        color: constants.COMPANY_PRODUCT_FOCOFISCAL_COLOR,
        colorLight: constants.COMPANY_PRODUCT_FOCOFISCAL_COLOR_LIGHT,
        image: constants.ICON_FOCOFISCAL,
        imageNegative: constants.ICON_FOCOFISCAL_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_FOCOFISCAL}`,
        consultas: [
            {modulo:"SEARCHEASYCHECKRECEITAPF", link:constants.URL_FOCOFISCAL},
            {modulo:"SEARCHEASYCHECKRECEITAPJ", link:constants.URL_FOCOFISCAL},
            {modulo:"SEARCHEASYCHECKRECEITAPJSINTEGRA", link:constants.URL_FOCOFISCAL},
            {modulo:"SEARCHEASYCHECKSIMPLESNACIONAL", link:constants.URL_FOCOFISCAL},
        ]
    },
    3: {
        label: constants.COMPANY_PRODUCT_VEICULOS,
        id: 3,
        color: constants.COMPANY_PRODUCT_VEICULOS_COLOR,
        colorLight: constants.COMPANY_PRODUCT_VEICULOS_COLOR_LIGHT,
        link: constants.URL_VEICULOS,
        image: constants.ICON_VEICULOS,
        imageNegative: constants.ICON_VEICULOS_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_VEICULOS}`,
        consultas: [
            {modulo:"PLACA", link:constants.URL_VEICULOS},
            {modulo:"CHASSI", link:constants.URL_VEICULOS},
            {modulo:"NUMEROMOTOR", link:constants.URL_VEICULOS},
        ]
    },
    /*MONITORA: {
        label: constants.COMPANY_PRODUCT_MONITORA,
        id: "monitora",
        color: constants.COMPANY_PRODUCT_MONITORA_COLOR,
        colorLight: constants.COMPANY_PRODUCT_MONITORA_COLOR_LIGHT,
        link: constants.URL_MONITORA,
        image: constants.ICON_MONITORA,
        imageNegative: constants.ICON_MONITORA_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_MONITORA}`,
        consultas: []
    }*/
}

export default produtos