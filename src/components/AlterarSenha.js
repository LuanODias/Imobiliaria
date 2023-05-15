import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { Button } from '@rneui/themed'
import { buscarLogin } from '../database/dbLogin'

export default props => {

    const [Senha, setSenha] = useState('')

    const alterarSenha = async () =>{
        const login = await buscarLogin();
        await a
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