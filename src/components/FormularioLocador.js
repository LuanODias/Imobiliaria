import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { addLocatario, inserirLocatario, atualizarLocado } from '../database/db'

const FormularioLocador = props => {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rendaMensal, setRendaMensal] = useState(0);
    const [diaVencimentoAluguel, setDiaVencimentoAluguel] = useState("");
    const [dataInicioContrato, setdataInicioContrato] = useState("");
    const [dataFimContrato, setdataFimContrato] = useState("");

    console.warn(props);
    const salvar = () => {
        
        const locatario = {
            nome: nome,
            cpf: cpf,
            rendaMensal: rendaMensal,
            diaVencimentoAluguel: diaVencimentoAluguel,
            dataInicioContrato: dataInicioContrato,
            dataFimContrato: dataFimContrato,
            imovel: props.route.params.id
        }
        addLocatario(locatario)
        inserirLocatario(locatario)
        atualizarLocado(locatario)
        
        props.navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.formulario}>
                <Text>Nome do locatário(a):</Text>
                <TextInput value={nome}
                    onChangeText={nome => setNome(nome)}
                    style={styles.input} />


                <Text>CPF:</Text>
                <TextInput value={cpf}
                    onChangeText={cpf => setCpf(cpf)}
                    style={styles.input} />

                <Text>Renda Mensal:</Text>
                <TextInput value={rendaMensal}
                    onChangeText={rendaMensal => setRendaMensal(rendaMensal)}
                    style={styles.input}
                    keyboardType='numeric' />

                <Text>Dia para vencimento do aluguel:</Text>
                <TextInput value={diaVencimentoAluguel}
                    onChangeText={diaVencimentoAluguel => setDiaVencimentoAluguel(diaVencimentoAluguel)}
                    style={styles.input}
                    keyboardType='numeric' />

                <Text>Data do início do contrato:</Text>
                <TextInput value={dataInicioContrato}
                    onChangeText={dataInicioContrato => setdataInicioContrato(dataInicioContrato)}
                    style={styles.input} />

                <Text>Data do término do contrato:</Text>
                <TextInput value={dataFimContrato}
                    onChangeText={dataTerminoContrato => setdataFimContrato(dataTerminoContrato)}
                    style={styles.input} />


                <View style={{marginTop: 10}}>
                    <Button title='Salvar' onPress={salvar} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formulario: {
        padding: 30
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray'
    }
})

export default FormularioLocador;
