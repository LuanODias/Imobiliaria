import { Alert, View, Text, ScrollView, Image, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import ImovelContext from '../context/ImovelContext'
import { ListItem, Icon } from '@rneui/base'
import FormularioLocador from './FormularioLocador'
import { deletarImovel, listarImoveis, listarImoveisFiltro } from '../services/ImovelServices'
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaFrame } from 'react-native-safe-area-context'



const height = Dimensions.get('screen').height;

export default props => {
    //const { state, dispatch } = useContext(ImovelContext)

    const [filtro, setFiltro] = useState(1)
    const [imoveis, setImoveis] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function carregarLista() {

            const listaImovelApi = await listarImoveis()
            setImoveis(listaImovelApi)
            setIsLoading(false)
            console.log(filtro)

    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            carregarLista(filtro)
        })
    }, [])


    const remover = (imovel) => {
        Alert.alert('Removendo imóvel',
            'Deseja realmente remover este imóvel?',
            [
                {
                    text: "Sim",
                    async onPress() {
                        console.warn(imovel.id);
                        await deletarImovel(imovel.id);
                        await carregarLista()
                    }
                },
                {
                    text: "Não"
                }
            ])
    }

    const renderizarTipoVenda = () => {
        return (
            <Text style={styles.subitituloItem}>Venda</Text>
        )
    }

    const renderizarTipoAluguel = () => {
        return (
            <Text style={styles.subitituloItem}>Aluguel</Text>
        )
    }

    const renderizarTipoApartamento = () => {
        return (
            <Text style={styles.subitituloItem}>Apartamento</Text>
        )
    }

    const renderizarTipoCasa = () => {
        return (
            <Text style={styles.subitituloItem}>Casa</Text>
        )
    }

    const RenderizarLocadoTrue = () => {
        return (
            <Text style={styles.subitituloItem}>Sim</Text>
        )
    }

    const RenderizarLocadoFalse = () => {
        return (
            <Text style={styles.subitituloItem}>Não</Text>
        )
    }

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        return (

            <ScrollView>
                <View style={{ borderWidth: 1 }}>
                    <Picker
                        selectedValue={filtro}
                        onValueChange={(itemValue, itemIndex) =>
                            setFiltro(itemValue)
                        } 
                        >
                        <Picker.Item label="Todos" value="1"  />
                        <Picker.Item label="Apartamento" value="2" />
                        <Picker.Item label="Casa" value='3' />
                    </Picker>
                </View>
                <View>

                    {
                        
                        imoveis.map(imovel => {
                            return (
                                <ListItem key={imovel.id}>
                                    <ListItem.Content>
                                        <Image style={{ width: "100%", height: height * 0.20 }} source={{ uri: imovel.foto != "" ? imovel.foto : "https://www.brognoli.com.br/images/fotos/40570/imFt0bkMS_40570645934b3502dc.jpg" }} />
                                        <Text style={styles.titulo}>{imovel.endereco}</Text>
                                        <View style={styles.row}>
                                            <Text style={styles.subititulo}>Tipo de contrato:</Text>
                                            {imovel.tipoCadastro == 1 && renderizarTipoVenda()}
                                            {imovel.tipoCadastro == 2 && renderizarTipoAluguel()}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.subititulo}>Tipo do imóvel:</Text>
                                            {imovel.tipoImovel == 1 && renderizarTipoApartamento()}
                                            {imovel.tipoImovel == 2 && renderizarTipoCasa()}
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.subititulo}>Número de quartos:</Text>
                                            <Text style={styles.subitituloItem}>{imovel.numeroQuartos}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.subititulo}>Número de banheiros:</Text>
                                            <Text style={styles.subitituloItem}>{imovel.numeroBanheiros}</Text>
                                        </View>

                                        <View style={styles.row}>
                                            <Text style={styles.subititulo}>Locado:</Text>
                                            {imovel.locado == true && RenderizarLocadoTrue()}
                                            {imovel.locado == false && RenderizarLocadoFalse()}
                                        </View>


                                        {/* 
                                    {imovel.nomelocatario == 'null' && renderizarImovelSemLocatario()}
                                    {imovel.nomelocatario != 'null' && renderizarImovelComLocatario(imovel)}
                                     */}
                                        <View style={styles.row}>
                                            <Text style={styles.titulo}>R$</Text>
                                            <Text style={styles.titulo}>{imovel.valorAluguel}</Text>
                                        </View>
                                        <View style={styles.rowCenter}>
                                            <Icon name='edit' onPress={() =>
                                                props.navigation.navigate("EditarImovel", imovel)
                                            } />
                                            <Icon name='delete' onPress={() => remover(imovel)} />
                                        </View>
                                    </ListItem.Content>
                                    {/* {imovel.tipoContrato == 'Aluguel' && imovel.locado == 'false' && adicionarLocador(imovel.id)} */}


                                </ListItem>

                            )
                        })
                    }
                </View>
            </ScrollView>
        )

    }

}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        color: 'black',
        marginTop: 3,
        fontWeight: 600
    },
    subititulo: {
        fontSize: 14,
        color: 'black',
        padding: 1,
        fontWeight: 600
    },
    subitituloItem: {
        fontSize: 14,
        color: 'black',
        padding: 1,
    },
    row: {
        flexDirection: 'row'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    }
})