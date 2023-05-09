import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { salvarUsuario } from '../../services/UsuarioServices'


const PaginaCadastro = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function cadastrar(){

        let data = {
            nome: nome,
            email: email,
            senha: senha
        }
        await salvarUsuario(data)
    }


    return (
        <View style={styles.formulario}>
            <Text style={{ fontSize: 35, textAlign: 'center', color: 'black', marginTop: 20 }}>Cadastre-se</Text>

            <Text>Nome: </Text>
            <TextInput style={styles.input} placeholder='Nome' value={nome} onChangeText={setNome} />

            <Text>Email: </Text>
            <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />

            <Text>Senha: </Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder='Senha' value={senha} onChangeText={setSenha} />

            <View style={{ marginTop: 10 }}>
                <Button color={"#43481D"} title={'Cadastrar usuário'} onPress={cadastrar}></Button>
            </View>

        </View>
    )
}

export default PaginaCadastro

const styles = StyleSheet.create({
    formulario: {
        padding: 30
    },
    input: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#43481D'
    }
})