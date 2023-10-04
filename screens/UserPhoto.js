import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main.js';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login ({ navigation }) {
    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
            <View>
                <TouchableOpacity>
                    <Image style={styles.userImage} source={require('../assets/photoIcon.jpg')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.userNameView}>
                <TextInput style={styles.userName} placeholder='Username' placeholderTextColor='white'></TextInput>
                <Icon name='pencil' color='white' size={30} style={styles.icon}></Icon>
            </View>
            <ResponsiveButton text="Confirm" callback={() => {navigation.navigate('Group')}}></ResponsiveButton>
        </View>
    )
}

const styles = StyleSheet.create({
    userImage: {
        borderRadius: 15,
        width: 200,
        height: 200,
    },
    userName: {
        fontSize: 20,
        height: 70,
        width: 100,
        color: 'white',
    },
    userNameView: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 70,

    },
    icon: {
        marginTop: 16,
    },
    backIcon: {
        width: 46,
        height: 30,
    },
    backButton: {
        backgroundColor: 'white',
        borderRadius: 5,
    }
})