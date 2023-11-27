import { useEffect, useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert, FlatList, Image} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ModalCreateGroup from "../components/modalCreateGroup.js" 
import ModalAddGroup from "../components/modalAddGroup.js"
import ModalEditGroupName from '../components/modalEditGroupName.js'
import ModalCreateToken from '../components/modalCreateToken.js'
import ModalAddCamera from '../components/modalAddCamera.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import ResponsiveButton from '../components/ResponsiveButton.js'
import main from '../styles/Main'
import UserItem from '../components/UserItem.js'
import getIPAddress from '../components/getIPAddress.js'


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

export default function Group({ route, navigation }) {

    const token = route.params ? route.params.token : null;

    const [addCameraModalVisible, setAddCameraModalVisible] = useState(false)
    const [createTokenModalVisible, setCreateTokenModalVisible] = useState(false)
    const [editGroupNameModalVisible, setEditGroupNameModalVisible] = useState(false)
    const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false)
    const [addGroupModalVisible, setAddGroupModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [userData, setUserData] = useState(null)
    const [groupData, setGroupData] = useState(null)
    const [currentGroup, setCurrentGroup] = useState(null)
    const [needFetch, setNeedFetch] = useState(true)

    async function fetchData() {
        if (needFetch && token) {
        
            await fetch(`http://${getIPAddress()}:3000/user?token=` + token, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                setUserData(response)
                console.log('user', response)
            })
            .catch(err => console.log(err))

            await fetch(`http://${getIPAddress()}:3000/group?token=` + token, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                setGroupData(response)
                if (currentGroup)
                    setCurrentGroup(response.find(group => group.group_id == currentGroup.group_id))
                else
                    setCurrentGroup(response[0])
                console.log('group', response)
            })
            .catch(err => console.log(err))

            setNeedFetch(false)

            console.log('update')
        }
    }

    const exitGroupAlert = async () => {
        const result = await fetch(`http://${getIPAddress()}:3000/group/user`, { method: 'DELETE', body: JSON.stringify({ token, group_id: currentGroup.group_id}), headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .catch(err => console.log(err))

        if (result.status) {
            Alert.alert('You exited successfully', result.message, [
                {
                    text: 'OK'
                }        
            ])

            setNeedFetch(true)
        } else {
            Alert.alert('Ops! Something went wrong.', result.message, [
                {
                    text: 'OK'
                }
            ])
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            alert(navigation)
            return true
        })

        fetchData()
        console.log('useEffect currentGroup', currentGroup)

        return () => backHandler.remove()
    }, [navigation, editMode, needFetch, currentGroup])

    const nextGroupButton = () => {
        if (groupData && currentGroup) {
            const currentGroupIndex = groupData.findIndex(group => group.group_id === currentGroup.group_id);
            if (currentGroupIndex < groupData.length - 1) {
                setCurrentGroup(groupData[currentGroupIndex + 1]);
            }
        }
    }
    
    const previousGroupButton = () => {
        if (groupData && currentGroup) {
            const currentGroupIndex = groupData.findIndex(group => group.group_id === currentGroup.group_id);
            if (currentGroupIndex > 0) {
                setCurrentGroup(groupData[currentGroupIndex - 1]);
            }
        }
    }

    const RenderList = () => {
        if (currentGroup) {
            console.log('current group', currentGroup)
            return (
                <View>
                    <View style={styles.group}>
                        <Text style={{...main.title, ...styles.groupNameTitle}}>{currentGroup.group_name}</Text>
                        <FlatList 
                            data={currentGroup.authorized_users}
                            renderItem={({item}) => <UserItem user_id={item.user_id} username={item.user_name} isAdmin={item.isAdmin} />}
                            keyExtractor={item => item.user_id.toString()}
                        />
                    </View>
                    <View style={styles.groupControler}>
                        <TouchableOpacity onPress={previousGroupButton} style={styles.previousGroupButton}>
                            <Image style={styles.previousIcon} source={require('../assets/previousIcon.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={nextGroupButton} style={styles.nextGroupButton}>
                            <Image style={styles.nextIcon} source={require('../assets/nextIcon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    const RenderEditableList = () => {
        if (currentGroup) {
            return (
                <View>
                    <ModalEditGroupName visible={editGroupNameModalVisible} setVisible={setEditGroupNameModalVisible} token={token} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup} setNeedFetch={setNeedFetch} />
                    <View style={styles.group}>
                        <View style={styles.headerGroup}>
                            <Text style={{...main.title, ...styles.groupNameTitle}}>{currentGroup.group_name}</Text>
                            <TouchableOpacity onPress={() => setEditGroupNameModalVisible(true)} style={[styles.icon, {backgroundColor: 'white', padding: 10, marginLeft: 10, borderRadius: 15}]}>
                                <Icon name='pencil' size={20}></Icon>
                            </TouchableOpacity> 
                        </View>
                        <FlatList 
                            data={currentGroup.authorized_users}
                            renderItem={({item}) => <UserItem userProfileId={userData.user_id} user_id={item.user_id} token={token} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} username={item.user_name} isAdmin={item.isAdmin} setNeedFetch={setNeedFetch} editMode={true} />}
                            keyExtractor={item => item.user_id.toString()}
                        />
                    </View>
                    <View style={styles.groupControler}>
                        <TouchableOpacity onPress={previousGroupButton} style={styles.previousGroupButton}>
                            <Image style={styles.previousIcon} source={require('../assets/previousIcon.png')}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={nextGroupButton} style={styles.nextGroupButton}>
                            <Image style={styles.nextIcon} source={require('../assets/nextIcon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    if (!editMode && currentGroup) {
        return (
            <View style={{...main.backgroundScreens, ...main.container}}>
                <ModalCreateGroup needFetch={needFetch} setNeedFetch={setNeedFetch} token={token} visible={createGroupModalVisible} setVisible={setCreateGroupModalVisible}/>
                <ModalAddGroup token={token} visible={addGroupModalVisible} setVisible={setAddGroupModalVisible} setNeedFetch={setNeedFetch}/>
                <ModalCreateToken token={token} visible={createTokenModalVisible} setVisible={setCreateTokenModalVisible} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} setNeedFetch={setNeedFetch}/>
                <ModalAddCamera token={token} visible={addCameraModalVisible} setVisible={setAddCameraModalVisible} currentGroup={currentGroup}/>
                <View style={styles.header}>
                    <View style={styles.photoContainer}>
                        <View style={styles.photo}>
                            <View style={styles.online}></View>
                        </View>
                        <Text style={{...main.mainText}}>Welcome, {userData ? userData.user_name : 'User'}!</Text>
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
                            <TouchableOpacity style={styles.buttons} onPress={() => setAddGroupModalVisible(!addGroupModalVisible)}>
                                <View style={styles.icon}>
                                    <Icon name='key' size={20}></Icon>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons} onPress={() => setAddCameraModalVisible(!addCameraModalVisible)}>
                                <View>
                                    <Icon name='camera' size={20}></Icon>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons} onPress={() => setCreateTokenModalVisible(!createTokenModalVisible)}>
                                <View>
                                    <Icon name='plus' size={20}></Icon>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <RenderList /> 
                    <View style={{...main.form, marginTop: 20}}>
                        <ResponsiveButton text="Exit group" callback={() => exitGroupAlert() }/>
                        <Text style={{...main.secondaryText, marginTop: 15}} onPress={() => setCreateGroupModalVisible(true)}>Create group</Text>
                    </View>
                </View>
            </View>
        )
    } else if (editMode && currentGroup) {
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
                    <RenderEditableList />
                </View>
            </View>
        )
    } else {
        return (
            <View style={{...main.backgroundScreens, ...main.container}}>
                <ModalCreateGroup needFetch={needFetch} setNeedFetch={setNeedFetch} token={token} visible={createGroupModalVisible} setVisible={setCreateGroupModalVisible}/>
                <ModalAddGroup token={token} visible={addGroupModalVisible} setVisible={setAddGroupModalVisible}/>
                <View style={styles.header}>
                    <View style={styles.photoContainer}>
                        <View style={styles.photo}>
                            <View style={styles.online}></View>
                        </View>
                        <Text style={{...main.mainText}}>Welcome, {userData ? userData.user_name : 'User'}!</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => alert(navigation)}>
                        <Text style={{textAlign: 'center'}}>Exit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.mainContainerHeader}>
                        <Text style={{...main.mainText, marginBottom: 10}}>Your groups</Text>
                        <View style={{...styles.containerButtons, marginBottom: 10}}>

                            <TouchableOpacity style={styles.buttons} onPress={() => setAddGroupModalVisible(true)}>
                                <View style={styles.icon}>
                                    <Icon name='plus' size={20}></Icon>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.group}>
                        <Text style={{...main.title, ...styles.groupNameTitle}}>Não há nenhum grupo para este usuário.</Text>
                    </View>
                    <View style={{...main.form, marginTop: 20}}>
                        <Text style={{...main.secondaryText, marginTop: 15}} onPress={() => setCreateGroupModalVisible(true)}>Create group</Text>
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
    headerGroup: {
        display: 'flex',
        flexDirection: 'row'
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