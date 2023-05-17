import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Button } from '@rneui/themed'
import { buscarLogin } from '../database/dbLogin'
import { AlterarUsuario, PegarUsuario } from '../services/UsuarioServices'

export default props => {

    const [Senha, setSenha] = useState('')

    const alterarSenha = async () =>{
        const token = await buscarLogin()
        const usuario = await PegarUsuario(token.email)
        const senhanova = {
            id: usuario.id,
            nome: usuario.nome,
            email: token.email,
            senha: Senha,
            
        }
        await AlterarUsuario(senhanova)
        props.navigation.goBack();
      }

    return (
        <View style={{padding: 20}}>
            <Text>Senha: </Text>
            <TextInput value={Senha} onChangeText={setSenha}></TextInput>
            <View style={{marginTop: 10}}>
                <Button title="Alterar" onPress={alterarSenha}></Button>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({})