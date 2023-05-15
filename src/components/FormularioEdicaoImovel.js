import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Switch } from "@rneui/themed/dist/Switch";
import { Button } from "@rneui/themed/dist/Button";
import { editarImovel, salvarImovel } from "../services/ImovelServices";





export default props => {

    const [endereco, setEndereco] = useState(
        props.route != null && props.route.params != null ? props.route.params.endereco : ''
    );

    const [tipoImovel, setTipoImovel] = useState(
        props.route != null && props.route.params != null ? props.route.params.tipoImovel : 1
    );

    const [valorAluguel, setValorAluguel] = useState(
        props.route != null && props.route.params != null ? props.route.params.valorAluguel : 0
    );

    const [valorCondominio, setValorCondominio] = useState(
        props.route != null && props.route.params != null ? props.route.params.valorCondominio : 0
    );

    const [numeroQuartos, setNumeroQuartos] = useState(
        props.route != null && props.route.params != null ? props.route.params.numeroQuartos : 0
    );

    const [numeroBanheiros, setNumeroBanheiros] = useState(
        props.route != null && props.route.params != null ? props.route.params.numeroBanheiros : 0
    );

    const [foto, setFoto] = useState(
        props.route != null && props.route.params != null ? props.route.params.foto : ''
    );

    const [locado, setLocado] = useState(
        props.route != null && props.route.params != null ? props.route.params.locado : false
    );

    const [tipoCadastro, setTipoCadastro] = useState(
        props.route != null && props.route.params != null ? props.route.params.tipoCadastro : 1
    );
   

    const editar = async () => {

        const imovel = {
            id: props.route.params.id,
            endereco: endereco,
            tipoImovel: tipoImovel,
            valorAluguel: valorAluguel,
            valorCondominio: valorCondominio,
            numeroQuartos: numeroQuartos,
            numeroBanheiros: numeroBanheiros,
            foto: foto,
            locado: locado,
            tipoCadastro: tipoCadastro
        }

        await editarImovel(imovel);
        props.navigation.goBack();

    }

    return (
        <View style={style.formulario}>
            <Text>Endereço:</Text>
            <TextInput style={style.input}
                value={endereco}
                onChangeText={setEndereco} />

            <Text>Tipo de imovel:</Text>
            <TextInput style={style.input} placeholder="(Apartamento = 1 e Casa = 2)" value={tipoImovel?.toString()} onChangeText={setTipoImovel} />

            <Text>Valor do imovel:</Text>
            <TextInput style={style.input} keyboardType="numeric" value={valorAluguel?.toString()} onChangeText={setValorAluguel}></TextInput>

            <Text>Valor do condominio:</Text>
            <TextInput style={style.input} keyboardType="numeric" value={valorCondominio?.toString()} onChangeText={setValorCondominio}></TextInput>

            <Text>Quantidade de quartos:</Text>
            <TextInput style={style.input}
                keyboardType="numeric"
                value={numeroQuartos?.toString()}
                onChangeText={setNumeroQuartos} />

            <Text>Quantidade de banheiros:</Text>
            <TextInput style={style.input} keyboardType="numeric" value={numeroBanheiros?.toString()} onChangeText={setNumeroBanheiros}></TextInput>

            <Text>foto:</Text>
            <TextInput style={style.input} value={foto} onChangeText={setFoto}></TextInput>


            <Text>Locado:</Text>
            <Switch value={locado}
                onValueChange={setLocado} />

            <Text>Tipo de contrato:</Text>
            <TextInput placeholder="(Venda = 1 e Locação = 2)" style={style.input} value={tipoCadastro?.toString()} onChangeText={setTipoCadastro}></TextInput>

            <View style={style.botao}>
                <Button title='Salvar' onPress={editar}></Button>
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
