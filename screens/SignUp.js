import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert} from "react-native";
import axios from "axios";
import ResponsiveButton from '../components/ResponsiveButton.js';
import { StatusBar } from 'expo-status-bar';

import main from "../styles/Main.js";

const trySignUp = async ({username, email, password}, navigation) => {

    const url = 'http://localhost:3000/user/signIn'

    const response = await axios.post(url, {username, email, password})
    .then((response) => response.json())

    if (response.success)
        return navigation.navigate('SignIn')

    Alert.alert(response.message, [
        {
            text: 'OK'
        }
    ])
}

export default function SignUp({ navigation }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
            <StatusBar style='light' />
            <View style={styles.header}>
                <Text style={{...main.title}}>
                    Security System
                </Text>
                <Text style={{...main.secondaryText, textAlign: 'center'}}>
                    SIGN UP
                </Text>
            </View>
            <View style={{...main.form}}>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Username</Text>
                    <TextInput onChange={setUsername} value={username} style={{...main.textInput, textAlign: 'center'}} placeholder="Username" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>E-mail</Text>
                    <TextInput onChange={setEmail} value={email} style={{...main.textInput, textAlign: 'center'}} placeholder="E-mail" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Password</Text>
                    <TextInput onChange={setPassword} value={password} style={{...main.textInput, textAlign: 'center'}} placeholder="Password" secureTextEntry={true} />
                </View>
                <View style={{...main.formArea}}>
                    <ResponsiveButton text="Confirm" callback={() => trySignUp({username, email, password}, navigation)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})