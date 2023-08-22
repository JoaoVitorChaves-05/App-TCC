import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
            <View style={styles.mainContainer}>
                <View style={styles.mainContainerHeader}>
                    <Text style={{...main.mainText}}>Your groups</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity>
                            <Text>S</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>R</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>C</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.group}>
                    <Text style={{...main.title}}>Group name</Text>
                </View>
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
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    mainContainerHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    group: {
        backgroundColor: '#6564D0',
        borderRadius: 15,
        padding: 20
    }
})