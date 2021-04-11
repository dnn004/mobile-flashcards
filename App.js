import 'react-native-gesture-handler'
//import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Constants from 'expo-constants'

import { darkPurple } from './utils/colors'

import DeckList from './components/DeckList'
import DeckDetailed from './components/DeckDetailed'
import NewQuestion from './components/NewQuestion'

import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="DeckList">
      <Stack.Screen name="Deck List" component={DeckList} />
      <Stack.Screen name="Deck" component={DeckDetailed} />
      <Stack.Screen name="Add Card" component={NewQuestion} />
    </Stack.Navigator>
  )
}

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component{
  componentDidMount() {
    // AsyncStorage.clear()
    console.log("STARTING")
  }


  render() {
    return (
      <Provider store={createStore(reducer)}>
        <SafeAreaProvider>
          <FlashcardStatusBar backgroundColor={darkPurple} style="light" />
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
