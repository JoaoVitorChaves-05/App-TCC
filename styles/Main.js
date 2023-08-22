import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const main = StyleSheet.create({
    backgroundScreens: {
        backgroundColor: '#08074F'
    },
    title: {
        fontSize: 16 * 2,
        color: '#FFFFFF',
        fontFamily: 'Nunito'
    },
    mainText: {
        color: '#FFFFFF',
        fontSize: 16 * 1.33,
        fontFamily: 'Nunito'
    },
    secondaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Nunito'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 200
    },
    formArea: {
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        borderWidth: 1,
        width: wp('80%'),
        padding: 10,
        color: 'black',
        marginTop: 10,
        fontFamily: 'Nunito',
        fontStyle: 'bold'
    }
})

export default main