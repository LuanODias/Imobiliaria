import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Switch } from "@rneui/themed/dist/Switch";
import { Button } from "@rneui/themed/dist/Button";
import { addImovel, editarImovel } from "../database/db";

export default props => {

    const [imovel, setImovel] = useState(
        props.route != null &&
            props.route.params != null ?
            props.route.params : {}
    )

    const salvar = async () => {
        if(imovel.id != null){
            await editarImovel(imovel);
            props.navigation.goBack();
        }else{
            await addImovel(imovel);
            props.navigation.goBack();
        }
        
      }


    const renderizarValorCondominio = () => {
        return (
            <>
                <Text>Valor do condominio</Text>
                <TextInput style={style.input} keyboardType="numeric" value={imovel.condominio?.toString()} onChangeText={valorCondominio => setImovel({ ...imovel, valorCondominio })}></TextInput>
            </>
        )
    }

    const renderizarValorAluguel = () => {
        return (
            <>
                <Text>Valor do aluguel: </Text>
                <TextInput style={style.input} keyboardType="numeric" value={imovel.valoraluguel?.toString()} onChangeText={aluguel => setImovel({...imovel, valoraluguel: aluguel})}></TextInput>
            </>
        )
    }

    const renderizarValorVenda = () => {
        return (
            <>
                <Text>Valor da venda: </Text>
                <TextInput style={style.input} keyboardType="numeric" value={imovel.valorvenda?.toString()} onChangeText={venda => setImovel({...imovel, valorvenda: venda})} />
            </>
        )
    }

    const renderizarNomeLocatario = () => {
        return (
            <>
                <Text>Nome do locatario: </Text>
                <TextInput style={style.input} value={imovel.nomelocatario} onChange={event => setImovel({ ...imovel, nomelocatario: event.nativeEvent.text })}></TextInput>
            </>
        )
    }

    {
        imovel.tipoContrato = imovel.tipoContrato == undefined ? 'Venda' : imovel.tipoContrato
    }
    {
        imovel.tipoImovel = imovel.tipoImovel == undefined ? 'Casa' : imovel.tipoImovel
    }
    return (

        <View style={style.formulario}>
            <Text>Tipo de contrato:</Text>
            <Picker selectedValue={imovel.tipoContrato} onValueChange={(itemValue, itemIndex) => {
                setImovel({ ...imovel, tipoContrato: itemValue })
            }}>
                <Picker.Item label="Venda" value={'Venda'} />
                <Picker.Item label="Aluguel" value={'Aluguel'} />
            </Picker>


            <Text>Tipo de imovel:</Text>
            <Picker selectedValue={imovel.tipoImovel} onValueChange={(itemValue, itemIndex) => {
                setImovel({ ...imovel, tipoImovel: itemValue })
            }}>

                <Picker.Item label="Casa" value={'Casa'} />
                <Picker.Item label="Apartamento" value={'Apartamento'} />
            </Picker>

            <Text>Endereço:</Text>
            <TextInput style={style.input}
                value={imovel.endereco?.toString()}
                onChangeText={endereco => setImovel({ ...imovel, endereco })} />

            {imovel.tipoContrato == 'Venda' && renderizarValorVenda()}
            {imovel.tipoContrato == 'Aluguel' && renderizarValorAluguel()}

            <Text>Quantidade de quartos:</Text>
            <TextInput style={style.input}
                keyboardType="numeric"
                value={imovel.qtdquartos?.toString()}
                onChangeText={quartos => setImovel({...imovel, qtdquartos: quartos})} />

            <Text>Quantidade de banheiros:</Text>
            <TextInput style={style.input} keyboardType="numeric" value={imovel.qtdbanheiros?.toString()} onChangeText={banheiro => setImovel({...imovel, qtdbanheiros: banheiro })}></TextInput>

            <Text>Locado:</Text>
            <Switch value={imovel.locado}
                onValueChange={locado => setImovel({ ...imovel, locado: locado })} />
            {
                imovel.locado == true && renderizarNomeLocatario()
            }

            {
                imovel.tipoImovel != null && imovel.tipoImovel == 'Apartamento' && renderizarValorCondominio()
            }
            <View style={style.botao}>
                <Button title='Salvar' onPress={salvar}></Button>
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