export function format (doc) {
    let docFormatado = "";

    for(let i=0; i<doc.length; i++) {
        if(i%3 == 0 && i > 0)
            docFormatado = docFormatado + ".";

        docFormatado = docFormatado + doc[i];
    }
    
    return docFormatado;
}