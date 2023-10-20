import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, Button, Alert   } from 'react-native';
import ResponsiveButton from '../components/ResponsiveButton.js';
import main from '../styles/Main.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

const tryNavigate = async ({username, email, password, photo}, navigation) => {
    if (!photo) return (
        Alert.alert('Please insert a photo', 'To contiue, you need to insert a photo of your face', [
            { message: 'Ok'}
        ])
    )

    const url = 'http://192.168.15.21:3000/user'

    const asset = await MediaLibrary.createAssetAsync(photo.uri)

    const formData = new FormData()
    formData.append('file', {
        uri: asset.uri,
        type: 'image/jpg',
        name: asset.filename
    })
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)

    const result = await fetch(url, { method: 'POST', body: formData})
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log(err))

    if (result.success)
        return navigation.navigate('Login')
    return Alert.alert('Error', 'Try again later', [
        {
            text: 'OK'
        }
    ])
}

export default function UserPhoto ({ route, navigation }) {

    const { username, email, password } = route.params || { username: null, email: null, password: null }
    console.log(route.params)
    let cameraRef = useRef()
    const [photoMode, setPhotoMode] = useState(false)
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
    const [photo, setPhoto] = useState(null)
    const [type, setType] = useState(CameraType.front)

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()

            setHasCameraPermission(cameraPermission.status === 'granted')
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
        })()
    }, [])

    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options)
        MediaLibrary.saveToLibraryAsync(newPhoto.uri)
        .then(() => {
            setPhoto(newPhoto)
            setPhotoMode(!photoMode)
        })
    }

    const flipCamera = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    if (photoMode && hasCameraPermission) {
        return (
            <SafeAreaView style={styles.container}>
                <Camera style={styles.preview} ref={cameraRef} type={type} ratio='16:9' >
                    <View style={styles.cameraButtons}>
                        <Button title="Take Pic" onPress={takePic} />
                        <Button title="Flip Camera" onPress={flipCamera} />
                        <Button title="Cancel" onPress={() => setPhotoMode(false)} />
                    </View>
                </Camera>
            </SafeAreaView>
        )
    }

    return (
        <View style={{...main.backgroundScreens, ...main.container}}>
            <StatusBar style='light' />
            <View>
                <TouchableOpacity>
                    {photo ? <Image style={styles.userImage} source={{ uri: photo.uri  }} /> : <Image style={styles.userImage} source={require('../assets/photoIcon.jpg')}></Image>}
                </TouchableOpacity>
            </View>
            <View style={styles.addPhotoView}>
                <Text style={styles.userPhotoText}>Add a photo</Text>
                <ResponsiveButton text="Take picture" style={styles.buttonStyle} callback={() => setPhotoMode(true)}></ResponsiveButton>
            </View>
            <ResponsiveButton text="Confirm" callback={() => tryNavigate({username, email, password, photo}, navigation)}></ResponsiveButton>
        </View>
    )
}

const styles = StyleSheet.create({
    userImage: {
        borderRadius: 15,
        width: 200,
        height: 200,
    },
    userPhotoText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    addPhotoView: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 70,
    },
    icon: {
        marginTop: 16,
    },
    backIcon: {
        width: 46,
        height: 30,
    },
    backButton: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    container: {
        flex: 1,

    },
    buttonContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-end'
    },
    preview: {
        flex: 1
    },
    cameraButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10
    },
})