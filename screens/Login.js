import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main.js'
import getIPAddress from '../components/getIPAddress.js';

const tryLogin = async ({username, password, setPassword}, navigation) => {
    const url = `http://${getIPAddress()}:3000/user/signIn`

    const response = await fetch(url, { method: 'POST', body: JSON.stringify({username, password}), headers: {'Content-Type': 'application/json'} }) 
    .then((response) => response.json())
    .then((response) => response)

    console.log(response)

    if (response.auth)
        return navigation.navigate('Group', {token: response.token})
    
    Alert.alert('Login is invalid', 'The username and/or password is incorrect.', [
        {
            text: 'OK',
            onPress: () => setPassword('')
        }
    ])

}

export default function Login ({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <Text style={{...main.title}}>
                    Security System
                </Text>
                <Text style={{...main.secondaryText}}>
                    LOGIN
                </Text>
            </View>
            <View style={{...main.form}}>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Username</Text>
                    <TextInput onChangeText={setUsername} value={username} style={{...main.textInput, textAlign: 'center'}} placeholder="Username" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Password</Text>
                    <TextInput onChangeText={setPassword} value={password} style={{...main.textInput, textAlign: 'center'}} placeholder="Password" secureTextEntry={true} />
                </View>
                <View style={{...main.formArea}}>
                    <ResponsiveButton text="Confirm" callback={() => tryLogin({username, password, setPassword}, navigation)}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formArea: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})