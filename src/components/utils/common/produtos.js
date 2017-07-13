import * as constants from "../../../constants/constantsCompany"

const todosProdutos = {
    LOCALIZE: {
        label: constants.COMPANY_PRODUCT_LOCALIZE,
        id: "localize",
        color: constants.COMPANY_PRODUCT_LOCALIZE_COLOR,
        colorLight: constants.COMPANY_PRODUCT_LOCALIZE_COLOR_LIGHT,
        link: constants.URL_LOCALIZE,
        image: constants.ICON_LOCALIZE,
        imageNegative: constants.ICON_LOCALIZE_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_LOCALIZE}`,
        subItems: [
            {label: "CPF", id: "cpf", tipo: "pf"},
            {label: "CNPJ", id: "cnpj", tipo: "pj"},
            {label: "Telefone", id: "telefone"},
            {label: "Nome", id: "nome"},
            {label: "Endereço", id: "endereco"},
            {label: "Email", id: "email"},
        ]
    },
    CREDITO: {
        label: constants.COMPANY_PRODUCT_CREDITO,
        id: "credito",
        color: constants.COMPANY_PRODUCT_CREDITO_COLOR,
        colorLight: constants.COMPANY_PRODUCT_CREDITO_COLOR_LIGHT,
        link: constants.URL_CREDITO,
        image: constants.ICON_CREDITO,
        imageNegative: constants.ICON_CREDITO_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_CREDITO}`,
        subItems: [
            {label: "Completa", id: "completa", tipo: "pfpj"},
            {label: "Intermediária", id: "intermediaria", tipo: "pfpj"},
            {label: "Intermediária Plus", id: "intermediariaPlus", tipo: "pfpj"},
            {label: "Simples", id: "simples", tipo: "pf"},
            {label: "Cheque", id: "cheque", tipo: "pfpj"},
            {label: "Express", id: "express", tipo: "pfpj"},
        ]
    },
    CREDITOMIX: {
        label: constants.COMPANY_PRODUCT_CREDITOMIX,
        id: "creditomix",
        color: constants.COMPANY_PRODUCT_CREDITOMIX_COLOR,
        colorLight: constants.COMPANY_PRODUCT_CREDITOMIX_COLOR_LIGHT,
        link: constants.URL_CREDITOMIX,
        image: constants.ICON_CREDITOMIX,
        imageNegative: constants.ICON_CREDITOMIX_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_CREDITOMIX}`,
        subItems: [
            {label: "Cred CPF", id: "cpf"},
            {label: "Cred CNPJ", id: "cnpj"},
            {label: "Master", id: "master"},
            {label: "Premium", id: "premium"},
            {label: "Gold", id: "gold"},
            {label: "Max", id: "max"},
            {label: "Completa", id: "completa"},
            {label: "IntermediáriaPlus", id: "intermediariaPlus"},
            {label: "Intermediária", id: "intermediaria"},
            {label: "Sintética", id: "sintetica"}
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
            cpf: [
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
            cnpj: [
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
    BASECERTA: {
        label: constants.COMPANY_PRODUCT_BASECERTA,
        id: "basecerta",
        color: constants.COMPANY_PRODUCT_BASECERTA_COLOR,
        colorLight: constants.COMPANY_PRODUCT_BASECERTA_COLOR_LIGHT,
        link: constants.URL_BASECERTA,
        image: constants.ICON_BASECERTA,
        imageNegative: constants.ICON_BASECERTA_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_BASECERTA}`,
        subItems: [
            {label: "Novo Enriquecimento", id: "novoEnriquecimento", link: "/basecerta/novoenriquecimento"},
            {label: "Monitor Base Certa", id: "monitorBaseCerta", link: "/basecerta"}
        ]
    },
    SMS: {
        label: constants.COMPANY_PRODUCT_SMS,
        id: "sms",
        color: constants.COMPANY_PRODUCT_SMS_COLOR,
        colorLight: constants.COMPANY_PRODUCT_SMS_COLOR_LIGHT,
        link: constants.URL_SMS,
        image: constants.ICON_SMS,
        imageNegative: constants.ICON_SMS_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_SMS}`,
        subItems: [
            {label: "Enviar SMS", id: "envioSMS", link: "/sms/enviorapido"},
            {label: "Monitor de envios", id: "envioSMS", link: "/sms"},
            //{label: "Centro de Custo", id: "centroCusto", link: "/sms/centrocusto"},
            {label: "Respostas", id: "respostas", link: "/sms/respostas"}
            //{label: "Relatório", id: "relatorio", link: "/sms"}
        ]
    },
    FOCOFISCAL: {
        label: constants.COMPANY_PRODUCT_FOCOFISCAL,
        id: "focofiscal",
        link: constants.URL_FOCOFISCAL,
        color: constants.COMPANY_PRODUCT_FOCOFISCAL_COLOR,
        colorLight: constants.COMPANY_PRODUCT_FOCOFISCAL_COLOR_LIGHT,
        image: constants.ICON_FOCOFISCAL,
        imageNegative: constants.ICON_FOCOFISCAL_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_FOCOFISCAL}`,
        subItems: [
            {label: "Receita PF", id: "receitapf", tipo: "pf"},
            {label: "Receita PJ", id: "receitapj", tipo: "pj"},
            {label: "Receita PJ Sintegra", id: "pjsintegra", tipo: "pj"},
            //{label: "Sintegra Unificada", id: "unificada"},
            {label: "Simples Nacional", id: "simplesnacional", tipo: "pj"}
            ]
    },
    VEICULOS: {
        label: constants.COMPANY_PRODUCT_VEICULOS,
        id: "veiculos",
        color: constants.COMPANY_PRODUCT_VEICULOS_COLOR,
        colorLight: constants.COMPANY_PRODUCT_VEICULOS_COLOR_LIGHT,
        link: constants.URL_VEICULOS,
        image: constants.ICON_VEICULOS,
        imageNegative: constants.ICON_VEICULOS_NEGATIVE,
        alt: `Icone ${constants.COMPANY_PRODUCT_VEICULOS}`,
        subItems: [
            {label: "PLACA", id: "placa"},
            {label: "CHASSI", id: "chassi"},
            {label: "Nº MOTOR", id: "numeroMotor"},
            //{label: "CPF", id: "cpf"},
            //{label: "CNPJ", id: "cnpj"},
        ]
    }
}

export default todosProdutos