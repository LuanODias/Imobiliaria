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

export async function editarImovel(imovel) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/',
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                    'token': login.token
                },
                body: JSON.stringify(imovel)
            }
        )
        console.log('Requisição para Editar imovel realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao cadastrar imovel!')
        console.log(ex)
    }
}

export async function deletarImovel(id) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            `http://ec2-54-166-238-5.compute-1.amazonaws.com/imoveis/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                    'token': login.token
                }
            }
        )
        console.log('Requisição para excluir imóvel realizada com sucesso!')
        console.log(response)
    } catch (ex) {
        console.log('Erro ao excluir imovel!')
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
        console.log('Erro ao listar os imoveis!')
        console.log(ex)
    }
}

