import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Mate from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchAll, searchSneakerByNameFromFB } from "../redux/actions/food";
import { useEffect } from "react";



function ListScreen({ navigation }) {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.foods);
  

  const [text, onChangeText] = useState("");
  
  const search = (keyword) => {
    if(keyword != ""){
      dispatch(searchSneakerByNameFromFB(keyword));
    }else{
      dispatch(fetchAll());
    }
    
  }

  useEffect(() => {
    dispatch(fetchAll());
    console.log("db", db);
  }, []);

  const navigateAdd = (id) => {
    navigation.navigate("Add");
  };

  const navigate = (id) => {
    // console.log(id)
    navigation.navigate("Details",{
      id : id
    });
  };

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() => navigate(item.id)}>
        <View style={styles.item} key={item.id}>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.info}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.name}>{item.title}</Text>
            <Mate name="navigate-next" size={24} color="#F0E68C" />
            </View>
           
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={{ uri: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/319367141_3296602590588719_5129861581151447214_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=u1T1WdZXWSEAX_oydAq&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDvF87qViIgPaVhGSTR_ThqnC-yNkyRYXm6QrxZOG_Heg&oe=639B4170' }}style={styles.container}>     
     <View style={styles.search}>
        <Octicons name="search" size={24} color="#000" onPress={() => {search(text)}}/>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Food's Name"
          onChangeText={onChangeText}
          value={text}
        />
        <Octicons
          name="diff-added"
          size={24}
          color="#000"
          onPress={navigateAdd}
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={db.foods}
        renderItem={ListItem}
      />

    </ImageBackground>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  item: {
   
    flexDirection: "row",
    // alignItems: "center",
    padding: 15,
    margin: 5,
    // backgroundColor: "#eee",
    // borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor:"white",
  },
  image: {
    width: 150,
    height: 130,
    resizeMode: "cover",
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    width: '60%',
    color:'white'
    
  },
  name: {
    fontSize: 20,
    opacity: 0.8,
    width: '80%',
    color:'#F0E68C',
    fontWeight: "bold",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  	textOverflow: 'ellipsis'
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    fontSize: 16,
    color: "#888",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  	textOverflow: 'ellipsis',
    color:'white'
  },
  price: {
    fontSize: 16,
    color:'white',
    fontWeight:'bold',
    opacity: 0.8,
  },
  search: {
    padding: 10,
    marginTop:260,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
  },
});