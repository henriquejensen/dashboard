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
            {label: "CPF", id: "cpf", tipo: "pf"},
            {label: "CNPJ", id: "cnpj", tipo: "pj"},
            {label: "Telefone", id: "telefone"},
            {label: "Nome", id: "nome"},
            {label: "Endereço", id: "endereco"},
            {label: "Email", id: "email"},
        ]
    },
    CREDITO: {
        label: "Crédito",
        id: "credito",
        color: "#6CBA4B",
        colorLight: "#B5DCA5",
        link: "/credito",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito-negative.png",
        alt: "Icone Crédito",
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
        label: "Crédito Mix",
        id: "creditomix",
        color: "#6CBA4B",
        colorLight: "#B5DCA5",
        link: "/creditomix",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-credito-negative.png",
        alt: "Icone Crédito Mix",
        subItems: [
            {label: "CPF", id: "cpf"},
            {label: "CNPJ", id: "cnpj"},
            //{label: "CHEQUE", id: "cheque"},
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
        label: "Base Certa",
        id: "basecerta",
        color: "#AC6240",
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
        color: "#FF9800",
        colorLight: "#E6C088",
        link: "/sms",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-sms.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-sms-negative.png",
        alt: "Icone SMS",
        subItems: [
            {label: "Enviar SMS", id: "envioSMS", link: "/sms/enviorapido"},
            {label: "Monitor de envios", id: "envioSMS", link: "/sms"},
            //{label: "Centro de Custo", id: "centroCusto", link: "/sms/centrocusto"},
            {label: "Respostas", id: "respostas", link: "/sms/respostas"}
            //{label: "Relatório", id: "relatorio", link: "/sms"}
        ]
    },
    /*VENDAMAIS: {
        label: "Venda+",
        id: "vendamais",
        color: "#2196F3",
        colorLight: "#2196F3",
        link: "/vendamais",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-vendamais.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-vendamais-negative.png",
        alt: "Icone Venda+",
        subItems: []
    },*/
    FOCOFISCAL: {
        label: "Foco Fiscal",
        id: "focofiscal",
        link: "/focofiscal",
        color: "#E85764",
        colorLight: "#F59AB9",
        image: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-focofiscal.png",
        imageNegative: "https://s3-us-west-2.amazonaws.com/front.assertiva/public/assertiva/icon-focofiscal-negative.png",
        alt: "Icone Foco Fiscal",
        subItems: [
            {label: "Receita PF", id: "receitapf", tipo: "pf"},
            {label: "Receita PJ", id: "receitapj", tipo: "pj"},
            {label: "Receita PJ Sintegra", id: "pjsintegra", tipo: "pj"},
            //{label: "Sintegra Unificada", id: "unificada"},
            {label: "Simples Nacional", id: "simplesnacional", tipo: "pj"}
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