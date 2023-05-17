import { SafeAreaView, StyleSheet, Text, View, DeviceEventEmitter } from 'react-native';
import React, { useEffect, useState  } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation'
import { createTableLocatario, createTables, listarImoveis, listarLocatario} from './src/database/db';
import { buscarLogin, createTablesUsuario, deletarLogin, deleteLogin } from './src/database/dbLogin';
import StackNavigationLogin from './src/navigation/StackNavigationLogin';


export default () => {
  
  const [logado, setLogado] = useState(false)

  DeviceEventEmitter.addListener("event.login", (data) => {
    if (data.token) {
        setLogado(true)
    } else {
        setLogado(false)
    }
})
    
  async function init() {
      await createTables();
      await createTableLocatario();
      await createTablesUsuario();
      //Caso ocorra o problema do undefined no .map, rodar o deletarLogin()
      //await deletarLogin();
      const login = await buscarLogin()
      if(login){
        setLogado(true)
      }
  }
    

    useEffect(() =>{
      init()  
    }, [])


    if(logado){
      return(
      <SafeAreaView style={{flex: 1}}>
                <NavigationContainer style={{flex: 1}}>
                    <StackNavigation />
                </NavigationContainer>
            </SafeAreaView>
            )
    }else{
      return(
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer style={{flex: 1}}>
            <StackNavigationLogin/>
          </NavigationContainer>
        </SafeAreaView>
      )
    }
  }

