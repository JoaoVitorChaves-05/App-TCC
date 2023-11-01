import { useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert, FlatList, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalCreateGroup from "../components/modalCreateGroup.js" ;
import ModalAddGroup from "../components/modalAddGroup.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main';
import UserItem from '../components/UserItem.js'


const alert = (navigation) => {
    Alert.alert('Tem certeza que deseja sair da conta?', 'Ao sair da conta terá que efetuar login novamente.', [
        {
            text: 'Cancelar',
            onPress: () => console.log('Cancel button has been clicked')
        },
        {
            text: 'OK',
            onPress: () => {
                navigation.navigate('Home')
                console.log('OK button has been clicked')
            }
        }
    ])
}

const DATA = [
    {
        id: 1,
        username: 'user1',
        position: 'admin'
    },
    {
        id: 2,
        username: 'user2',
        position: 'authorized'
    },
    {
        id: 3,
        username: 'user3',
        position: 'authorized'
    },
    {
        id: 4,
        username: 'user4',
        position: 'admin'
    },
    {
        id: 5,
        username: 'user5',
        position: 'admin'
    }
]

export default function Group({ route, navigation }) {

    const token = route.params ? route.params.token : null;

    const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
    const [addGroupModalVisible, setAddGroupModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState(null);
    const [groupData, setGroupData] = useState(null);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            alert(navigation)
            return true
        });

        async function fetchData() {
            if (!userData && !groupData) {
            
                await fetch('http://192.168.18.146:3000/user?token=' + token, { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    setUserData(response)
                })
                .catch(err => console.log(err))

                await fetch('http://192.168.18.146:3000/group?token=' + token, { method: 'GET' })
                .then(response => response.json())
                .then(response => {
                    setGroupData(response)
                })
                .catch(err => console.log(err))

            }
        }

        fetchData()

        return () => backHandler.remove()
    }, [navigation, editMode])

    const renderContent = () => {
      if(!editMode){
        return (
          console.log("modo editor desativado")
        )
      } else {
        return (
          console.log("Modo editor ativado")
        )
      }

    }

    if (!editMode) {
        return (
            <View style={{...main.backgroundScreens, ...main.container}}>
                <ModalCreateGroup visible={createGroupModalVisible} setVisible={setCreateGroupModalVisible}/>
                <ModalAddGroup visible={addGroupModalVisible} setVisible={setAddGroupModalVisible}/>
                <View style={styles.header}>
                    <View style={styles.photoContainer}>
                        <View style={styles.photo}>
                            <View style={styles.online}></View>
                        </View>
                        <Text style={{...main.mainText}}>Welcome, User!</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => alert(navigation)}>
                        <Text style={{textAlign: 'center'}}>Exit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.mainContainerHeader}>
                        <Text style={{...main.mainText, marginBottom: 10}}>Your groups</Text>
                        <View style={{...styles.containerButtons, marginBottom: 10}}>
                            <TouchableOpacity style={styles.buttons} onPress={() => setEditMode(!editMode)}>
                                <View>
                                    <Icon name='pencil' size={20}></Icon>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons} onPress={() => setAddGroupModalVisible(true)}>
                                <View style={styles.icon}>
                                    <Icon name='plus' size={20}></Icon>
                                </View>    
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.group}>
                        <Text style={{...main.title, ...styles.groupNameTitle}}>Group name</Text>
                        <FlatList 
                            data={DATA}
                            renderItem={({item}) => <UserItem username={item.username} position={item.position} />}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={styles.groupControler}>
                        <TouchableOpacity onPress={() => { console.log("anterior!")}} style={styles.previousGroupButton}>
                            <Image style={styles.previousIcon} source={require('../assets/previousIcon.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { console.log("próximo!")}} style={styles.nextGroupButton}>
                        <Image style={styles.nextIcon} source={require('../assets/nextIcon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{...main.form, marginTop: 20}}>
                        <ResponsiveButton text="Exit group" callback={() => exitGroupAlert() }/>
                        <Text style={{...main.secondaryText, marginTop: 15}} onPress={() => setCreateGroupModalVisible(true)}>Create group</Text>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={{...main.backgroundScreens, ...main.container}}>
                <View style={styles.header}>
                    <View style={styles.photoContainer}>
                        <View style={styles.photo}>
                            <View style={styles.online}></View>
                        </View>
                        <Text style={{...main.mainText}}>Welcome, User!</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => alert(navigation)}>
                        <Text style={{textAlign: 'center'}}>Exit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.mainContainerHeader}>
                        <Text style={{...main.mainText, marginBottom: 10}}>Your groups</Text>
                        <View style={{...styles.containerButtons, marginBottom: 10}}>

                            <TouchableOpacity style={styles.buttons} onPress={() => setEditMode(!editMode)}>
                                <View style={styles.icon}>
                                    <Icon name='pencil' size={20}></Icon>
                                </View>
                            </TouchableOpacity>


                        </View>
                    </View>
                    <View style={styles.group}>
                        <View style={styles.headerGroup}>
                            <Text style={{...main.title, ...styles.groupNameTitle}}>Group name</Text>
                            <View style={[styles.icon, {backgroundColor: 'white', padding: 10, marginLeft: 10, borderRadius: 15}]}>
                                <Icon name='pencil' size={20}></Icon>
                            </View> 
                        </View>
                        <FlatList 
                            data={DATA}
                            renderItem={({item}) => <UserItem username={item.username} position={item.position} editMode={editMode} />}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={styles.groupControler}>
                        <TouchableOpacity onPress={() => { console.log("anterior!")}} style={styles.previousGroupButton}>
                            <Image style={styles.previousIcon} source={require('../assets/previousIcon.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { console.log("próximo!")}} style={styles.nextGroupButton}>
                        <Image style={styles.nextIcon} source={require('../assets/nextIcon.png')}></Image>
                        </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        top: hp('5%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('100%'),
    },
    groupNameTitle: {
        fontSize: 20,
    },
    photoContainer: {
        display: 'flex',
        alignItems: 'left'
    },
    photo: {
        width: wp('20%'),
        height: hp('10%'),
        backgroundColor: '#ffffff',
        borderRadius: wp('50%'),
    },
    online: {
        position: 'absolute',
        right: wp('3%'),
        bottom: 0,
        backgroundColor: '#15FF10',
        width: wp('3%'),
        height: hp('1.5%'),
        borderRadius: wp('50%')
    },
    logoutButton: {
        width: wp('15%'),
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: hp('5%'),
    },
    mainContainerHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttons: {
        width: wp('10%'),
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginLeft: 10,
    },
    group: {
        backgroundColor: '#6564D0',
        borderRadius: 15,
        padding: 20,
        maxHeight: hp('50%'),
        width: wp('90%')
    },
    listGroups: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    listGroupsItem: {
        height: 10,
        width: 10,
        borderRadius: wp('50%'),
        backgroundColor: '#FFFFFF',
        marginLeft: 2,
        marginRight: 2
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupControler: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: wp('90%'),
        height: 35,
    },
    nextGroupButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '100%',
        backgroundColor: '#3D45F5',
        borderRadius: 15,
    },
    previousGroupButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    previousIcon: {
        height: 20,
        width: 20,
    },
    nextIcon: {
        height: 20,
        width: 20
    }
})