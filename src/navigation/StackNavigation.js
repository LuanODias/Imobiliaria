import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ImovelProvider } from "../context/ImovelContext";
import { Button } from "@rneui/themed";
import { Icon } from "@rneui/themed/dist/Icon";
import FormularioImovel from "../components/FormularioImovel";
import Lista from "../components/Lista";
import Login from "../components/paginascredenciais/PaginaLogin";
import Cadastro from "../components/paginascredenciais/PaginaCadastro"
import FormularioLocador from "../components/FormularioLocador";
import FormularioEdicaoImovel from "../components/FormularioEdicaoImovel";
import Configuracoes from "../components/Configuracoes";
import AlterarSenha from "../components/AlterarSenha";



const Stack = createNativeStackNavigator();

export default props => {

    return(
            <Stack.Navigator initialRouteName="ListaImoveis">
                <Stack.Screen name="EditarImovel"
                component={FormularioEdicaoImovel}/>
                <Stack.Screen name="ListaImoveis"
                component={Lista}
                options={({navigation}) =>{
                    return{
                        title: 'Lista de Imóveis',
                        headerRight: () =>
                        <><Button type="clear"
                                icon={<Icon name='settings'
                                    size={30}
                                    color='black' />}
                                onPress={() => navigation.navigate("Configuracoes")} />
                                    <Button type="clear"
                                    icon={<Icon name='add'
                                        size={30}
                                        color='black' />}
                                    onPress={() => navigation.navigate("CadastroImovel")} /></>               
                    }
                }}/>
                <Stack.Screen name="CadastroImovel" 
                component={FormularioImovel}
                options={{title: 'Cadastro de Imóvel'}}/>
                <Stack.Screen name="CadastroLocador"
                component={FormularioLocador}
                options={{title: 'Cadastro de locador'}}/>
                <Stack.Screen name="Configuracoes" component={Configuracoes}/>
                <Stack.Screen name="AlterarSenha" component={AlterarSenha}/>
                
            </Stack.Navigator>
        
    )
}