//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements'

import { removeDeck } from '../utils/api'
import { red, white } from '../utils/colors'

class DeckDetailed extends Component {
  state = {
    ready: false
  }

  render() {
    const { id } = this.props.route.params
    const deck = this.props.decks[id]
    const title = deck.title
    const number = `${deck.questions.length} cards`
    return (
      <View>
        <Text h1>{title}</Text>
        <Text h3>{number}</Text>
        <Button
          title="Add Card"
          type="outline"
          raised
          onPress={() => this.props.navigation.navigate('Add Card', { id: id })}
        />
        <Button
          title="Start Quiz"
          type="solid"
          raised
          onPress={() => removeDeck(id)}
        />
        <Button
          title="Delete Deck"
          type="outline"
          raised
          buttonStyle={{backgroundColor: red}}
          titleStyle={{color: white}}
        />
      </View>
    )
  }
}

function mapStatetoProps(decks) {
  return {
    decks
  }
}

export default connect(mapStatetoProps)(DeckDetailed)
