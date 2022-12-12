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
import { addFoodToFB, fetchAll } from "../redux/actions/food";

import { firebase } from "../config/firebase";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const AddScreen = ({ navigation }) => {
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

  const [title, setName] = useState("");
  const [image, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
 
  
  
  const addFood = () => {
    const food = {
        title: title,
        image: image,
        price: price,
        description: description,
    };
    navigation.navigate("Home");
    dispatch(addFoodToFB(food));

  };

  return (
    <ImageBackground source={{ uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/319393296_3296593767256268_3100683458759179816_n.jpg?stp=dst-jpg_p843x403&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=4teY8PmnvIYAX8WxSId&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDY433Y_gKoQ5oRDeUzY9ZFokNPsDBjxVSKVtNv4PWu4A&oe=639A1335' }}style={styles.container}
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
            // value={value}
            onChangeText={(nextValue) => setName(nextValue)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Price"
            // value={value}
            onChangeText={(nextValue) => setPrice(nextValue)}
          />
          <TextInput
            style={styles.InputText}
            placeholder="Description"
            // value={value}
            onChangeText={(nextValue) => setDescription(nextValue)}
          />
          
          <TouchableOpacity style={styles.button} onPress={() => addFood()}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 180,
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
