import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main.js'
import logo from '../assets/logo.png'

export default function Home({ navigation }) {

    return (
        <View style={{...main.backgroungScreens, ...styles.container}}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.image} />
                <Text style={{...main.title}}>Security System</Text>
            </View>
            <View style={{...main.form}}>
                <ResponsiveButton text="Enter"/>
                <Text style={{...main.secondaryText, marginTop: 15}}>Sign Up</Text>
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
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200
    },
    inputs: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    
});
  