import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, Text } from 'react-native-elements'
import { purple, lightRed, orange, blue, pink, lightGreen } from '../utils/colors'

class Deck extends Component {
  render() {
    const colors = [purple, lightRed, orange, blue, pink, lightGreen]
    const chosen = colors[Math.floor(Math.random() * colors.length)]
    return (
      <View>
        <Card
          containerStyle={{ backgroundColor: chosen}}>
          <Text h2 style={{textAlign: 'center'}}> {this.props.title}</Text>
          <Card.Title>{this.props.number} {this.props.number > 1 ? 'cards':'card'}</Card.Title>
        </Card>
      </View>
    )
  }
}

export default Deck
