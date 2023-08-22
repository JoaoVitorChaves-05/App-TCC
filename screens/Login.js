import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main.js'

export default function Login ({ navigation }) {
    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
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
                    <TextInput style={{...main.textInput, textAlign: 'center'}} placeholder="Username" />
                </View>
                <View style={{...main.formArea}}>
                    <Text style={{...main.secondaryText}}>Password</Text>
                    <TextInput style={{...main.textInput, textAlign: 'center'}} placeholder="Password" secureTextEntry={true} />
                </View>
                <View style={{...main.formArea}}>
                    <ResponsiveButton text="Confirm" callback={() => navigation.navigate('Group')}/>
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