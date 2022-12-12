import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Fo from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";

import { firebase } from "../config/firebase";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import {updateFoodToFB, fetchAll} from "../redux/actions/food"

const UpdateScreen = ({ route, navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const [selectedImage, setSelectedImage] = useState({
    localURI:
      "https://firebasestorage.googleapis.com/v0/b/garan-c3a6f.appspot.com/o/z3951893891239_5905f6aa30dfc7598f7590fedb6b7786.jpg?alt=media&token=655b8abf-2df0-421c-b9ab-ddac0cef8b55",
  });

  const openImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled) return;
    // console.log(result);
    let uri = result.uri;
    setSelectedImage({ localURI: result.uri });

    if (Platform.OS == "web") {
      let base64code = result.base64;
      //upload
      await uploadBase64(base64code);
    } else {
      let uri = result.uri;
      console.log("uri", uri);
      //step 1 : convert to blob
      const blobFile = await convertURIToBlob(uri);
      //step 2 : upload to cloud
      await uploadFile(blobFile);
    }
  };

  const convertURIToBlob = async (uri) => {
    const response = await new Promise((resolve, reject) => {
      let xmlRequest = new XMLHttpRequest();
      xmlRequest.onload = function () {
        resolve(xmlRequest.response);
      };
      xmlRequest.onerror = function () {
        reject(new TypeError("Request failed"));
      };

      xmlRequest.responseType = "blob";
      xmlRequest.open("GET", uri, true);
      xmlRequest.send(null);
    });
    return response;
  };

  const uploadFile = async (blobFile) => {
    let imgName = "img-ios" + new Date().getTime();
    const storage = getStorage();
    const storageRef = ref(storage, `images/${imgName}.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(storageRef, blobFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const uploadBase64 = async (base64code) => {
    let imgName = "img-w" + new Date().getTime();
    //step 2
    const storage = getStorage();
    const storageRef = ref(storage, `images/${imgName}.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadString(storageRef, base64code, "base64", metadata).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  const dispatch = useDispatch();

  const item = route.params.item;
  const id = route.params.id;
  console.log("item", item);

  const [title, setName] = useState(item.title);
  const [image, setUrl] = useState(item.image);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
 
  
  
  const updateFood = () => {
    const food = {
        id: id,
        title: title,
        image: image,
        price: price,
        description: description,
    };
    navigation.navigate("Home");
    dispatch(updateFoodToFB(food));
    dispatch(fetchAll());
  };

  return (
    <ImageBackground source={{ uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/319503906_3296631157252529_1824478030942855072_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=zjEcLyIFt7QAX_cYMlW&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBCFKag9BrVNinlRkbGmN-gLHBguAGPHyq6jq4e5fTvzQ&oe=639A5488' }}style={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri: selectedImage.localURI,
        }}
      />
      <TouchableOpacity style={styles.button1} onPress={openImage}>
        <Fo name="camera" size={24}/>
      </TouchableOpacity>
      <SafeAreaView>
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.InputText}
            placeholder="Title"
            value={title}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Price"
            value={price}
            onChangeText={(nextValue) => setPrice(nextValue)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Description"
            value={description}
            onChangeText={(nextValue) => setDescription(nextValue)}
          />
          
          <TouchableOpacity style={styles.button} onPress={() => updateFood()}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 220,
    width: 250,
    height: 200,
    borderRadius: 30,
    resizeMode:'contain',
  },
  button: {
    backgroundColor:'black',
    padding: 10,
    marginTop:10,
    borderRadius: 5,
    marginVertical: 10,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    marginBottom: 40,
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  btn: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
  },
  InputText: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
});
