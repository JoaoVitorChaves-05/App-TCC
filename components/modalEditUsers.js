import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert, Modal, Pressable, TouchableOpacity} from 'react-native';

import ResponsiveButton from '../components/ResponsiveButton.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import getIPAddress from './getIPAddress.js';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ModalEditUsers({token, currentGroup, setCurrentGroup, currentPermission, user_id, visible, setVisible, setNeedFetch}) {
    
    const [isAdmin, setIsAdmin] = useState(currentPermission)
    
    const updateUserPermissions = async () => {
        const result = await fetch(`http://${getIPAddress()}:3000/group/user`, {
            method: 'PUT', 
            body: JSON.stringify({token, user_id, group_id: currentGroup.group_id, changeToAdmin: isAdmin}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        if (result.status) {
            setNeedFetch(true)
            setCurrentGroup(currentGroup)
        } else {
            Alert.alert('Ops! Something went wrong', result.message, [
                {
                    text: 'OK'
                }
            ])
        }

        setVisible(false)
    }

    const removeUserPermissions = async () => {
        const result = await fetch(`http://${getIPAddress()}:3000/group/user`, {
            method: 'DELETE',
            body: JSON.stringify({token, user_to_remove_id: user_id, group_id: currentGroup.group_id}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .catch(err => console.log(err))

        if (result.status) {
            setNeedFetch(true)
            setCurrentGroup(currentGroup)
        } else {
            Alert.alert('Ops! Something went wrong', result.message, [
                {
                    text: 'OK'
                }
            ])
        }

        setVisible(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={visible}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible)
            }}
        >
            <View style={styles.overlay}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.groupNameText}>
                            <Text style={styles.modalText}>Permissions:</Text>
                        </View>
                        <TouchableOpacity style={styles.checkBox} onPress={() => setIsAdmin(!isAdmin)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{ marginLeft: 8, color: 'white', fontSize: 32}}>Admin: </Text>
                                <Ionicons
                                    name={isAdmin ? 'checkbox-outline' : 'square-outline'}
                                    size={32}
                                    color={'white'}
                                />
                            </View>
                        </TouchableOpacity>

                        <ResponsiveButton text="Save" callback={() => updateUserPermissions()}/>
                        <ResponsiveButton text="Remove user" callback={() => removeUserPermissions()}/>

                        <Pressable
                            style={[styles.button, styles.buttonClose, {marginTop: 20}]}
                            onPress={() => setVisible(!visible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

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
        width: '100%',
        textAlign: 'center',
        fontSize: 38
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
    },
    checkBox: {
        backgroundColor: '#6564D0',
        padding: 10, 
        borderRadius: 20, 
        margin: 10 
    }
})