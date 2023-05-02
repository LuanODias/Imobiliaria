import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ImovelProvider } from "../context/ImovelContext";
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/themed/dist/Icon";
import FormularioImovel from "../components/FormularioImovel";
import Lista from "../components/Lista";
import FormularioLocador from "../components/FormularioLocador";



const Stack = createNativeStackNavigator();

export default props => {

    return(
            <Stack.Navigator initialRouteName="ListaImoveis">
                <Stack.Screen name="ListaImoveis"
                component={Lista}
                options={({navigation}) =>{
                    return{
                        title: 'Lista de Imóveis',
                        headerRight: () =>
                        <Button type="clear"
                        icon={<Icon name='add'
                        size={30}
                        color='black'
                    />}
                    onPress={() => navigation.navigate("CadastroImovel")}
                    />
                    }
                }}/>
                <Stack.Screen name="CadastroImovel" 
                component={FormularioImovel}
                options={{title: 'Cadastro de Imóvel'}}/>
                <Stack.Screen name="CadastroLocador"
                component={FormularioLocador}
                options={{title: 'Cadastro de locador'}}/>
                
            </Stack.Navigator>
        
    )
}