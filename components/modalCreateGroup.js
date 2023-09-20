import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert, FlatList, Modal, Pressable} from 'react-native';

export default function createGroup({createGroupModalVisible, setCreateGroupModalVisible}){    
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={createGroupModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed');
                    setCreateGroupModalVisible(!createGroupModalVisible);
                }}>
                <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setCreateGroupModalVisible(!createGroupModalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
            </Modal>
        </View>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
