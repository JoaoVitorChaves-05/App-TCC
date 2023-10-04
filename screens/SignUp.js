
import { Text, View, StyleSheet, TextInput} from "react-native";
import ResponsiveButton from '../components/ResponsiveButton.js';
import { StatusBar } from 'expo-status-bar';

import main from "../styles/Main.js"

export default function SignUp({ navigation }) {
    console.log({...main.backgroundScreens})
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
                    <TextInput style={{...main.textInput, textAlign: 'center'}} placeholder="Username" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>E-mail</Text>
                    <TextInput style={{...main.textInput, textAlign: 'center'}} placeholder="E-mail" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Password</Text>
                    <TextInput style={{...main.textInput, textAlign: 'center'}} placeholder="Password" secureTextEntry={true} />
                </View>
                <View style={{...main.form}}>
                    <View style={styles.formArea}>
                        <Text style={{...main.secondaryText}}>Fullname</Text>
                        <TextInput placeholder="Fullname" />
                    </View>
                    <View style={styles.formArea}>
                        <Text style={{...main.secondaryText}}>CPF</Text>
                        <TextInput placeholder="CPF" />
                    </View>
                    <View style={styles.formArea}>
                        <Text style={{...main.secondaryText}}>E-mail</Text>
                        <TextInput placeholder="E-mail" />
                    </View>
                    <View style={styles.formArea}>
                        <Text style={{...main.secondaryText}}>Password</Text>
                        <TextInput placeholder="Password" secureTextEntry={true} />
                    </View>
                    <View style={styles.formArea}>
                        <ResponsiveButton text="Confirm" callback={() => navigation.navigate("UserPhoto")} />
                    </View>
                    <View style={{...main.formArea}}>
                        <ResponsiveButton text="Confirm" callback={() => navigation.navigate('Group')}/>
                    </View>
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