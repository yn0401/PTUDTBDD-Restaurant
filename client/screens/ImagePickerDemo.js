import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

//step1
import {firebase} from '../config/firebase';
import { getStorage, uploadString, ref, getDownloadURL, uploadBytes, uploadBytesResumable} from "firebase/storage";
const ImagePickerDemo = ({params,}) => {
    const [selectedImage, setSelectedImage] = useState({localURI:'https://firebasestorage.googleapis.com/v0/b/garan-c3a6f.appspot.com/o/c17.png?alt=media&token=8b521656-f3c4-4b64-9435-964680727550'});
    const openImage = async()=> {
        const result = await ImagePicker.launchImageLibraryAsync({base64:true})
        if(result.cancelled == true){
            return;
            
        }
        let uri = result.uri;
        // console.log(result)
        setSelectedImage({localURI: result.uri});
        if (Platform.OS == 'web'){
            let base64code = result.base64;
            await uploadBase64(base64code);
            //upload
        }else{
            //device
            let uri = result.uri;
            //step1 -> convert uri --> blob
            const blobfile = await convertURI2BlobFile(uri)
            //step2 --> upload to cloud
            await uploadFile(blobfile);
        }
        

    }
    const convertURI2BlobFile = async (uri) => {
        const result = await new Promise ( (resolve, reject) => {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.onload = function(){
                resolve(xmlRequest.response);
            }
            xmlRequest.onerror = function(){
                console.log("error here")
            }
            xmlRequest.responseType='blob';
            xmlRequest.open("GET",uri,true);
            xmlRequest.send(null)
        })
    }

    const uploadFile = async(blobfile) => {
        let imgname = 'img-ios-' + new Date().getTime();
        
        //step2
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgname}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }

        const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
        uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('downloadURL', downloadURL)
            })
        })
    }
    const uploadBase64 = async (base64code) => {
        let imgname = 'img-w-' + new Date().getTime();
        
        //step2
        let storage = getStorage();
        let storageref = ref(storage, `images/${imgname}.jpg`);
        let metadata = {
            contentType: 'image/jpeg'
        }
        uploadString(storageref, base64code, 'base64',metadata).
        then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('downloadURL', downloadURL)
            })
        })
    }
    return (
    <View style={styles.container}>
        <Text style={styles.title}>ImagePickerDemo</Text>
        <Image source={{uri: selectedImage.localURI }} style={styles.img} />
        <TouchableOpacity onPress={openImage} style={styles.btn}>
            <Text>Choose Image</Text>
        </TouchableOpacity>
    </View>
);
}

export default ImagePickerDemo;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    title:{
        fontSize: 20,
    },
    img:{
        width: 150,
        height: 150,
        borderRadius: 150/2,
        borderWidth: 2,
        resizeMode:'cover',
        borderColor: 'red'
    },
    btn:{
        marginTop:10,
        width: 100,
        height: 30,
        backgroundColor: '#CCCCCC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});