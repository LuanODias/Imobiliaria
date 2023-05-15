import { StyleSheet, Text, View, Button, Dimensions } from 'react-native'
import React from 'react'
import { buscarLogin, deleteLogin } from '../database/dbLogin'


export default props => {

  const deletarLogin = async () =>{
    const login = await buscarLogin();
    await deleteLogin(login.id);
    props.navigation.navigate('Login');
  }


  const alterarSenha = () =>{
    props.navigation.navigate('AlterarSenha')
  }
  return (
    <View style={styles.botoes}>
      <View style={{marginTop: 10}}>
      <Button title='Alterar Senha' onPress={alterarSenha} />
      </View>
      <View style={{marginTop: 10}}>
      <Button title='Logout' onPress={deletarLogin}/>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  botoes:{
    padding: 20,
  }
})