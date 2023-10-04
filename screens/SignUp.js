<<<<<<< HEAD
import { Text, View, StyleSheet, TextInput} from "react-native";
import ResponsiveButton from '../components/ResponsiveButton.js';

=======
import { Text, View, StyleSheet, TextInput} from "react-native"
import ResponsiveButton from "../components/ResponsiveButton.js"
>>>>>>> userPhoto
import main from "../styles/Main.js"

export default function SignUp({ navigation }) {

    return (
        <View styles={{...main.backgroungScreens, ...styles.container}}>
            <View style={styles.header}>
                <Text style={{...main.title}}>
                    Security System
                </Text>
                <Text style={{...main.secondaryText}}>
                    LOGIN
                </Text>
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