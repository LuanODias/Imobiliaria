import {enablePromise, openDatabase} from 'react-native-sqlite-storage'

enablePromise(true)

export async function getConnection() {
    return await openDatabase({name: 'logindb', location: 'default'})
}

export async function createTablesUsuario(){
    const db = await getConnection()
    const sql = `
    CREATE TABLE IF NOT EXISTS login (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        apikey VARCHAR(255) NOT NULL,
       email VARCHAR(200) NOT NULL,
        token VARCHAR(255) NOT NULL,
        expiration_date DATETIME NOT NULL
        )
    `
    try {
        await db.executeSql(sql)
    } catch (ex) {
        console.log('Erro ao criar a tabela de login')
    }
    await db.close()
}


export async function addLogin(login) {
    const db = await getConnection()
    const loginEncontrado = await buscarLoginPorEmail(db, login?.email)
    let sql = ''
    if (!loginEncontrado) {
        sql = `
        INSERT INTO login (apikey, email, expiration_date, token)
        VALUES ("${login.apikey}", "${login.email}",
        "${login.expirationDate}", "${login.token}")
        `
    } else {
        sql = `
        UPDATE login SET apikey="${login.apikey}", 
        email="${login.email}", 
        expiration_date="${login.expirationDate}",
        token="${login.token}"
        WHERE id=${loginEncontrado.id}
        `
    }
    try {
        await db.executeSql(sql)
        console.log('Login incluido no BD')
    } catch (ex) {
        console.log('Erro ao inserir o login no BD')
        console.log(ex)
    }
    await db.close()
}




export async function buscarLoginPorEmail(db, email) {
    let login = null
    const sql = `
    SELECT id, apikey, email, token, expiration_date
    FROM login
    WHERE email="${email}"
    ORDER BY id DESC
    LIMIT 1
    `
    const select = await db.executeSql(sql)
    const selectUnico = select[0]
    if (selectUnico.rows.length > 0) {
        const row = selectUnico.rows.item(0)
        login = {
            id: row.id,
            apikey: row.apikey,
            token: row.token,
            expiration_date: row.expiration_date,
            email: row.email
        }
    }
    return login
}


export async function deleteLogin() {
    const db = await getConnection()
    const sql = `DELETE * FROM login`
    await db.executeSql(sql)
    await db.close()
}



export async function buscarLogin() {
    const db = await getConnection()
    let login = null
    const sql = `
    SELECT id, apikey, email, token, expiration_date
    FROM login
    ORDER BY id DESC
    LIMIT 1
    `
    const select = await db.executeSql(sql)
    const selectUnico = select[0]
    if (selectUnico.rows.length > 0) {
        const row = selectUnico.rows.item(0)
        login = {
            id: row.id,
            apikey: row.apikey,
            token: row.token,
            expiration_date: row.expiration_date,
            email: row.email
        }
    }
    await db.close()
    return login
}