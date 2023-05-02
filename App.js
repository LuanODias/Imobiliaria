import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation'
import { createTableLocatario, createTables, listarImoveis, listarLocatario} from './src/database/db';


export default () => {
  
    
  async function init() {
    try {
      await createTables();
      await createTableLocatario();
      await listarImoveis();
      // console.log(await listarLocatario());
    } catch (error) {
      console.error("Error initializing the database:", error);
    }
  }
    

    useEffect(() =>{
      init()
    }, [])

    return(
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer style={{flex: 1}}>
          <StackNavigation>

          </StackNavigation>
        </NavigationContainer>
      </SafeAreaView>
    )
  
  
  
  }

