import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert, Modal, Pressable, TextInput} from 'react-native';

import ResponsiveButton from '../components/ResponsiveButton.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function modalAddGroup({visible, setVisible}){    
    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed');
            setVisible(!visible);
        }}>
        <View style={styles.overlay}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.groupNameText}>
                <Text style={styles.modalText}>Group Key Code:</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Group key code here"
              />

              <ResponsiveButton text="Confirm" callback={() => setVisible(!visible)}/>

              <Pressable
                style={[styles.button, styles.buttonClose, {marginTop: 20}]}
                onPress={() => setVisible(!visible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

            </View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: wp('100%'),
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    color: 'white',
    borderRadius: 5,
    textAlign : 'left',
    width: '50%'

  },
  input : {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    width: '100%',
    padding: 15
  },
  groupNameText: {
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente para simular o desfoque
    justifyContent: 'center',
    alignItems: 'center',
  }
});
