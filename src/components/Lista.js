import { Alert, View, Text, ScrollView, Image, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import ImovelContext from '../context/ImovelContext'
import { ListItem, Icon } from '@rneui/base'
import FormularioLocador from './FormularioLocador'
import { listarImoveis } from '../services/ImovelServices'



const height = Dimensions.get('screen').height;

export default props => {
    //const { state, dispatch } = useContext(ImovelContext)


    const [imoveis, setImoveis] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function carregarLista() {
        const listaImovelApi = await listarImoveis()
        setImoveis(listaImovelApi)
        setIsLoading(false)
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            carregarLista()
        })
    }, [])

   
    function remover(imovel) {
        Alert.alert('Removendo imóvel',
            'Deseja realmente remover este imóvel?',
            [
                {
                    text: "Sim",
                    onPress() {
                        //deletarImovel (imovel)
                        carregarLista()
                    }
                },
                {
                    text: "Não"
                }
            ])
    }

    const renderizarTipoVenda = () => {
        return (
            <Text>Venda</Text>
        )
    }

    const renderizarTipoAluguel = () => {
        return (
            <Text>Aluguel</Text>
        )
    }

    const renderizarTipoApartamento = () => {
        return (
            <Text>Apartamento</Text>
        )
    }

    const renderizarTipoCasa = () => {
        return (
            <Text>Casa</Text>
        )
    }

    if (isLoading) {
        return (
            <Text>Loading...</Text>
        )
    } else {
        console.warn(imoveis);
        
        return (
            <ScrollView>
                <View>
                    {
                        
                        imoveis.map(imovel => {
                            return (
                                <ListItem key={imovel.id}>
                                    <ListItem.Content>
                                        <Image style={{width: "100%", height: height * 0.20}} source={{uri: imovel.foto !=  "" ? imovel.foto : "https://www.brognoli.com.br/images/fotos/40570/imFt0bkMS_40570645934b3502dc.jpg"}}/>
                                            <Text>{imovel.endereco}</Text>
                                            <Text>Tipo de contrato: </Text>
                                            {imovel.tipoCadastro == 1 && renderizarTipoVenda()}
                                            {imovel.tipoCadastro == 2 && renderizarTipoAluguel()}
                                            <Text>Tipo do imóvel: </Text>
                                            {imovel.tipoImovel == 1 && renderizarTipoApartamento()}
                                            {imovel.tipoImovel == 2 && renderizarTipoCasa()}

                                            {/* {imovel.locado == 'true' && RenderizarLocadoTrue()} */}
                                            {/* {imovel.locado == 'false' && RenderizarLocadoFalse()} */}

                                        {/* <ListItem.Subtitle>
                                    {imovel.nomelocatario == 'null' && renderizarImovelSemLocatario()}
                                    {imovel.nomelocatario != 'null' && renderizarImovelComLocatario(imovel)}
                                </ListItem.Subtitle> */}
                                        {/* <ListItem.Title>
                                    <Text>R$</Text>
                                    {imovel.tipoContrato == 'Aluguel' && renderizarValorAluguel(imovel)}
                                    {imovel.tipoContrato == 'Venda' && renderizarValorVenda(imovel)}
                                </ListItem.Title> */}
                                <Icon name='edit' onPress={() =>
                                        props.navigation.navigate("CadastroImovel", imovel)
                                    } />
                                    <Icon name='delete' onPress={() => remover(imovel)} />
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