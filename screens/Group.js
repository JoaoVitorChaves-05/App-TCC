import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import main from '../styles/Main';













export default function Group({ navigation }) {
    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
            <View style={styles.header}>
                <View style={styles.photo}>
                    <View style={styles.online}></View>
                </View>
                <Text style={{...main.mainText}}>Welcome, User!</Text>
            </View>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    photo: {
        width: wp('15%'),
        height: hp('15%')
    },
    online: {
        position: 'relative',
        right: 0,
        bottom: 0,
        backgroundColor: '#15FF10',
        width: wp('2%'),
        height: hp('2%')
    }
})