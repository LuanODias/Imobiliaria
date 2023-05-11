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


const Stack = createNativeStackNavigator();

export default props => {

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name='Login'
                component={Login}
                options={({ navigation }) => {
                    return {
                        title: 'Login',
                        headerRight: () =>
                            <Button
                                type='clear'
                                icon={<Icon name='add'
                                    size={30}
                                    color='black' />}
                                onPress={() => navigation.
                                    navigate("CadastroUsuario")}
                            />
                    }
                }}>
            </Stack.Screen>
            <Stack.Screen name='CadastroUsuario'
                component={Cadastro}
                options={{ title: 'Cadastro de Novo Usuário' }}>
            </Stack.Screen>
        </Stack.Navigator>
    )
}