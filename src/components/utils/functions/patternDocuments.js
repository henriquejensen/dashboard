export function patternCPF(doc) {
    let cpf = doc.toString();

    for(let i=cpf.length; i<11;i++) {
        cpf = '0' + cpf;
    }

    return cpf.substring(0,3) + "." + cpf.substring(3,6) + "." + cpf.substring(6,9) +  "-" + cpf.substring(9);
}

export function patternCNPJ(doc) {
    let cnpj = doc.toString();

    for(let i=cnpj.length; i<14;i++) {
        cnpj = '0' + cnpj;
    }

    return cnpj.substring(0,2) + "." + cnpj.substring(2,5) + "." + cnpj.substring(5,8) +  "/" + cnpj.substring(8,12) + "-" + cnpj.substring(12);
}

export function patternRG(doc) {
    let rg = doc.toString();

    return rg.substring(0,2) + "." + rg.substring(2,5) + "." + rg.substring(5,8) +  "-" + rg.substring(8);
}

export function formatDate(date) {
    var newDate = new Date(date);
    var format = new Intl.DateTimeFormat("pt-BR");

    return format.format(newDate);
}

export function formatCurrency(currency) {
    var newCurrency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

    return newCurrency.format(currency);
}