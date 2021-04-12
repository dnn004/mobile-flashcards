import React, { Component } from 'react'
import { SafeAreaView, TouchableOpacity, InteractionManager, ActivityIndicator, FlatList } from 'react-native'
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
        InteractionManager.runAfterInteractions(() => {})
      })
      .then(() => this.setState(() => ({
        ready: true
      })))

  }

  render() {
    const { decks } = this.props
    const sortTitle = (a, b) => {
      let titlea = decks[a].title
      let titleb = decks[b].title
      return (titlea < titleb) ? -1 : (titlea > titleb) ? 1 : 0
    }
    const ids = Object.keys(decks).sort(sortTitle)
    const decksArray = ids.map(id => decks[id])
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { id: item.id })} key={item.id} >
        <Deck title={item.title} number={item.questions.length} />
      </TouchableOpacity>
    )

    return (
      <SafeAreaView>
        {this.state.ready ?
          <FlatList
            data={decksArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          :
          < ActivityIndicator />
        }
      </SafeAreaView>
    )
  }
}

function mapStatetoProps (decks) {
  return {
    decks
  }
}

export default connect(mapStatetoProps)(DeckList)
