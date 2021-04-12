import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Input, Button } from 'react-native-elements'
import { postQuestion } from '../utils/api'
import { addQuestion } from '../actions'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = () => {
    if(this.state.question === '' || this.answer === ''){
      Alert.alert(
        'Blank',
        'Neither question or answer can be empty!',
        [
          { text: 'OK' }
        ]
      )
      return
    }
    const { dispatch, navigation, route } = this.props

    const deckID = route.params.id
    postQuestion(deckID, this.state.question, this.state.answer)
      .then(([deckID, newQuestion]) => {
        dispatch(addQuestion(deckID, newQuestion))
      })

    this.setState(() => ({
      question: '',
      answer: '',
    }))

    navigation.navigate('Deck', { id: deckID })
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Input
          placeholder='Question'
          onChangeText={value => this.setState({ question: value })}
          autoFocus={true}
        />
        <Input
          placeholder='Answer'
          onChangeText={value => this.setState({ answer: value })}
        />
        <Button
          buttonStyle={{
            height: 50,
            width: 200
          }}
          title='Submit'
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

export default connect(mapStatetoProps)(NewQuestion)
