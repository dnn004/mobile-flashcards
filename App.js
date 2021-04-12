import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Header } from 'react-native-elements'
import { MyStack } from './components/Navigator'
import { setLocalNotification } from './utils/notification'

export default class App extends Component{
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <SafeAreaProvider>
          <Header
            centerComponent={{ text: 'Mobile Flashcards', style: { color: '#fff' } }}
          />
          <MyStack />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
