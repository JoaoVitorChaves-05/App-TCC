import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import ResponsiveButton from "../components/ResponsiveButton.js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import main from "../styles/Main.js";

const tryNavigation = async ({username, email, password}, navigation) => {

    if (!(username && email && password)) return (
        Alert.alert('Please enter all required fields', 'To continue, enter all required fields', [
            {text: 'OK'}
        ])
    )

    return navigation.navigate('UserPhoto', { username: username, email: email, password: password})

}

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={{ ...main.backgroundScreens, ...main.container }}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <Text style={{ ...main.title }}>
          Security System
        </Text>
        <Text style={{ ...main.secondaryText, textAlign: 'center' }}>
          SIGN UP
        </Text>
      </View>
      <View style={{ ...main.form }}>
        <View style={{ ...main.formArea }}>
          <Text style={{ ...main.secondaryText }}>Username</Text>
          <TextInput onChangeText={setUsername} value={username} style={{ ...main.textInput, textAlign: 'center' }} placeholder="Username" />
        </View>
        <View style={{ ...main.formArea }}>
          <Text style={{ ...main.secondaryText }}>E-mail</Text>
          <TextInput onChangeText={setEmail} value={email} style={{ ...main.textInput, textAlign: 'center' }} placeholder="E-mail" />
        </View>
        <View style={{ ...main.formArea }}>
          <Text style={{ ...main.secondaryText }}>Password</Text>
          <TextInput onChangeText={setPassword} value={password} style={{ ...main.textInput, textAlign: 'center' }} placeholder="Password" secureTextEntry={true} />
        </View>
        <View style={{ ...main.formArea }}>
          <ResponsiveButton text="Confirm" callback={() => tryNavigation({username, email, password}, navigation)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: hp('5%'),
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%')
  },
  formArea: {
    marginBottom: 20,
  },
});
