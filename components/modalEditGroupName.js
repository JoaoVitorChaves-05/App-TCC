import { useState } from "react"
import { Alert, Modal, StyleSheet, View, TextInput, Pressable, Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import getIPAddress from "./getIPAddress"
import ResponsiveButton from "./ResponsiveButton"


export default function modalEditGroupName({visible, setVisible, token, setCurrentGroup, currentGroup, setNeedFetch}) {

    const updateGroupName = async () => {
        const result = await fetch(`http://${getIPAddress()}:3000/group`, {
            method: 'PUT',
            body: JSON.stringify({token, group_name: groupName, group_id: currentGroup.group_id}),
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

    const [groupName, setGroupName] = useState('')

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
                            <Text style={styles.modalText}>Group Name:</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="New group name here"
                            value={groupName}
                            onChangeText={setGroupName}
                        />

                        <ResponsiveButton text="Confirm" callback={() => updateGroupName()}/>

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
        width: '45%'

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
})