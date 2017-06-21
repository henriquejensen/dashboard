export const URL_SEND_SMS = "http://manager-sms-env.us-east-1.elasticbeanstalk.com/sms"
export const URL_GET_CAMPANHAS = "http://manager-sms-env.us-east-1.elasticbeanstalk.com/campanhas"
export const URL_GET_DETALHES_CAMPANHA = "http://manager-sms-env.us-east-1.elasticbeanstalk.com/sms"
export const URL_GET_RESPOSTAS = "http://manager-sms-env.us-east-1.elasticbeanstalk.com/respostas"

export const STATUS_SMS = {
    99: {
        label: "CANCELADO",
        color: "red"
    },
    2: {
        label: "ENVIADO COM CONFIRMAÇÃO",
        color: "green"
    },
    1: {
        label: "ENVIADO SEM CONFIRMAÇÃO",
        color: "green"
    },
    7: {
        label: "PAUSADOS",
        color: "yellow"
    },
    0: {
        label: "ENVIANDO",
        color: "yellow"
    }
}

export const GET_CAMPANHAS_SMS = "GET_CAMPANHAS_SMS"
export const GET_CENTRO_CUSTO_SMS = "GET_CENTRO_CUSTO_SMS"
export const GET_RESPOSTAS_SMS = "GET_RESPOSTAS_SMS"
export const GET_DETALHES_CAMPANHA = "GET_DETALHES_CAMPANHA"
export const SEND_SMS_RAPIDO = "SEND_SMS_RAPIDO"
export const SMS_LOADING = "SMS_LOADING"
export const CLOSE_SMS_MESSAGE = "CLOSE_SMS_MESSAGE"
export const FILTER_RESPONSE_SMS = "FILTER_RESPONSE_SMS"

// Respostas do servidor SMS
export const RESPONSE_SMS_WAITING = "AGUARDANDO"
export const RESPONSE_SMS_SENDED_ANY_CONFIRMATION = "ENVIADO SEM CONFIRMACAO"
export const RESPONSE_SMS_SENDED_WITH_CONFIRMATION = "ENVIADO COM CONFIRMACAO"
export const RESPONSE_SMS_CANCELED = "CANCELADO"
export const RESPONSE_SMS_PAUSED = "PAUSADO"
export const RESPONSE_SMS_ERROR= "ERRO"

// Mensagens para envio de SMS
export const MESSAGE_SUCCESS_SMS = "Mensagem enviada com sucesso!"
export const MESSAGE_ERROR_SMS = "Erro no envio da mensagem!"