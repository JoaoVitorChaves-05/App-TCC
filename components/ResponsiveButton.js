import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import main from '../styles/Main.js'

export default function ResponsiveButton({ text, callback }) {

    return (
        <TouchableOpacity style={styles.button} onPress={callback}>
            <View style={styles.buttonText}>
                <Text style={{...main.mainText, textAlign: 'center'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "#3D45F5",
        borderRadius: 20
    },
    buttonText: {
        width: wp('80%')
    }
})