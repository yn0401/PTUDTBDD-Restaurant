import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import ListScreen from "./ListItems";
import AddScreen from "./Add";
import DetailScreen from "./Details";
import UpdateScreen from "./Update";
// import UpdateScreen from "./Update";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
  <Navigator screenOptions={{ headerShown: true }}>
    <Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Screen name="List" component={ListScreen} />
    <Screen name="Add" component={AddScreen} />
    <Screen name="Update" component={UpdateScreen}/>
    <Screen name="Details" component={DetailScreen} />
    {/* <Screen name="Update" component={UpdateScreen} /> */}
  </Navigator>
);

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
