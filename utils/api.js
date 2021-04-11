import {
  _getDecks,
  _getDeck,
  _saveDeck,
  _addQuestionToDeck
} from './_DATA.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
import ADD_QUESTION from '../actions'

export function getInitialData () {
  return Promise(_getDecks()).then(decks)
}

export function getDeck() {
  return Promise(_getDeck()).then(deck)
}

export function postDeck (title) {
  return _saveDeck(title)
}

export function postQuestion (deckID, question, answer) {
  return (dispatch, getState) => {

    let question = {
      question: question,
      answer: answer
    }

    return _addQuestionToDeck(deckID, question)
    .then(([deckID, question]) => ({deckID, question}) => dispatch(ADD_QUESTION))
  }
  
}
