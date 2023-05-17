import { buscarLogin } from "../database/dbLogin"

export async function salvarUsuario(usuario) {
    try {
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180'
            },
            body: JSON.stringify(usuario)
        })
        console.log('Sucesso')
        console.log(response)
    } catch (error) {
        console.log('Houve um erro')
        console.log(error)
    }
}

export async function AlterarUsuario(usuario) {
    try {
        const login = await buscarLogin()
        const response = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                'token': login.token
            },
            body: JSON.stringify(usuario)
        })
        console.log('Sucesso')
        console.log(response)
        return response.JSON
    } catch (error) {
        console.log('Houve um erro')
        console.log(error)
    }
}


export async function PegarUsuario(email) {
    console.log("fuck me")
    try {
        console.log('Testing')
        const login = await buscarLogin()
        console.log("Token is: " + login.token)
        const response = await fetch(
            `http://ec2-54-166-238-5.compute-1.amazonaws.com/usuarios/${email}`, {
            method: 'GET',
            headers: {
                'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180',
                'token': login.token
            }
        })
        console.log(response.json)
        return response.json();
    } catch (error) {
        console.log('Houve um erro')
        console.log(error)
    }
}



export async function efetuarLogin(login) {
    try {
        const token = await fetch(
            'http://ec2-54-166-238-5.compute-1.amazonaws.com/authenticate/token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': 'ffefaeb379f5496dc8232d60ce8cf81a30453180'
                },
                body: JSON.stringify(login)
            }
        )
        console.log('Sucesso ao realizar login')
        return token.json()
    } catch (error) {
        console.log('Erro ao realizar login')
        console.log(error)
    }
}