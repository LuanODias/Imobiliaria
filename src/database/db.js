import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true)

export async function getConnection() {
    return await openDatabase({ name: 'database.imobiliariadatabase5', location: 'default' })
}

export async function createTables() {
    const db = await getConnection()
    const sql = `
        CREATE TABLE IF NOT EXISTS imovel (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tipocontrato VARCHAR(20) NOT NULL,
            tipoimovel VARCHAR(20) NOT NULL,
            endereco VARCHAR(150) NOT NULL,
            valorvenda INTEGER,
            valoraluguel INTEGER,
            qtdquartos INTEGER NOT NULL,
            qtdbanheiros INTEGER NOT NULL,
            locado BOOLEAN,
            condominio INTEGER,
            nomelocatario VARCHAR(150),
            FOREIGN KEY (nomelocatario)
                REFERENCES locatario(id)
        )
    `
    await db.executeSql(sql)
        .then((response) => console.warn(response))
        .catch((erro) => console.warn(erro))
    db.close()

}

export async function createTableLocatario() {
    const db = await getConnection()
    const sql = `
        CREATE TABLE IF NOT EXISTS locatario (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(150) NOT NULL,
            cpf VARCHAR(20) NOT NULL,
            rendaMensal INTEGER NOT NULL,
            diaVencimentoAluguel VARCHAR(150) NOT NULL,
            dataInicioContrato VARCHAR(150) NOT NULL,
            dataFimContrato VARCHAR(150) NOT NULL

        )
    `
    await db.executeSql(sql)
        .then((response) => console.warn(response))
        .catch((erro) => console.warn(erro))
    db.close()

}

export async function addLocatario(locatario) {
    const db = await getConnection()
    const sql = `
    INSERT INTO locatario(nome, cpf, rendaMensal, diaVencimentoAluguel, dataInicioContrato, dataFimContrato)
    VALUES ("${locatario.nome}", "${locatario.cpf}","${locatario.rendaMensal}", "${locatario.diaVencimentoAluguel}", "${locatario.dataInicioContrato}", "${locatario.dataFimContrato}")
    `

    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    db.close()
}

export async function addImovel(imovel) {
    const db = await getConnection()
    const sql = `
    INSERT INTO imovel(tipocontrato, tipoimovel, endereco, valorvenda, valoraluguel, qtdquartos, qtdbanheiros, locado, condominio, nomelocatario)
    VALUES ("${imovel.tipoContrato}", "${imovel.tipoImovel}", "${imovel.endereco}", 
    "${imovel.valorVenda ? imovel.valorVenda : null}", "${imovel.valorAluguel ? imovel.valorAluguel : null}", "${imovel.qtdQuartos}", 
    "${imovel.qtdBanheiros}", "${imovel.locado ? imovel.locado : false}", "${imovel.condominio ? imovel.condominio : null}", "${imovel.nomelocatario ? imovel.nomelocatario : null}")
    `
    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    db.close()
}

export async function listarImoveis() {
    const db = await getConnection()
    const sql = `
    SELECT id, endereco, tipocontrato, tipoimovel, valoraluguel, valorvenda, locado, nomelocatario FROM imovel
    `

    const listaRetorno = []
    await db.executeSql(sql)
        .then((response) => {
            const uniqueResponse = response[0]
            const rows = uniqueResponse.rows
            for (let i = 0; i < rows.length; i++) {
                const item = rows.item(i)
                const itemImovel = {
                    id: item.id,
                    endereco: item.endereco,
                    tipocontrato: item.tipocontrato,
                    tipoimovel: item.tipoimovel,
                    valoraluguel: item.valoraluguel,
                    valorvenda: item.valorvenda,
                    locado: item.locado,
                    nomelocatario: item.nomelocatario
                }
                listaRetorno.push(itemImovel)
            }
            db.close()
        })
    return listaRetorno
}


export async function inserirLocatario(locatario) {
    const db = await getConnection()
    const sql = `
    UPDATE imovel SET nomelocatario = "${locatario.nome}" WHERE id = "${locatario.imovel}"  
    `
    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    db.close()
}


export async function atualizarLocado(locatario) {
    const db = await getConnection()
    const sql = `
    UPDATE imovel SET locado = 'true' WHERE id = "${locatario.imovel}"  
    `
    await db.executeSql(sql)
        .then((response) => console.warn('Inserido: ' + JSON.stringify(response)))
        .catch((erro) => console.warn('Erro: ' + JSON.stringify(erro)))
    db.close()
}
