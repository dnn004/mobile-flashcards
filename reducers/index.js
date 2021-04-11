import {
  RECEIVE_DECKS,
  ADD_DECK,
  RECEIVE_DECK,
  ADD_QUESTION
} from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    case RECEIVE_DECK :
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    case ADD_QUESTION :
      return {
        ...state,
        ...[action.deckID].questions.push(action.question)
      }
    default :
      return state
  }
}

export default decks