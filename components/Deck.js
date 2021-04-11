//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Card } from 'react-native-elements';


class Deck extends Component {
  render() {
    return (
      <View>
        <Card>
          <Card.Title>{this.props.title}</Card.Title>
          <Text>{this.props.number} cards</Text>
        </Card>
      </View>
    )
  }

}

export default Deck