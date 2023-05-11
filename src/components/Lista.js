import { Alert, View, Text, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import ImovelContext from '../context/ImovelContext'
import { ListItem, Icon } from '@rneui/base'
import FormularioLocador from './FormularioLocador'
import Imovel from '../data/Imovel'
import { listarImoveis } from '../services/ImovelServices'


export default props => {
    //const { state, dispatch } = useContext(ImovelContext)
    
    
    const[imoveis, setImoveis] = useState([])
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

    // const renderizarValorVenda = (imovel) => {
       // return (
           // <ListItem.Title>
         //       {imovel.valorvenda}
       //     </ListItem.Title>
     //   )
   // }

  //  const renderizarValorAluguel = (imovel) => {
    //    return (
      //      <ListItem.Title>
        //        {imovel.valoraluguel}
          //  </ListItem.Title>
       // )
    //}

    function remover(imovel) {
        Alert.alert('Removendo imóvel',
            'Deseja realmente remover este imóvel?',
            [
                {
                    text: "Sim",
                    onPress() {
                         deletarImovel(imovel)
                         carregarLista()
                    }
                },
                {
                    text: "Não"
                }
            ])
    }

    // RenderizarLocadoTrue = () => {
    //     return (
    //         <ListItem.Subtitle>
    //             <Text>Locado: </Text>
    //             <Text>Sim</Text>
    //         </ListItem.Subtitle>
    //     )
    // }

    // const adicionarLocador = (id) =>{
    //     return(
    //         <Icon name='person' onPress={() =>
    //             props.navigation.navigate("CadastroLocador", {id})
    //         } />
    //     )
    // }

    // const renderizarImovelSemLocatario = () =>{
    //     return(
    //         <ListItem.Subtitle>
    //             <Text>Locatario: </Text>
    //             <Text>Sem Locatario</Text>
    //         </ListItem.Subtitle>
    //     )
    // }


    // const renderizarImovelComLocatario = (imovel) =>{
    //     return(
    //         <ListItem.Subtitle>
    //             <Text>Locatario: </Text>
    //             {imovel.nomelocatario}
    //         </ListItem.Subtitle>
    //     )
    // }

    // RenderizarLocadoFalse = () => {
    //     return (
    //         <ListItem.Subtitle>
    //             <Text>Locado: </Text>
    //             <Text>Não</Text>
    //         </ListItem.Subtitle>
    //     )
    // }
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
                                <ListItem.Title>
                                    {imovel.endereco}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    <Text>Tipo de contrato: </Text>
                                    {imovel.tipoContrato}
                                </ListItem.Subtitle>
                                <ListItem.Subtitle>
                                    <Text>Tipo do imóvel: </Text>
                                    {imovel.tipoImovel}
                                </ListItem.Subtitle>
                                <ListItem.Subtitle>
                                    {imovel.locado == 'true' && RenderizarLocadoTrue()}
                                    {imovel.locado == 'false' && RenderizarLocadoFalse()}
                                </ListItem.Subtitle>
                                {/* <ListItem.Subtitle>
                                    {imovel.nomelocatario == 'null' && renderizarImovelSemLocatario()}
                                    {imovel.nomelocatario != 'null' && renderizarImovelComLocatario(imovel)}
                                </ListItem.Subtitle> */}
                                {/* <ListItem.Title>
                                    <Text>R$</Text>
                                    {imovel.tipoContrato == 'Aluguel' && renderizarValorAluguel(imovel)}
                                    {imovel.tipoContrato == 'Venda' && renderizarValorVenda(imovel)}
                                </ListItem.Title> */}
                            </ListItem.Content>
                            {/* {imovel.tipoContrato == 'Aluguel' && imovel.locado == 'false' && adicionarLocador(imovel.id)} */}
                            <Icon name='edit' onPress={() =>
                                props.navigation.navigate("CadastroImovel", imovel)
                            } />
                            <Icon name='delete' onPress={() => remover(imovel)} />
                        </ListItem>
                       
                    )
                })
            }
        </View>
        </ScrollView>
    )

        }

}