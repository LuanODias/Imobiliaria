import { Dimensions, StyleSheet, Text, TextInput, View, Image, Pressable } from 'react-native'
import React from 'react'


import image from '../../assets/barracadastro.jpg';
import { Button } from '@rneui/themed';

const heigth = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const PaginaLogin = () => {
    return (
        <>

            <View style={styles.tela}>
                <Text style={styles.titulo}>Imobiliária</Text>
                <Text style={styles.subtitulo}>Não vendemos apenas casas, vendemos sonhos!</Text>
                <Image style={styles.imagem} blurRadius={4} source={image}></Image>
                    <Text style={styles.login}>Login</Text>
                <TextInput style={styles.input} placeholder='E-mail' />
                <TextInput style={styles.input} secureTextEntry={true} placeholder='Senha' />
                <View style={{ width: width * 0.9, borderRadius: 5, marginTop: 10, }}>
                    <Button title="Logar" color={"#43481D"} />
                    <Text style={styles.link}>Não possui conta? Cadastre-se</Text>
                </View>

            </View>
        </>

    )
}

export default PaginaLogin

const styles = StyleSheet.create({
    tela: {
        alignItems: 'center',
        justifyContent: 'center',
        height: heigth * 0.6,
        marginTop: '10%',
    },
    titulo: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#43481D',
        marginBottom: '100%',
        position: 'absolute',
        zIndex: 1,
    },
    subtitulo: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#43481D',
        position: 'absolute',
        zIndex: 1,
    },
    login: {
        marginTop: 5,
        fontSize: 32,
        color: '#43481D',
        fontWeight: 'bold',
    },
    input: {
        width: width * 0.9,
        borderRadius: 5,
        margin: 10,
        padding: 12,
        borderWidth: 2,
        borderColor: '#43481D'
    },
    imagem: {
        width: '100%',
        height: heigth * 0.5,
        marginTop: -7,
        opacity: 0.7
    },
    link: {
        color: '#3366CC',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        textDecorationLine: 'underline'

    }
})