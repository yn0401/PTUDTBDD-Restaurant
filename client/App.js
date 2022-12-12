import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './screens/Navigation';
import store from "./redux/stores/store";
import ListScreen from './screens/ListItems';
import HomeScreen from './screens/Home';
import DetailScreen from './screens/Details';
import AddScreen from './screens/Add';

export default function App() {
  return (
    <Provider store={store}>
<AppNavigation/>

    </Provider>
  );
}
