import React, { Component } from 'react'
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button } from 'react-native-elements'
import { red, white, green } from '../utils/colors'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class DeckDetailed extends Component {
  state = {
    ready: true
  }

  delete = () => {
    const { dispatch, navigation, route } = this.props
    deleteDeck(route.params.id)
      .then(decks => {
        dispatch(removeDeck(decks))
      })
      .then(this.setState({
        ready: false
      }))
      .then(navigation.navigate('Decks'))
  }

  startQuiz(deck) {
    clearLocalNotification()
      .then(setLocalNotification)

    if(deck.questions.length > 0) {
      this.props.navigation.navigate('Quiz', { id: deck.id })
    } else {
      Alert.alert(
        'Unable To Start Quiz',
        'A deck must have at least 1 card to quiz',
        [
          { text: 'OK' }
        ]
      )
    }
  }

  render() {
    const { id } = this.props.route.params
    const deck = this.props.decks[id]
    if(!this.state.ready){
      return (
        <ActivityIndicator />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text h1 style={{textAlign: 'center'}}>{deck.title}</Text>
          <Text h3 style={{ textAlign: 'center' }}>{deck.questions.length} {deck.questions.length > 1 ? 'cards' : 'card'}</Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title='Add Card'
            type='solid'
            raised
            buttonStyle={{ backgroundColor: green }}
            onPress={() => this.props.navigation.navigate('Add Card', { id: id })}
            containerStyle={styles.button}
          />
          <Button
            title='Start Quiz'
            type='solid'
            raised
            onPress={() => {this.startQuiz(deck)}}
            containerStyle={styles.button}
          />
          <Button
            title='Delete Deck'
            type='solid'
            raised
            onPress={this.delete}
            buttonStyle={{ backgroundColor: red }}
            titleStyle={{ color: white }}
            containerStyle={styles.button}
          />
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  button: {
    margin: 10
  }
})

function mapStatetoProps(decks) {
  return {
    decks
  }
}

export default connect(mapStatetoProps)(DeckDetailed)
