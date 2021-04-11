import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { getInitialData } from '../utils/api'
import { receiveDecks } from '../actions'

import Deck from './Deck'

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    getInitialData()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
      .then(() => this.setState(() => ({
        ready: true
      })))
  }

  render() {
    const { decks } = this.props
    return (
      <View>
        {this.state.ready ?
          Object.keys(decks).map(id => {
            return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { id: id })} key={id} >
                <Deck title={decks[id].title} number={decks[id].questions.length} />
              </TouchableOpacity>)})
          :
          null
        }
      </View>
    )
  }
}

function mapStatetoProps (decks) {
  return {
    decks
  }
}

export default connect(mapStatetoProps)(DeckList)
