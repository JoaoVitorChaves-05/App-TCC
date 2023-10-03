import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import main from "../styles/Main.js";

export default function UserItem({username, position, editMode}) {
    console.log(username, position)

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
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{position}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.user}>
                <View style={{...styles.userItem}}>
                    <View style={styles.photo}></View>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{username}</Text>
                </View>
                <View style={{...styles.userItem}}>
                    <Text style={{...main.secondaryText, textAlign: "center"}}>{position}</Text>
                </View>
                <View style={[{...styles.userItem}, {backgroundColor: 'white', padding: 10, marginLeft: 10, borderRadius: 15}]}>
                    <Icon name="trash" size={20}></Icon>
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
        flex: 0.33
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