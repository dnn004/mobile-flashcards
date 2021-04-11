import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { postQuestion } from '../utils/api'

import { addQuestion } from '../actions'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {

    const { dispatch } = this.props

    const deckID = this.props.route.params.id
    postQuestion(deckID, this.state.question, this.state.answer)
      .then(([deckID, newQuestion]) => {
        dispatch(addQuestion(deckID, newQuestion))
      })

    this.setState(() => ({
      question: '',
      answer: '',
    }))

    this.props.navigation.navigate('Deck', { id: deckID })
  }

  render() {
    return (
      <View>
        <Input
          placeholder="Question"
          onChangeText={value => this.setState({ question: value })}
        />
        <Input
          placeholder="Answer"
          onChangeText={value => this.setState({ answer: value })}
        />
        <Button
          title="Submit"
          type="solid"
          raised
          onPress={this.submit}
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

export default connect(mapStatetoProps)(NewQuestion)
