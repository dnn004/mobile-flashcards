import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import { postDeck } from '../utils/api'
import { addDeck } from '../actions'

class NewDeck extends Component {
  state = {
    title: ''
  }

  submit = () => {
    if(this.state.title === ''){
      Alert.alert(
        'Blank',
        'Title cannot be empty!',
        [
          { text: 'OK' }
        ]
      )
      return
    }
    const { dispatch, navigation } = this.props

    postDeck(this.state.title)
      .then((deck) => {
        dispatch(addDeck(deck))

        navigation.reset({
          ...navigation.state,
          routes: [
            { key: 'decks-1', name: 'Decks'},
            { key: 'deck-1', name: 'Deck', params: { id: deck.id }},
          ],
          index: 1,
        })
      })

    this.setState(() => ({
      title: ''
    }))
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Input
          placeholder='Deck Title'
          onChangeText={value => this.setState({ title: value })}
          autoFocus={true}
        />
        <Button
          buttonStyle={{
            height: 50,
            width: 200
          }}
          title='Add Deck'
          type='solid'
          raised
          onPress={this.submit}
        />
      </View>
    )
  }
}

function mapStatetoProps() {
  return {}
}

export default connect(mapStatetoProps)(NewDeck)
