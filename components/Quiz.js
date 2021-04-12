import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Text, Button, Icon, Card, Badge } from 'react-native-elements'
import { white, black, red, green } from '../utils/colors'

class Quiz extends Component {
  state = {
    index: 0,
    answeredCorrect: 0,
    answered: null,
    showAnswer: false
  }

  startOver() {
    this.setState({
      index: 0,
      answeredCorrect: 0,
      answered: null,
      showAnswer: false
    })
  }

  submit(key, answer) {
    if (key === answer) {
      this.setState({
        answered: true,
        answeredCorrect: this.state.answeredCorrect + 1
      })
    } else {
      this.setState({
        answered: false
      })
    }
  }

  show() {
    this.setState({
      showAnswer: true
    })
  }

  next = () => {
    if (this.state.answered !== null || (this.state.answered === null && this.state.showAnswer)){
      this.setState({
        index: this.state.index + 1,
        showAnswer: false,
        answered: null
      })
      return

    } else {
      Alert.alert(
        'No Answer',
        'Answer the question to move to the next card!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      )
    }
  }

  render() {
    const { id } = this.props.route.params
    const deck = this.props.decks[id]
    const questions = deck.questions
    const mixed = questions.map(question => {
      const randomIndex = Math.floor(Math.random() * questions.length)
      return {
        question: question.question,
        answer: questions[randomIndex].answer,
        correct: question.answer === questions[randomIndex].answer
      }
    })
    return (
      <View style={styles.container}>
        <View>
          <Text h1 style={{ textAlign: 'center' }}>{deck.title}</Text>
          {this.state.index == questions.length - 1 && (this.state.answered !== null || this.state.showAnswer) ?
            <Text h4 style={{ textAlign: 'center' }}>Score: {this.state.answeredCorrect}/{mixed.length} correct</Text>
            :
            <View>
              <Text h4 style={{ textAlign: 'center' }}>Current: {this.state.index + 1}/{mixed.length} {mixed.length > 1 ? 'cards' : 'card'}</Text>
              <Text h4 style={{ textAlign: 'center' }}>({mixed.length - this.state.index - 1} remaining)</Text>
            </View>
            }
        </View>

        <View>
          <Card>
            <Text h4 style={{ textAlign: 'center' }}>{mixed[this.state.index].question}</Text>
            <Card.Divider />
            <Text h4 style={{ textAlign: 'center' }}>{mixed[this.state.index].answer}</Text>
          </Card>
        </View>

        <View>
          {this.state.answered !== null ?
            <Badge
            badgeStyle={{ padding: 20 }}
            value={
              <Text>{this.state.answered ? 'Correct! 😄' : 'Incorrect! 😐'}</Text>
            }
            status={this.state.answered ? 'success' : 'warning'} />
            :
            <View style={styles.buttons}>
              {this.state.showAnswer ?
              <Card
              containerStyle={{flex: 1}}>
                <Text h4 style={{ textAlign: 'center' }}>Answer</Text>
                <Card.Divider />
                <Text h4 style={{ textAlign: 'center' }}>{questions[this.state.index].answer}</Text>
              </Card>
              :
              <Button
                title='Show Answer'
                type='outline'
                raised
                onPress={() => this.show()}
              />}
            </View>
            }
        </View>

        <View style={{}}>
          {this.state.index == questions.length - 1 && (this.state.answered !== null || this.state.showAnswer) ?
          <View style={styles.buttons}>
            <Button
              buttonStyle={styles.button}
              title='Back To Deck'
              type='solid'
              raised
              onPress={() => this.props.navigation.navigate('Deck', { id: deck.id })}
              icon={{
                name: 'back',
                type: 'ant-design',
                color: white
              }}
            />
            <Button
              buttonStyle={styles.button}
              title='Restart Quiz'
              type='solid'
              raised
              onPress={() => this.startOver()}
              icon={{
                name: 'reload1',
                type: 'ant-design',
                color: white
              }}
            />
          </View>:
          <View style={styles.buttons}>
            <Button
              buttonStyle={[styles.button, {backgroundColor: red}]}
              title='Incorrect'
              type='solid'
              raised
              onPress={() => this.submit(mixed[this.state.index].correct, false)}
              disabled={this.state.answered !== null || this.state.showAnswer}
            />
            <Button
              buttonStyle={[styles.button, {backgroundColor: green}]}
              title='Correct'
              type='solid'
              raised
              onPress={() => this.submit(mixed[this.state.index].correct, true)}
              disabled={this.state.answered !== null || this.state.showAnswer}
            />
          </View>}

          <TouchableOpacity onPress={this.next} disabled={this.state.index == questions.length - 1} style={styles.forward}>
            <Icon raised reverse name='arrow-forward' color={black} type='ionicons' disabled={this.state.index == questions.length - 1} />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height: 75,
    width: 150
  },
  forward: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function mapStatetoProps(decks) {
  return {
    decks
  }
}

export default connect(mapStatetoProps)(Quiz)
