import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Switch } from "@rneui/themed/dist/Switch";
import { Button } from "@rneui/themed/dist/Button";
import { addImovel, editarImovel } from "../database/db";



   

export default props => {

    
    const [endereco, setEndereco] = useState('');
    const [tipoImovel, setTipoImovel] = useState(1);
    const [valorAluguel, setValorAluguel] = useState(0);
    const [valorCondominio, setValorCondominio] = useState(0);
    const [numeroQuartos, setNumeroQuartos] = useState(0);
    const [numeroBanheiros, setNumeroBanheiros] = useState(0);
    const [foto, setFoto] = useState('');
    const [locado, setLocado] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState(1);

    const salvarImovel = async () => {
        

    const salvar = async () => {

        if (imovel.id != null) {
            await editarImovel(imovel);
            props.navigation.goBack();
        } else {

            await addImovel(imovel);
            props.navigation.goBack();
        }

    }

    return (
            <View style={style.formulario}>


                <Text>Endereço:</Text>
                <TextInput style={style.input}
                    value={endereco}
                    onChangeText={setEndereco} />

                <Text>Tipo de imovel:</Text>
                <TextInput placeholder="(Apartamento = 1 e Casa = 2)" value={tipoImovel} onChangeText={setTipoImovel} />

                <Text>Valor do imovel:</Text>
                <TextInput style={style.input} keyboardType="numeric" value={valorAluguel} onChangeText={setValorAluguel}></TextInput>

                <Text>Valor do condominio:</Text>
                <TextInput style={style.input} keyboardType="numeric" value={valorCondominio} onChangeText={setValorCondominio}></TextInput>

                <Text>Quantidade de quartos:</Text>
                <TextInput style={style.input}
                    keyboardType="numeric"
                    value={numeroQuartos}
                    onChangeText={setNumeroQuartos} />

                <Text>Quantidade de banheiros:</Text>
                <TextInput style={style.input} keyboardType="numeric" value={numeroBanheiros} onChangeText={setNumeroBanheiros}></TextInput>

                <Text>foto:</Text>
                <TextInput style={style.input} value={foto} onChangeText={setFoto}></TextInput>


                <Text>Locado:</Text>
                <Switch value={locado}
                    onValueChange={setLocado} />

                <Text>Tipo de contrato:</Text>
                <TextInput placeholder="(Venda = 1 e Locação = 2)" style={style.input} value={tipoCadastro} onChangeText={setTipoCadastro}></TextInput>

                <View style={style.botao}>
                    <Button title='Salvar' onPress={salvarImovel}></Button>
                </View>
            </View>
    )
}

const style = StyleSheet.create({
    formulario: {
        padding: 30
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray'
    },
    labelApresentar: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    botao: {
        marginTop: 10
    }
})
}