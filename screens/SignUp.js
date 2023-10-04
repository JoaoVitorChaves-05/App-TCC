import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import ResponsiveButton from "../components/ResponsiveButton.js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import main from "../styles/Main.js";

export default function SignUp({ navigation }) {
  console.log({ ...main.backgroundScreens });
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
          <TextInput style={{ ...main.textInput, textAlign: 'center' }} placeholder="Username" />
        </View>
        <View style={{ ...main.formArea }}>
          <Text style={{ ...main.secondaryText }}>E-mail</Text>
          <TextInput style={{ ...main.textInput, textAlign: 'center' }} placeholder="E-mail" />
        </View>
        <View style={{ ...main.formArea }}>
          <Text style={{ ...main.secondaryText }}>Password</Text>
          <TextInput style={{ ...main.textInput, textAlign: 'center' }} placeholder="Password" secureTextEntry={true} />
        </View>
        <View style={{ ...main.formArea }}>
          <ResponsiveButton text="Confirm" callback={() => navigation.navigate('UserPhoto')} />
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
