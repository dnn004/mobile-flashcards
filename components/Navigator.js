
import React from 'react'
import { Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import DeckList from './DeckList'
import DeckDetailed from './DeckDetailed'
import NewQuestion from './NewQuestion'
import NewDeck from './NewDeck'
import Quiz from './Quiz'
import { white } from '../utils/colors'

function MyTab() {
  let Tab = null
  if(Platform.OS === 'ios'){
    Tab = createBottomTabNavigator()
  } else {
    Tab = createMaterialBottomTabNavigator()
  }

  return (
    <Tab.Navigator
      initialRouteName='Decks'
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName
          let type

          if (route.name === 'Decks') {
            iconName = 'stack-overflow'
            type = 'font-awesome'
          } else if (route.name === 'Add Deck') {
            iconName = 'add-to-list'
            type = 'entypo'
          }
          return <Icon name={iconName} color={white} type={type} />
        },
      })}>
      <Tab.Screen name='Decks' component={DeckList} />
      <Tab.Screen name='Add Deck' component={NewDeck} />
    </Tab.Navigator>
  )
}

export function MyStack() {
  enableScreens()
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Decks'>
        <Stack.Screen name='Decks' component={MyTab} />
        <Stack.Screen name='Deck' component={DeckDetailed} />
        <Stack.Screen name='Add Card' component={NewQuestion} />
        <Stack.Screen name='Quiz' component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
