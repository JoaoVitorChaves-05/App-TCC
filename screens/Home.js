import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import main from '../styles/Main.js'
import logo from '../assets/logo.svg'

export default function Home({ navigation }) {
    const [user, setUser] = useState('')

    return (
        <View style={{...main.backgroungScreens, ...styles.container}}>
            <View>
                <Image source={logo} style={styles.image} />
                <Text style={styles.title}>Security System</Text>
            </View>
            <View style={styles.form}>
                <TouchableOpacity />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 25,
        color: '#FFFFFF'
    },
    form: {
        width: '100vw'
    },
    inputs: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    }
});
  