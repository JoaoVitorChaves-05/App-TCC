import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import main from "../styles/Main.js";
import ModalEditUsers from "./modalEditUsers.js";
import { useState } from "react";

export default function UserItem({token, currentGroup, setCurrentGroup, username, user_id, isAdmin, editMode, userProfileId, setNeedFetch}) {

    const [visible, setVisible] = useState(false)

    if (!editMode) {
        return (
            <View style={styles.user}>
                <View style={{...styles.userItem}}>
                    <View style={styles.photo}></View>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{username}</Text>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{isAdmin ? 'Admin' : 'Authorized '}</Text>
                </View>
            </View>
        )
    } else {
        return userProfileId != user_id ? (
            <View style={styles.user}>
                <ModalEditUsers token={token} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} currentPermission={isAdmin} user_id={user_id} visible={visible} setVisible={setVisible} setNeedFetch={setNeedFetch} />
                <View style={{...styles.userItem}}>
                    <View style={styles.photo}></View>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{username}</Text>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{isAdmin ? 'Admin' : 'Authorized '}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(!visible)} style={[{width: wp('15%'), padding: 10, backgroundColor: '#FFFFFF', borderRadius: 15, marginLeft: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}]}>
                    <Icon name="gear" size={20}></Icon>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.user}>
                <View style={{...styles.userItem}}>
                    <View style={styles.photo}></View>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{username}</Text>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{isAdmin ? 'Admin' : 'Authorized '}</Text>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    user: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        padding: 5
    },
    userItem: {
        flex: 1
    },
    photo: {
        width: wp('15%'),
        height: hp('7.5%'),
        backgroundColor: '#ffffff',
        borderRadius: wp('50%'),
    },
    userItemEditMode: {
        flex: 0.2
    }
})