import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  const navigateList = () => {
    navigation.navigate("List");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.header}>
        <Image
            style={styles.imageLogo}
            source={{uri: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/318416648_3291334907782154_2183836459614527849_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=-_wSwYGLnIAAX98OQ6_&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDjWZrg30k-6VtWYYPifSrtvRij-aElz6T0wHcgZvLVFQ&oe=6391A962'}}
          />
        </View>
        <View style={styles.main}>
          <Image
            style={styles.imageLogo1}
            source={{uri: 'https://i.pinimg.com/564x/58/22/c8/5822c809a06a15ec3834996fa1cd4060.jpg'}}
          />
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity onPress={navigateList} style={styles.btn}>
            <Text style={styles.btnText}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    height: 300,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: '#3B2718'
  },
  headerTitle1: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: '#3B2718'
  },
  main: {
    backgroundColor: "black",
    top: -30,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    top: -40,
    width: 390,
    height: 350,
    resizeMode: "contain",
  },
  imageLogo1: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  footer: {
    flex: 1,
    top:-20,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 150,
    alignItems: "center",
  },
  btnText: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold'
  },
});
