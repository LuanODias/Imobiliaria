import { buscarLogin } from "../database/dbLogin"

export async function salvarImovel(imovel) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                    'token': login.token
                },
                body: JSON.stringify(imovel)
            }
        )
        console.log('Requisição para salvar imovel realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao cadastrar imovel!')
        console.log(ex)
    }
}



export async function listarImoveis() {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/',
            {
                method: 'GET',
                headers: {
                    'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                    'token': login.token
                }
            }
        )
        return response.json()
    } catch (ex) {
        console.log('Erro ao listar as imoveis!')
        console.log(ex)
    }
}

